import axios from 'axios';

export function req(options) {
    return new Promise((resolve, reject) => {
        // axios.defaults.withCredentials = true;
        const instance = axios.create({
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            timeout: 1000 * 10
        });
        instance(options)
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                console.log(error.response)
                if (error.response) {
                    if (error.response.data.code) {
                        reject(error.response.data)
                    } else {
                        reject({
                            msg: error.response.data,
                            code: error.response.status
                        })
                    }
                } else {
                    reject({
                        msg: '网络请求异常',
                        code: -1
                    });
                }
            })
    });
}
