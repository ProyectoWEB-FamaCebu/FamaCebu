const BASE_URL = 'http://localhost:5000/';

const _fetch = async (Method, URL, data = '') => {

    if (Method == 'POST') {
        return await fetch(BASE_URL + URL, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(res => {
                if ((res.status == 401)) { } else { return res; }
            })
            .then(res => res.json());
    } else {
        if (Method == 'GET') {
            return await fetch(BASE_URL + URL + data, {
                method: 'GET',
            })
                .then(res => {
                    if (res.status == 401) {
                        return;
                    } else { return res }
                })
                .then(res => res ? res.json() : {});
        }
    }
}
