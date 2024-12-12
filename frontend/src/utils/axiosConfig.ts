import axios from "axios";
import { getAccessToken } from "@/helpers/auth";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;

const axiosInstance = axios.create({
    baseURL: apiBaseUrl,
    timeout: 60000,
});
axiosInstance.interceptors.request.use(
    config => {
        const accessToken = getAccessToken();
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    },
);

export default axiosInstance;
