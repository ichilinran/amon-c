// Stable result-side reason codes. Analysis JSON and vocabulary formats stay v1/v8.
export const REASON_DEFINITIONS={
 'postfix-boundary':['原文位置の制約','対応語の移動先を確定できず原文保持しています','マクロ展開後の補助表示で確認してください。原文上の後続の括弧を移動先として推測しません'],
 'alignment-argument-unconfirmed':['役割未判定','配置指定の引数内で解析情報を取得できない語を原文保持しています','この解析データでは配置指定の式・型参照が不足しています。新しいツールでの再解析と対象範囲を確認してください。綴りだけで補いません'],
 'reference-index-unavailable':['環境不足・非対応','補助の型名参照索引を利用できず、取得済みの解析情報だけで表示しています','更新した解析ツールとClangの版を確認してください。参照先を推測して置き換えません'],
 'generic-type-unconfirmed':['役割未判定','型選択の候補にある型名の参照先を確認できず原文保持しています','C原文の型名で確認してください。候補型の参照解析を広げる必要があります'],
 'assert-disabled':['評価しない引数','assertの条件は無効化され、評価・型解析されないため原文保持しています','解析時のassert定義を確認してください。条件内の未解決名を推測して訳しません'],
 'assert-unconfirmed':['役割未判定','assertの引数が式として解析されたことを確認できず原文保持しています','更新した解析ツールで再解析してください。無効化状態やSDKの定義を確認します'],
 'source-changed':['入力との不一致','原文が解析時から変わっています','元のCを再解析してJSONを読み込んでください'],
 'missing-input':['解析環境','解析に必要なヘッダ等が見つかりません','開発ヘッダ・includeの場所・対象環境を確認して再解析してください'],
 'sdk-unsupported':['解析環境','この解析処理系が機能を受理していません','対応する処理系・SDKでの解析条件を確認してください'],
 'compiler-diagnostic':['解析診断','本文を原文保持しています','診断内容と入力・解析条件を確認し、修正後に再解析してください'],
 'macro-user':['規則上の保持','利用者マクロの呼出しを原文保持しています','2.1のプロジェクト解析では、生成された構文を展開後の補助表示で確認できます。旧形式の場合は2.1用ツールで再解析してください'],
 'predefined-name':['役割未判定','定義済みの関数名情報を原文保持しています','新しい解析ツールで再解析し、この名前の出所情報と登録範囲を確認してください'],
 'standard-origin-unconfirmed':['役割未判定','登録名候補の定義元との対応を確定できず保持しています','新しい解析ツールで再解析し、ヘッダと対応範囲を確認してください'],
 'macro-builtin':['登録・出所の確認','定義済みマクロの名前を原文保持しています','登録範囲や再定義の有無を確認してください。綴りだけで標準の名前と決めません'],
 'macro-external':['役割未判定','ヘッダ由来のマクロを原文保持しています','定義元・解析情報・対応範囲を確認してください'],
 'macro-argument':['役割未判定','標準マクロの引数内を部分的に原文保持しています','引数の役割を確認できる範囲から翻訳を広げます'],
 'inactive-branch':['解析条件','選ばれなかった分岐の本文を保持しています','別の-D等の条件で読みたい場合は再解析してください'],
 'declaration-guide':['表示未実装','宣言の案内語を局所的に省いています','原文の型・名前・括弧で確認してください。案内の拡張対象です'],
 'untyped-parameters':['規則上の省略','型付きでない引数リストへ案内語を付けていません','C17の()を(void)と読み替えません。原文の宣言を確認してください'],
 'distributed-return':['規則上の省略','戻り値の型が分散するためﾆﾃを省いています','名前の前後にある型・括弧を一緒に読んでください'],
 'declaration-unsplit':['規則上の保持','型定義・出所等を含む複数宣言は分割していません','元の区切りと型のまとまりを確認してください'],
 'physical-spelling':['原文位置の制約','改行継続等で分かれた本文トークンを保持しています','字句の物理表記を保っています。通常の綴りに直した場合は再解析してください'],
 'for-header':['原文位置の制約','forの区切りを確定できず案内を省いています','原文の括弧と区切りを確認してください。マクロが区切りを作る場合は、2.1の展開後の補助表示でも確認できます'],
 'quick-needs-analysis':['解析経路の制約','簡易解析では本文の役割を確定できません','端末の解析JSONを読み込むと表示範囲を広げられます'],
 'quick-unsupported':['解析経路の制約','簡易解析の対応範囲外を原文保持しています','端末解析を試すか、保持した原文で確認してください'],
 'quick-uncertain':['解析診断','簡易解析で構文を確定できません','入力と解析器の対応範囲を確認してください。端末解析でも確かめられます'],
 'preprocessing-held':['前処理の確認','前処理の一部を保守的に保持しています','通知内容と指令の原文を確認してください'],
 'edit-conflict':['表示の整合性','表示の位置不整合により原文へ戻りました','入力と解析JSONを保存し、表示規則の確認対象にしてください'],
};
export function readingReason(code,ranges=[],message){
 const [category,title,action]=REASON_DEFINITIONS[code];
 return {code,category,message:message??title,action,ranges:ranges.map(r=>({start:r.start,end:r.end}))};
}
export function attachReasons(result,reasons=[]){
 const unique=new Map();for(const r of reasons)unique.set(JSON.stringify([r.code,r.message,r.ranges]),r);
 return {...result,reasons:[...unique.values()],partial:result.partial||unique.size>0};
}
export function reasonRangeAt(source,offset,tokens=[]){
 if(!Number.isInteger(offset)||offset<0||offset>source.length)return [];
 const token=tokens.find(t=>t.start<=offset&&offset<t.end);
 return [{start:token?.start??offset,end:token?.end??Math.min(source.length,offset+1)}];
}
