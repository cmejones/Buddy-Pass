var express = require('express');
var router = express.Router();
const db = require('../models');

router.get('/functional-area', function(req, res, next) {
    db.FunctionalAreas.findAll()
        .then(data => {
            res.json(data);
        })
})



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
    .then((item) => {  //what else can this promise be since I don't want to return the item
        console.log('then item', item);
        res.json(null);
    })
    .catch(err => {
        res.json(err);
    });
});

// DELETE profile
router.delete('/delete-profile', function(req, res, next) {

    const user_id = req.body.user_id;

    db.users.destroy({
        where: { id: req.body.user_id }
    })
        .catch(err => {
            res.json(err);
        });
});


module.exports = router;
