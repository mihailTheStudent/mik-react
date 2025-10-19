export type TLoginRequest = {
  email: string;
  password: string;
};

export type TLoginResponse = {
  success: boolean;
  accessToken: string;
  refreshToken: string;
  user: {
    email: string;
    name: string;
  };
};

export type TRegisterRequest = {
  email: string;
  password: string;
  name: string;
};

export type TRegisterResponse = TLoginResponse;

export type TLogoutRequest = {
  token: string;
};

export type TLogoutResponse = {
  success: boolean;
  message: string;
};

export type TRefreshTokenRequest = {
  token: string;
};

export type TRefreshTokenResponse = {
  success: boolean;
  accessToken: string;
  refreshToken: string;
};
