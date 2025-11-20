"use client";
import { useState, useEffect } from "react";

export default function ShopSettingsPage() {
  const [shopId, setShopId] = useState("TEST_SHOP");
  const [aiPrompt, setAiPrompt] = useState("");

  useEffect(() => {
    fetch(`http://localhost:4000/api/shop/settings/${shopId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.aiPrompt) setAiPrompt(data.aiPrompt);
      });
  }, [shopId]);

  const saveSettings = async () => {
    await fetch("http://localhost:4000/api/shop/settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ shopId, aiPrompt }),
    });

    alert("Kaydedildi!");
  };

  return (
    <div>
      <h1>Mağaza Ayarları</h1>

      <label>Mağaza ID</label>
      <input
        value={shopId}
        onChange={(e) => setShopId(e.target.value)}
        className="input"
      />

      <label>AI Açılış Mesajı / Persona</label>
      <textarea
        value={aiPrompt}
        onChange={(e) => setAiPrompt(e.target.value)}
        className="textarea"
      />

      <button onClick={saveSettings} className="button">
        Ayarları Kaydet
      </button>
    </div>
  );
}
