import { BACKEND } from '../../../config';
import { apiFetch } from '../../../utils/apiClient';

const URL = `/api/insurance`;

export async function getInsuranceApplicationsApi(params = {}) {
  const queryString = new URLSearchParams(params).toString();

  const res = await fetch(`${BACKEND}${URL}`, {
    credentials: 'include',
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Error fetching data');
  }

  const json = await res.json();
  return json;
}

export async function getInsuranceApplicationApi(sessionId) {
  return await apiFetch(`${URL}/${sessionId}`, {
    credentials: 'include',
  });
}

export async function updateInsuranceApplicationApi({ sessionId, orderStatus }) {
  return await apiFetch(`${URL}/${sessionId}/updateOrderStatus`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ orderStatus }),
    credentials: 'include',
  });
}

export async function deleteInsuranceApplicationApi(id) {
  return await apiFetch(`${URL}/${id}`, {
    method: 'DELETE',
    credentials: 'include',
  });
}

export async function downloadInsurancePolicyApi({ policyId, index }) {
  return await apiFetch(`${URL}/download/${policyId}/${index}`);
}
