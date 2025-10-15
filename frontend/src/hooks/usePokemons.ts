import { useState, useEffect, useCallback } from 'react'
import { pokemonService } from '../services/pokemonService'
import type { Pokemon, CreatePokemonDto, UpdatePokemonDto } from '../types'

export const usePokemons = () => {
    const [pokemons, setPokemons] = useState<Pokemon[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const fetchPokemons = useCallback(async (params?: { nome?: string; tipo?: string }) => {
        setLoading(true)
        setError(null)
        try {
            const data = await pokemonService.getAll(params)
            setPokemons(data)
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erro ao buscar pokémons')
        } finally {
            setLoading(false)
        }
    }, [])

    const createPokemon = async (data: CreatePokemonDto) => {
        setLoading(true)
        setError(null)
        try {
            const newPokemon = await pokemonService.create(data)
            setPokemons(prev => [...prev, newPokemon])
            return newPokemon
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erro ao criar pokémon')
            throw err
        } finally {
            setLoading(false)
        }
    }

    const updatePokemon = async (id: string, data: UpdatePokemonDto) => {
        setLoading(true)
        setError(null)
        try {
            const updated = await pokemonService.update(id, data)
            setPokemons(prev => prev.map(p => p._id === id ? updated : p))
            return updated
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erro ao atualizar pokémon')
            throw err
        } finally {
            setLoading(false)
        }
    }

    const deletePokemon = async (id: string) => {
        setLoading(true)
        setError(null)
        try {
            await pokemonService.delete(id)
            setPokemons(prev => prev.filter(p => p._id !== id))
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erro ao deletar pokémon')
            throw err
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchPokemons()
    }, [])

    return {
        pokemons,
        loading,
        error,
        fetchPokemons,
        createPokemon,
        updatePokemon,
        deletePokemon,
    }
}
