import Cookies from 'universal-cookie';
import { jwtDecode } from 'jwt-decode';

const cookies = new Cookies();
const jwtCookie = cookies.get('jwt');
const jwtData = jwtCookie ? jwtDecode(jwtCookie) : '';

function useJwtData() {
  const token = cookies.get('jwt');
  if (!token) return null;
  try {
    return jwtDecode(token);
  } catch {
    return null;
  }
}

export { jwtCookie, jwtData, cookies, useJwtData };
