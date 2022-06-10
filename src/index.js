import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import db from './db.js';
import authRouter from './routes/authRouter.js';
import urlsRouter from './routes/urlsRouter.js';
import usersRouter from './routes/usersRouter.js';

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

app.use(authRouter);
app.use(urlsRouter);
app.use(usersRouter);

app.listen(5000, () => {
    console.clear();
    console.log('server started');
});