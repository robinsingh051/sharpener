const express=require('express');

const router=express.Router();

router.get('/add-product',(req,res)=>{
    res.send('<form action="/admin/add-product" method="POST" ><input type="text" name="title"><input type="number" name="quantity"><button type="submit">add product</button>');
});
router.post('/add-product',(req,res)=>{
    console.log(req.body.title);
    console.log(req.body.quantity);
    res.redirect('/');
});

module.exports=router;