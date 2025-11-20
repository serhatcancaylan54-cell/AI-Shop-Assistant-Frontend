"use client";

import Link from "next/link";

export default function DashboardLayout({ children }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <aside
        style={{
          width: "250px",
          padding: "20px",
          background: "#f3f3f3",
          borderRight: "1px solid #ddd",
        }}
      >
        <h2>Yönetim</h2>

        <ul style={{ listStyle: "none", padding: 0, marginTop: "20px" }}>
          <li style={{ marginBottom: "10px" }}>
            <Link href="/dashboard">🏠 Gösterge Paneli</Link>
          </li>

          <li style={{ marginBottom: "10px" }}>
            <Link href="/dashboard/shops">🛒 Mağazalarım</Link>
          </li>

          <li style={{ marginBottom: "10px" }}>
            <Link href="/dashboard/conversations">💬 Konuşma Geçmişi</Link>
          </li>

          {/* 🔥 TRY-ON MENU */}
          <li style={{ marginBottom: "10px" }}>
            <Link href="/dashboard/tryon">👗 Try-On Analiz</Link>
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: "20px" }}>
        {children}
      </main>
    </div>
  );
}
