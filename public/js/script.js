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
        //console.log(response.data);
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
            //alert('Your account has been deleted');
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
            //console.log(response);
            window.location = '/';
        })
        .catch(err => {
            console.log(err);
        });
}