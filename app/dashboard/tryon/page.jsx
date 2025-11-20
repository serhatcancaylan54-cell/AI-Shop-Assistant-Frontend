"use client";
import { useState } from "react";

export default function TryOnPage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  // Dosya seçildiğinde çalışır
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);

    // Önizleme
    const url = URL.createObjectURL(file);
    setPreview(url);
  };

  // Dosyayı Base64'e çeviren fonksiyon
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(",")[1]); 
      reader.onerror = (error) => reject(error);
    });
  };

  // Backend'e gönderme
  const analyzeImage = async () => {
    if (!selectedFile) {
      alert("Lütfen bir görsel seçin.");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const base64 = await convertToBase64(selectedFile);

      const response = await fetch("http://localhost:4000/api/tryon/describe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ imageBase64: base64 }),
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Frontend error:", error);
      alert("Bir hata oluştu!");
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: 30 }}>
      <h1 style={{ fontSize: 26, fontWeight: "bold" }}>👗 Görsel Analiz (Try-On)</h1>
      <p>Bilgisayar veya telefondan bir görsel seç → AI analiz etsin.</p>

      {/* Dosya Yükleme */}
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ marginTop: 20 }}
      />

      {/* Önizleme */}
      {preview && (
        <>
          <h3>Önizleme:</h3>
          <img
            src={preview}
            alt="preview"
            style={{
              width: 300,
              marginTop: 10,
              borderRadius: 10,
              border: "2px solid #ddd",
            }}
          />
        </>
      )}

      {/* Buton */}
      <button
        onClick={analyzeImage}
        disabled={loading}
        style={{
          marginTop: 20,
          padding: "12px 22px",
          background: "#000",
          color: "#fff",
          borderRadius: 8,
          cursor: "pointer",
          fontSize: 16,
        }}
      >
        {loading ? "Analiz ediliyor..." : "Görseli Analiz Et"}
      </button>

      {/* Sonuç */}
      {result && (
        <div style={{ marginTop: 30 }}>
          <h2>AI Sonucu:</h2>
          <pre
            style={{
              background: "#111",
              color: "#0f0",
              padding: 20,
              borderRadius: 10,
              whiteSpace: "pre-wrap",
            }}
          >
{JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
