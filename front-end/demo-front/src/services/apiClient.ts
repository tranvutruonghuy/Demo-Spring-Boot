import axios, {
  AxiosError,
  type AxiosInstance,
  InternalAxiosRequestConfig,
} from "axios";

import { AuthService } from "./AuthService";
import { AuthStore } from "@/stores/AuthStore";

// const BASE_URL = "https://localhost:5026/";
const BASE_URL = "http://10.60.0.134:8080";
// export const REFRESH_TOKEN_URL = "api/Account/refresh-token";
export const REFRESH_TOKEN_URL = "/api/authentication/v1/refresh";

const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  withCredentials: true,
});

// ============= REQUEST INTERCEPTOR =============
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    console.log("Gửi request:", config.url);
    console.log("WithCredentials:", config.withCredentials);
    console.log("Cookies hiện có:", document.cookie);
    const token = AuthStore.getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ============= RESPONSE INTERCEPTOR =============
let isRefreshing = false;
let failedQueue: {
  resolve: (value?: unknown) => void;
  reject: (reason?: any) => void;
}[] = [];

const processQueue = (error: any, token?: string) => {
  failedQueue.forEach((p) => (error ? p.reject(error) : p.resolve(token)));
  failedQueue = [];
};

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as any;

    if (!error.response || !originalRequest) {
      return Promise.reject(error);
    }

    const is401 = error.response.status === 401;
    const isRefreshCall = (originalRequest?.url as string)?.includes(
      REFRESH_TOKEN_URL
    );

    // Nếu là 401 và không phải call refresh-token và chưa retry
    if (is401 && !isRefreshCall && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        // Nếu đang refresh, thêm request vào queue
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: async () => {
              try {
                const token = AuthStore.getAccessToken();
                if (token) {
                  originalRequest.headers.Authorization = `Bearer ${token}`;
                }
                const response = await apiClient(originalRequest);
                resolve(response);
              } catch (err) {
                reject(err);
              }
            },
            reject,
          });
        });
      }

      // Bắt đầu refresh
      isRefreshing = true;

      try {
        const newToken = await AuthService.refreshToken();

        if (!newToken) {
          throw new Error("No token returned from refresh-token");
        }

        AuthStore.setAccessToken(newToken);

        originalRequest.headers.Authorization = `Bearer ${newToken}`;

        processQueue(null, newToken);

        return apiClient(originalRequest);
      } catch (refreshErr) {
        console.error(
          "[AUTH] Refresh thất bại, cần đăng nhập lại:",
          refreshErr
        );

        AuthStore.clear();

        processQueue(refreshErr, undefined);

        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }

        return Promise.reject(refreshErr);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
