import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { useState, useEffect } from "react"
import { toast } from "sonner"
import type { Type, CreateTypeDto, UpdateTypeDto } from "../types"

interface TypeFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  type?: Type | null
  onSubmit: (data: CreateTypeDto | UpdateTypeDto) => Promise<void>
}

export function TypeForm({ open, onOpenChange, type, onSubmit }: TypeFormProps) {
  const [codigo, setCodigo] = useState("")
  const [nome, setNome] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (type) {
      setCodigo(type.codigo.toString())
      setNome(type.nome)
    } else {
      setCodigo("")
      setNome("")
    }
  }, [type, open])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      if (type) {
        await onSubmit({ nome })
      } else {
        await onSubmit({ codigo: parseInt(codigo), nome })
      }
      toast.success(type ? 'Tipo atualizado com sucesso!' : 'Tipo criado com sucesso!')
      onOpenChange(false)
      setCodigo("")
      setNome("")
    } catch (error: any) {
      console.error('Erro ao salvar:', error)
      if (error?.status === 409) {
        toast.error(error.message || 'Um tipo com este código já existe.')
      } else {
        toast.error('Erro ao salvar Tipo. Verifique os dados e tente novamente.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>{type ? "Editar Tipo" : "Adicionar Tipo"}</SheetTitle>
          <SheetDescription>
            {type ? "Atualize as informações do tipo." : "Adicione um novo tipo de Pokémon."}
          </SheetDescription>
        </SheetHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-6 px-1">
          <div className="space-y-2">
            <label htmlFor="codigo" className="text-sm font-medium">
              Código
            </label>
            <Input
              id="codigo"
              type="number"
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)}
              placeholder="Ex: 1"
              required
              disabled={!!type}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="nome" className="text-sm font-medium">
              Nome
            </label>
            <Input
              id="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Ex: Fogo"
              required
            />
          </div>
          <div className="flex gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? "Salvando..." : type ? "Atualizar" : "Adicionar"}
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  )
}
