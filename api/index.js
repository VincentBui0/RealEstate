import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';

const app = express();

app.listen(3000, () => {
    console.log('Server is running on port 3000');
    }
);