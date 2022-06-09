import joi from 'joi';
import { nanoid } from 'nanoid';

import db from '../db.js';

export async function getUrl (req, res) {
    const {id} = req.params;

    try {
        const checkUrl = await db.query(`
            SELECT l.id, l."shortUrl", u.url 
            FROM links l
            JOIN urls u 
            ON "urlId" = u.id
            WHERE l.id = $1
        `, [id]);
        if (checkUrl.rows.length === 0) {
            res.status(404).send('Url não encontrada');
            return;
        }
        res.status(200).send(checkUrl.rows[0]);
    } catch (e) {
        console.log('Erro ao buscar url', e);
        res.status(500).send(`Erro ao buscar url, ${e}`);
    }
}

export async function getShortUrl (req, res) {
    const {shortUrl} = req.params;

    try {
        const checkShortUrl = await db.query(`SELECT * FROM links WHERE "shortUrl" = $1`, [shortUrl]);
        if (checkShortUrl.rows.length === 0) {
            res.status(404).send('Url encurtada não encontrada');
            return;
        }
        await db.query('UPDATE links SET views = views + 1 WHERE "shortUrl" = $1', [shortUrl]);
        const linkUrl = await db.query(`
            SELECT l.id, u.url 
            FROM links l
            JOIN urls u 
            ON "urlId" = u.id
            WHERE l."shortUrl" = $1
        `, [shortUrl]);
        res.redirect(linkUrl.rows[0].url);
    } catch (e) {
        console.log('Erro ao buscar url encurtada', e);
        res.status(500).send(`Erro ao buscar url encurtada, ${e}`);
    }
}

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

export async function deleteUrl (req, res) {
    const {id} = req.params;

    try {
        await db.query('DELETE FROM links WHERE id = $1', [id]);
        res.sendStatus(204);
    } catch (e) {
        console.log('Erro ao deletar url', e);
        res.status(500).send(`Erro ao deletar url, ${e}`);
    }
}