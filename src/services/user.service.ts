import { request } from './api.service';

export type TPatchUserRequest = {
  email?: string;
  password?: string;
  name?: string;
};

type TPatchUserResponse = {
  success: boolean;
  user: {
    email: string;
    name: string;
  };
};

type TGetUserResponse = {
  success: boolean;
  user: {
    email: string;
    name: string;
  };
};

const USER_URL = `auth/user`;

export function getUserApi(): Promise<TGetUserResponse> {
  return request<TGetUserResponse>(
    USER_URL,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
    },
    true
  );
}

export function patchUserApi(body: TPatchUserRequest): Promise<TPatchUserResponse> {
  return request<TPatchUserResponse>(
    USER_URL,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(body),
    },
    true
  );
}
