import axios from 'axios';

let TOKEN = '';

if (typeof window !== 'undefined') {
    TOKEN = localStorage.getItem('jwttoken');
}

console.log('TOKEN', TOKEN);

const headers = {
    Authorization: `Bearer ${TOKEN}`,
};

const instance = axios.create({
    baseURL: 'https://psycteamv2.azurewebsites.net/api',
    headers,
});

instance.interceptors.response.use(function (response) {
    const { data } = response;

    return data;
});

export default instance;
