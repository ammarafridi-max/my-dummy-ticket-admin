import { BACKEND } from '../../../config';
import { apiFetch } from '../../../utils/apiClient';

const URL = `/api/blogs`;

export function getAllBlogsApi({ page = 1, limit = 10, status, tag, search } = {}) {
  const params = new URLSearchParams({ page, limit });
  if (status) params.append('status', status);
  if (tag) params.append('tag', tag);
  if (search) params.append('search', search);

  return apiFetch(`${URL}?${params.toString()}`);
}

export function getBlogBySlugApi(slug) {
  return apiFetch(`${URL}/slug/${encodeURIComponent(slug)}`);
}

export function getBlogByIdApi(id) {
  return apiFetch(`${URL}/${id}`);
}

export async function createBlogApi(formData) {
  const res = await fetch(`${BACKEND}${URL}`, {
    method: 'POST',
    body: formData,
    credentials: 'include',
  });

  if (!res.ok) {
    let message = 'Failed to create blog';
    try {
      const err = await res.json();
      message = err.message || message;
    } catch (_) {}
    throw new Error(message);
  }

  const data = await res.json();
  return data?.data ?? null;
}

export function updateBlogApi({ id, blogData }) {
  return apiFetch(`${URL}/${id}`, {
    method: 'PATCH',
    body: blogData,
  });
}

export function deleteBlogApi(id) {
  return apiFetch(`${URL}/${id}`, {
    method: 'DELETE',
  });
}

export function publishBlogApi(id) {
  return apiFetch(`${URL}/${id}/publish`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
  });
}

export function duplicateBlogApi(id) {
  return apiFetch(`${URL}/${id}/duplicate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });
}
