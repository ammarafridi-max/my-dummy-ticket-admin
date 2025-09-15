import { baseURL } from '../utils/baseUrl';
import { jwtCookie } from './jwt';

export async function getAccount() {
  const res = await fetch(`${baseURL}/api/users/myAccount`, {
    headers: {
      Authorization: `Bearer ${jwtCookie}`,
    },
  });
  if (!res.ok) throw new Error('An error occurred while updating your data.');
  const data = await res.json();
  return data.data;
}

export async function updateAccount(accountData) {
  const res = await fetch(`${baseURL}/api/users/updateMyAccount`, {
    method: 'PATCH',
    body: JSON.stringify(accountData),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwtCookie}`,
    },
  });
  if (!res.ok) throw new Error('An error occurred while updating your data.');
  const data = await res.json();
}

export async function updatePasswordApi(accountData) {
  const res = await fetch(`${baseURL}/api/users/updateMyPassword`, {
    method: 'PATCH',
    body: JSON.stringify(accountData),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwtCookie}`,
    },
  });

  if (!res.ok)
    throw new Error('An error occurred while updating your password');

  const data = await res.json();

  console.log(data);
}

export async function deleteAccount() {
  const res = await fetch(`${baseURL}/api/users/deleteMyAccount`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${jwtCookie}`,
    },
  });
  const data = await res.json();

  cookies.remove('jwt');
}
