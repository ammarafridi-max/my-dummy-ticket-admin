import { apiFetch } from '../../../utils/apiClient';

export async function getMyAccountApi() {
  return await apiFetch(`/api/users/myAccount`, {
    method: 'GET',
  });
}

export async function updateAccountApi(data) {
  return await apiFetch(`/api/users/updateMyAccount`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
}

export async function updatePasswordApi(accountData) {
  return await apiFetch(`/api/users/updateMyPassword`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(accountData),
  });
}

export async function deleteAccountApi() {
  return await apiFetch(`/api/users/deleteMyAccount`, {
    method: 'DELETE',
  });
}
