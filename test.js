async function todo(){
  console.log('a');
  console.log('b');
  let msg1=await new Promise((res,rej)=>{
    setTimeout(()=>{
      res('c');
    },1000);
  });
  console.log(msg1);
  let msg2=await new Promise((res,rej)=>{
    setTimeout(()=>{
      res('d');
    },0);
  });
  console.log(msg2);
  console.log('e');
}
todo();