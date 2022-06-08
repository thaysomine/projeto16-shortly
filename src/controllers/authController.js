import joi from 'joi';
import bcrypt from 'bcrypt';
import {v4} from 'uuid';

import db from '../db.js';

export async function signIn(req, res) {
    const {email, password} = req.body;
    console.log('body do login', req.body);
    
}

export async function signUp(req, res) {
    const {name, email, password} = req.body;

    try {
        const hash = await bcrypt.hash(password, 10);
        await db.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3)', [name, email, hash]);
        res.sendStatus(201);
    } catch (e) {
        res.status(422).send('Erro ao cadastrar usuário');
        console.log('Erro ao cadastrar usuário', e);
        return;
    }
}