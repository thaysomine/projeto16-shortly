import bcrypt from 'bcrypt';
import {v4} from 'uuid';

import db from '../db.js';

export async function signIn(req, res) {
    const {email, password} = req.body;

    try {
        const checkEmail = await db.query('SELECT * FROM users WHERE email = $1', [email]);
        if (checkEmail.rows.length === 0) {
            res.status(401).send('Email não cadastrado');
            return;
        }
        const checkPassword = await bcrypt.compare(password, checkEmail.rows[0].password);
        if (!checkPassword) {
            res.status(401).send('Senha incorreta');
            return;
        }

        const token = v4();
        await db.query('INSERT INTO sessions ("userId", token) VALUES ($1, $2)', [checkEmail.rows[0].id, token]);
        const session = await db.query('SELECT * FROM sessions WHERE token = $1', [token]);
        res.status(200).send(session.rows[0].token);
    } catch (e) {
        res.status(500).send(`Erro ao logar usuario, ${e}`);
    }
}

export async function signUp(req, res) {
    const {name, email, password} = req.body;

    try {
        const hash = await bcrypt.hash(password, 10);
        await db.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3)', [name, email, hash]);
        res.sendStatus(201);
    } catch (e) {
        res.status(500).send('Erro ao cadastrar usuário');
        return;
    }
}