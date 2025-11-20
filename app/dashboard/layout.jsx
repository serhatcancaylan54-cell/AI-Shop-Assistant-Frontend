export default function DashboardLayout({ children }) {
  return (
    <div style={{ display: "flex" }}>
      
      {/* Sol Menü */}
      <aside style={{
        width: "220px",
        background: "#f5f5f5",
        padding: "20px",
        minHeight: "100vh",
        borderRight: "1px solid #ddd"
      }}>
        <h3>Yönetim</h3>

        <nav style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <a href="/dashboard">🏠 Dashboard</a>
          <a href="/dashboard/shops">🛒 Mağazalarım</a>
          <a href="/dashboard/conversations">💬 Konuşma Geçmişi</a>
        </nav>
      </aside>

      {/* İçerik */}
      <main style={{ flex: 1, padding: 30 }}>
        {children}
      </main>
    </div>
  );
}
