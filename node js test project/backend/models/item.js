const Sequelize=require('sequelize');

const sequelize=require('../util/database');

const User=sequelize.define('item',{
  id:{
    type:Sequelize.INTEGER,
    autoIncrement:true,
    allowNull:false,
    primaryKey:true
  },
  name:Sequelize.STRING,
  desc:{
    type:Sequelize.STRING,
    allowNull:false
  },
  price:{
    type:Sequelize.INTEGER,
    allowNull:false
  },
  qty:{
    type:Sequelize.INTEGER,
    allowNull:false
  }
})

module.exports=User;