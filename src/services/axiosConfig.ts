import { Store } from "@reduxjs/toolkit";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, AxiosInstance } from "axios";

export const LIMIT: number = 15;

const axiosConfig: AxiosInstance = axios.create({
  baseURL: "https://airbnb.cybersoft.edu.vn/api",
  headers: {
    tokenByClass:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAyMiIsIkhldEhhblN0cmluZyI6IjMwLzExLzIwMjIiLCJIZXRIYW5UaW1lIjoiMTY2OTc2NjQwMDAwMCIsIm5iZiI6MTY0MTgzNDAwMCwiZXhwIjoxNjY5OTE0MDAwfQ.mTJaYLlwFuAG-SiC8fUlH-taW8wV0VAASxdCPf54RX8",
  },
});

interface ErrorResponse {
  message: string;
}

export const setUpAxiosIntercepters = (store: Store, instance: AxiosInstance) => {
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
