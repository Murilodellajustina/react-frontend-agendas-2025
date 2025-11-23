import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

export function login(email, senha) {
  return api.post("/usuarios/login", { email, senha });
}

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  return config;
});
