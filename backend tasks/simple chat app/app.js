const express=require('express');
const bodyParser=require('body-parser');


const loginRoutes=require('./routes/login routes')
const generalRoutes=require('./routes/general routes')

const app=express();

app.use(bodyParser.urlencoded({extended:false}));

app.use('/login',loginRoutes);
app.use(generalRoutes);


app.listen(3000);