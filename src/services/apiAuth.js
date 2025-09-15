import { baseURL } from '../utils/baseUrl';
import { cookies } from './jwt';

export async function login(username, password) {
  const credentials = { username, password };
  const res = await fetch(`${baseURL}/api/users/login`, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message);
  }

  const data = await res.json();

  cookies.set('jwt', data.token);
  return data.data;
}

export async function logoutApi() {
  cookies.remove('jwt');
}
