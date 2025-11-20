'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Backend API adresi
  const API_URL = "http://localhost:4000/api/register";

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Beklenmeyen bir hata oluştu.");
        setLoading(false);
        return;
      }

      // Kullanıcı başarıyla oluşturuldu → Login sayfasına git
      router.push("/login");

    } catch (err) {
      setError("Sunucuya bağlanılamadı.");
    }

    setLoading(false);
  };

  return (
    <section style={{ padding: 20 }}>
      <h1>Kayıt Ol</h1>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Şifre"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Kaydediliyor..." : "Hesap Oluştur"}
        </button>
      </form>
    </section>
  );
}
