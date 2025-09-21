import { logError } from './logger.service';

export const BASE_URL = 'https://norma.nomoreparties.space/api';

function checkResponse(response: Response): unknown {
  if (response.ok) {
    return response.json();
  }
  return Promise.reject(new Error(`Ошибка ${response.status}`));
}

function checkError(error: Error): void {
  logError(error);
  throw error;
}

export function request<T>(url: string, options?: RequestInit): Promise<T> {
  return fetch(`${BASE_URL}/${url}`, options).then(
    checkResponse,
    checkError
  ) as Promise<T>;
}
