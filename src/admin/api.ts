type GetToken = () => Promise<string | null>;

async function request(
  path: string,
  getToken: GetToken,
  options: RequestInit = {}
) {
  const token = await getToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(path, { ...options, headers });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Request failed: ${res.status}`);
  }
  return res.json();
}

export const api = {
  getResults: (getToken: GetToken, page = 1, limit = 50) =>
    request(`/api/results?page=${page}&limit=${limit}`, getToken),

  deleteResult: (getToken: GetToken, id: string) =>
    request(`/api/results?id=${id}`, getToken, { method: 'DELETE' }),

  getContent: (getToken: GetToken) => request('/api/content', getToken),

  saveContent: (getToken: GetToken, data: unknown) =>
    request('/api/content', getToken, { method: 'PUT', body: JSON.stringify(data) }),

  getAds: (getToken: GetToken) => request('/api/ads', getToken),

  saveAds: (getToken: GetToken, data: unknown) =>
    request('/api/ads', getToken, { method: 'PUT', body: JSON.stringify(data) }),
};
