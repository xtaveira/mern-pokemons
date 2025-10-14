import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
    try {
        const mongoUri = process.env.MONGO_URI;

        if (!mongoUri) {
            console.error('ERRO: A variável de ambiente MONGO_URI não foi definida.');
            process.exit(1);
        }

        const conn = await mongoose.connect(mongoUri);

        console.log(`MongoDB Conectado: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Erro ao conectar ao MongoDB: ${(error as Error).message}`);
        process.exit(1);
    }
};

export default connectDB;