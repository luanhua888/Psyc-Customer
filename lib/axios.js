import axios from 'axios';

let TOKEN = '';

if (typeof window !== 'undefined') {
    TOKEN = localStorage.getItem('jwttoken');
}

const headers = {
    Authorization: `Bearer ${TOKEN}`,
};

const instance = axios.create({
    baseURL: 'https://www.psychologicalcounselingv1.somee.com/api/',
    headers,
});

instance.interceptors.response.use(function (response) {
    const { data } = response;

    return data;
});

export default instance;
