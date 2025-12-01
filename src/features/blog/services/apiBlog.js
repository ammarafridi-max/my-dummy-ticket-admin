import { BACKEND } from '../../../config';
import { apiFetch } from '../../../utils/apiClient';

const baseUrl = `/api/blogs`;

export function getAllBlogsApi({ page = 1, limit = 10, status, tag, search } = {}) {
  const params = new URLSearchParams({ page, limit });
  if (status) params.append('status', status);
  if (tag) params.append('tag', tag);
  if (search) params.append('search', search);

  return apiFetch(`${baseUrl}?${params.toString()}`);
}

export function getBlogBySlugApi(slug) {
  return apiFetch(`${baseUrl}/slug/${encodeURIComponent(slug)}`);
}

export function getBlogByIdApi(id) {
  return apiFetch(`${baseUrl}/${id}`);
}

// ✅ USE RAW FETCH FOR FILE UPLOAD
export async function createBlogApi(formData) {
  const res = await fetch(`${BACKEND}${baseUrl}`, {
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

// Update without file (JSON)
export function updateBlogApi({ id, blogData }) {
  return apiFetch(`${baseUrl}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(blogData),
  });
}

export function deleteBlogApi(id) {
  return apiFetch(`${baseUrl}/${id}`, {
    method: 'DELETE',
  });
}
