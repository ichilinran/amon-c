import {rangesOverlap,rangeContains} from './source-index.js';

// Do not reconstruct a preprocessor from source spelling. Semantic protection
// comes from recorded use sites, skipped ranges and include-instance views.
export function createPreprocessingContext(snapshot,directives=[]) {
  const excluded=[...snapshot.skipped,...directives];
  const uses=snapshot.keywordMacroUses===undefined?null:new Set(snapshot.keywordMacroUses.map(m=>`${m.start}:${m.end}:${m.name}`));
  const oldNames=new Set(snapshot.keywordMacroNames??[]);
  const base={
    excluded,
    isExcluded:range=>excluded.some(other=>rangesOverlap(range,other)),
    keywordProtected:token=>uses===null?oldNames.has(token.spelling):uses.has(`${token.start}:${token.end}:${token.spelling}`),
  };
  return {...base,forMacros(macros,{expressionMacros=new Set(),argumentRegions=[]}={}) {
    return {...base,macros,
      owners:token=>macros.filter(macro=>rangeContains(macro,token)),
      intersecting:range=>macros.filter(macro=>rangesOverlap(macro,range)),
      ownerAllows:(macro,token)=>expressionMacros.has(macro.id)||argumentRegions.some(region=>region.macro.id===macro.id&&rangeContains(region,token)),
      opaqueOverlap:(range,recognized)=>macros.some(macro=>rangesOverlap(range,macro)&&!recognized.has(macro.id)),
    };
  }};
}

// Physical #define bodies are not use sites. Keep their conservative display
// policy separate, including names written in non-selected source branches.
export function directiveMacroPolicy(directives,keywordMacroNames) {
  const names=new Set(keywordMacroNames??[]);
  for(const directive of directives)if(directive.name==='define'&&directive.parts[2]?.kind==='identifier')names.add(directive.parts[2].canonical);
  return {names,bodySafe:!directives.some(d=>d.name==='include')||keywordMacroNames!==null};
}
export function standardOrigin(reference,entry) {
  return reference?.location.spelling.system&&entry?.headers.some(header=>(reference.standardHeaders??[(reference.location.spelling.file||'').split(/[\\/]/).at(-1)]).includes(header));
}
