import axios from "axios";

let isRefreshing = false;
let refreshSubscribers = [];

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

function onRefreshed(newCsrfToken) {
  refreshSubscribers.forEach((cb) => cb(newCsrfToken));
  refreshSubscribers = [];
}

function addRefreshSubscriber(callback) {
  refreshSubscribers.push(callback);
}

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    const status = error?.response?.status;
    const msg = error?.response?.data?.erro || "";

    if (status !== 401) {
      return Promise.reject(error);
    }

    if (originalRequest._retry) {
      return Promise.reject(error);
    }
    originalRequest._retry = true;

    if (msg && !msg.toLowerCase().includes("token")) {
      return Promise.reject(error);
    }

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        addRefreshSubscriber((newCsrf) => {
          if (newCsrf) {
            originalRequest.headers["x-csrf-token"] = newCsrf;
          }
          resolve(api(originalRequest));
        });
      });
    }

    isRefreshing = true;

    try {
      const res = await api.post("/usuarios/refresh");

      const newCsrf = res.data?.csrfToken;
      if (newCsrf) {
        sessionStorage.setItem("csrf_token", newCsrf);
      }

      isRefreshing = false;
      onRefreshed(newCsrf);

      if (newCsrf) {
        originalRequest.headers["x-csrf-token"] = newCsrf;
      }

      return api(originalRequest);
    } catch (refreshError) {
      isRefreshing = false;
      refreshSubscribers = [];

      sessionStorage.removeItem("csrf_token");
      window.location.href = `${import.meta.env.BASE_URL}`;
      return Promise.reject(refreshError);
    }
  }
);
