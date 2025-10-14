import { Request, Response } from 'express';
import Pokemon, { IPokemon } from '../models/Pokemon';
import { FilterQuery, isValidObjectId } from 'mongoose';

export const getAllPokemons = async (req: Request, res: Response) => {
    try {
        const { nome, tipo } = req.query;

        const filter: FilterQuery<IPokemon> = {};

        if (nome) filter.nome = { $regex: nome, $options: 'i' };
        if (tipo) filter.tipo = tipo;

        const pokemons = await Pokemon.find(filter)
            .populate('tipo', 'nome codigo -_id')
            .populate('tipoSecundario', 'nome codigo -_id')
            .sort({ codigo: 'asc' });

        res.status(200).json(pokemons);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar pokémons.', error });
    }
};

export const getPokemonById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        if (!isValidObjectId(id)) {
            return res.status(400).json({ message: 'ID inválido.' });
        }

        const pokemon = await Pokemon.findById(id)
            .populate('tipo', 'nome codigo')
            .populate('tipoSecundario', 'nome codigo');

        if (!pokemon) {
            return res.status(404).json({ message: 'Pokémon não encontrado.' });
        }

        res.status(200).json(pokemon);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar o pokémon.', error });
    }
};

export const createPokemon = async (req: Request, res: Response) => {
    try {
        const { codigo, nome, tipo, tipoSecundario } = req.body;

        if (!codigo || !nome || !tipo) {
            return res.status(400).json({ message: 'Código, nome e tipo são obrigatórios.' });
        }

        const newPokemon = new Pokemon({ codigo, nome, tipo, tipoSecundario: tipoSecundario || null });
        await newPokemon.save();

        const populatedPokemon = await Pokemon.findById(newPokemon._id)
            .populate('tipo', 'nome codigo')
            .populate('tipoSecundario', 'nome codigo');

        res.status(201).json(populatedPokemon);
    } catch (error) {
        const err = error as { code?: number };
        if (err.code === 11000) {
            return res.status(409).json({ message: 'Um Pokémon com este código já existe.' });
        }
        res.status(500).json({ message: 'Erro ao criar pokémon.', err });
    }
};

export const updatePokemon = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;

        const updatedPokemon = await Pokemon.findByIdAndUpdate(id, updatedData, {
            new: true,
            runValidators: true,
        })
            .populate('tipo', 'nome codigo')
            .populate('tipoSecundario', 'nome codigo');

        if (!updatedPokemon) {
            return res.status(404).json({ message: 'Pokémon não encontrado.' });
        }

        res.status(200).json(updatedPokemon);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar pokémon.', error });
    }
};

export const deletePokemon = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const deletedPokemon = await Pokemon.findByIdAndDelete(id);

        if (!deletedPokemon) {
            return res.status(404).json({ message: 'Pokémon não encontrado.' });
        }

        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Erro ao deletar pokémon.', error });
    }
};