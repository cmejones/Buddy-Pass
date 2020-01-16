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
const users = require('../models/users');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

/* GET home page. */

router.get('/', function(req, res, next) {
    res.render('pages/profile', { user: req.user });
});

router.get('/edit', function(req, res, next) {
    res.render('pages/edit');
});

router.patch('/edit', function(req, res, next) {

    const bio = req.body.params.bio;

    console.log('this is the item from profile.js', bio);

    db.users.update(
        { bio: bio}, {
            where: { id: 1 }
        })
        .then(() => {
            res.render('pages/profile')
        })
        // .catch(err => {
        //     res.json(err);
        // });
});

module.exports = router;
