import { baseURL } from '../utils/baseUrl';
import { jwtCookie } from './jwt';

export async function getUsers() {
  const res = await fetch(`${baseURL}/api/users`, {
    headers: { Authorization: `Bearer ${jwtCookie}` },
  });

  if (!res.ok && res.status === 403) {
    console.log(res);
    throw new Error('You are not allowed to access this data.');
  }

  const data = await res.json();

  return data.data;
}

export async function getUser(username) {
  const res = await fetch(`${baseURL}/api/users/${username}`, {
    headers: { Authorization: `Bearer ${jwtCookie}` },
  });

  if (!res.ok) throw new Error('Could not get user data');

  const data = await res.json();

  return data.data;
}

export async function createUserApi(userData) {
  const res = await fetch(`${baseURL}/api/users`, {
    method: 'POST',
    body: JSON.stringify(userData),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwtCookie}`,
    },
  });

  if (!res.ok) throw new Error('Could not create user');

  const data = await res.json();

  return data.data;
}

export async function updateUserApi(username, userData) {
  const res = await fetch(`${baseURL}/api/users/${username}`, {
    method: 'PATCH',
    body: JSON.stringify(userData),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwtCookie}`,
    },
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || 'Could not update user');
  }

  const data = await res.json();

  console.log(data);

  return data.data;
}

export async function deleteUserApi(username) {
  const res = await fetch(`${baseURL}/api/users/${username}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${jwtCookie}`,
    },
  });

  if (!res.ok) throw new Error('Could not delete user');

  const data = await res.json();

  return data.data;
}
