import axios from "axios";

export const AXIOS_CLIENT = axios.create({
  baseURL: "http://localhost:8080/ecommerce",
});

AXIOS_CLIENT.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 403 && window.location.pathname !== "/auth/login") {
      localStorage.removeItem("token");
      window.location.href = "/auth/login";
    }
    return Promise.reject(error);
  },
);

AXIOS_CLIENT.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    console.log(token);

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);
