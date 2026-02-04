import { apiFetch } from '../../../services/apiClient';

export async function getUsers() {
  return await apiFetch(`/api/users`);
}

export async function getUser(username) {
  return await apiFetch(`/api/users/${username}`);
}

export async function createUserApi(userData) {
  return await apiFetch(`/api/users`, {
    method: 'POST',
    body: JSON.stringify(userData),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export async function updateUserApi(username, userData) {
  return await apiFetch(`/api/users/${username}`, {
    method: 'PATCH',
    body: JSON.stringify(userData),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export async function deleteUserApi(username) {
  return await apiFetch(`/api/users/${username}`, {
    method: 'DELETE',
  });
}
