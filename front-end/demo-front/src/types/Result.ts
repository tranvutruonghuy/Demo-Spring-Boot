export interface Result<T = any> {
  result?: T;
  errors?: any[];
  isSuccess: boolean;
  code?: number;
  message?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface LoginResponse {
  authenticate: boolean;
  tokens: Token;
  user: User;
}

export interface Token {
  accessToken: string;
  refreshToken: string;
}
