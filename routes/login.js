var express = require('express');
var router = express.Router();

/* GET home page. */

router.post('/', function(req, res, next) {
    console.log('posting on login!')

    res.render('pages/login', { user: req.user });
});

module.exports = router;
