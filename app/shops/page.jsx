'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ShopDetailPage({ params }) {
  const router = useRouter();
  const { shopId } = params;

  const [loading, setLoading] = useState(true);
  const [shop, setShop] = useState(null);
  const [aiPrompt, setAiPrompt] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    fetch(`http://localhost:4000/api/shop/${shopId}`)
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);
        setShop(data.shop);
        setAiPrompt(data.shop.aiPrompt || "");
      })
      .catch(() => {
        setError("Mağaza bulunamadı veya hata oluştu.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [shopId]);

  const handleSave = async () => {
    setSaving(true);
    setError('');

    const token = localStorage.getItem("token");

    try {
      const res = await fetch("http://localhost:4000/api/update-shop", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          shopId,
          aiPrompt,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error);

      alert("Kaydedildi!");
    } catch (err) {
      setError("Kaydedilemedi.");
    }

    setSaving(false);
  };

  if (loading) return <p>Yükleniyor...</p>;
  if (!shop) return <p>Mağaza bilgisi alınamadı.</p>;

  return (
    <section>
      <h1>{shop.name} — Ayarlar</h1>

      <h3>Embed Kodu</h3>
      <pre style={{ background: "#eee", padding: 10 }}>
{`<script src="http://localhost:4000/embed/assistant.js" 
        data-shop="${shopId}"></script>`}
      </pre>

      <h3>AI Açılış Mesajı</h3>
      <textarea
        value={aiPrompt}
        onChange={(e) => setAiPrompt(e.target.value)}
        style={{ width: "100%", height: 120 }}
      />

      {error && <p style={{ color: "red" }}>{error}</p>}

      <button onClick={handleSave} disabled={saving}>
        {saving ? "Kaydediliyor..." : "Kaydet"}
      </button>

      <br /><br />
      <button onClick={() => router.push("/dashboard")}>
        Geri Dön
      </button>
    </section>
  );
}
