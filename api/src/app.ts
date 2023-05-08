import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
// routes
import userRoutes from '@/routes/user.routes';
import authRoutes from './routes/auth.routes';
// utils
import { handleDatabase } from './utils/database.utils';

const app = express();

// settings
dotenv.config();
app.use(cors()) // add cors headers
app.use(morgan("tiny")) // log the request for debugging
app.use(express.json()) // parse json bodies

// database
handleDatabase();

// routes
app.use('/users', userRoutes);
app.use('/auth', authRoutes);

// start
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running at port: ${PORT}`);
});