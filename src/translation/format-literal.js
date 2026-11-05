// Decode only physical adjacent C string literals. Never evaluate a C expression.
export function literalFormat(tokens){
 let result='',encoding=null;
 if(!tokens.length)return null;
 for(const token of tokens){
  const m=/^(u8|u|U|L)?"([\s\S]*)"$/.exec(token.spelling);
  if(!m||token.kind!=='LITERAL')return null;
  const prefix=m[1]??'';
  if(prefix){if(encoding&&encoding!==prefix)return null;encoding=prefix;}
  const body=m[2];
  for(let i=0;i<body.length;i++){
   const c=body[i];if(c!=='\\'){result+=c;continue;}
   const tail=body.slice(++i),simple={'a':'\x07','b':'\b','f':'\f','n':'\n','r':'\r','t':'\t','v':'\v',"'":"'",'"':'"','?':'?','\\':'\\'};
   if(Object.hasOwn(simple,tail[0])){result+=simple[tail[0]];continue;}
   const escape=/^(?:([0-7]{1,3})|x([0-9a-fA-F]+)|u([0-9a-fA-F]{4})|U([0-9a-fA-F]{8}))/.exec(tail);
   if(!escape)return null;
   const value=parseInt(escape[1]??escape[2]??escape[3]??escape[4],escape[1]?8:16);
   if(value>0x10ffff||value>=0xd800&&value<=0xdfff)return null;
   // Byte escape values outside the ASCII range depend on the execution encoding.
   if((escape[1]||escape[2])&&value>127)return null;
   result+=String.fromCodePoint(value);i+=escape[0].length-1;
  }
 }
 return result.split('\0')[0];
}

