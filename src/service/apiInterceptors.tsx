import axios from 'axios';
import { baseUrl } from './config';
import { store } from '../redux/store';
import { refechUser, refresh_token } from './authService';

// Create an Axios instance
export const appAxios = axios.create({
    baseURL: baseUrl,
    timeout: 10000,
});

appAxios.interceptors.request.use(
    (config) => {
        const state = store.getState();
        const token = state.user.accessToken;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        console.error('Request Error:', error);
        return Promise.reject(error);
    }
);

appAxios.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        if (error.response && error.response.status === 401) {
            try {
                const newAccessToken = await refresh_token();
                error.config.headers.Authorization = `Bearer ${newAccessToken}`
                return axios(error.config);
            }
            catch (e) {
                console.log("Error while refresing token")
            }

        }
        console.error('Response Error:', error);
        return Promise.reject(error);
    }
);

