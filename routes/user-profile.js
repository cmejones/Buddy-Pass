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
    console.log('at user-profile');
    res.render('pages/user-profile', { user: req.user });  
});

router.get('/:id', function(req, res, next) {
    console.log(req.params.id, 'id in user-profile');
    let id = req.params.id;
    console.log('another hello from user-profile.js');
    res.render('pages/user-profile/:id' , { id: id})
    console.log(id,'id again');
})

module.exports = router;