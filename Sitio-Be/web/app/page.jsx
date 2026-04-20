"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HomeGsap from "@/components/HomeGsap";

const MARQUEE_ITEMS = [
  "Diseño & Branding",
  "Marketing Digital",
  "Desarrollo Web",
  "Publicidad & Ads",
  "Producciones Audiovisuales",
  "IA Generativa",
  "Fotografía",
];

const SERVICES = [
  { num: "01", title: "Diseño & Branding", desc: "Identidades visuales que comunican, conectan y convierten. Logos, paletas, tipografías y sistemas completos.", filter: "redes", icon: (
    <>
      <rect x="2" y="2" width="10" height="10" rx="1" stroke="#FF6A00" strokeWidth="1.5" />
      <rect x="16" y="2" width="10" height="10" rx="1" stroke="#FF6A00" strokeWidth="1.5" opacity="0.5" />
      <rect x="9" y="16" width="10" height="10" rx="1" stroke="#FF6A00" strokeWidth="1.5" opacity="0.3" />
    </>
  )},
  { num: "02", title: "Marketing Digital", desc: "Estrategias de contenido que posicionan tu marca y generan ventas reales. Community management, calendarios y análisis.", filter: "redes", icon: (
    <>
      <path d="M4 22 L8 14 L13 18 L18 8 L24 6" stroke="#FF6A00" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="24" cy="6" r="2.5" stroke="#FF6A00" strokeWidth="1.5" opacity="0.5" />
    </>
  )},
  { num: "03", title: "Desarrollo Web", desc: "Sitios y e-commerce diseñados para convertir visitantes en clientes. Rápidos, accesibles y optimizados para SEO.", filter: "desarrollo-web", icon: (
    <>
      <rect x="2" y="5" width="24" height="18" rx="2" stroke="#FF6A00" strokeWidth="1.5" />
      <path d="M9 12 L6 15 L9 18" stroke="#FF6A00" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
      <path d="M19 12 L22 15 L19 18" stroke="#FF6A00" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
      <path d="M16 10 L12 20" stroke="#FF6A00" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
    </>
  )},
  { num: "04", title: "Publicidad & Ads", desc: "Campañas en Meta, Google y TikTok que maximizan tu ROI. Segmentación precisa, creatividades y optimización continua.", filter: "redes", icon: (
    <>
      <circle cx="14" cy="14" r="11" stroke="#FF6A00" strokeWidth="1.5" />
      <path d="M14 3 A11 11 0 0 1 25 14" stroke="#FF6A00" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      <path d="M18 10 L10 14 L14 22 L18 10Z" stroke="#FF6A00" strokeWidth="1.5" strokeLinejoin="round" opacity="0.4" />
    </>
  )},
  { num: "05", title: "Producciones Audiovisuales", desc: "Reels, spots, fotografía de producto y contenido para campañas. Todo en un equipo integrado con tu estrategia.", filter: "audiovisual", icon: (
    <>
      <rect x="2" y="7" width="18" height="14" rx="2" stroke="#FF6A00" strokeWidth="1.5" />
      <path d="M20 11 L26 8 L26 20 L20 17" stroke="#FF6A00" strokeWidth="1.5" strokeLinejoin="round" opacity="0.5" />
      <circle cx="11" cy="14" r="3" stroke="#FF6A00" strokeWidth="1.5" opacity="0.3" />
    </>
  )},
  { num: "06", title: "Edición de Video", desc: "Post-producción profesional: corte, color, motion graphics y música. Contenido que retiene y convierte en cualquier plataforma.", filter: "audiovisual", icon: (
    <>
      <path d="M4 14 L10 8 L10 11 L18 11 L18 8 L24 14 L18 20 L18 17 L10 17 L10 20 Z" stroke="#FF6A00" strokeWidth="1.5" strokeLinejoin="round" opacity="0.5" />
      <circle cx="14" cy="14" r="11" stroke="#FF6A00" strokeWidth="1.5" opacity="0.3" />
      <path d="M11 10 L11 18 M14 9 L14 19 M17 10 L17 18" stroke="#FF6A00" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
    </>
  )},
];

const ARROW_ICON = (
  <svg className="arrow-icon w-5 h-5 text-white/30" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
  </svg>
);

const LOGO_COUNT = 28;
const logoIndexes = Array.from({ length: LOGO_COUNT * 2 }, (_, i) => (i % LOGO_COUNT) + 1);

export default function Home() {
  const router = useRouter();

  const handleForm = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const btn = form.querySelector('button[type="submit"]');
    const orig = btn.textContent;
    const fd = new FormData(form);
    const payload = {
      nombre: fd.get("nombre"),
      apellido: fd.get("apellido"),
      email: fd.get("email"),
      telefono: fd.get("telefono"),
      mensaje: fd.get("mensaje"),
    };
    btn.disabled = true;
    btn.textContent = "Enviando...";
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) throw new Error(data.error || "Error al enviar");
      btn.textContent = "¡Mensaje enviado!";
      btn.style.background = "rgba(0,0,0,0.15)";
      form.reset();
    } catch (err) {
      btn.textContent = "Error: reintentá";
      btn.style.background = "rgba(200,0,0,0.2)";
    } finally {
      setTimeout(() => {
        btn.textContent = orig;
        btn.style.background = "";
        btn.disabled = false;
      }, 3500);
    }
  };

  const goTo = (path) => () => router.push(path);

  return (
    <>
      <Navbar active="home" />

      {/* HERO */}
      <section className="sec-black relative flex items-center pt-20 overflow-hidden" id="hero" style={{ minHeight: "72vh" }}>
        <div
          id="hero-bg-glow"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 65% 55% at 68% 45%, rgba(255,106,0,0.08) 0%, transparent 65%), radial-gradient(ellipse 40% 40% at 20% 75%, rgba(255,60,0,0.04) 0%, transparent 60%)",
            zIndex: 0,
          }}
        ></div>
        <div id="hero-grid"></div>
        <div id="hero-logo-wrap">
          <img id="hero-float-logo" src="/assets/Logo.png" alt="" />
        </div>

        <div id="hero-content" className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
          <p id="hero-label" className="section-label mb-6">La Plata, Buenos Aires, Argentina</p>
          <h1 className="mb-8" style={{ fontFamily: "'Montserrat', sans-serif", lineHeight: 1.05 }}>
            <span
              id="ht-line1"
              style={{
                display: "block", opacity: 0, fontSize: "clamp(2.6rem, 7vw, 6rem)",
                fontWeight: 500, letterSpacing: "0.07em", color: "#ffffff", textTransform: "uppercase",
              }}
            >
              Marketing
            </span>
            <span
              id="ht-line2"
              className="grad-text"
              style={{
                display: "block", opacity: 0, fontSize: "clamp(4.5rem, 13vw, 11rem)",
                fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 1.1, paddingBottom: "0.08em",
              }}
            >
              Digital
            </span>
          </h1>
          <p id="hero-sub-text" className="text-sm md:text-base font-semibold uppercase tracking-widest text-white/50 max-w-2xl mb-12 leading-loose">
            Crecimiento Real, Impulsado por tu Marca.
          </p>
          <div id="hero-ctas" className="flex flex-wrap items-center gap-5">
            <a href="#contacto" className="btn-grad btn-magnetic px-8 py-4 rounded-sm text-sm uppercase tracking-widest font-black">
              Empecemos ahora
            </a>
            <Link href="/proyectos" className="ghost-link flex items-center gap-2">
              Ver proyectos <span className="text-lg">→</span>
            </Link>
          </div>
        </div>

        <div id="hero-scroll-hint" className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2" style={{ opacity: 0 }}>
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <div className="w-px h-12" style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0.6), transparent)" }}></div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="sec-black py-5 overflow-hidden" style={{ borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="marquee-track">
          <span className="flex items-center">
            {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((label, i) => (
              <span key={i} className="flex items-center">
                <span className="text-xs font-semibold uppercase tracking-widest text-white/50 px-4">{label}</span>
                <span className="dot-sep"></span>
              </span>
            ))}
          </span>
        </div>
      </div>

      <div className="divider-bw"></div>

      {/* STATS */}
      <section className="sec-white py-20 px-6 md:px-12" id="stats">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4">
          <div className="stat-item-white text-center py-10 px-4 reveal">
            <p className="text-5xl md:text-6xl font-black grad-text mb-2" data-counter="80" data-prefix="+">+80</p>
            <p className="text-xs uppercase tracking-widest font-semibold" style={{ color: "rgba(0,0,0,0.4)" }}>Clientes</p>
          </div>
          <div className="stat-item-white text-center py-10 px-4 reveal" style={{ transitionDelay: "0.1s" }}>
            <p className="text-5xl md:text-6xl font-black grad-text mb-2" data-counter="5" data-suffix="+">5+</p>
            <p className="text-xs uppercase tracking-widest font-semibold" style={{ color: "rgba(0,0,0,0.4)" }}>Años</p>
          </div>
          <div className="stat-item-white text-center py-10 px-4 reveal" style={{ transitionDelay: "0.2s" }}>
            <p className="text-5xl md:text-6xl font-black grad-text mb-2" data-counter="3" data-suffix="×">3×</p>
            <p className="text-xs uppercase tracking-widest font-semibold" style={{ color: "rgba(0,0,0,0.4)" }}>ROI Promedio</p>
          </div>
          <div className="text-center py-10 px-4 reveal" style={{ transitionDelay: "0.3s" }}>
            <p className="text-5xl md:text-6xl font-black grad-text mb-2">360°</p>
            <p className="text-xs uppercase tracking-widest font-semibold" style={{ color: "rgba(0,0,0,0.4)" }}>Gestión</p>
          </div>
        </div>
      </section>

      {/* LOGOS MARQUEE */}
      <div className="sec-black py-6 overflow-hidden" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="overflow-hidden">
          <span style={{ display: "flex", gap: "28px", alignItems: "center", animation: "logoMarqueeHome 50s linear infinite", whiteSpace: "nowrap", width: "max-content", willChange: "transform" }}>
            {logoIndexes.map((n, i) => (
              <img
                key={i}
                src={`/assets/clientes/logo-clientes/${n}.png`}
                alt=""
                style={{ height: "44px", width: "130px", objectFit: "contain", filter: "grayscale(100%) brightness(1.8)", opacity: 0.4 }}
              />
            ))}
          </span>
        </div>
      </div>

      <div className="divider-wb"></div>

      {/* SERVICES */}
      <section className="sec-black py-16 md:py-28 px-6 md:px-12" id="servicios">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 reveal">
            <p className="section-label mb-3">Servicios</p>
            <h2 className="text-4xl md:text-6xl font-black uppercase leading-tight">
              Lo que <span className="grad-text">HACEMOS</span>
            </h2>
          </div>
          <div className="services-grid">
            <div
              className="service-card reveal p-8 md:p-10 rounded-sm flex flex-col md:flex-row md:items-center gap-8 col-span-1 md:col-span-2 lg:col-span-3 cursor-pointer"
              style={{ background: "linear-gradient(135deg, #FF4500, #FF8C00)", borderColor: "transparent" }}
              onClick={goTo("/proyectos?filter=marketing-360")}
            >
              <div className="flex-1">
                <span className="text-xs font-black tracking-widest text-white/60 uppercase">Servicio Destacado</span>
                <h3 className="text-4xl md:text-5xl font-black text-white mt-2 mb-3">360°</h3>
                <p className="text-lg font-semibold text-white/90">Nos convertimos en socios de tu negocio</p>
                <p className="text-sm text-white/70 mt-2 max-w-lg">Estrategia, diseño, contenido, publicidad y análisis. Todo integrado, todo alineado a tus resultados.</p>
              </div>
              <div className="flex items-center gap-6 flex-wrap">
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                  <circle cx="18" cy="18" r="16" stroke="white" strokeWidth="1.5" opacity="0.5" />
                  <path d="M18 6 A12 12 0 0 1 30 18" stroke="white" strokeWidth="2" strokeLinecap="round" />
                  <path d="M22 13 L13 18 L18 28 L22 13Z" stroke="white" strokeWidth="1.5" strokeLinejoin="round" opacity="0.8" />
                </svg>
                <div className="text-white font-bold text-sm uppercase tracking-widest flex items-center gap-2">
                  Ver proyectos <span className="text-xl">→</span>
                </div>
              </div>
            </div>

            {SERVICES.map((s, i) => (
              <div
                key={s.num}
                className="service-card reveal p-8 rounded-sm flex flex-col gap-6 cursor-pointer"
                style={{ transitionDelay: `${i * 0.05}s` }}
                onClick={goTo(`/proyectos?filter=${s.filter}`)}
              >
                <div className="flex justify-between items-start">
                  <span className="text-xs font-black tracking-widest" style={{ color: "rgba(255,100,0,0.35)" }}>{s.num}</span>
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">{s.icon}</svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-3">{s.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>{s.desc}</p>
                </div>
                <div className="mt-auto flex justify-end">{ARROW_ICON}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROYECTOS TEASER */}
      <section className="sec-black py-16 md:py-28 px-6 md:px-12" id="proyectos-teaser" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="reveal flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div>
              <p className="section-label mb-3">Proyectos</p>
              <h2 className="text-4xl md:text-6xl font-black uppercase leading-tight">
                Nuestros <span className="grad-text">PROYECTOS</span>
              </h2>
            </div>
            <Link href="/proyectos" className="ghost-link shrink-0 flex items-center gap-2">
              Ver todos <span className="text-lg">→</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { slug: "lo-de-jorge", img: "cliente-ldj.png", tags: "Redes · Audiovisual · Web", title: "Lo de Jorge", sub: "Parrilla Restó" },
              { slug: "antonino", img: "cliente-antonino.png", tags: "Redes · Desarrollo Web", title: "Antonino", sub: "Almacén de Fiambres" },
              { slug: "maxipiso", img: "cliente-maxipiso.png", tags: "Marketing 360°", title: "MaxiPiso", sub: "Líder Mayorista" },
            ].map((p, i) => (
              <Link key={p.slug} href={`/proyectos/${p.slug}`} className="proj-card reveal block h-80" style={{ transitionDelay: `${i * 0.1}s` }}>
                <img src={`/assets/clientes/${p.img}`} alt={p.title} />
                <div className="overlay"></div>
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <p className="text-xs uppercase tracking-widest font-semibold mb-2" style={{ color: "rgba(255,150,0,0.85)" }}>{p.tags}</p>
                  <h3 className="text-xl font-black mb-1">{p.title}</h3>
                  <p className="text-xs mb-3" style={{ color: "rgba(255,255,255,0.5)" }}>{p.sub}</p>
                  <div className="proj-cta">
                    <span className="text-xs font-bold uppercase tracking-widest grad-text">Ver proyecto →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="reveal mt-10 text-center">
            <Link href="/proyectos" className="btn-grad btn-magnetic inline-block px-8 py-4 rounded-sm text-xs uppercase tracking-widest font-black">
              Ver todos los proyectos →
            </Link>
          </div>
        </div>
      </section>

      <div className="divider-bw"></div>

      {/* IA GENERATIVA */}
      <section className="sec-white py-16 md:py-28 px-6 md:px-12" id="ia-generativa">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
          <div className="reveal">
            <span
              className="inline-block text-xs font-black uppercase tracking-widest px-3 py-1.5 rounded-full mb-6"
              style={{ background: "linear-gradient(90deg,#FF4500,#FF8C00)", color: "#fff", letterSpacing: "0.2em" }}
            >
              NUEVO
            </span>
            <p className="section-label mb-4">Inteligencia Artificial</p>
            <h2 className="text-4xl md:text-6xl font-black uppercase leading-tight mb-6">
              <span className="grad-text">IA Generativa</span>
              <br />
              para tu marca
            </h2>
            <p className="text-sm leading-relaxed mb-8" style={{ color: "rgba(0,0,0,0.55)" }}>
              Automatizamos la creación de contenido, personalizamos experiencias a escala y potenciamos cada área de tu estrategia digital con modelos de inteligencia artificial de última generación.
            </p>
            <a href="#contacto" className="btn-grad btn-magnetic inline-block px-8 py-4 rounded-sm text-sm uppercase tracking-widest font-black">
              Hablemos →
            </a>
          </div>
          <div className="reveal flex items-center justify-center">
            <div style={{ border: "1.5px solid rgba(255,106,0,0.6)", padding: "8px", width: "100%" }}>
              <video autoPlay loop muted playsInline preload="auto" className="w-full" style={{ maxHeight: "420px", objectFit: "cover", display: "block" }}>
                <source src="/assets/ia-generativa.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      </section>

      {/* CAPACITACIONES */}
      <section className="sec-white py-16 md:py-28 px-6 md:px-12" id="capacitaciones" style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="reveal mb-16">
            <p className="section-label mb-3">Formación</p>
            <h2 className="text-4xl md:text-6xl font-black uppercase leading-tight" style={{ color: "#080808" }}>
              Nuestras <span className="grad-text">CAPACITACIONES</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Capacitación Meta Ads",
                desc: "Aprendé a crear, optimizar y escalar campañas publicitarias en Facebook e Instagram. Desde la configuración del Business Manager hasta estrategias avanzadas de segmentación y conversión.",
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="#FF6A00" strokeWidth="1.5" />
                    <circle cx="12" cy="12" r="6" stroke="#FF6A00" strokeWidth="1.5" />
                    <circle cx="12" cy="12" r="2" fill="#FF6A00" />
                  </svg>
                ),
              },
              {
                title: "Diseño en Redes Sociales",
                desc: "Dominá las herramientas y principios de diseño para crear contenido visual que destaque. Composición, tipografía, paletas de color y flujos de trabajo profesionales para redes.",
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M12 19L5 12L8 5H16L19 12L12 19Z" stroke="#FF6A00" strokeWidth="1.5" strokeLinejoin="round" />
                    <circle cx="12" cy="12" r="2" fill="#FF6A00" />
                    <path d="M12 5V3M19 12H21M12 19V21M5 12H3" stroke="#FF6A00" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                ),
              },
              {
                title: "Asesoría Creación de Contenido",
                desc: "Desarrollá una estrategia de contenido coherente y efectiva para tu marca. Planificación editorial, ideas de formatos, copywriting y métricas para medir el impacto real.",
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2C8.686 2 6 4.686 6 8c0 2.188 1.11 4.11 2.8 5.25V15h6.4v-1.75C16.89 12.11 18 10.188 18 8c0-3.314-2.686-6-6-6Z" stroke="#FF6A00" strokeWidth="1.5" strokeLinejoin="round" />
                    <path d="M9 15v1a3 3 0 0 0 6 0v-1" stroke="#FF6A00" strokeWidth="1.5" />
                    <path d="M10 9h4M12 7v4" stroke="#FF6A00" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                ),
              },
            ].map((c, i) => (
              <div
                key={i}
                className="reveal flex flex-col gap-6 p-8 rounded-sm transition-all"
                style={{ border: "1px solid rgba(0,0,0,0.08)", background: "#fff", transitionDelay: `${i * 0.08}s` }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,100,0,0.4)";
                  e.currentTarget.style.boxShadow = "0 0 32px rgba(255,80,0,0.08)";
                  e.currentTarget.style.transform = "translateY(-4px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(0,0,0,0.08)";
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-sm" style={{ background: "rgba(255,80,0,0.08)" }}>
                  {c.icon}
                </div>
                <div>
                  <h3 className="font-black text-lg uppercase mb-3" style={{ color: "#080808" }}>{c.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(0,0,0,0.5)" }}>{c.desc}</p>
                </div>
                <a href="#contacto" className="mt-auto flex items-center gap-2 text-xs font-bold uppercase tracking-widest" style={{ color: "#FF6A00" }}>
                  Consultar <span>→</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider-wb"></div>

      {/* WHY US */}
      <section className="sec-black py-16 md:py-28 px-6 md:px-12" id="nosotros">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
          <div className="reveal flex flex-col items-center justify-center gap-8">
            <div className="relative w-56 h-56 md:w-72 md:h-72 flex items-center justify-center">
              <svg className="ring-spin absolute inset-0 w-full h-full" viewBox="0 0 288 288" fill="none">
                <circle cx="144" cy="144" r="130" stroke="url(#ringGrad)" strokeWidth="1" strokeDasharray="8 6" />
                <defs>
                  <linearGradient id="ringGrad" x1="0" y1="0" x2="288" y2="288" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#FF4500" />
                    <stop offset="100%" stopColor="#FF8C00" stopOpacity="0.2" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-8 rounded-full" style={{ border: "1px solid rgba(255,255,255,0.05)" }}></div>
              <img src="/assets/Logo.png" alt="Be Management" className="w-28 h-28 object-contain relative z-10" />
            </div>
            <div className="text-center">
              <p className="text-xs font-black uppercase tracking-widest grad-text">Be / Management</p>
              <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.3)" }}>La Plata, Buenos Aires</p>
            </div>
          </div>
          <div className="reveal space-y-10">
            <div>
              <p className="section-label mb-4">Por qué elegirnos</p>
              <h2 className="text-4xl md:text-5xl font-black uppercase leading-tight mb-8">
                Somos tu<br />
                <span className="grad-text">equipo.</span>
              </h2>
            </div>
            <div className="space-y-8">
              {[
                { n: "01", t: "Estrategia antes que ejecución", d: "Antes de publicar cualquier pieza, entendemos tu mercado, tu competencia y tus objetivos. La estrategia es el cimiento de todo resultado." },
                { n: "02", t: "Equipo multidisciplinario", d: "Diseñadores, redactores, community managers, desarrolladores y videomakers trabajando en conjunto para tu marca." },
                { n: "03", t: "Métricas que importan", d: "No medimos likes. Medimos alcance, conversiones, ventas y ROI. Reportes mensuales claros y accionables." },
              ].map((x) => (
                <div key={x.n} className="flex gap-5 items-start">
                  <span className="text-2xl font-black grad-text shrink-0 w-8">{x.n}</span>
                  <div>
                    <h4 className="font-bold mb-1">{x.t}</h4>
                    <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>{x.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="divider-bw"></div>

      {/* CONTACT */}
      <section className="sec-white py-16 md:py-28 px-6 md:px-12" id="contacto">
        <div className="max-w-6xl mx-auto">
          <div className="reveal relative rounded-sm overflow-hidden p-10 md:p-16" style={{ background: "#f0f0f0", border: "1px solid rgba(0,0,0,0.08)" }}>
            <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(255,80,0,0.08) 0%, transparent 65%)" }}></div>
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-14">
              <div>
                <p className="section-label mb-3">Contacto</p>
                <h2 className="text-3xl md:text-4xl font-black uppercase leading-tight mb-8" style={{ color: "#080808" }}>
                  ¿Listo para <span className="grad-text">crecer?</span>
                </h2>
                <form className="space-y-4" onSubmit={handleForm}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input type="text" name="nombre" placeholder="Nombre" className="form-field w-full px-4 py-3 rounded-sm text-sm" required />
                    <input type="text" name="apellido" placeholder="Apellido" className="form-field w-full px-4 py-3 rounded-sm text-sm" required />
                  </div>
                  <input type="email" name="email" placeholder="Email" className="form-field w-full px-4 py-3 rounded-sm text-sm" required />
                  <input type="tel" name="telefono" placeholder="Teléfono" className="form-field w-full px-4 py-3 rounded-sm text-sm" />
                  <textarea name="mensaje" placeholder="Contanos sobre tu proyecto..." rows={4} className="form-field w-full px-4 py-3 rounded-sm text-sm resize-none" required></textarea>
                  <button type="submit" className="btn-grad btn-magnetic w-full py-4 rounded-sm text-sm uppercase tracking-widest font-black">
                    Enviar mensaje
                  </button>
                </form>
              </div>
              <div className="flex flex-col justify-between gap-10">
                <div>
                  <h3 className="text-xl font-bold mb-4" style={{ color: "#080808" }}>Consultoría Personalizada</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(0,0,0,0.5)" }}>
                    Cada marca es única. Nos tomamos el tiempo para entender tus objetivos, tu mercado y tu audiencia antes de proponer una estrategia. La primera consulta es sin costo.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 mb-8">
                  <a href="https://calendly.com/be-pro/30min" target="_blank" rel="noopener" className="btn-grad btn-magnetic flex-1 flex items-center justify-center gap-2 px-5 py-4 rounded-sm text-sm uppercase tracking-wider font-black">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <rect x="2" y="4" width="20" height="18" rx="2" stroke="white" strokeWidth="1.5" />
                      <path d="M16 2v4M8 2v4M2 10h20" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                    Agendar llamada
                  </a>
                  <a
                    href="https://api.whatsapp.com/send/?phone=5492216925774&text&type=phone_number&app_absent=0"
                    target="_blank"
                    rel="noopener"
                    className="flex-1 flex items-center justify-center gap-2 px-5 py-4 rounded-sm text-sm uppercase tracking-wider font-black border-2 transition-all hover:bg-black hover:text-white"
                    style={{ borderColor: "#FF6A00", color: "#FF6A00", background: "transparent" }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path d="M20.52 3.48A11.93 11.93 0 0012 0C5.37 0 0 5.37 0 12c0 2.11.55 4.17 1.6 5.98L0 24l6.18-1.57A12 12 0 0012 24c6.63 0 12-5.37 12-12 0-3.2-1.25-6.21-3.48-8.52z" fill="currentColor" opacity="0.15" />
                      <path d="M17.4 14.4c-.3-.15-1.77-.87-2.04-.97s-.47-.15-.67.15-.77.97-.94 1.17-.35.22-.64.07a8.1 8.1 0 01-2.38-1.47 8.93 8.93 0 01-1.65-2.05c-.17-.3 0-.46.13-.6l.43-.5c.14-.17.18-.3.27-.49s.05-.37-.02-.52l-.93-2.25c-.25-.58-.5-.5-.67-.51H8c-.2 0-.52.07-.79.37s-1.04 1.02-1.04 2.47 1.06 2.86 1.21 3.06 2.09 3.18 5.05 4.46c.71.3 1.26.48 1.69.62.71.23 1.36.19 1.87.12.57-.09 1.77-.73 2.02-1.43s.25-1.3.17-1.43c-.07-.13-.27-.2-.57-.35z" fill="currentColor" />
                    </svg>
                    WhatsApp
                  </a>
                </div>
                <div className="space-y-5">
                  <a href="https://instagram.com/bemanagement.pro" target="_blank" rel="noopener" className="flex items-center gap-4 group">
                    <div className="w-11 h-11 rounded-sm flex items-center justify-center shrink-0" style={{ background: "#e8e8e8", border: "1px solid rgba(0,0,0,0.1)" }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <rect x="2" y="2" width="20" height="20" rx="5" stroke="#FF6A00" strokeWidth="1.5" />
                        <circle cx="12" cy="12" r="4" stroke="#FF6A00" strokeWidth="1.5" />
                        <circle cx="17.5" cy="6.5" r="1" fill="#FF6A00" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-widest font-semibold mb-0.5" style={{ color: "rgba(0,0,0,0.35)" }}>Instagram</p>
                      <p className="text-sm font-bold group-hover:text-orange-500 transition-colors" style={{ color: "#080808" }}>@bemanagement.pro</p>
                    </div>
                  </a>
                  <a href="https://api.whatsapp.com/send/?phone=5492216925774&text&type=phone_number&app_absent=0" target="_blank" rel="noopener" className="flex items-center gap-4 group">
                    <div className="w-11 h-11 rounded-sm flex items-center justify-center shrink-0" style={{ background: "#e8e8e8", border: "1px solid rgba(0,0,0,0.1)" }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path d="M20.52 3.48A11.93 11.93 0 0012 0C5.37 0 0 5.37 0 12c0 2.11.55 4.17 1.6 5.98L0 24l6.18-1.57A12 12 0 0012 24c6.63 0 12-5.37 12-12 0-3.2-1.25-6.21-3.48-8.52z" fill="#FF6A00" opacity="0.15" />
                        <path d="M17.4 14.4c-.3-.15-1.77-.87-2.04-.97s-.47-.15-.67.15-.77.97-.94 1.17-.35.22-.64.07a8.1 8.1 0 01-2.38-1.47 8.93 8.93 0 01-1.65-2.05c-.17-.3 0-.46.13-.6l.43-.5c.14-.17.18-.3.27-.49s.05-.37-.02-.52l-.93-2.25c-.25-.58-.5-.5-.67-.51H8c-.2 0-.52.07-.79.37s-1.04 1.02-1.04 2.47 1.06 2.86 1.21 3.06 2.09 3.18 5.05 4.46c.71.3 1.26.48 1.69.62.71.23 1.36.19 1.87.12.57-.09 1.77-.73 2.02-1.43s.25-1.3.17-1.43c-.07-.13-.27-.2-.57-.35z" fill="#FF6A00" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-widest font-semibold mb-0.5" style={{ color: "rgba(0,0,0,0.35)" }}>WhatsApp</p>
                      <p className="text-sm font-bold group-hover:text-orange-500 transition-colors" style={{ color: "#080808" }}>Escribinos ahora</p>
                    </div>
                  </a>
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-sm flex items-center justify-center shrink-0" style={{ background: "#e8e8e8", border: "1px solid rgba(0,0,0,0.1)" }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z" fill="#FF6A00" opacity="0.7" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-widest font-semibold mb-0.5" style={{ color: "rgba(0,0,0,0.35)" }}>Ubicación</p>
                      <p className="text-sm font-bold" style={{ color: "#080808" }}>La Plata, Buenos Aires</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="divider-wb"></div>

      <Footer />
      <HomeGsap />
    </>
  );
}
