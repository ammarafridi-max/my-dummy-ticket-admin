import { apiFetch } from '../../../services/apiClient';

const URL = '/api/ticket';

export async function getDummyTicketsApi(params = {}) {
  const queryString = new URLSearchParams(params).toString();
  const result = await apiFetch(`${URL}?${queryString}`);

  return {
    data: result.data,
    pagination: result.pagination,
    results: result.results,
  };
}

export async function getDummyTicketApi(sessionId) {
  const result = await apiFetch(`${URL}/${sessionId}`);
  return result;
}

export async function updateDummyTicketApi({ sessionId, orderStatus }) {
  const result = await apiFetch(`${URL}/${sessionId}/status`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ orderStatus }),
  });

  return result;
}

export async function deleteDummyTicketApi(sessionId) {
  await apiFetch(`${URL}/${sessionId}`, {
    method: 'DELETE',
  });

  return true;
}

export async function refundDummyTicketApi(transactionId) {
  const result = await apiFetch(`${URL}/${transactionId}/refund`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  console.log(result);

  return result;
}
