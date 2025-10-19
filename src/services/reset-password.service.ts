import { request } from './api.service';

type TResetPasswordRequest = {
  email: string;
};

type TResetPasswordResponse = {
  success: boolean;
  message: string;
};

type TSaveNewPasswordRequest = {
  password: string;
  token: string;
};

type TSaveNewPasswordResponse = {
  success: boolean;
  message: string;
};

const POST_RESET_PASSWORD_URL = 'password-reset';
const POST_SAVE_NEW_PASSWORD_URL = 'password-reset/reset';

export function resetPassword(
  body: TResetPasswordRequest
): Promise<TResetPasswordResponse> {
  return request<TResetPasswordResponse>(POST_RESET_PASSWORD_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(body),
  });
}

export function saveNewPassword(
  body: TSaveNewPasswordRequest
): Promise<TSaveNewPasswordResponse> {
  return request<TSaveNewPasswordResponse>(POST_SAVE_NEW_PASSWORD_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(body),
  });
}
