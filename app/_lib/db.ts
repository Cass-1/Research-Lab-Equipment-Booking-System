import { Pool, PoolClient } from 'pg';

let client: PoolClient | undefined;

if (!client) {
    const pool = new Pool({
        connectionString: process.env.POSTRES_URL,
        ssl: {
            rejectUnauthorized: false
        }
    })
    client = await pool.connect();
}

export default client;