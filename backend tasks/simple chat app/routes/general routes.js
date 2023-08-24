const express=require('express');
const router=express.Router();
const fs=require('fs');

router.get('/',(req,res)=>{
    const data=fs.readFileSync('msg.txt','utf8');
    res.send(`<p>${data}</p><form onSubmit='document.getElementById("username").value=localStorage.getItem("username");' action="/msg" method="POST">
    <input type="text" id="msg" name="msg">
    <input type="hidden" id="username" name="user">
    <button type="submit">send</button>`);
});

router.post('/msg',(req,res)=>{
    const msg=req.body.msg;
    const username=req.body.user;
    const data=`${username}: ${msg} `;
    fs.appendFileSync('msg.txt', data, 'utf8');
    res.redirect('/');
});

router.use((req,res,next)=>{
    res.status(404).send('<h1>Page not found!!!</h1>');
});

module.exports=router;