import { AuthStore } from "@/stores/AuthStore";
import apiClient, { REFRESH_TOKEN_URL } from "./apiClient";
import NetworkService from "./NetworkService";
import { LoginResponse } from "@/types/Result";

interface User {
  id: string;
  email: string;
  name: string;
}

export class AuthService {
  static async login(
    username: string,
    password: string
  ): Promise<string> {
    try {
      // const response = await apiClient.post("/api/Account/login", {
      //   email,
      //   username: email,
      //   password,
      // });
      const response = await NetworkService.requestJson({
        method: "POST",
        url: "/api/authentication/v1/login",
        // url: "/api/Account/login",
        // data: {
        //   email,
        //   username: email,
        //   password,
        // },
        data: {
          username,
          password,
        },
      });

      console.log(response)

      const accessToken = response.result?.result?.tokens?.accessToken;

      console.log(accessToken)
      

      if (!accessToken) {
        throw new Error("No access token received from server");
      }

      AuthStore.setAccessToken(accessToken);

      return accessToken;
    } catch (error) {
      console.error("[AUTH SERVICE] Login failed:", error);
      throw error;
    }
  }

  static async refreshToken(): Promise<string> {
    try {
      const response = await apiClient.post(REFRESH_TOKEN_URL);

      const accessToken = response.data;

      if (!accessToken || typeof accessToken !== "string") {
        throw new Error("No access token received from refresh endpoint");
      }

      return accessToken;
    } catch (error) {
      console.error("[AUTH SERVICE] Token refresh failed:", error);
      throw error;
    }
  }

  static async logout(): Promise<void> {
    try {
      await apiClient.post("/api/Account/logout");
    } catch (error) {
      console.error("[AUTH SERVICE] Logout API call failed:", error);
    } finally {
      AuthStore.clear();
    }
  }

  static async getCurrentUser(): Promise<User> {
    try {
      const response = await apiClient.get("/api/Account/me");
      return response.data;
    } catch (error) {
      console.error("[AUTH SERVICE] Get current user failed:", error);
      throw error;
    }
  }

  static isAuthenticated(): boolean {
    return AuthStore.isAuthenticated();
  }
}
