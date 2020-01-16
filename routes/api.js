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



/* UPDATE user profile. */
router.patch('/edit-profile', function(req, res, next) {
    console.log('in api.js');
    const item = {
        bio: req.body.bio
        //bio: req.body.data
    }
    console.log('this is the item', item);

    db.users.update(
        { bio: 'here is the update' },
        { where: { id: 1 } }
    )
    .then((item) => {
        console.log('then item', item);
        res.json(item);
    })
    .catch(err => {
        res.json(err);
    });
});
//     db.users.update(item)
//     //console.log('USERS')
//         .then((item) => {
//             res.json(item);
//         })
//         .catch(err => {
//             res.json(err);
//         });



module.exports = router;
