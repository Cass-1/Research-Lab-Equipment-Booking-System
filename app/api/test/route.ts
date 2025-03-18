import { Pool } from 'pg';

export async function GET() {
    const pool = new Pool({
        connectionString: process.env.POSTGRES_URL,
        ssl: {
            rejectUnauthorized: false // Required for Neon's SSL
        }
    });

    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * from users;');
        client.release();
        return Response.json(result.rows);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        return Response.json({ error: error.message }, { status: 500 });
    } finally {
        await pool.end();
    }
}