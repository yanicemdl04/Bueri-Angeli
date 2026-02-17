/**
 * Client API pour communiquer avec le backend Bueri-Angeli.
 * Base URL : VITE_API_URL (ex. http://localhost:3000/api)
 */

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

function getToken(): string | null {
  return window.localStorage.getItem('sis-token')
}

export type ApiError = { message: string; errors?: { field: string; message: string }[] }

async function request<T>(
  path: string,
  options: RequestInit & { skipAuth?: boolean } = {}
): Promise<T> {
  const { skipAuth, ...fetchOptions } = options
  const url = path.startsWith('http') ? path : `${BASE_URL}${path.startsWith('/') ? path : `/${path}`}`
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...((fetchOptions.headers as Record<string, string>) || {}),
  }
  if (!skipAuth) {
    const token = getToken()
    if (token) headers['Authorization'] = `Bearer ${token}`
  }
  const res = await fetch(url, { ...fetchOptions, headers })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    const err: ApiError = { message: (data as { message?: string }).message || 'Erreur API' }
    if ((data as { errors?: unknown }).errors) err.errors = (data as { errors: { field: string; message: string }[] }).errors
    throw err
  }
  return data as T
}

export const api = {
  get: <T>(path: string, options?: RequestInit) =>
    request<T>(path, { ...options, method: 'GET' }),

  post: <T>(path: string, body?: unknown, options?: RequestInit & { skipAuth?: boolean }) =>
    request<T>(path, { ...options, method: 'POST', body: body ? JSON.stringify(body) : undefined }),

  patch: <T>(path: string, body?: unknown, options?: RequestInit) =>
    request<T>(path, { ...options, method: 'PATCH', body: body ? JSON.stringify(body) : undefined }),

  put: <T>(path: string, body?: unknown, options?: RequestInit) =>
    request<T>(path, { ...options, method: 'PUT', body: body ? JSON.stringify(body) : undefined }),

  delete: <T>(path: string, options?: RequestInit) =>
    request<T>(path, { ...options, method: 'DELETE' }),
}

export default api
