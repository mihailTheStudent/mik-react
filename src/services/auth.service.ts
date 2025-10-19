import { request } from './api.service';

import type {
  TLoginRequest,
  TLoginResponse,
  TRegisterRequest,
  TRegisterResponse,
  TLogoutRequest,
  TLogoutResponse,
  TRefreshTokenRequest,
  TRefreshTokenResponse,
} from '@/utils/auth.types';

const BASE_URL = 'auth';

const POST_LOGIN_URL = `${BASE_URL}/login`;
const POST_REGISTER_URL = `${BASE_URL}/register`;
const POST_LOGOUT_URL = `${BASE_URL}/logout`;
const POST_REFRESH_TOKEN_URL = `${BASE_URL}/token`;

export function loginApi(body: TLoginRequest): Promise<TLoginResponse> {
  return request<TLoginResponse>(POST_LOGIN_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(body),
  });
}

export function registerApi(body: TRegisterRequest): Promise<TRegisterResponse> {
  return request<TRegisterResponse>(POST_REGISTER_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(body),
  });
}

export function logoutApi(body: TLogoutRequest): Promise<TLogoutResponse> {
  return request<TLogoutResponse>(POST_LOGOUT_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(body),
  });
}

export function refreshTokenApi(
  body: TRefreshTokenRequest
): Promise<TRefreshTokenResponse> {
  return request<TRefreshTokenResponse>(POST_REFRESH_TOKEN_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(body),
  });
}
