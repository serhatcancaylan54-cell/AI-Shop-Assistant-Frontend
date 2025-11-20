export default function HomePage() {
  return (
    <main style={{ padding: "40px", fontFamily: "sans-serif" }}>
      <h1>AI Shop Assistant SaaS</h1>
      <p style={{ marginTop: "10px", maxWidth: "600px", lineHeight: "1.6" }}>
        Tek embed kodu ile tüm e-ticaret mağazalarınıza yapay zekâ destekli satış danışmanı
        ekleyin. Mağazaları yönetmek, ürün akışlarını düzenlemek ve AI ayarlarını yapmak için
        sadece bu platformu kullanın.
      </p>

      <div style={{ marginTop: "20px" }}>
        <a href="/login">
          <button
            style={{
              padding: "12px 20px",
              background: "black",
              color: "white",
              borderRadius: "6px",
              cursor: "pointer",
              border: "none",
              fontSize: "16px"
            }}
          >
            Dashboard&apos;a Giriş Yap
          </button>
        </a>
      </div>
    </main>
  );
}
