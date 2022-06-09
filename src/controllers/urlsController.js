import joi from 'joi';
import { nanoid } from 'nanoid';

import db from '../db.js';

export async function postUrl (req, res) {
    const {authorization} = req.headers;
    const token = authorization?.replace('Bearer ', '').trim();
    const {url} = req.body;

    try {
        const checkToken = await db.query('SELECT * FROM sessions WHERE token = $1',[token]);
        const userId = checkToken.rows[0].userId;
        let checkUrl = await db.query('SELECT * FROM urls WHERE url = $1', [url]);
        if (checkUrl.rows.length === 0) {
                await db.query('INSERT INTO urls (url) VALUES ($1)', [url]);
                checkUrl = await db.query('SELECT * FROM urls WHERE url = $1', [url]);
        }
        const shortUrl = nanoid(8);
        const shortUrlObj = {
            shortUrl: shortUrl
        }
        console.log('url', checkUrl.rows[0].url);
        await db.query('INSERT INTO links ("userId", "urlId", "shortUrl") VALUES ($1, $2, $3)', [userId, checkUrl.rows[0].id, shortUrl]);
        res.status(201).send(shortUrlObj);
    } catch (e) {
        console.log('Erro ao cadastrar url', e);
        res.status(500).send(`Erro ao cadastrar url, ${e}`);
    }
}