import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-building-app-98f8b.firebaseio.com/'
});

export default instance;