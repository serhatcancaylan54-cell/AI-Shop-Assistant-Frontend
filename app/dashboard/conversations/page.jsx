"use client";
import { useEffect, useState } from "react";

export default function ConversationsPage() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const shopId = "MAGAZA_ID"; // Burası otomatik doldurulacak

  useEffect(() => {
    async function loadLogs() {
      try {
        const res = await fetch(
          `http://localhost:4000/api/conversations/${shopId}`
        );

        const data = await res.json();

        // Gelen veri array değilse bile güvenli yapıyoruz
        setLogs(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Log yükleme hatası:", err);
        setLogs([]);
      }

      setLoading(false);
    }

    loadLogs();
  }, []);

  return (
    <section>
      <h1>Konuşma Geçmişi</h1>

      {loading && <p>Yükleniyor…</p>}

      {!loading && logs.length === 0 && (
        <p>Hiç konuşma kaydı bulunmuyor.</p>
      )}

      {!loading &&
        logs.map((item, i) => (
          <div
            key={i}
            style={{
              background: "#f5f5f5",
              padding: "10px",
              marginTop: "10px",
              borderRadius: "5px",
            }}
          >
            <p><b>Kullanıcı:</b> {item.userMessage}</p>
            <p><b>Asistan:</b> {item.aiReply}</p>
            <small>{new Date(item.createdAt).toLocaleString()}</small>
          </div>
        ))}
    </section>
  );
}
