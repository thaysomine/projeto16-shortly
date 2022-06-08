import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import db from './db.js';
console.log(db);

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

app.listen(process.env.PORT || 4000, () => {
    console.log('server started');
});