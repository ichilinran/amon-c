// Clang 18 C17 acquisition frontend. SourceLocation encodings are local to one report.
#include "clang/AST/ASTConsumer.h"
#include "clang/AST/Attr.h"
#include "clang/AST/RecursiveASTVisitor.h"
#include "clang/Basic/SourceManager.h"
#include "clang/Basic/Version.h"
#include "clang/Frontend/CompilerInstance.h"
#include "clang/Frontend/FrontendActions.h"
#include "clang/Index/USRGeneration.h"
#include "clang/Lex/Lexer.h"
#include "clang/Lex/MacroArgs.h"
#include "clang/Lex/PPCallbacks.h"
#include "clang/Lex/Preprocessor.h"
#include "clang/Tooling/Tooling.h"
#include "clang/Tooling/CompilationDatabase.h"
#include "llvm/Support/JSON.h"
#include "llvm/Support/SHA256.h"
#include "llvm/ADT/StringExtras.h"
#include "llvm/Support/raw_ostream.h"
#include <cstdlib>
#include <map>
#include <set>

using namespace clang;
namespace j = llvm::json;
struct Data {
  CompilerInstance *ci=nullptr;
  j::Array tokens, macros, declarations, references, types, alignments, generics, includes, statements, annotations, pragmas;
  mutable j::Array fileInstances;
  mutable std::map<unsigned,unsigned> instanceIDs;
  mutable std::map<unsigned,FileID> instanceSources;
  j::Array definitions, ppEvents;
  std::map<const MacroInfo *,unsigned> definitionIDs;
  unsigned eventNumber=0;
  j::Array astNodes, originalTokens, skipped, sourceBuffers, diagnostics, fileDigests, symbols;
  std::map<const NamedDecl*,unsigned> symbolIDs;
  int currentParent=-1;
  std::map<const Stmt*,unsigned> astStmtIDs;
  j::Array semanticTypes, typeSyntax;
  std::map<const void *,unsigned> semanticIDs;
  std::map<std::pair<const void *,const void *>,unsigned> syntaxIDs;
  unsigned limit=20000, tokenCount=0;bool truncated=false;
  bool own(SourceLocation loc) const {
    return loc.isValid() && !ci->getSourceManager().isInSystemHeader(ci->getSourceManager().getExpansionLoc(loc));
  }
  unsigned instance(FileID fid) const {
    if(fid.isInvalid())return 0;
    unsigned key=fid.getHashValue();auto found=instanceIDs.find(key);
    if(found!=instanceIDs.end())return found->second;
    unsigned id=instanceIDs.size()+1;instanceIDs[key]=id;instanceSources[key]=fid;
    auto &sm=ci->getSourceManager();auto include=sm.getIncludeLoc(fid);
    auto entry=sm.getFileEntryRefForID(fid);auto start=sm.getLocForStartOfFile(fid);
    unsigned parent=include.isValid()?instance(sm.getFileID(sm.getExpansionLoc(include))):0;
    fileInstances.push_back(j::Object{{"id",int64_t(id)}, {"file",sm.getFilename(start).str()},
      {"physicalFile",bool(entry)}, {"systemHeader",sm.isInSystemHeader(start)}, {"parent",int64_t(parent)},
      {"includeByte",include.isValid()?int64_t(sm.getFileOffset(sm.getExpansionLoc(include))):-1}});
    return id;
  }
  j::Object point(SourceLocation l) const {
    auto &sm=ci->getSourceManager();j::Object o;
    if(l.isInvalid()){o["valid"]=false;return o;}
    auto s=sm.getSpellingLoc(l),e=sm.getExpansionLoc(l);auto presumed=sm.getPresumedLoc(l);
    o["valid"]=true;o["macro"]=l.isMacroID();o["rawEncoding"]=int64_t(l.getRawEncoding());
    o["spellingFile"]=sm.getFilename(s).str();o["spellingByte"]=int64_t(sm.getFileOffset(s));
    o["expansionFile"]=sm.getFilename(e).str();o["expansionByte"]=int64_t(sm.getFileOffset(e));
    o["spellingInstance"]=int64_t(instance(sm.getFileID(s)));o["expansionInstance"]=int64_t(instance(sm.getFileID(e)));
    o["system"]=sm.isInSystemHeader(l);o["spellingSystem"]=sm.isInSystemHeader(s);o["expansionSystem"]=sm.isInSystemHeader(e);
    if(presumed.isValid()){o["presumedFile"]=presumed.getFilename();o["presumedLine"]=int64_t(presumed.getLine());}
    j::Array chain;unsigned count=0;auto at=l;
    while(at.isMacroID()&&count++<128){
      auto range=sm.getImmediateExpansionRange(at);auto start=sm.getExpansionLoc(range.getBegin());
      chain.push_back(j::Object{{"name",Lexer::getImmediateMacroName(at,sm,ci->getLangOpts()).str()},
        {"argument",sm.isMacroArgExpansion(at)},{"body",sm.isMacroBodyExpansion(at)},
        {"callFile",sm.getFilename(start).str()},{"callByte",int64_t(sm.getFileOffset(start))},
        {"callerRaw",int64_t(sm.getImmediateMacroCallerLoc(at).getRawEncoding())},
        {"immediateSpellingRaw",int64_t(sm.getImmediateSpellingLoc(at).getRawEncoding())}});
      auto next=sm.getImmediateMacroCallerLoc(at);if(next==at)break;at=next;
    }
    o["originChain"]=std::move(chain);o["originChainTruncated"]=at.isMacroID();return o;
  }
  j::Object token(const Token &t) const {
    return j::Object{{"text",Lexer::getSpelling(t,ci->getSourceManager(),ci->getLangOpts())},
      {"kind",tok::getTokenName(t.getKind())},{"location",point(t.getLocation())}};
  }
  j::Object range(SourceRange r) const {
    auto &sm=ci->getSourceManager();auto after=Lexer::getLocForEndOfToken(r.getEnd(),0,sm,ci->getLangOpts());
    return j::Object{{"begin",point(r.getBegin())},{"last",point(r.getEnd())},{"afterLast",point(after)}};
  }
  void rawTokens() {
    auto &sm=ci->getSourceManager();
    for(auto &[key,id]:instanceIDs){
      // Recover the instance via a physical location; synthetic buffers are excluded.
      FileID fid=instanceSources.at(key);auto start=sm.getLocForStartOfFile(fid);
      if(!sm.getFileEntryRefForID(fid))continue;
      bool invalid=false;auto buffer=sm.getBufferData(fid,&invalid);if(invalid)continue;
      auto digest=llvm::SHA256::hash(llvm::ArrayRef<uint8_t>(reinterpret_cast<const uint8_t*>(buffer.data()),buffer.size()));
      fileDigests.push_back(j::Object{{"instance",int64_t(id)},{"bytes",int64_t(buffer.size())},{"sha256",llvm::toHex(llvm::ArrayRef<uint8_t>(digest),true)}});
      if(sm.isInSystemHeader(start))continue;
      sourceBuffers.push_back(j::Object{{"instance",int64_t(id)},{"text",buffer.str()}});
      Lexer lexer(start,ci->getLangOpts(),buffer.begin(),buffer.begin(),buffer.end());lexer.SetCommentRetentionState(true);
      Token t;
      while(true){
        lexer.LexFromRawLexer(t);if(t.is(tok::eof))break;
        if(t.is(tok::raw_identifier))ci->getPreprocessor().LookUpIdentifierInfo(t);
        unsigned byte=sm.getFileOffset(t.getLocation());
        originalTokens.push_back(j::Object{{"instance",int64_t(id)},{"start",int64_t(byte)},{"end",int64_t(byte+t.getLength())},
          {"text",Lexer::getSpelling(t,sm,ci->getLangOpts())},{"kind",tok::getTokenName(t.getKind())}});
      }
    }
  }
  unsigned definition(const MacroInfo *mi,llvm::StringRef name) {
    auto found=definitionIDs.find(mi);if(found!=definitionIDs.end())return found->second;
    unsigned id=definitionIDs.size()+1;definitionIDs[mi]=id;j::Array body,params;
    for(const auto &t:mi->tokens())body.push_back(token(t));
    for(auto *p:mi->params())params.push_back(p->getName().str());
    definitions.push_back(j::Object{{"id",int64_t(id)},{"name",name.str()},{"location",point(mi->getDefinitionLoc())},
      {"parameters",std::move(params)},{"replacement",std::move(body)},
      {"builtin",mi->isBuiltinMacro()},{"functionLike",mi->isFunctionLike()},{"variadic",mi->isVariadic()}});
    return id;
  }
  bool physicalOwn(SourceLocation loc) const {
    auto &sm=ci->getSourceManager();return own(loc)&&bool(sm.getFileEntryRefForID(sm.getFileID(sm.getSpellingLoc(loc))));
  }
  unsigned semantic(QualType q) {
    if(q.isNull())return 0;const void *key=q.getAsOpaquePtr();auto found=semanticIDs.find(key);
    if(found!=semanticIDs.end())return found->second;
    unsigned id=semanticIDs.size()+1;semanticIDs[key]=id;auto *t=q.getTypePtr();
    j::Object o{{"id",int64_t(id)},{"kind",t->getTypeClassName()},
      {"const",q.isLocalConstQualified()},{"volatile",q.isLocalVolatileQualified()},{"restrict",q.isLocalRestrictQualified()}};
    j::Array edges;bool supported=true;
    auto edge=[&](llvm::StringRef role,QualType child){edges.push_back(j::Object{{"role",role.str()},{"type",int64_t(semantic(child))}});};
    if(auto *p=dyn_cast<PointerType>(t))edge("pointee",p->getPointeeType());
    else if(auto *a=dyn_cast<ArrayType>(t)){
      auto *effective=ci->getASTContext().getAsArrayType(q);
      edge("element",effective->getElementType());o["indexQualifiers"]=int64_t(a->getIndexTypeCVRQualifiers());
      o["sizeModifier"]=int64_t(a->getSizeModifier());
      if(auto *c=dyn_cast<ConstantArrayType>(a)){llvm::SmallString<64> n;c->getSize().toString(n,10,false);o["constantSize"]=n.str().str();}
      if(auto *v=dyn_cast<VariableArrayType>(a))if(auto *e=v->getSizeExpr())o["sizeExpression"]=j::Object{{"kind",e->getStmtClassName()},{"begin",point(e->getBeginLoc())},{"end",point(e->getEndLoc())}};
    }else if(auto *f=dyn_cast<FunctionType>(t)){
      edge("result",f->getReturnType());
      if(auto *p=dyn_cast<FunctionProtoType>(f)){o["parameterTypesKnown"]=true;o["variadic"]=p->isVariadic();for(auto param:p->param_types())edge("parameter",param);}
      else{o["parameterTypesKnown"]=false;o["variadic"]=false;}
    }else if(auto *a=dyn_cast<AtomicType>(t))edge("value",a->getValueType());
    else if(auto *c=dyn_cast<ComplexType>(t))edge("element",c->getElementType());
    else if(auto *td=dyn_cast<TypedefType>(t)){o["symbol"]=target(td->getDecl());edge("alias",td->getDecl()->getUnderlyingType());}
    else if(auto *r=dyn_cast<RecordType>(t)){
      o["symbol"]=target(r->getDecl());o["union"]=r->getDecl()->isUnion();
      if(auto *decl=r->getDecl()->getDefinition())for(auto *field:decl->fields()){
        j::Object item{{"role","field"},{"type",int64_t(semantic(field->getType()))},{"symbol",target(field)}};
        if(field->isBitField())if(auto *width=field->getBitWidth())item["bitWidth"]=j::Object{{"kind",width->getStmtClassName()},{"begin",point(width->getBeginLoc())},{"end",point(width->getEndLoc())}};
        edges.push_back(std::move(item));
      }
    }else if(auto *e=dyn_cast<EnumType>(t))o["symbol"]=target(e->getDecl());
    else if(auto *p=dyn_cast<ParenType>(t))edge("inner",p->getInnerType());
    else if(auto *e=dyn_cast<ElaboratedType>(t))edge("named",e->getNamedType());
    else if(auto *a=dyn_cast<AdjustedType>(t)){edge("original",a->getOriginalType());edge("adjusted",a->getAdjustedType());}
    else if(auto *b=dyn_cast<BuiltinType>(t))o["builtinKind"]=int64_t(b->getKind());
    else supported=false;
    o["supportedKind"]=supported;o["edges"]=std::move(edges);
    o["canonical"]=int64_t(semantic(q.getCanonicalType()));
    semanticTypes.push_back(std::move(o));return id;
  }
  unsigned syntax(TypeLoc loc) {
    if(loc.isNull())return 0;auto key=std::make_pair(loc.getType().getAsOpaquePtr(),static_cast<const void *>(loc.getOpaqueData()));
    auto found=syntaxIDs.find(key);if(found!=syntaxIDs.end())return found->second;
    unsigned id=syntaxIDs.size()+1;syntaxIDs[key]=id;
    auto local=loc.getLocalSourceRange();j::Array children;
    j::Object o{{"id",int64_t(id)},{"kind",loc.getTypeLocClass()==TypeLoc::Qualified?"Qualified":loc.getType().getTypePtr()->getTypeClassName()},
      {"semantic",int64_t(semantic(loc.getType()))},{"begin",point(loc.getBeginLoc())},{"end",point(loc.getEndLoc())},
      {"localBegin",point(local.getBegin())},{"localEnd",point(local.getEnd())}};
    auto child=[&](llvm::StringRef role,TypeLoc next){if(!next.isNull())children.push_back(j::Object{{"role",role.str()},{"syntax",int64_t(syntax(next))}});};
    child("inner",loc.getNextTypeLoc());
    if(auto p=loc.getAs<PointerTypeLoc>())o["star"]=point(p.getStarLoc());
    if(auto p=loc.getAs<ParenTypeLoc>()){o["leftParen"]=point(p.getLParenLoc());o["rightParen"]=point(p.getRParenLoc());}
    if(auto a=loc.getAs<ArrayTypeLoc>()){
      o["leftBracket"]=point(a.getLBracketLoc());o["rightBracket"]=point(a.getRBracketLoc());
      if(auto *e=a.getSizeExpr())o["sizeExpression"]=j::Object{{"kind",e->getStmtClassName()},{"begin",point(e->getBeginLoc())},{"end",point(e->getEndLoc())}};
    }
    if(auto f=loc.getAs<FunctionTypeLoc>()){
      o["leftParen"]=point(f.getLParenLoc());o["rightParen"]=point(f.getRParenLoc());
      for(unsigned i=0;i<f.getNumParams();i++)if(auto *p=f.getParam(i))if(auto *info=p->getTypeSourceInfo())children.push_back(j::Object{{"role","parameter"},{"index",int64_t(i)},{"symbol",target(p)},{"syntax",int64_t(syntax(info->getTypeLoc()))}});
    }
    o["children"]=std::move(children);typeSyntax.push_back(std::move(o));return id;
  }
  j::Object target(const NamedDecl *decl) {
    llvm::SmallString<128> usr;index::generateUSRForDecl(decl,usr);
    auto found=symbolIDs.find(decl);unsigned id;
    if(found!=symbolIDs.end())id=found->second;else{
      id=symbolIDs.size()+1;symbolIDs[decl]=id;
      llvm::StringRef ns=isa<RecordDecl>(decl)||isa<EnumDecl>(decl)?"tag":isa<FieldDecl>(decl)?"member":isa<LabelDecl>(decl)?"label":"ordinary";
      j::Object record{{"id",int64_t(id)},{"name",decl->getNameAsString()},{"kind",decl->getDeclKindName()},
        {"usr",usr.str().str()},{"namespace",ns.str()},{"location",point(decl->getLocation())}};
      if(auto *r=dyn_cast<RecordDecl>(decl))record["union"]=r->isUnion();
      symbols.push_back(std::move(record));
    }
    j::Object result{{"id",int64_t(id)},{"name",decl->getNameAsString()},{"kind",decl->getDeclKindName()},{"usr",usr.str().str()},{"location",point(decl->getLocation())}};
    if(auto *r=dyn_cast<RecordDecl>(decl))result["union"]=r->isUnion();return result;
  }
};
class PP : public PPCallbacks {
  Data &d;
public:
  explicit PP(Data &d):d(d){}
  void SourceRangeSkipped(SourceRange r,SourceLocation) override {if(d.own(r.getBegin()))d.skipped.push_back(d.range(r));}
  void MacroDefined(const Token &name,const MacroDirective *directive) override {
    if(!d.physicalOwn(name.getLocation()))return;
    unsigned id=d.definition(directive->getMacroInfo(),name.getIdentifierInfo()->getName());
    d.ppEvents.push_back(j::Object{{"sequence",int64_t(++d.eventNumber)},{"kind","define"},{"definition",int64_t(id)},{"location",d.point(name.getLocation())}});
  }
  void MacroUndefined(const Token &name,const MacroDefinition &definition,const MacroDirective *) override {
    if(!d.physicalOwn(name.getLocation()))return;auto *mi=definition.getMacroInfo();
    d.ppEvents.push_back(j::Object{{"sequence",int64_t(++d.eventNumber)},{"kind","undef"},{"name",name.getIdentifierInfo()->getName().str()},
      {"definition",mi?int64_t(d.definition(mi,name.getIdentifierInfo()->getName())):0},{"location",d.point(name.getLocation())}});
  }
  void LexedFileChanged(FileID fid,LexedFileChangeReason reason,SrcMgr::CharacteristicKind,FileID previous,SourceLocation) override {
    d.ppEvents.push_back(j::Object{{"sequence",int64_t(++d.eventNumber)},{"kind",reason==LexedFileChangeReason::EnterFile?"enter-file":"exit-file"},
      {"instance",int64_t(d.instance(fid))},{"previous",int64_t(d.instance(previous))}});
  }
  void FileSkipped(const FileEntryRef &file,const Token &name,SrcMgr::CharacteristicKind) override {
    d.ppEvents.push_back(j::Object{{"sequence",int64_t(++d.eventNumber)},{"kind","skipped-file"},{"file",file.getName().str()},{"location",d.point(name.getLocation())}});
  }
  void PragmaDirective(SourceLocation loc,PragmaIntroducerKind kind) override {
    if(d.own(loc))d.pragmas.push_back(j::Object{{"location",d.point(loc)},{"introducerKind",int64_t(kind)}});
  }
  void MacroExpands(const Token &name,const MacroDefinition &def,SourceRange range,const MacroArgs *args) override {
    if(!d.own(name.getLocation()))return;auto *mi=def.getMacroInfo();if(!mi)return;
    j::Array params,arguments;
    for(auto *p:mi->params())params.push_back(p->getName().str());
    if(args)for(unsigned i=0;i<args->getNumMacroArguments();i++){
      j::Array a;auto *ts=args->getUnexpArgument(i);
      for(unsigned k=0;k<MacroArgs::getArgLength(ts);k++)a.push_back(d.token(ts[k]));
      arguments.push_back(std::move(a));
    }
    bool paste=false,stringize=false;for(const auto &t:mi->tokens()){paste|=t.is(tok::hashhash);stringize|=t.is(tok::hash);}
    unsigned definitionID=d.definition(mi,name.getIdentifierInfo()->getName());
    unsigned expansionID=d.macros.size()+1;
    d.ppEvents.push_back(j::Object{{"sequence",int64_t(++d.eventNumber)},{"kind","expand"},{"expansion",int64_t(expansionID)},{"definition",int64_t(definitionID)}});
    d.macros.push_back(j::Object{{"name",Lexer::getSpelling(name,d.ci->getSourceManager(),d.ci->getLangOpts())},
      {"id",int64_t(expansionID)},{"definitionID",int64_t(definitionID)},
      {"call",d.point(range.getBegin())},{"end",d.point(range.getEnd())},{"definition",d.point(mi->getDefinitionLoc())},
      {"parameters",std::move(params)},{"arguments",std::move(arguments)},
      {"paste",paste},{"stringize",stringize},{"variadic",mi->isVariadic()}});
  }
  void InclusionDirective(SourceLocation hash,const Token &,llvm::StringRef file,bool angled,
    CharSourceRange,OptionalFileEntryRef entry,llvm::StringRef,llvm::StringRef,const Module *,SrcMgr::CharacteristicKind) override {
    d.includes.push_back(j::Object{{"location",d.point(hash)},{"written",file.str()},{"angled",angled},{"resolved",entry?entry->getName().str():""}});
  }
};
class Visitor : public RecursiveASTVisitor<Visitor> {
  Data &d;
  std::set<const Decl*> seenDecls;
public:
  explicit Visitor(Data &d):d(d){}
  bool TraverseDecl(Decl *decl){
    if(!decl||!seenDecls.insert(decl).second)return true;int previous=d.currentParent;
    if(d.own(decl->getLocation())){
      unsigned id=d.astNodes.size();j::Object o{{"id",int64_t(id)},{"parent",int64_t(previous)},{"kind",decl->getDeclKindName()},{"category","declaration"},
        {"range",d.range(decl->getSourceRange())},{"location",d.point(decl->getLocation())},{"implicit",decl->isImplicit()}};
      if(auto *n=dyn_cast<NamedDecl>(decl)){o["name"]=n->getNameAsString();o["symbol"]=d.target(n);}
      if(auto *v=dyn_cast<ValueDecl>(decl))o["semanticType"]=int64_t(d.semantic(v->getType()));
      if(auto *v=dyn_cast<DeclaratorDecl>(decl))if(auto *info=v->getTypeSourceInfo())o["typeSyntax"]=int64_t(d.syntax(info->getTypeLoc()));
      if(auto *f=dyn_cast<FunctionDecl>(decl))o["hasWrittenPrototype"]=f->hasWrittenPrototype();
      if(auto *r=dyn_cast<RecordDecl>(decl))o["union"]=r->isUnion();
      d.astNodes.push_back(std::move(o));d.currentParent=id;
    }
    bool result=RecursiveASTVisitor<Visitor>::TraverseDecl(decl);d.currentParent=previous;return result;
  }
  bool TraverseStmt(Stmt *stmt){
    if(!stmt)return true;int previous=d.currentParent;
    if(d.own(stmt->getBeginLoc())){
      unsigned id=d.astNodes.size();j::Object o{{"id",int64_t(id)},{"parent",int64_t(previous)},{"kind",stmt->getStmtClassName()},
        {"category",isa<Expr>(stmt)?"expression":"statement"},{"range",d.range(stmt->getSourceRange())},{"location",d.point(stmt->getBeginLoc())}};
      if(auto *e=dyn_cast<Expr>(stmt)){if(!e->getType().isNull())o["semanticType"]=int64_t(d.semantic(e->getType()));else o["semanticTypeUnavailable"]=true;}
      if(auto *e=dyn_cast<DeclRefExpr>(stmt)){o["reference"]=d.target(e->getDecl());o["location"]=d.point(e->getLocation());}
      if(auto *e=dyn_cast<MemberExpr>(stmt)){o["reference"]=d.target(e->getMemberDecl());o["location"]=d.point(e->getMemberLoc());}
      if(auto *e=dyn_cast<GotoStmt>(stmt))o["reference"]=d.target(e->getLabel());
      if(auto *e=dyn_cast<LabelStmt>(stmt))o["name"]=e->getName();
      d.astNodes.push_back(std::move(o));d.currentParent=id;d.astStmtIDs[stmt]=id;
    }
    int own=d.currentParent;
    bool result=RecursiveASTVisitor<Visitor>::TraverseStmt(stmt);
    if(own!=previous){
      j::Array roles;
      auto child=[&](llvm::StringRef role,const Stmt *s){j::Object r{{"role",role.str()},{"absent",s==nullptr}};
        auto at=d.astStmtIDs.find(s);if(at!=d.astStmtIDs.end())r["node"]=int64_t(at->second);else r["node"]=nullptr;roles.push_back(std::move(r));};
      if(auto *s=dyn_cast<IfStmt>(stmt)){child("condition",s->getCond());child("then",s->getThen());child("else",s->getElse());}
      if(auto *s=dyn_cast<WhileStmt>(stmt)){child("condition",s->getCond());child("body",s->getBody());}
      if(auto *s=dyn_cast<DoStmt>(stmt)){child("body",s->getBody());child("condition",s->getCond());}
      if(auto *s=dyn_cast<ForStmt>(stmt)){child("initial",s->getInit());child("condition",s->getCond());child("update",s->getInc());child("body",s->getBody());}
      if(auto *s=dyn_cast<SwitchStmt>(stmt)){child("condition",s->getCond());child("body",s->getBody());}
      if(auto *s=dyn_cast<CaseStmt>(stmt)){child("value",s->getLHS());child("body",s->getSubStmt());}
      if(auto *s=dyn_cast<DefaultStmt>(stmt))child("body",s->getSubStmt());
      if(auto *s=dyn_cast<ReturnStmt>(stmt))child("value",s->getRetValue());
      if(auto *s=dyn_cast<BinaryOperator>(stmt)){child("left",s->getLHS());child("right",s->getRHS());}
      if(auto *s=dyn_cast<UnaryOperator>(stmt))child("operand",s->getSubExpr());
      if(auto *s=dyn_cast<ConditionalOperator>(stmt)){child("condition",s->getCond());child("then",s->getTrueExpr());child("else",s->getFalseExpr());}
      (*d.astNodes[own].getAsObject())["childRoles"]=std::move(roles);
    }
    d.currentParent=previous;return result;
  }
  bool TraverseTypeLoc(TypeLoc loc){
    if(!loc.isNull()&&d.own(loc.getBeginLoc())){
      const NamedDecl *target=nullptr;SourceLocation name;
      if(auto t=loc.getAs<TypedefTypeLoc>()){target=t.getTypedefNameDecl();name=t.getNameLoc();}
      if(auto t=loc.getAs<RecordTypeLoc>()){target=t.getDecl();name=t.getNameLoc();}
      if(auto t=loc.getAs<EnumTypeLoc>()){target=t.getDecl();name=t.getNameLoc();}
      if(target)d.astNodes.push_back(j::Object{{"id",int64_t(d.astNodes.size())},{"parent",int64_t(d.currentParent)},{"kind","TypeReference"},{"category","type-reference"},
        {"name",target->getNameAsString()},{"reference",d.target(target)},{"location",d.point(name)},{"range",d.range(SourceRange(name,name))}});
    }
    if(!loc.isNull())if(auto t=loc.getAs<RecordTypeLoc>()){
      auto *decl=t.getDecl();auto &sm=d.ci->getSourceManager();
      if(decl->isCompleteDefinition()&&d.own(decl->getLocation())&&loc.getEndLoc().isValid()&&
        sm.getExpansionLoc(decl->getLocation())==sm.getExpansionLoc(t.getNameLoc()))TraverseDecl(decl);
    }
    return RecursiveASTVisitor<Visitor>::TraverseTypeLoc(loc);
  }
  bool VisitStmt(Stmt *s){
    if(d.own(s->getBeginLoc()))d.statements.push_back(j::Object{{"kind",s->getStmtClassName()},{"begin",d.point(s->getBeginLoc())},{"end",d.point(s->getEndLoc())}});
    return true;
  }
  bool VisitNamedDecl(NamedDecl *n){
    if(d.own(n->getLocation())){
      auto o=d.target(n);if(auto *v=dyn_cast<ValueDecl>(n)){o["type"]=v->getType().getAsString();o["canonicalType"]=v->getType().getCanonicalType().getAsString();}
      if(auto *v=dyn_cast<ValueDecl>(n))o["semanticType"]=int64_t(d.semantic(v->getType()));
      if(auto *t=dyn_cast<TypeDecl>(n))if(t->getTypeForDecl())o["semanticType"]=int64_t(d.semantic(QualType(t->getTypeForDecl(),0)));
      if(auto *f=dyn_cast<FunctionDecl>(n))o["hasWrittenPrototype"]=f->hasWrittenPrototype();
      if(auto *decl=dyn_cast<DeclaratorDecl>(n))if(auto *info=decl->getTypeSourceInfo())o["typeSyntax"]=int64_t(d.syntax(info->getTypeLoc()));
      if(auto *td=dyn_cast<TypedefNameDecl>(n))o["underlyingType"]=td->getUnderlyingType().getAsString();
      if(auto *td=dyn_cast<TypedefNameDecl>(n)){o["underlyingSemanticType"]=int64_t(d.semantic(td->getUnderlyingType()));o["typeSyntax"]=int64_t(d.syntax(td->getTypeSourceInfo()->getTypeLoc()));}
      d.declarations.push_back(std::move(o));
    }
    return true;
  }
  bool VisitDeclRefExpr(DeclRefExpr *e){
    if(d.own(e->getExprLoc()))d.references.push_back(j::Object{{"location",d.point(e->getExprLoc())},{"target",d.target(e->getDecl())}});
    return true;
  }
  bool VisitOffsetOfExpr(OffsetOfExpr *e){
    if(!d.own(e->getBeginLoc()))return true;
    for(unsigned i=0;i<e->getNumComponents();i++){
      const auto &part=e->getComponent(i);if(part.getKind()!=OffsetOfNode::Field)continue;
      auto loc=part.getEndLoc();if(loc.isInvalid()||!d.own(loc))continue;
      auto *field=part.getField();unsigned id=d.astNodes.size();
      d.astNodes.push_back(j::Object{{"id",int64_t(id)},{"parent",int64_t(d.currentParent)},
        {"kind","OffsetOfMember"},{"category","expression"},{"name",field->getNameAsString()},
        {"location",d.point(loc)},{"range",d.range(SourceRange(loc,loc))},
        {"reference",d.target(field)},{"semanticType",int64_t(d.semantic(field->getType()))}});
    }
    return true;
  }
  bool VisitTypeLoc(TypeLoc t){
    if(!d.own(t.getBeginLoc()))return true;
    j::Object o{{"type",t.getType().getAsString()},{"canonicalType",t.getType().getCanonicalType().getAsString()},{"begin",d.point(t.getBeginLoc())},{"end",d.point(t.getEndLoc())}};
    o["semanticType"]=int64_t(d.semantic(t.getType()));o["typeSyntax"]=int64_t(d.syntax(t));
    if(auto td=t.getAs<TypedefTypeLoc>())o["target"]=d.target(td.getTypedefNameDecl());
    if(auto r=t.getAs<RecordTypeLoc>())o["target"]=d.target(r.getDecl());
    if(auto e=t.getAs<EnumTypeLoc>())o["target"]=d.target(e.getDecl());
    d.types.push_back(std::move(o));return true;
  }
  bool VisitDecl(Decl *decl){
    if(!d.own(decl->getLocation()))return true;
    for(auto *a:decl->specific_attrs<AlignedAttr>()){
      j::Object o{{"location",d.point(a->getLocation())},{"expression",a->isAlignmentExpr()}};
      if(a->isAlignmentExpr()){
        if(auto *e=a->getAlignmentExpr()){o["expressionClass"]=e->getStmtClassName();o["expressionLocation"]=d.point(e->getBeginLoc());}
      }else if(auto *t=a->getAlignmentType()){o["type"]=t->getType().getAsString();}
      d.alignments.push_back(std::move(o));
    }
    return true;
  }
  bool VisitUnaryExprOrTypeTraitExpr(UnaryExprOrTypeTraitExpr *e){
    if(d.own(e->getBeginLoc())){
      j::Object o{{"role","unary-type-trait"},{"location",d.point(e->getBeginLoc())},{"end",d.point(e->getEndLoc())},{"argumentIsType",e->isArgumentType()}};
      
      d.references.push_back(std::move(o));
    }return true;
  }
  bool VisitGenericSelectionExpr(GenericSelectionExpr *e){
    if(!d.own(e->getBeginLoc()))return true;j::Array a;
    for(unsigned i=0;i<e->getNumAssocs();i++){
      if(auto *t=e->getAssocTypeSourceInfos()[i]){a.push_back(j::Object{{"type",t->getType().getAsString()},{"location",d.point(t->getTypeLoc().getBeginLoc())}});}
      else a.push_back(j::Object{{"default",true}});
    }
    d.generics.push_back(j::Object{{"location",d.point(e->getBeginLoc())},{"associations",std::move(a)}});return true;
  }
};
class Consumer : public ASTConsumer {
  Data &d;
public:
  explicit Consumer(Data &d):d(d){}
  void HandleTranslationUnit(ASTContext &c) override {Visitor(d).TraverseDecl(c.getTranslationUnitDecl());}
};
class CaptureDiagnostics : public DiagnosticConsumer {
  Data &d;std::unique_ptr<DiagnosticConsumer> previous;
public:
  CaptureDiagnostics(Data &d,std::unique_ptr<DiagnosticConsumer> previous):d(d),previous(std::move(previous)){}
  void HandleDiagnostic(DiagnosticsEngine::Level level,const Diagnostic &info) override {
    DiagnosticConsumer::HandleDiagnostic(level,info);if(previous)previous->HandleDiagnostic(level,info);
    llvm::SmallString<256> message;info.FormatDiagnostic(message);
    int severity=level==DiagnosticsEngine::Fatal?4:level==DiagnosticsEngine::Error?3:level==DiagnosticsEngine::Warning?2:1;
    d.diagnostics.push_back(j::Object{{"severity",severity},{"message",message.str().str()},{"location",d.point(info.getLocation())}});
  }
};
class Action : public ASTFrontendAction {
  Data d;
public:
  bool BeginSourceFileAction(CompilerInstance &ci) override {
    d.ci=&ci;ci.getDiagnostics().setClient(new CaptureDiagnostics(d,ci.getDiagnostics().takeClient()),true);
    ci.getPreprocessor().addPPCallbacks(std::make_unique<PP>(d));
    ci.getPreprocessor().setTokenWatcher([this](const Token &t){
      if(t.isAnnotation()){if(d.own(t.getLocation()))d.annotations.push_back(j::Object{{"kind",tok::getTokenName(t.getKind())},{"location",d.point(t.getLocation())}});return;}
      if(t.is(tok::eof)||!d.own(t.getLocation()))return;d.tokenCount++;
      if(d.tokens.size()<d.limit)d.tokens.push_back(d.token(t));else d.truncated=true;
    });return true;
  }
  std::unique_ptr<ASTConsumer> CreateASTConsumer(CompilerInstance &,llvm::StringRef) override {return std::make_unique<Consumer>(d);}
  void EndSourceFileAction() override {
    d.rawTokens();
    j::Object o{{"format","shi-clang-cpp"},{"version",1},{"compiler",getClangFullVersion()},
      {"valid",!d.ci->getDiagnostics().hasErrorOccurred()},{"tokens",std::move(d.tokens)},
      {"macros",std::move(d.macros)},{"declarations",std::move(d.declarations)},
      {"references",std::move(d.references)},{"types",std::move(d.types)},
      {"alignments",std::move(d.alignments)},{"generics",std::move(d.generics)},
      {"includes",std::move(d.includes)},{"statements",std::move(d.statements)},{"annotations",std::move(d.annotations)},{"pragmas",std::move(d.pragmas)},{"tokenCount",int64_t(d.tokenCount)},{"truncated",d.truncated}};
    o["fileInstances"]=std::move(d.fileInstances);o["definitions"]=std::move(d.definitions);o["ppEvents"]=std::move(d.ppEvents);
    o["semanticTypes"]=std::move(d.semanticTypes);o["typeSyntax"]=std::move(d.typeSyntax);
    o["astNodes"]=std::move(d.astNodes);o["originalTokens"]=std::move(d.originalTokens);o["skipped"]=std::move(d.skipped);o["sourceBuffers"]=std::move(d.sourceBuffers);o["diagnostics"]=std::move(d.diagnostics);o["fileDigests"]=std::move(d.fileDigests);o["symbols"]=std::move(d.symbols);
    o["provenanceCapabilities"]=j::Object{{"replacementBodies",true},{"userDefinitionTimeline",true},{"includeInstances",true},
      {"intermediateOperationGraph","unavailable"},{"completeOutputToExpansionBinding","unavailable"}};
    llvm::outs()<<j::Value(std::move(o))<<"\n";
  }
};
int main(int argc,const char **argv){
  if(argc<2)return 2;std::vector<std::string> flags;
  for(int i=2;i<argc;i++)flags.emplace_back(argv[i]);
  tooling::FixedCompilationDatabase db(".",flags);tooling::ClangTool tool(db,{argv[1]});
  return tool.run(tooling::newFrontendActionFactory<Action>().get());
}
