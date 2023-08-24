const path = require('path');

const express = require('express');

const rootDir = require('../utils/path');

const router = express.Router();

router.get('/contacts', (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'contacts.html'));
  });

router.post('/contacts', (req, res, next) => {
    console.log(req.body.name,req.body.email);
    res.sendFile(path.join(rootDir, 'views', 'success.html'));
});

router.get('/', (req, res, next) => {
  res.sendFile(path.join(rootDir, 'views', 'shop.html'));
});

module.exports = router;
