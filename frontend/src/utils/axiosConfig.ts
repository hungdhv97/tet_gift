import axios from "axios";
import { getAccessToken } from "@/helpers/auth";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;

const axiosInstanceWithToken = axios.create({
    baseURL: apiBaseUrl,
    timeout: 60000,
});
axiosInstanceWithToken.interceptors.request.use(
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

const axiosInstanceWithoutToken = axios.create({
    baseURL: apiBaseUrl,
    timeout: 60000,
});

export { axiosInstanceWithToken, axiosInstanceWithoutToken };
