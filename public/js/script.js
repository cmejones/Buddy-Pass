function createFunctionalArea(data) {
    return axios.post('/api/functional-area', data);
}

function createSkills(data) {
    return axios.post('/api/skills', data);
}

function profileUpdate(data) {
    return axios
        .patch('/api/edit-profile', data);
    //     .then(response => {
    //     console.log(response);
    // })
    //     .catch(err => {
    //         console.log(err);
    // });
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
