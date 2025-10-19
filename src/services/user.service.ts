import { request } from './api.service';

type TRegisterUserRequest = {
  email: string;
  password: string;
  name: string;
};

type TRegisterUserResponse = {
  success: boolean;
  message: string;
};

const POST_REGISTER_USER_URL = 'auth/register';

export function registerUser(
  body: TRegisterUserRequest
): Promise<TRegisterUserResponse> {
  return request<TRegisterUserResponse>(POST_REGISTER_USER_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(body),
  });
}
