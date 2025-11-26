import { BACKEND } from '../../../config';

export async function getDummyTicketsApi(params = {}) {
  const queryString = new URLSearchParams(params).toString();
  const res = await fetch(`${BACKEND}/api/ticket?${queryString}`);

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message);
  }

  const json = await res.json();

  return json;
}

export async function getDummyTicketApi(sessionId) {
  const res = await fetch(`${BACKEND}/api/ticket/${sessionId}`);

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message);
  }

  const json = await res.json();

  return json;
}

export async function updateDummyTicketApi({ sessionId, orderStatus }) {
  const res = await fetch(`${BACKEND}/api/ticket/${sessionId}/updateOrderStatus`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userId, orderStatus }),
  });

  const data = await res.json();
}

export async function deleteDummyTicketApi(sessionId) {
  const res = await fetch(`${BACKEND}/api/ticket/${sessionId}`, {
    method: 'DELETE',
  });

  const data = await res.json();

  if (data.status === 'success') {
    return data.message;
  } else {
    throw new Error(data.message || 'Failed to delete dummy ticket');
  }
}
