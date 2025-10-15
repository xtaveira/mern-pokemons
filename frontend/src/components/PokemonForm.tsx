import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useState, useEffect } from "react"
import { toast } from "sonner"
import type { Pokemon, Type, CreatePokemonDto, UpdatePokemonDto } from "../types"

interface PokemonFormProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    pokemon?: Pokemon | null
    types: Type[]
    onSubmit: (data: CreatePokemonDto | UpdatePokemonDto) => Promise<void>
}

export function PokemonForm({ open, onOpenChange, pokemon, types, onSubmit }: PokemonFormProps) {
    const [codigo, setCodigo] = useState("")
    const [nome, setNome] = useState("")
    const [tipo, setTipo] = useState("")
    const [tipoSecundario, setTipoSecundario] = useState<string>("")
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (pokemon) {
            setCodigo(pokemon.codigo.toString())
            setNome(pokemon.nome)
            setTipo(pokemon.tipo._id)
            setTipoSecundario(pokemon.tipoSecundario?._id || "none")
        } else {
            setCodigo("")
            setNome("")
            setTipo("")
            setTipoSecundario("none")
        }
    }, [pokemon, open])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!tipo) {
            toast.error('Por favor, selecione um tipo principal')
            return
        }

        setLoading(true)
        try {
            const data = {
                ...(pokemon ? {} : { codigo: parseInt(codigo) }),
                nome,
                tipo,
                tipoSecundario: tipoSecundario === "none" ? null : tipoSecundario,
            }
            await onSubmit(data)
            toast.success(pokemon ? 'Pokémon atualizado com sucesso!' : 'Pokémon criado com sucesso!')
            onOpenChange(false)
            setCodigo("")
            setNome("")
            setTipo("")
            setTipoSecundario("none")
        } catch (error: any) {
            console.error('Erro ao salvar:', error)
            if (error?.status === 409) {
                toast.error(error.message || 'Um Pokémon com este código já existe.')
            } else {
                toast.error('Erro ao salvar Pokémon. Verifique os dados e tente novamente.')
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className="overflow-y-auto">
                <SheetHeader>
                    <SheetTitle>{pokemon ? "Editar Pokémon" : "Adicionar Pokémon"}</SheetTitle>
                    <SheetDescription>
                        {pokemon ? "Atualize as informações do Pokémon." : "Adicione um novo Pokémon."}
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
                            disabled={!!pokemon}
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
                            placeholder="Ex: Bulbasaur"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="tipo" className="text-sm font-medium">
                            Tipo Principal *
                        </label>
                        <Select value={tipo} onValueChange={setTipo}>
                            <SelectTrigger>
                                <SelectValue placeholder="Selecione um tipo" />
                            </SelectTrigger>
                            <SelectContent>
                                {types.map((t) => (
                                    <SelectItem key={t._id} value={t._id}>
                                        {t.nome}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="tipoSecundario" className="text-sm font-medium">
                            Tipo Secundário
                        </label>
                        <Select value={tipoSecundario} onValueChange={setTipoSecundario}>
                            <SelectTrigger>
                                <SelectValue placeholder="Selecione um tipo (opcional)" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="none">Nenhum</SelectItem>
                                {types.map((t) => (
                                    <SelectItem key={t._id} value={t._id}>
                                        {t.nome}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
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
                            {loading ? "Salvando..." : pokemon ? "Atualizar" : "Adicionar"}
                        </Button>
                    </div>
                </form>
            </SheetContent>
        </Sheet>
    )
}
