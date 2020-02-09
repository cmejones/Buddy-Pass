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
    res.render('pages/users', { user: req.user });  
});

router.get('/:id', function(req, res, next) {
    //let id = req.params.id;
    res.render('pages/users/id', { user: req.user})
})

module.exports = router;
