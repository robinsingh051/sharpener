const express=require('express');
const bodyparser=require('body-parser');

const app=express();

app.use(bodyparser.urlencoded({extended:false}));

app.get('/add-product',(req,res)=>{
    res.send('<form action="/add-product" method="POST" ><input type="text" name="title"><input type="number" name="quantity"><button type="submit">add product</button>');
});
app.post('/add-product',(req,res)=>{
    console.log(req.body.title);
    console.log(req.body.quantity);
    res.redirect('/');
});
app.get('/',(req,res)=>{
    res.send('<h1>Hello from express app</h1>');
});

app.listen(3000);