import { BACKEND } from '../../../config';
import { apiFetch } from '../../../services/apiClient';

const URL = `/api/insurance`;

export async function getInsuranceApplicationsApi(params = {}) {
  const queryString = new URLSearchParams(params).toString();

  const res = await fetch(`${BACKEND}${URL}?${queryString}`, {
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
  return await apiFetch(`${URL}/${sessionId}`);
}

export async function downloadInsurancePolicyApi({ policyId, index }) {
  return await apiFetch(`${URL}/download/${policyId}/${index}`);
}
