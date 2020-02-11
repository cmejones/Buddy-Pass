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
    //res.render('pages/user-profile', { user: req.user });  
    res.render('pages/user-profile');  
});

router.get('/:id', function(req, res, next) {
   // console.log(req.params.id, 'id in user-profile');
    let id = req.params.id;
    //let id = 3;
    console.log('hello from user-profile.js');
    res.render('pages/user-profile/:id') //to load the template; template not rendering 
    console.log ('test');
})

// //GET one user
//     router.get('/:id', function(req, res, next) {
//         console.log('in user-profile.js');
//         //console.log('response', req);
//         //console.log('user-profile.js id',req.params.id);
//         let id = req.params.id; //this is where to dynamically pull in id
//         //let id = 3;
//         console.log('id', id); //correct id is here

//             db.users.findOne({ where: {id: id }})
//             .then(data => {
//                 res.json(data); 
//                 console.log('BANG');   //db function not running    
//             })
//     })

        // db.users.findAll({ where: {id: id}  }).then((results) => {
        //     console.log(results, 'results from user-profile.js');
        //     if(results.id = id) {
        //         res.setHeader('Content-Type', 'application/json');
        //         res.end(JSON.stringify(results));
        //         // res.render('pages/user-profile/:id', { id: id})
        //         res.render('pages/user-profile/:id', {id: id})  
        //     console.log ('test');

        //     } else {
        //         res.status(434).send('user not found');
        //     }

        // })

    // });

module.exports = router;