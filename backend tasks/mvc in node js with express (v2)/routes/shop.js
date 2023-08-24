const path = require('path');

const express = require('express');

const productsController=require('../controllers/products');
const contactUsController=require('../controllers/contacts');
const successController=require('../controllers/success');

const router = express.Router();

router.get('/contacts', contactUsController.getContactUs);

router.post('/success', successController.getSuccess);

router.get('/',productsController.getProducts);

module.exports = router;
