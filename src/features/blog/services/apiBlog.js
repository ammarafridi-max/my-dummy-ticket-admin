import { apiFetch } from '../../../utils/apiClient';
import { BACKEND } from '../../../config';

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

export function createBlogApi(formData) {
  return apiFetch(`${baseUrl}`, {
    method: 'POST',
    body: formData,
    // headers: { 'Content-Type': 'application/json' },
  });
}

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
