import { Pencil, Trash2 } from "lucide-react"
import { TableHeader, TableCell } from "./TableComponents"
import type { Pokemon } from "../types"

interface PokemonTableProps {
  pokemons: Pokemon[]
  onEdit: (pokemon: Pokemon) => void
  onDelete: (id: string, nome: string) => void
}

export function PokemonTable({ pokemons, onEdit, onDelete }: PokemonTableProps) {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <TableHeader>#</TableHeader>
              <TableHeader>Nome</TableHeader>
              <TableHeader>Tipo</TableHeader>
              <TableHeader>Tipo 2</TableHeader>
              <TableHeader align="center">Ações</TableHeader>
            </tr>
          </thead>
          <tbody className="divide-y">
            {pokemons.map(p => (
              <tr key={p._id} className="hover:bg-gray-50">
                <TableCell>{p.codigo}</TableCell>
                <TableCell className="font-medium">{p.nome}</TableCell>
                <TableCell>{p.tipo?.nome}</TableCell>
                <TableCell>{p.tipoSecundario?.nome || '-'}</TableCell>
                <TableCell align="center">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => onEdit(p)}
                      className="p-1 hover:bg-gray-200 rounded transition-colors"
                      title="Editar"
                    >
                      <Pencil className="w-4 h-4 text-blue-600" />
                    </button>
                    <button
                      onClick={() => onDelete(p._id, p.nome)}
                      className="p-1 hover:bg-gray-200 rounded transition-colors"
                      title="Excluir"
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                </TableCell>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
