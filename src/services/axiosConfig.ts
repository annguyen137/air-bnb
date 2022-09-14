import axios, { AxiosError } from "axios";

export const LIMIT: number = 15;

const axiosConfig = axios.create({
  baseURL: "https://airbnb.cybersoft.edu.vn/api",
  headers: {
    tokenByClass:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAyMiIsIkhldEhhblN0cmluZyI6IjMwLzExLzIwMjIiLCJIZXRIYW5UaW1lIjoiMTY2OTc2NjQwMDAwMCIsIm5iZiI6MTY0MTgzNDAwMCwiZXhwIjoxNjY5OTE0MDAwfQ.mTJaYLlwFuAG-SiC8fUlH-taW8wV0VAASxdCPf54RX8",
  },
});

interface ErrorResponse {
  message: string;
}

axiosConfig.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error: AxiosError<ErrorResponse>) => {
    return Promise.reject(error.response?.data.message);
  }
);

axiosConfig.interceptors.request.use((config) => {
  if (config.headers) {
  }

  return config;
});

export default axiosConfig;
