async function xyz(){
  console.log('a');

  console.log('b');

  const msg1=await new Promise((res,rej)=>{
    setTimeout(() => res('c'), 3000);
  }) 
  console.log(msg1);

  const msg2=await new Promise((res,rej)=>{
    setTimeout(() => res('d'), 0);
  }) 
  console.log(msg2);

  console.log('e');
}
xyz();