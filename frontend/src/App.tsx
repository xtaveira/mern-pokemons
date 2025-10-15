import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Search, Plus } from "lucide-react"
import { useState, useEffect } from "react"
import { toast } from "sonner"
import { Toaster } from "@/components/ui/sonner"
import { Navbar } from "./components/Navbar"
import { PokemonForm } from "./components/PokemonForm"
import { TypeForm } from "./components/TypeForm"
import { DeleteConfirmDialog } from "./components/DeleteConfirmDialog"
import { PokemonTable } from "./components/PokemonTable"
import { TypeTable } from "./components/TypeTable"
import { usePokemons } from "./hooks/usePokemons"
import { useTypes } from "./hooks/useTypes"
import { useDebounce } from "./hooks/useDebounce"
import type { Pokemon, Type, CreatePokemonDto, UpdatePokemonDto, CreateTypeDto, UpdateTypeDto } from "./types"

type ViewMode = 'pokemons' | 'tipos'

interface DeleteItem {
  id: string
  nome: string
  type: 'pokemon' | 'tipo'
}

function App() {
  const [searchName, setSearchName] = useState("")
  const [selectedType, setSelectedType] = useState<string>("all")
  const [viewMode, setViewMode] = useState<ViewMode>('pokemons')
  const [pokemonFormOpen, setPokemonFormOpen] = useState(false)
  const [typeFormOpen, setTypeFormOpen] = useState(false)
  const [editingPokemon, setEditingPokemon] = useState<Pokemon | null>(null)
  const [editingType, setEditingType] = useState<Type | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [itemToDelete, setItemToDelete] = useState<DeleteItem | null>(null)

  const debouncedSearchName = useDebounce(searchName, 500)

  const { pokemons, createPokemon, updatePokemon, deletePokemon, fetchPokemons } = usePokemons()
  const { types, createType, updateType, deleteType } = useTypes()

  useEffect(() => {
    if (viewMode === 'pokemons') {
      const params: { nome?: string; tipo?: string } = {}
      if (debouncedSearchName) params.nome = debouncedSearchName
      if (selectedType !== 'all') params.tipo = selectedType
      fetchPokemons(params)
    }
  }, [viewMode, debouncedSearchName, selectedType, fetchPokemons])

  const handleDeletePokemon = async (id: string, nome: string) => {
    setItemToDelete({ id, nome, type: 'pokemon' })
    setDeleteDialogOpen(true)
  }

  const handleDeleteType = async (id: string, nome: string) => {
    setItemToDelete({ id, nome, type: 'tipo' })
    setDeleteDialogOpen(true)
  }

  const confirmDelete = async () => {
    if (!itemToDelete) return

    try {
      if (itemToDelete.type === 'pokemon') {
        await deletePokemon(itemToDelete.id)
        toast.success('Pokémon excluído com sucesso!')
      } else {
        await deleteType(itemToDelete.id)
        toast.success('Tipo excluído com sucesso!')
      }
    } catch (error: any) {
      console.error('Erro ao excluir:', error)
      if (itemToDelete.type === 'tipo' && error?.status === 400) {
        toast.error(error.message || 'Não é possível excluir este tipo.')
      } else {
        toast.error(error?.message || `Erro ao excluir ${itemToDelete.type === 'pokemon' ? 'Pokémon' : 'Tipo'}`)
      }
    }
  }

  const handleEditPokemon = (pokemon: Pokemon) => {
    setEditingPokemon(pokemon)
    setPokemonFormOpen(true)
  }

  const handleEditType = (type: Type) => {
    setEditingType(type)
    setTypeFormOpen(true)
  }

  const handleAdd = () => {
    if (viewMode === 'pokemons') {
      setEditingPokemon(null)
      setPokemonFormOpen(true)
    } else {
      setEditingType(null)
      setTypeFormOpen(true)
    }
  }

  const handlePokemonSubmit = async (data: CreatePokemonDto | UpdatePokemonDto) => {
    if (editingPokemon) {
      await updatePokemon(editingPokemon._id, data as UpdatePokemonDto)
    } else {
      await createPokemon(data as CreatePokemonDto)
    }
  }

  const handleTypeSubmit = async (data: CreateTypeDto | UpdateTypeDto) => {
    if (editingType) {
      await updateType(editingType._id, data as UpdateTypeDto)
    } else {
      await createType(data as CreateTypeDto)
    }
  }

  const filteredTypes = types.filter(t =>
    t.nome.toLowerCase().includes(searchName.toLowerCase()) ||
    t.codigo.toString().includes(searchName)
  )

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar viewMode={viewMode} onViewModeChange={setViewMode} />
      <div className="flex flex-col items-center pt-8">
        <div className="w-[80%]">
          <h2 className="text-xl mb-2">{viewMode === 'pokemons' ? 'Pokemons' : 'Tipos'}</h2>
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Buscar por nome ou código..."
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                className="pl-10 border-gray-300 focus:border-gray-900 focus:ring-gray-900"
              />
            </div>

            <div className="flex gap-3">
              {viewMode === 'pokemons' && (
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="w-full md:w-[200px]">
                    <SelectValue placeholder="Filtrar por tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os tipos</SelectItem>
                    {types.map((type) => (
                      <SelectItem key={type._id} value={type._id}>
                        {type.nome}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
              <Button
                onClick={handleAdd}
                className="bg-green-600 hover:bg-green-700 text-white whitespace-nowrap"
              >
                <Plus className="w-4 h-4 mr-2" />
                Adicionar
              </Button>
            </div>
          </div>

          {viewMode === 'pokemons' ? (
            <PokemonTable
              pokemons={pokemons}
              onEdit={handleEditPokemon}
              onDelete={handleDeletePokemon}
            />
          ) : (
            <TypeTable
              types={filteredTypes}
              onEdit={handleEditType}
              onDelete={handleDeleteType}
            />
          )}
        </div>
      </div>
      <PokemonForm
        open={pokemonFormOpen}
        onOpenChange={setPokemonFormOpen}
        pokemon={editingPokemon}
        types={types}
        onSubmit={handlePokemonSubmit}
      />
      <TypeForm
        open={typeFormOpen}
        onOpenChange={setTypeFormOpen}
        type={editingType}
        onSubmit={handleTypeSubmit}
      />
      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title={`Excluir ${itemToDelete?.type === 'pokemon' ? 'Pokémon' : 'Tipo'}`}
        description={`Tem certeza que deseja excluir ${itemToDelete?.type === 'pokemon' ? 'o Pokémon' : 'o Tipo'} "${itemToDelete?.nome}"? Esta ação não pode ser desfeita.`}
        onConfirm={confirmDelete}
      />
      <Toaster />
    </div>
  )
}

export default App
