function createFunctionalArea(data) {
    return axios.post('/api/functional-area', data);
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