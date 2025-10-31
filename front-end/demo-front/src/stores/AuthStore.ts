class AuthStoreClass {
  private accessToken: string | null = null;

  setAccessToken(token: string) {
    this.accessToken = token;
  }

  getAccessToken(): string | null {
    return this.accessToken;
  }

  clear() {
    this.accessToken = null;
  }

  isAuthenticated(): boolean {
    return !!this.accessToken;
  }
}

export const AuthStore = new AuthStoreClass();
