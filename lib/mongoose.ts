import mongoose from "mongoose";
import { exit } from 'node:process'

export const connectToDB = async () => {
    
    try {
        const { connection } = await mongoose.connect(process.env.MONGODB_URI as string);
        const url = `${connection.host}:${connection.port}`
        console.log((`MongoDB Conectado en : ${url}`));
        
    } catch (error) {
        console.log('Error al conectar a MongoDB', error);
        exit(1);
    }

}