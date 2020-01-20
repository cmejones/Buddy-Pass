const config = {
    host: 'localhost',
    port: 5432,
    database: 'buddy_pass',
    user: 'postgres',
    password: ''
};

var express = require('express');
var router = express.Router();
const db = require('../config/config');
require('../models/users');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;


router.get('/', function(req, res, next) {
    res.render('pages/profile', { user: req.user });  
});

router.get('/edit', function(req, res, next) {
    res.render('pages/edit', { user: req.user });
});

// router.patch('/edit', function(req, res, next) {

//     let data = {
//         bio: req.body.bio
//     };
// });

/* LOGOUT profile */
router.get('/logout', function(req, res, next) {

    console.log("I am Logout");
    req.logout();
    res.json({
        status: "logout",
        msg:"Please Log In again"
    });

});





module.exports = router;
