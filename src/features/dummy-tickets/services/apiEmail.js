import { apiFetch } from '../../../services/apiClient';

export async function sendEmailApi(formData) {
  return await apiFetch(`/api/email/send-email`, {
    method: 'POST',
    body: formData,
  });
}
