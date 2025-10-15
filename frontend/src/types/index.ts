export interface Type {
  _id: string
  codigo: number
  nome: string
}

export interface Pokemon {
  _id: string
  codigo: number
  nome: string
  tipo: Type
  tipoSecundario?: Type | null
}

export interface CreatePokemonDto {
  codigo: number
  nome: string
  tipo: string
  tipoSecundario?: string | null
}

export interface UpdatePokemonDto {
  codigo?: number
  nome?: string
  tipo?: string
  tipoSecundario?: string | null
}

export interface CreateTypeDto {
  codigo: number
  nome: string
}

export interface UpdateTypeDto {
  nome: string
}
