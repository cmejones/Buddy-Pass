function createFunctionalArea(data) {
    return axios.post('/api/functional-area', data);
}

// function profileUpdate() {
//
//     const bio = document.getElementById('bio').value;
//     console.log(bio);
//
//     return axios
//         .patch('/edit', bio);
// }

function profileUpdate() {
   alert('update button clicked!');

    const bio = document.getElementById('bio').value;

    return axios.patch('/profile/edit', {
            params: {
                bio: bio
            }
        })
        // .then( response => console.log(response));
}