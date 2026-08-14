const codespaceName = (import.meta.env.VITE_CODESPACE_NAME || '').trim();

export const API_BASE_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api';

const LIST_KEYS = ['data', 'results', 'items', 'docs', 'rows'];

export function normalizeListResponse(payload) {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (!payload || typeof payload !== 'object') {
    return [];
  }

  for (const key of LIST_KEYS) {
    if (Array.isArray(payload[key])) {
      return payload[key];
    }
  }

  const nestedContainers = [payload.data, payload.results, payload.pagination, payload.pageInfo];

  for (const container of nestedContainers) {
    if (!container || typeof container !== 'object') {
      continue;
    }

    for (const key of LIST_KEYS) {
      if (Array.isArray(container[key])) {
        return container[key];
      }
    }
  }

  return [];
}

export async function fetchCollection(resourceName) {
  const response = await fetch(`${API_BASE_URL}/${resourceName}/`);

  if (!response.ok) {
    throw new Error(`Request failed for ${resourceName}: ${response.status}`);
  }

  const payload = await response.json();
  return normalizeListResponse(payload);
}

export async function fetchCollectionByUrl(url, resourceLabel = 'resource') {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Request failed for ${resourceLabel}: ${response.status}`);
  }

  const payload = await response.json();
  return normalizeListResponse(payload);
}
