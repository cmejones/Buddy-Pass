var express = require('express');
var router = express.Router();
const db = require('../models');

/* GET admin page. */
router.get('/', function(req, res, next) {
    res.render('pages/adminInput', { user: req.user });
});


module.exports = router;