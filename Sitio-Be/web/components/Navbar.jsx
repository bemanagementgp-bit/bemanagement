import Link from "next/link";

export default function Navbar({ active = "home" }) {
  const base = "text-sm font-semibold transition-colors";
  const inactive = "text-white/70 hover:text-white";
  const activeCls = "text-white";

  return (
    <nav id="navbar" className="px-6 md:px-12 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <img src="/assets/Logo.png" alt="Be Management Logo" className="h-9 w-auto" />
          <span className="font-bold text-base tracking-wide hidden sm:block">Be Management</span>
        </Link>
        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className={`${base} ${active === "home" ? activeCls : inactive}`}>Inicio</Link>
          <Link href="/#servicios" className={`${base} ${inactive}`}>Servicios</Link>
          <Link href="/proyectos" className={`${base} ${active === "proyectos" ? activeCls : inactive}`}>Proyectos</Link>
          <Link href="/#capacitaciones" className={`${base} ${inactive}`}>Capacitaciones</Link>
          <Link href="/#contacto" className={`${base} ${inactive}`}>Contacto</Link>
        </div>
        <Link href="/#contacto" className="btn-grad btn-magnetic px-5 py-2.5 rounded-sm text-xs uppercase tracking-widest">
          Hablemos
        </Link>
      </div>
    </nav>
  );
}
