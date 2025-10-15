import { api } from './api'
import type { Pokemon, CreatePokemonDto, UpdatePokemonDto } from '../types'

export const pokemonService = {
  getAll: (params?: { nome?: string; tipo?: string }) => {
    const queryParams = new URLSearchParams()
    if (params?.nome) queryParams.append('nome', params.nome)
    if (params?.tipo) queryParams.append('tipo', params.tipo)
    const query = queryParams.toString()
    return api.get<Pokemon[]>(`/pokemons${query ? `?${query}` : ''}`)
  },

  getById: (id: string) => {
    return api.get<Pokemon>(`/pokemons/${id}`)
  },

  create: (data: CreatePokemonDto) => {
    return api.post<Pokemon>('/pokemons', data)
  },

  update: (id: string, data: UpdatePokemonDto) => {
    return api.put<Pokemon>(`/pokemons/${id}`, data)
  },

  delete: (id: string) => {
    return api.delete(`/pokemons/${id}`)
  },
}
