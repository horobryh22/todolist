import axios from 'axios';

export const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '9f5fc3ee-790f-410c-959d-2faeddcc9f8e',
    },
});
