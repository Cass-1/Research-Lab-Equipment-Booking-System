'use client';
import { useEffect, useState } from 'react';

export default function TestPage() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/test')
      .then(res => res.json())
      .then(setData);
  }, []);

  return (
    <div>
      <h1>Database Test</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}