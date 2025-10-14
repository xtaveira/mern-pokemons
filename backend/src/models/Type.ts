import { Schema, model, Document } from 'mongoose';

export interface IType extends Document {
    codigo: number;
    nome: string;
}

const TypeSchema: Schema = new Schema<IType>({
    codigo: {
        type: Number,
        required: [true, 'O código do tipo é obrigatório.'],
        unique: true,
    },
    nome: {
        type: String,
        required: [true, 'O nome do tipo é obrigatório.'],
        trim: true,
    },
});

export default model<IType>('Type', TypeSchema);