import pg from 'pg';

const {Pool} = pg;
const db = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

console.log('Conectado ao postgres');

export default db;