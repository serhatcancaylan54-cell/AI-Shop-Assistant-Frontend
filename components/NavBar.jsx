import Link from 'next/link';

export default function NavBar() {
  return (
    <nav>
      <Link href="/">AI Shop Assistant</Link>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <Link href="/shops">Mağazalar</Link>
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/login">Giriş</Link>
        <Link href="/register">Kayıt</Link>
      </div>
    </nav>
  );
}