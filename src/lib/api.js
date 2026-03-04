const API_BASE = '/api'

export const API_ERRORS = {
  NETWORK: 'Unable to connect. Please ensure the server is running (npm run server).',
  SERVER: 'Server error. Please try again later.',
  UNKNOWN: 'Something went wrong. Please try again.',
}

function isNetworkError(err) {
  return (
    err?.name === 'TypeError' ||
    err?.message?.includes('fetch') ||
    err?.message?.includes('Failed to fetch') ||
    err?.message?.includes('NetworkError')
  )
}

async function request(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`
  try {
    const res = await fetch(url, {
      headers: { 'Content-Type': 'application/json', ...options.headers },
      ...options,
    })
    const data = await res.json().catch(() => ({}))
    if (!res.ok) {
      if ([502, 503, 504].includes(res.status)) {
        throw new Error(API_ERRORS.NETWORK)
      }
      const msg = data.message || res.statusText || API_ERRORS.SERVER
      throw new Error(msg)
    }
    return data
  } catch (err) {
    if (err instanceof Error && !err.message.startsWith('Missing') && !err.message.includes('required')) {
      if (isNetworkError(err)) {
        throw new Error(API_ERRORS.NETWORK)
      }
    }
    throw err
  }
}

async function safeRequest(endpoint, options = {}, fallback = null) {
  try {
    return await request(endpoint, options)
  } catch {
    return fallback
  }
}

export const api = {
  getWebsites: (params) => request(`/websites?${new URLSearchParams(params)}`),
  getWebsite: (id) => request(`/websites/${id}`),
  submitWebsite: (body) => request('/websites/submit', { method: 'POST', body: JSON.stringify(body) }),
  subscribeNewsletter: (email, frequency = 'weekly') =>
    request('/newsletter/subscribe', { method: 'POST', body: JSON.stringify({ email, frequency }) }),
  getQueueStatus: () => request('/queue/status'),
  createCheckout: (submissionId) =>
    request('/stripe/create-checkout', { method: 'POST', body: JSON.stringify({ submissionId }) }),
  getSubmissionStatus: (token) => request(`/submissions/status/${token}`),
}

export const apiSafe = {
  getQueueStatus: () => safeRequest('/queue/status', {}, { ahead: 0, avgTime: 24 }),
}
