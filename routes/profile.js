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
    res.render('pages/edit', { user: req.user });
});



module.exports = router;
