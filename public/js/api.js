//var app_url = 'http://localhost:3000/';

function createFunctionalArea (data) {
    console.log(data, 'api data');

    let item = req.data;
    db.FunctionalAreas.create(item).then(() => {
        console.log('success');
    }
)}