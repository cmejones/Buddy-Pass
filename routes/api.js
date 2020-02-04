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

//GET all userSkills 
router.get('/user-skills', function(req, res, next) {
    db.users.findAll({ //need findAll instead of findOne to search all rows of the userSkills table
        where: {
            id: req.user.id
        },
        include: [{ all: true, nested: true }]
    })
        .then(data => {
            res.json(data);
        })
})


/* POST new skill. */
router.post('/skills', function(req, res, next) {
    const item = {
        funcArea: req.body.functional_area,
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

/* POST new functional area. */
router.post('/functional-area', function(req, res, next) {
    const item = {
        functional_area: req.body.functional_area
    }
    db.FunctionalAreas.create(item)
        .then((item) => {
            res.json(item);
        })
        .catch(err => {
            res.json(err);
        });
});

/* POST new skill association. */
router.post('/user-skills', function(req, res, next) {
    const item = {
        skills_id: req.body.skills_id,
        // weaknesses_id: req.body.weakness_id,
        // goals_id: req.body.goal_id,
        user_id: req.body.user_id
    }
    //need to add code to separate out each checkbox to individual row :sequelize:literal?
    //create function to check if skill is already selected
    //update model so user can belongsTo userSkills, not hasOne
    db.userSkills.create(item)
        .then((item) => {
            console.log(item, 'updated skills');
            res.json(item);
        })
        .catch(err => {
            res.json(err);
        });
});

//GET user profile
router.get('/profile', (req, res) => {
    Users.findOne().then((results) => {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(results));
    });
});

//GET user EDIT profile
router.get('/edit-profile', (req, res) => {
    Users.findOne().then((results) => {
 //   Users.findOne({include: [Skills]}).then((results) => { //need this to find skills from other table
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
        communication: req.body.communication,
        interests: req.body.interests,
        favorite_job_tasks: req.body.favorite_job_tasks,
        to_learn: req.body.to_learn,
        user_id: req.body.user_id
    }
    console.log('this is the item', item);

    db.users.update(
        { 
        department: req.body.department,
        title: req.body.title,
        bio: req.body.bio,
        communication: req.body.communication,
        interests: req.body.interests,
        favorite_job_tasks: req.body.favorite_job_tasks,
        to_learn: req.body.to_learn,
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

// DELETE profile+
router.delete('/delete-profile', function(req, res, next) {

    db.users.destroy({
        where: { id: req.user.id }
    })
        .then((user) => {
            res.json(user);
        })
        .catch(err => {
            res.json(err);
        });
});

module.exports = router;
