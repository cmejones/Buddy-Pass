function createFunctionalArea(data) {
    return axios.post('/api/functional-area', data);
}

function apiGetFunctionalArea(successCallback, errorCallback) {
    axios.get(APP_URL + 'api/functionalArea', {})
        .then(successCallback)
        .catch(errorCallback)
}


function apiFunctionalArea(data, successCallback, errorCallback) {
    console.log('data in script.js', data);

    axios.post('/api/functionalArea', data )
        .then(successCallback)
        .catch(errorCallback);
}