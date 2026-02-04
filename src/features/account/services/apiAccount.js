import { apiFetch } from '../../../services/apiClient';

const URL = '/api/users/me';

export async function getMyAccountApi() {
  return await apiFetch(URL, {
    method: 'GET',
  });
}

export async function updateAccountApi(data) {
  return await apiFetch(URL, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
}

export async function updatePasswordApi(accountData) {
  return await apiFetch(`${URL}/password`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(accountData),
  });
}
