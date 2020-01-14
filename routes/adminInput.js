var express = require('express');
var router = express.Router();

/* GET admin page. */

router.get('/', function(req, res, next) {
    res.render('pages/adminInput', { user: req.user });
});

// router.post('/', function(req, res, next) {
//     res.render('pages/adminInput', { user: req.user });
// });

module.exports = router;