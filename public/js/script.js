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


function getAllUsers(data) {
    return axios
    .get('/api/users', data)
    .then(response => {
        console.log('user data', response.data);

        response.data.forEach(function (data) {
            var listUsers = document.getElementById("userList"); 
                let user = 
                `
                    <h3>${data.firstName}</h3>
                    <div>${data.createdAt}</div>
                    <div>Email: ${data.email}</div>
                `;

            var listUser = document.createElement('div');
            listUsers.append(listUser);
            listUser.append(user);
            console.log(user, 'email');
        });

    })
    .catch(err => {
        console.log(err);
    });
}

// function createUserList(email) {
//     $('#userList').append(email);
//         console.log('app', email);
// }
// function createUserList(data) {
//     console.log(data, 'user data');
//     let user = `
//         <div class="card card-body bg-light mb-2">
//             <h3>${data.firstName}</h3>
//             <div>${data.createdAt}</div>
//             <div>Email: ${data.email}</div>

//         </div>
//     `;
//     return user;

// }


