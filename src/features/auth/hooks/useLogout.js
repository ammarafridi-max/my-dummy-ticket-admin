import { BACKEND } from '../../../config';

export function useLogout() {
  async function logout() {
    await fetch(`${BACKEND}/api/auth/logout`, {
      method: 'GET',
      credentials: 'include',
    });

    window.location.href = '/login';
  }

  return { logout };
}
