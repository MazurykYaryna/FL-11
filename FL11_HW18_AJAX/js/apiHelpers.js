const host = 'https://jsonplaceholder.typicode.com/';

export const fetchData = (url, method, data = null) => {
    let headers = {
        'Content-Type': 'application/json',
    };

    headers = {
        ...headers,
    };

    const options = { method, headers };
    if (data) {
        options.body = JSON.stringify(data);
    }
    return sendAsync(url, options);
}


function sendAsync(url, options) {
    return new Promise((resolve, reject) => {
        fetch(`${host}${url}`, options)
            .then((response) => {
                if (response) {
                    return response.json();
                }
                return console.error(response && response.message);
            })
            .catch(function (error) {
                console.error(error);
            })
            .then((response) => {
                if (response) {
                    return resolve(response);
                }
                console.error(response && response.message);
                return reject(response);
            });
    });
}