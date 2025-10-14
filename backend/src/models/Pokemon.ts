import { Schema, model, Document, Types } from 'mongoose';

export interface IPokemon extends Document {
    codigo: number;
    nome: string;
    tipo: Types.ObjectId;
    tipoSecundario?: Types.ObjectId | null;
}

const PokemonSchema: Schema = new Schema<IPokemon>(
    {
        codigo: {
            type: Number,
            required: [true, 'O código do Pokémon é obrigatório.'],
            unique: true,
        },
        nome: {
            type: String,
            required: [true, 'O nome do Pokémon é obrigatório.'],
            trim: true,
        },
        tipo: {
            type: Schema.Types.ObjectId,
            ref: 'Type',
            required: [true, 'O tipo principal é obrigatório.'],
        },
        tipoSecundario: {
            type: Schema.Types.ObjectId,
            ref: 'Type',
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

export default model<IPokemon>('Pokemon', PokemonSchema);