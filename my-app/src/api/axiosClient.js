import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    timeout: 300000,
});

instance.interceptors.request.use(
    (response) => {
        return response.data;
    },
    (error) => {
        console.log(error);
    }
);

export default instance;
