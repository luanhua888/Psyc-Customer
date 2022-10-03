import axiosInstance from '../lib/axios';

class AbstractService {
    http = (method, url, data, options) => {
        return axiosInstance[method](url, data, options);
    };

    httpGET = (url, data, options) => {
        return this.http('get', url, { params: data }, options);
    };

    httpPOST = (url, data, options) => {
        return this.http('post', url, data, options);
    };

    httpPUT = (url, data, options) => {
        return this.http('put', url, data, options);
    };
}

export default AbstractService;
