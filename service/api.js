import {req} from './request.js';

export function axios(url,method,withCredentials,data,headers,params) {
    let options = {
        url: (process.env.NODE_ENV === 'production' ? '' : '')+url,
        method: method ? method : 'GET'
    };
    if (withCredentials === undefined) {
        options['withCredentials'] = false;
    } else {
        options['withCredentials'] = withCredentials;
    }
    if (data != undefined && Object.keys(data).length > 0) {
        options['data'] = data;
    }
    if (headers != undefined && headers !== '') {
        options['headers'] = headers; // {key:value}
    }
    if (params != undefined && Object.keys(params).length > 0) {
        options['params'] = params;
    }
    return req(options);
}