import axios from "axios";

export const api = axios.create({
  baseURL: "https://desenvolvimento-web-2025-hlq6.onrender.com/api",
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const csrf = sessionStorage.getItem("csrf_token");
  if (csrf) config.headers["x-csrf-token"] = csrf;
  return config;
});

export function login(email, senha) {
  return api.post("/usuarios/login", { email, senha });
}
