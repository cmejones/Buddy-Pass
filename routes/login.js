var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log('Im here!')

    res.render('pages/login', { user: req.user });
});

router.post('/', function(req, res, next) {
    console.log('posting on login!')

    res.render('pages/login', { user: req.user });
});

module.exports = router;