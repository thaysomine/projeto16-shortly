import db from '../db.js';

export async function getUserValidation (req, res, next) {
    const {authorization} = req.headers;
    const token = authorization?.replace('Bearer ', '').trim();
    const {id} = req.params;

    try {
        const checkUser = await db.query('SELECT * FROM users WHERE id = $1', [id]);
        if (checkUser.rows.length === 0) return res.status(404).send('Usuário não encontrado');
        const checkToken = await db.query('SELECT * FROM sessions WHERE token = $1', [token]);
        if (checkToken.rows.length === 0) return res.status(401).send('Token invalido');
        
        const userId = checkToken.rows[0].userId;
        if (userId.toString() !== id) return res.status(401).send('Não autorizado');
    } catch (e) {
        res.status(500).send(`Erro de validação ao deletar url, ${e}`);
    }

    next();
}