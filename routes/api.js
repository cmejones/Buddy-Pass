var express = require('express');
var router = express.Router();
const db = require('../models');

router.get('/functional-area', function(req, res, next) {
    db.FunctionalAreas.findAll()
        .then(data => {
            res.json(data);
        })
})

/* GET home page. */
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

module.exports = router;
