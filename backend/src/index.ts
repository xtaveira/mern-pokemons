import express, { Express } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db';
import typeRoutes from './routes/typeRoutes';
import pokemonRoutes from './routes/pokemonRoutes';

dotenv.config();

connectDB();

const app: Express = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/types', typeRoutes);
app.use('/api/pokemons', pokemonRoutes);

app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});