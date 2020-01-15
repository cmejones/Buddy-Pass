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

router.get('/edit', function (req, res, next) {
  res.render('pages/edit');
});


router.patch('/edit', function (req, res, next) {

    let data = {
      bio: req.body.bio,
      strengths: req.body.strengths
    };

  console.log(data);

  if(!req.body.bio) {
    return res.render('error', {
      message: 'No Content Provided',
      error: {
        status: 'You must provide some content to submit a new post',
        stack: null,
      }
    })
  } else {

    return db.users.update(data, { where: {user: req.user}})
        .then((user) => {
            res.json(user)
        })
        .catch(err => {
            done(err);
             });
  }
});




module.exports = router;
