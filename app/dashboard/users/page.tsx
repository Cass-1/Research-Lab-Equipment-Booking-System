import client from '@/app/_lib/db';

export default async function TestPage() {
  const users = (await client!.query('SELECT * from users;')).rows;
  return (
    <div>
      <h1>Database Test</h1>
      <pre>{JSON.stringify(users, null, 2)}</pre>
    </div>
  );
}