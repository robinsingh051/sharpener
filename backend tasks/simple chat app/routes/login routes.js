const express=require('express');
const router=express.Router();

router.get('/',(req,res)=>{
    res.send('<form onsubmit="localStorage.setItem(`username`, document.getElementById(`username`).value)" action="/login" method="POST"><input id="username" type="text" name="username"><button type="submit">add</button></form>');
});

router.post('/',(req,res)=>{
    res.redirect('/');
});

module.exports=router;