import axios from "axios";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;


const axiosInstanceWithoutToken = axios.create({
    baseURL: apiBaseUrl,
    timeout: 60000,
});

export { axiosInstanceWithoutToken };
