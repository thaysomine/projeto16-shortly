import db from '../db.js';

export async function getUser (req, res) {
    const {id} = req.params;

    try {
        const user = await db.query(`
        SELECT u.id AS "userId", u.name, l.id AS "linkId", l."shortUrl", urls.url, l.views 
        FROM users u
        LEFT JOIN links l ON l."userId" = u.id 
        LEFT JOIN urls ON l."urlId" = urls.id
        WHERE u.id = $1
        `, [id]);
        if (user.rows.length === 0) {
            res.status(404).send('Usuário não encontrado');
            return;
        }
        const shortenedUrls = [];
        let totalViews = 0;
        console.log(user.rows);
        user.rows.map(link => {
            console.log(link);
            if(link.linkId !== null) {
                let obj = {
                    id: link.linkId,
                    shortUrl: link.shortUrl,
                    url: link.url,
                    visitCount: link.views
                }
                shortenedUrls.push(obj);
                totalViews += link.views;
            }
        });
        const userObj = {
            id: user.rows[0].userId,
            name: user.rows[0].name,
            visitCount: totalViews,
            shortenedUrls: shortenedUrls
        }
        res.status(200).send(userObj);
    } catch (error) {
        console.log(error)
        res.status(500).send(error);
    }
}

// export async function getRanking(req, res) {
//     try {

//     }
// }