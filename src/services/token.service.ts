export function setTokenData(token: string, refreshToken: string): void {
  localStorage.setItem('token', token);
  localStorage.setItem('refreshToken', refreshToken);
}

export function getRefreshToken(): string | null {
  return localStorage.getItem('refreshToken');
}

export function getToken(): string | null {
  return localStorage.getItem('token');
}

export function removeTokenData(): void {
  localStorage.removeItem('token');
  localStorage.removeItem('refreshToken');
}
