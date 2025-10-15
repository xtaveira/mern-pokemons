import { Pencil, Trash2 } from "lucide-react"
import { TableHeader, TableCell } from "./TableComponents"
import type { Type } from "../types"

interface TypeTableProps {
  types: Type[]
  onEdit: (type: Type) => void
  onDelete: (id: string, nome: string) => void
}

export function TypeTable({ types, onEdit, onDelete }: TypeTableProps) {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <TableHeader>#</TableHeader>
              <TableHeader>Nome</TableHeader>
              <TableHeader align="center">Ações</TableHeader>
            </tr>
          </thead>
          <tbody className="divide-y">
            {types.map(t => (
              <tr key={t._id} className="hover:bg-gray-50">
                <TableCell>{t.codigo}</TableCell>
                <TableCell className="font-medium">{t.nome}</TableCell>
                <TableCell align="center">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => onEdit(t)}
                      className="p-1 hover:bg-gray-200 rounded transition-colors"
                      title="Editar"
                    >
                      <Pencil className="w-4 h-4 text-blue-600" />
                    </button>
                    <button
                      onClick={() => onDelete(t._id, t.nome)}
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
