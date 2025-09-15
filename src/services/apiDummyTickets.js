import { baseURL } from '../utils/baseUrl';
import { jwtCookie, jwtData } from './jwt';

export async function getDummyTicketsApi(params = {}) {
  const queryString = new URLSearchParams(params).toString();
  const res = await fetch(`${baseURL}/api/ticket?${queryString}`, {
    headers: { Authorization: `Bearer ${jwtCookie}` },
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message);
  }

  const json = await res.json();

  return json;
}

export async function getDummyTicketApi(sessionId) {
  const res = await fetch(`${baseURL}/api/ticket/${sessionId}`, {
    headers: { Authorization: `Bearer ${jwtCookie}` },
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message);
  }

  const json = await res.json();

  return json;
}

export async function updateDummyTicketApi({ sessionId, orderStatus }) {
  const userId = jwtData?.id;
  const res = await fetch(
    `${baseURL}/api/ticket/${sessionId}/updateOrderStatus`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwtCookie}`,
      },
      body: JSON.stringify({ userId, orderStatus }),
    }
  );

  const data = await res.json();

  console.log(data);
}

export async function deleteDummyTicketApi(sessionId) {
  const res = await fetch(`${baseURL}/api/ticket/${sessionId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${jwtCookie}`,
    },
  });

  const data = await res.json();

  if (data.status === 'success') {
    return data.message;
  } else {
    throw new Error(data.message || 'Failed to delete dummy ticket');
  }
}
