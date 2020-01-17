function createFunctionalArea(data) {
    return axios.post('/api/functional-area', data);
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
            console.log(response.data);
            window.location = '/';
        })
        .catch(err => {
            console.log(err);
        });
}

function appLogout() {
    return axios
        .get('/logout')
        .then(response => {
            window.location = '/';
        })
        .catch(err => {
            console.log(err);
        });
}
