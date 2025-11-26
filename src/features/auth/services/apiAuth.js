import { apiFetch } from '../../../utils/apiClient';

export async function loginApi(credentials) {
  return await apiFetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
    credentials: 'include',
  });
}

export async function getMeApi() {
  return await apiFetch('/api/users/myAccount', {
    method: 'GET',
    credentials: 'include',
  });
}
