import axios from "axios";

const api = axios.create({
    baseURL: "https://localhost:7195/api",
    headers: {
        "Content-Type": "application/json; charset=utf-8",
    },
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

export default api;
