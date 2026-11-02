// One coordinate contract: UTF-8 bytes at compiler boundaries, UTF-16 units at
// display boundaries. Offsets inside a scalar are never rounded or clamped.
const encoder=new TextEncoder();
export function createSourceBoundaries(text) {
  const bytes=[0],units=[0];let b=0,u=0;
  for(const char of text) {
    const scalar=char.codePointAt(0);
    if(scalar>=0xd800&&scalar<=0xdfff)throw new Error('invalid-unicode-scalar');
    b+=encoder.encode(char).length;u+=char.length;bytes.push(b);units.push(u);
  }
  return {bytes,units,length:b};
}
export function boundaryIndex(values,value) {
  if(!Number.isSafeInteger(value)||value<0)return -1;
  let lo=0,hi=values.length-1;
  while(lo<=hi) {
    const mid=(lo+hi)>>1;
    if(values[mid]===value)return mid;
    if(values[mid]<value)lo=mid+1;else hi=mid-1;
  }
  return -1;
}
export function byteOffsetToUTF16(map,byte) {
  const index=boundaryIndex(map.bytes,byte);
  if(index<0)throw new Error('not-utf8-boundary');
  return map.units[index];
}
export function utf16OffsetToByte(map,unit) {
  const index=boundaryIndex(map.units,unit);
  if(index<0)throw new Error('not-unicode-boundary');
  return map.bytes[index];
}
export function createSourceCoordinates(source) {
  const map=createSourceBoundaries(source),lineStarts=[0],lineScalars=[0];
  for(let i=1;i<map.units.length;i++)if(source[map.units[i]-1]==='\n') {
    lineStarts.push(map.units[i]);lineScalars.push(i);
  }
  const unitForByte=byte=>{
    const at=boundaryIndex(map.bytes,byte);
    return at<0?undefined:map.units[at];
  };
  const lineColumn=unit=>{
    const scalar=boundaryIndex(map.units,unit);
    if(scalar<0)throw new Error('not-unicode-boundary');
    let lo=0,hi=lineStarts.length;
    while(lo<hi){const mid=(lo+hi)>>1;if(lineStarts[mid]<=unit)lo=mid+1;else hi=mid;}
    const line=lo-1;
    return {line:line+1,column:scalar-lineScalars[line]+1};
  };
  return {...map,unitForByte,lineColumn,byteToUTF16:byte=>byteOffsetToUTF16(map,byte),utf16ToByte:unit=>utf16OffsetToByte(map,unit)};
}
