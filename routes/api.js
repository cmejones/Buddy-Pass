var express = require('express');
var router = express.Router();
const db = require('../models');


//GET all functional areas 
router.get('/functional-area', function(req, res, next) {
    db.FunctionalAreas.findAll()
        .then(data => {
            res.json(data);
        })
})

//GET all skills
router.get('/skills', function(req, res, next) {
    db.skills.findAll()
        .then(data => {
            res.json(data);
        })
})

/* POST new skill. */
router.post('/skills', function(req, res, next) {
    const item = {
        funcArea: req.body.function, //this needs to be id
        skill: req.body.skill

    }
    console.log(item.skill, 'api.js')
    db.skills.create(item)
        .then((item) => {
            res.json(item);
        })
        .catch(err => {
            res.json(err);
        });
});

/* POST new function. */
router.post('/functional-area', function(req, res, next) {
    const item = {
        function: req.body.function
    }
    db.FunctionalAreas.create(item)
        .then((item) => {
            res.json(item);
        })
        .catch(err => {
            res.json(err);
        });
});

//GET user profile
router.get('edit-profile', (req, res) => {
    Users.findOne({include: [Skills]}).then((results) => {
    //Comments.findAll().then((results) => {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(results));
    });
});

/* UPDATE user profile. */
router.patch('/edit-profile', function(req, res, next) {
    console.log('in api.js');
    const item = {
        department: req.body.department,
        title: req.body.title,
        bio: req.body.bio,
        user_id: req.body.user_id
    }
    console.log('this is the item', item);

    db.users.update(
        { 
        department: req.body.department,
        title: req.body.title,
        bio: req.body.bio
        },
        { where: { id: req.body.user_id } }
    )
    .then((item) => {  
        console.log('then item', item);
        res.json(item);
    })
    .catch(err => {
        res.json(err);
    });
});

module.exports = router;
