import { baseURL } from '../utils/baseUrl';
import { jwtCookie } from './jwt';

export async function sendEmailApi(formData) {
  const res = await fetch(`${baseURL}/api/email/send-email`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${jwtCookie}`,
    },
    body: formData,
  });
  const json = await res.json();

  console.log(json);

  return json;
}
