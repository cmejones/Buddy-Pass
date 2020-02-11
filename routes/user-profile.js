var express = require('express');
var router = express.Router();
const db = require('../models');
router.get('/', function(req, res, next) {
    //console.log('at user-profile');
    res.render('pages/user-profile');  
});
router.get('/:id', function(req, res, next) {
    let id = req.params.id; //this is where to dynamically pull in id
    db.users.findOne({ where: { id: id }})
        .then(data => {
            //console.log(data);
            res.render('pages/user-profile', { user: data }); //pass object data to the template
        })
})
module.exports = router;