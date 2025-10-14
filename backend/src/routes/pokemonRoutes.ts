import { Router } from 'express';
import {
    getAllPokemons,
    getPokemonById,
    createPokemon,
    updatePokemon,
    deletePokemon,
} from '../controllers/pokemonController';

const router = Router();

router.route('/')
    .get(getAllPokemons)
    .post(createPokemon);

router.route('/:id')
    .get(getPokemonById)
    .put(updatePokemon)
    .delete(deletePokemon);

export default router;