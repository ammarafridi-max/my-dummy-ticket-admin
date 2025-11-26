import { BACKEND } from '../config';

async function checkError(res) {
  if (!res.ok) {
    let errorMsg = 'Something went wrong';
    try {
      const error = await res.json();
      errorMsg = error.message || error.error || errorMsg;
    } catch (_) {}
    throw new Error(errorMsg);
  }
}

async function returnData(res) {
  if (res.status === 204) return null;
  try {
    const json = await res.json();
    return json?.data ?? null;
  } catch {
    return null;
  }
}

export async function apiFetch(path, options = {}) {
  const res = await fetch(`${BACKEND}${path}`, {
    ...options,
    credentials: 'include', // 🔥 MUST HAVE FOR COOKIE AUTH
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
