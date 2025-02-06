// Importation du module 'pg' pour PostgreSQL
import pg from 'pg';

const { Client } = pg;

// Configuration de la connexion PostgreSQL
const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'admin',
    password: 'password',
    database: 'test'
  });
  
// Fonction pour exécuter la requête SQL
const queryDatabase = async () => {
    try {
        await client.connect();
        const res = await client.query('SELECT * FROM users');
        return res.rows;
    } catch (err) {
        console.error('Erreur lors de la requête :', err);
        return [];
    } finally {
        await client.end();
    }
};

export default queryDatabase;