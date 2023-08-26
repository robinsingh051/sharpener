const express = require('express');

const itemController = require('../controllers/item-controller');

const router = express.Router();

// /items => GET
router.get('/items', itemController.getItems);

// /items => POST
router.post('/items',itemController.postItem);

// /item/:id/:qty => PATCH
router.patch('/item/:id/',itemController.updateItem);

module.exports = router;
