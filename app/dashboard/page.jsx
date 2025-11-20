"use client";

import { useState, useEffect } from "react";

export default function ShopSettingsPage() {
  const [aiPrompt, setAiPrompt] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // SHOP ID (login olmuş mağaza ID’sini localStorage’dan alıyoruz)
  const shopId = typeof window !== "undefined" ? localStorage.getItem("shopId") : null;

  // ✔ Ayarları Firestore’dan çek
  useEffect(() => {
    if (!shopId) return;

    fetch(`http://localhost:4000/api/shop/settings/${shopId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.aiPrompt) {
          setAiPrompt(data.aiPrompt);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [shopId]);

  // ✔ Ayar kaydet
  const saveSettings = async () => {
    if (!shopId) return alert("Shop ID bulunamadı!");

    setSaving(true);

    const res = await fetch("http://localhost:4000/api/shop/settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        shopId,
        aiPrompt,
      }),
    });

    const data = await res.json();
    setSaving(false);

    if (data.success) {
      alert("Ayar başarıyla kaydedildi!");
    } else {
      alert("Hata oluştu!");
    }
  };

  if (loading) return <p>Ayarlar yükleniyor...</p>;

  return (
    <div style={{ padding: "20px", maxWidth: 800 }}>
      <h1>Mağaza Yapay Zeka Ayarları</h1>

      <label style={{ display: "block", marginTop: 20, fontWeight: "bold" }}>
        AI Karşılama Mesajı / Persona
      </label>

      <textarea
        style={{
          width: "100%",
          height: 150,
          padding: 10,
          marginTop: 5,
          borderRadius: 6,
          border: "1px solid #ddd",
          fontSize: 16,
        }}
        value={aiPrompt}
        onChange={(e) => setAiPrompt(e.target.value)}
      />

      <button
        onClick={saveSettings}
        style={{
          marginTop: 20,
          padding: "12px 20px",
          background: "#2563eb",
          color: "white",
          borderRadius: 6,
          border: "none",
          cursor: "pointer",
          fontSize: 16,
        }}
      >
        {saving ? "Kaydediliyor..." : "Kaydet"}
      </button>
    </div>
  );
}
