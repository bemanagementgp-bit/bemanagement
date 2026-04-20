import Link from "next/link";

export default function Footer() {
  return (
    <footer className="sec-black px-6 md:px-12 py-12" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-10">
          <div className="flex flex-col gap-3">
            <Link href="/" className="flex items-center gap-3">
              <img src="/assets/Logo.png" alt="Be Management" className="h-9 w-auto" />
              <span className="font-bold tracking-wide">Be Management</span>
            </Link>
            <p className="text-sm font-semibold" style={{ color: "rgba(255,255,255,0.35)" }}>
              Hacemos que tu marca venda.
            </p>
          </div>
          <nav className="flex flex-wrap gap-6">
            <Link href="/" className="text-sm transition-colors" style={{ color: "rgba(255,255,255,0.45)" }}>Inicio</Link>
            <Link href="/#servicios" className="text-sm transition-colors" style={{ color: "rgba(255,255,255,0.45)" }}>Servicios</Link>
            <Link href="/proyectos" className="text-sm transition-colors" style={{ color: "rgba(255,255,255,0.45)" }}>Proyectos</Link>
            <Link href="/#contacto" className="text-sm transition-colors" style={{ color: "rgba(255,255,255,0.45)" }}>Contacto</Link>
          </nav>
          <a
            href="https://instagram.com/bemanagement.pro"
            target="_blank"
            rel="noopener"
            className="flex items-center gap-2 text-sm font-semibold transition-colors"
            style={{ color: "rgba(255,255,255,0.45)" }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
            </svg>
            @bemanagement.pro
          </a>
        </div>
        <div
          className="flex flex-col md:flex-row justify-between items-center gap-4 pt-6"
          style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
        >
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.2)" }}>
            © 2025 Be Management. Todos los derechos reservados.
          </p>
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.2)" }}>
            bemanagement.pro
          </p>
        </div>
      </div>
    </footer>
  );
}
