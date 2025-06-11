import axios from "axios";

export const AXIOS_CLIENT = axios.create({
    baseURL: "http://192.168.56.101:8080/ecommerce",
    headers: {"Access-Control-Allow-Origin": "http://localhost:5173"}
});

AXIOS_CLIENT.interceptors.response.use(
    (response) => response,
    (error) => {
        const isAuthRoute = window.location.pathname.startsWith("/auth/");
        if (error.response.status === 403 && !isAuthRoute) {
            localStorage.removeItem("token");
            window.location.href = "/auth/login";
        }
        return Promise.reject(error);
    },
);

AXIOS_CLIENT.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");

        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error),
);
