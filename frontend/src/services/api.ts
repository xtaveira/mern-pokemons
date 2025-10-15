const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

export const api = {
    get: async <T>(endpoint: string): Promise<T> => {
        const response = await fetch(`${API_URL}${endpoint}`)
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
        return response.json()
    },

    post: async <T>(endpoint: string, data: unknown): Promise<T> => {
        const response = await fetch(`${API_URL}${endpoint}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        })
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
        return response.json()
    },

    put: async <T>(endpoint: string, data: unknown): Promise<T> => {
        const response = await fetch(`${API_URL}${endpoint}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        })
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
        return response.json()
    },

    delete: async (endpoint: string): Promise<void> => {
        const response = await fetch(`${API_URL}${endpoint}`, {
            method: 'DELETE',
        })
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
    },
}
