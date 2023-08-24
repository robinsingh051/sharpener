const express=require('express');
const bodyParser=require('body-parser');
const fs=require('fs');

const app=express();

app.use(bodyParser.urlencoded({extended:false}));

app.get('/',(req,res)=>{
    const data=fs.readFileSync('msg.txt','utf8');
    res.send(`<p>${data}</p><form onSubmit='document.getElementById("username").value=localStorage.getItem("username");' action="/msg" method="POST">
    <input type="text" id="msg" name="msg">
    <input type="hidden" id="username" name="user">
    <button type="submit">send</button>`);
});

app.post('/msg',(req,res)=>{
    const msg=req.body.msg;
    const username=req.body.user;
    console.log(msg,username);
    const data=`${username}: ${msg} `;
    fs.appendFileSync('msg.txt', data, 'utf8');
    res.redirect('/');
});

app.get('/login',(req,res)=>{
    res.send('<form onsubmit="localStorage.setItem(`username`, document.getElementById(`username`).value)" action="/login" method="POST"><input id="username" type="text" name="username"><button type="submit">add</button></form>');
});

app.post('/login',(req,res)=>{
    res.redirect('/');
})

app.listen(3000);