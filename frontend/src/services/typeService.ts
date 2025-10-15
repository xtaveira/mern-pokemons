import { api } from './api'
import type { Type, CreateTypeDto, UpdateTypeDto } from '../types'

export const typeService = {
  getAll: () => {
    return api.get<Type[]>('/types')
  },

  create: (data: CreateTypeDto) => {
    return api.post<Type>('/types', data)
  },

  update: (id: string, data: UpdateTypeDto) => {
    return api.put<Type>(`/types/${id}`, data)
  },

  delete: (id: string) => {
    return api.delete(`/types/${id}`)
  },
}
