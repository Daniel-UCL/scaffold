'use client';

import { useState } from 'react';

export default function DemoLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch('/api/demo-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      setResult(data);
    } catch {
      setResult({ error: 'Network error' });
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ maxWidth: 420, margin: '2rem auto', padding: '1rem' }}>
      <h1>Demo Login</h1>

      <p>Use any email/password from your <code>members.yml</code> file.</p>

      <form onSubmit={handleSubmit} style={{ marginTop: '1rem' }}>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
        />

        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
        />

        <button type="submit" disabled={loading} style={{ padding: '0.5rem 1rem' }}>
          {loading ? 'Signing in…' : 'Sign in'}
        </button>
      </form>

      {/* Display results */}
      {result?.error && (
        <p style={{ color: 'red', marginTop: '1rem' }}>{result.error}</p>
      )}

      {result?.ok && (
        <section
          style={{
            marginTop: '2rem',
            padding: '1rem',
            border: '1px solid #ccc',
            whiteSpace: 'pre-line',
          }}
        >
          <h2>Personalised Greeting</h2>
          <p>{result.message}</p>
        </section>
      )}
    </main>
  );
}
