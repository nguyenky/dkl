import axios from 'axios';
import { useMainStore } from './main.store';

const instance = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/`,
});

instance.interceptors.request.use((config) => {
    config.headers.Accept = 'application/json';
    config.headers['Content-Type'] = 'application/json';
    config.params ??= {};
    const main = useMainStore();

    if (main.context) {
        main.context.forEach((value: string, key: string) => {
            config.params[key] = value;
        });
    }

    return config;
});

export default instance;
