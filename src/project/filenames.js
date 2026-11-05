export const safeFilename=name=>{
  const base=typeof name==='string'?name.split(/[\\/]/).at(-1):'source.c';
  return base&&!/[\0\r\n:]/.test(base)&&!['.','..'].includes(base)?base:'source.c';
};
