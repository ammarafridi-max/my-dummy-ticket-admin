import { BACKEND } from '../config';

async function checkError(res) {
  if (!res.ok) {
    let message = 'Something went wrong';
    try {
      const json = await res.json();
      message = json.message || json.error || message;
    } catch (_) {}
    throw new Error(message);
  }
}

async function returnData(res) {
  const json = await res.json();
  return json.data || null;
}

export async function apiFetch(path, options = {}) {
  const res = await fetch(`${BACKEND}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    credentials: 'include',
  });

  await checkError(res);
  return await returnData(res);
}

export async function apiUpload(path, formData, method = 'POST') {
  const res = await fetch(`${BACKEND}${path}`, {
    method,
    credentials: 'include', // 🔥 MUST HAVE
    body: formData,
  });

  await checkError(res);
  return await returnData(res);
}
