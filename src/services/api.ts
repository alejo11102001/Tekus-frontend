import axios, { AxiosInstance } from 'axios'

const API_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:5099/api'

const api: AxiosInstance = axios.create({
    baseURL: API_BASE,
    headers: { 'Content-Type': 'application/json' },
})

api.interceptors.request.use(config => {
    const token = localStorage.getItem('tekus_token')
    if (token && config.headers) config.headers.Authorization = `Bearer ${token}`
    return config
})

// helpers
export function saveToken(token: string) {
    localStorage.setItem('tekus_token', token)
}
export function getToken(): string | null {
    return localStorage.getItem('tekus_token')
}
export function logout() {
    localStorage.removeItem('tekus_token')
}

// API methods
export default {
  // auth
    login: (payload: { username: string; password: string }) => api.post('/auth/login', payload),

    // countries
    getCountries: (refresh = false) => api.get(`/countries?refresh=${refresh}`),

    // providers
    listProviders: (page = 1, pageSize = 10, q = '', orderBy = 'name') =>
        api.get('/providers', { params: { page, pageSize, q, orderBy } }),
    getProvider: (id: number) => api.get(`/providers/${id}`),
    createProvider: (payload: any) => api.post('/providers', payload),
    updateProvider: (id: number, payload: any) => api.put(`/providers/${id}`, payload),
    deleteProvider: (id: number) => api.delete(`/providers/${id}`),
    addCustomField: (id: number, kv: { key: string; value: string }) => api.post(`/providers/${id}/customfields`, kv),

    // services
    listServices: (page = 1, pageSize = 10, q = '', orderBy = 'name') =>
        api.get('/services', { params: { page, pageSize, q, orderBy } }),
    getService: (id: number) => api.get(`/services/${id}`),
    createService: (payload: any) => api.post('/services', payload),
    updateService: (id: number, payload: any) => api.put(`/services/${id}`, payload),
    deleteService: (id: number) => api.delete(`/services/${id}`),

    // reports
    summary: () => api.get('/reports/summary'),
}
