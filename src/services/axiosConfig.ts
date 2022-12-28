import { Store } from "@reduxjs/toolkit";
import axios, {
    AxiosError,
    AxiosRequestConfig,
    AxiosResponse,
    AxiosInstance,
} from "axios";

export const LIMIT: number = 15;

const axiosConfig: AxiosInstance = axios.create({
    baseURL: "https://airbnb.cybersoft.edu.vn/api",
    headers: {
        tokenByClass:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAzNCIsIkhldEhhblN0cmluZyI6IjI3LzA0LzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY4MjU1MzYwMDAwMCIsIm5iZiI6MTY1MzU4NDQwMCwiZXhwIjoxNjgyNzAxMjAwfQ.WXYIKeb4x0tXpYflgrnKFbivOnuUdLmKcgl7Xr0MD3I",
    },
});

interface ErrorResponse {
    message: string;
}

export const setUpAxiosIntercepters = (
    store: Store,
    instance: AxiosInstance
) => {
    instance.interceptors.response.use(
        (response: AxiosResponse) => {
            return response.data;
        },
        (error: AxiosError<ErrorResponse>) => {
            return Promise.reject(error.response?.data.message);
        }
    );

    instance.interceptors.request.use((config: AxiosRequestConfig) => {
        if (config.headers) {
            if (store.getState().auth) {
                const { token } = store.getState().auth;
                if (token) {
                    config.headers.token = token;
                }
            }
        }

        return config;
    });
};

export default axiosConfig;
