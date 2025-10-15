import { useState, useEffect } from 'react'
import { typeService } from '../services/typeService'
import type { Type, CreateTypeDto, UpdateTypeDto } from '../types'

export const useTypes = () => {
  const [types, setTypes] = useState<Type[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchTypes = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await typeService.getAll()
      setTypes(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao buscar tipos')
    } finally {
      setLoading(false)
    }
  }

  const createType = async (data: CreateTypeDto) => {
    setLoading(true)
    setError(null)
    try {
      const newType = await typeService.create(data)
      setTypes(prev => [...prev, newType])
      return newType
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao criar tipo')
      throw err
    } finally {
      setLoading(false)
    }
  }

  const updateType = async (id: string, data: UpdateTypeDto) => {
    setLoading(true)
    setError(null)
    try {
      const updated = await typeService.update(id, data)
      setTypes(prev => prev.map(t => t._id === id ? updated : t))
      return updated
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao atualizar tipo')
      throw err
    } finally {
      setLoading(false)
    }
  }

  const deleteType = async (id: string) => {
    setLoading(true)
    setError(null)
    try {
      await typeService.delete(id)
      setTypes(prev => prev.filter(t => t._id !== id))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao deletar tipo')
      throw err
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTypes()
  }, [])

  return {
    types,
    loading,
    error,
    fetchTypes,
    createType,
    updateType,
    deleteType,
  }
}
