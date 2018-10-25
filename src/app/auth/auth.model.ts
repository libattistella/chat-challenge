export interface TokenResponse {
  token: string;
}

export interface TokenPayload {
  nickname: string;
  password: string;
}

export interface UserDetails {
  _id: string;
  nickname: string;
  exp: number;
  iat: number;
}
