import axios from "axios";
import Cookies from 'universal-cookie';
import { API_URL } from "../config";

const cookies = new Cookies();

function getToken() {
    const token = cookies.get("token");

    return token ? `Bearer ${token}` : null;
}

const api = axios.create({
    baseURL: API_URL,
});

api.interceptors.request.use(
    function (config) {
        config.headers.authorization = getToken();
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);
api.interceptors.response.use(
    function (config) {
        return config;
    },
    function (error) {
        return Promise.reject(error.response.data);
    }
);
export default api;
