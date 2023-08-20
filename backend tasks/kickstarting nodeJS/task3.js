const arr= ['apple', 'oranges' , ' ', 'mango', ' ' , 'lemon'];
const newArr=arr.map((ele)=>{
    if(ele===' ')
        ele= 'empty string';
    return ele;
});
console.log(arr);
console.log(newArr);