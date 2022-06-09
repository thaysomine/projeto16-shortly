import joi from 'joi';
import { nanoid } from 'nanoid';

import db from '../db.js';

export async function postUrlValidation (req, res, next) {
    const {authorization} = req.headers;
    const token = authorization?.replace('Bearer ', '').trim();
    if (!token) return res.sendStatus(401);

    const body = req.body;
    const schema = joi.object({
        url: joi.string().required()
    });
    const validation = schema.validate(body);
    if (validation.error) {
        console.log('Erro ao cadastrar url', validation.error);
        res.status(422).send(`Erro ao cadastrar url, ${validation.error}`);
        return;
    }

    try {
        const checkToken = await db.query('SELECT * FROM sessions WHERE token = $1',[token]);
        if(checkToken.rows.length === 0){
            res.status(401).send('Token inválido');
            return;
        }
    } catch (e) {
        console.log('Erro de validação', e);
        res.status(500).send(`Erro de validação, ${e}`);
    }

    next();
}

export async function deleteUrlValidation (req, res, next) {
    const {authorization} = req.headers;
    const token = authorization?.replace('Bearer ', '').trim();
    const {id} = req.params;

    try {
        const checkLink = await db.query('SELECT * FROM links WHERE id = $1', [id]);
        if (checkLink.rows.length === 0) return res.status(404).send('Link não encontrado');

        const checkToken = await db.query('SELECT * FROM sessions WHERE token = $1', [token]);
        if (checkToken.rows.length === 0) return res.status(401).send('Token invalido');
        
        const userId = checkToken.rows[0].userId;
        const checkUserId = await db.query('SELECT * FROM links WHERE id = $1 AND "userId" = $2', [id, userId]);
        if (checkUserId.rows.length === 0) return res.status(401).send('Não autorizado');
    } catch (e) {
        console.log('Erro de validação ao deletar url', e);
        res.status(500).send(`Erro de validação ao deletar url, ${e}`);
    }

    next();
}