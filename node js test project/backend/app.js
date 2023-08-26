const express = require('express');
const bodyParser = require('body-parser');
const cors=require('cors');

const sequelize=require('./util/database');

const app = express();

const itemRoutes = require('./routes/item-routes');

app.use(bodyParser.json({ extended: false }));
app.use(cors());

app.use(itemRoutes);

sequelize.sync()
.then((result)=>{
    //console.log(result);
    app.listen(3000);
})
.catch((err)=>{
    console.log(err);
});