import { refreshTokenApi } from './auth.service';
import { logError } from './logger.service';
import {
  getRefreshToken,
  getToken,
  removeTokenData,
  setTokenData,
} from './token.service';

export const BASE_URL = 'https://norma.nomoreparties.space/api';

function checkResponse<T>(response: Response): Promise<T> {
  if (response.ok) {
    return response.json() as Promise<T>;
  }
  return Promise.reject(new Error(`Ошибка ${response.status}`));
}

function checkError(error: Error): void {
  logError(error);
  throw error;
}

function refreshTokenAndRepeat<T>(
  error: Error,
  getReqFn: () => Promise<Response>
): Promise<T> {
  return refreshTokenApi({ token: getRefreshToken() ?? '' })
    .then(({ accessToken, refreshToken }) => {
      setTokenData(accessToken, refreshToken);
      return getReqFn();
    })
    .then(checkResponse)
    .catch(() => {
      removeTokenData();
      return checkError(error);
    }) as Promise<T>;
}

function setAuthorizationHeader(options?: RequestInit): RequestInit {
  options ??= { headers: {} };
  options.headers = { ...options.headers, authorization: getToken() ?? '' };
  return options;
}

export function request<T>(
  url: string,
  options?: RequestInit,
  authorizedRequest = false
): Promise<T> {
  const getReq = (): Promise<Response> => {
    let optionsCopy = structuredClone(options);
    if (authorizedRequest) {
      optionsCopy = setAuthorizationHeader(optionsCopy);
    }
    return fetch(`${BASE_URL}/${url}`, optionsCopy);
  };

  return getReq().then(checkResponse, (error: Error) =>
    authorizedRequest ? refreshTokenAndRepeat(error, getReq) : checkError(error)
  ) as unknown as Promise<T>;
}
