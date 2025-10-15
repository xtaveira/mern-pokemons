import { Request, Response } from 'express';
import Type from '../models/Type';
import Pokemon from '../models/Pokemon';

export const getAllTypes = async (_req: Request, res: Response) => {
    try {
        const types = await Type.find().sort({ codigo: 'asc' });
        res.status(200).json(types);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar tipos.', error });
    }
};

export const createType = async (req: Request, res: Response) => {
    try {
        const { codigo, nome } = req.body;

        if (!codigo || !nome) {
            return res.status(400).json({ message: 'Código e nome são obrigatórios.' });
        }

        const newType = new Type({ codigo, nome });
        await newType.save();

        res.status(201).json(newType);
    } catch (error) {
        const err = error as { code?: number };
        if (err.code === 11000) {
            return res.status(409).json({ message: 'Um tipo com este código já existe.' });
        }
        res.status(500).json({ message: 'Erro ao criar tipo.', error: err });
    }
};

export const updateType = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { nome } = req.body;

        const updatedType = await Type.findByIdAndUpdate(
            id,
            { nome },
            { new: true, runValidators: true }
        );

        if (!updatedType) {
            return res.status(404).json({ message: 'Tipo não encontrado.' });
        }

        res.status(200).json(updatedType);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar tipo.', error });
    }
};

export const deleteType = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const type = await Type.findById(id);
        if (!type) {
            return res.status(404).json({ message: 'Tipo não encontrado.' });
        }

        const pokemonsUsingType = await Pokemon.countDocuments({ tipo: id });

        if (pokemonsUsingType > 0) {
            return res.status(400).json({
                message: `Não é possível excluir este tipo. Existem ${pokemonsUsingType} pokémon(s) usando este tipo como tipo principal.`
            });
        }

        await Type.findByIdAndDelete(id);

        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Erro ao deletar tipo.', error });
    }
};