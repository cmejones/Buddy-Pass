function createFunctionalArea(data) {
    return axios.post('/api/functional-area', data);
}

function createSkillAssociation(skillsData) {
    return axios.post('/api/user-skills', skillsData);
}
function createSkills(data) {
    return axios.post('/api/skills', data);
}

function profileUpdate(data) {
    return axios
        .patch('/api/edit-profile', data)
        .then(response => {
        console.log(response.data);
        window.location = '/profile';

    })
    .catch(err => {
            console.log(err);
    });
}

function profileDelete(data) {
    return axios
        .delete('/api/delete-profile' , data)
        .then(response => {
            alert('Your account has been deleted');
            window.location = '/';
        })
        .catch(err => {
            console.log(err);
        });
}

function logoutUser(data) {
    return axios
        .get('/profile/logout', data)
        .then(response => {
            console.log(response);
            window.location = '/';
        })
        .catch(err => {
            console.log(err);
        });
}


// //return functional areas
// const findFuncAreas = async function (funcAreaId) {
//     const area = await db.functionalareas.find({
//         where: {
//         id: funcAreaId
//         }
//     })
//     if (!area) {
//         return 'none found'
//     }
//     return area.dataValues
// }
//return user skills
// const findUserSkills = async function (userSkillsId) {
//     const skills = await db.users.find({
//         where: {
//         id: userSkillsId
//         }
//     })
//     if (!skills) {
//         return 'none found'
//     }
//     return skills.dataValues
// }

// ;(async () => {
//   // ...
//     const UserSkills = await findUserSkills(req.body.userSkillsId)
//     console.log(UserSkills)
//   // ...
// })()
