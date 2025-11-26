import { apiFetch } from '../../../utils/apiClient';
import { BACKEND } from '../../../config';

export async function loginApi(credentials) {
  const response = await fetch(`${BACKEND}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Failed to login');
  }

  return await response.json();
}

export async function getMeApi() {
  return await apiFetch('/api/users/myAccount', {
    method: 'GET',
    credentials: 'include',
  });
}
