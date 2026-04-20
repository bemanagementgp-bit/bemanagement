"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { projectCards } from "@/lib/projects";

const FILTERS = [
  { value: "todos", label: "Todos" },
  { value: "redes", label: "Redes" },
  { value: "desarrollo-web", label: "Desarrollo Web" },
  { value: "audiovisual", label: "Audiovisual" },
  { value: "marketing-360", label: "Marketing 360°" },
];

const LOGO_COUNT = 28;

function ProyectosInner() {
  const search = useSearchParams();
  const initial = search.get("filter") || "todos";
  const [active, setActive] = useState(initial);

  useEffect(() => {
    const f = search.get("filter") || "todos";
    setActive(f);
  }, [search]);

  const logos = Array.from({ length: LOGO_COUNT * 2 }, (_, i) => (i % LOGO_COUNT) + 1);

  // Order: matching first then non-matching (hidden)
  const ordered = [...projectCards].sort((a, b) => {
    if (active === "todos") return 0;
    const aMatch = a.dataTags.split(",").includes(active);
    const bMatch = b.dataTags.split(",").includes(active);
    if (aMatch === bMatch) return 0;
    return aMatch ? -1 : 1;
  });

  return (
    <>
      <Navbar active="proyectos" />

      {/* HERO */}
      <section className="sec-black relative flex items-end pt-32 pb-16 md:pt-40 md:pb-24 px-6 md:px-12 overflow-hidden" style={{ minHeight: "60vh" }}>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 75% 30%, rgba(255,106,0,0.08) 0%, transparent 65%), radial-gradient(ellipse 40% 40% at 15% 80%, rgba(255,60,0,0.05) 0%, transparent 60%)",
            zIndex: 0,
          }}
        ></div>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
            maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)",
            zIndex: 0,
          }}
        ></div>
        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <p className="section-label mb-6 hero-el">Proyectos / Portfolio</p>
          <h1 className="text-5xl md:text-8xl font-black uppercase leading-[0.95] mb-6 hero-el">
            Casos de <span className="grad-text">éxito</span>
          </h1>
          <p className="text-sm md:text-base font-semibold uppercase tracking-widest text-white/50 max-w-2xl mb-10 leading-relaxed hero-el">
            Marcas que confiaron en nosotros y decidieron crecer.
          </p>

          {/* Filters */}
          <div className="flex flex-wrap gap-3 hero-el">
            {FILTERS.map((f) => (
              <button
                key={f.value}
                type="button"
                className={`filter-btn rounded-sm ${active === f.value ? "active" : ""}`}
                onClick={() => setActive(f.value)}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* CLIENT LOGOS MARQUEE */}
      <div className="sec-black py-8 overflow-hidden" style={{ borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="logos-marquee-track">
          <div className="logos-marquee-inner">
            {logos.map((n, i) => (
              <img key={i} src={`/assets/clientes/logo-clientes/${n}.png`} alt="" className="logo-slide-img" />
            ))}
          </div>
        </div>
      </div>

      {/* PROJECTS GRID */}
      <section className="sec-black py-16 md:py-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ordered.map((p) => {
              const hidden = active !== "todos" && !p.dataTags.split(",").includes(active);
              return (
                <div key={p.slug} className={`card-wrap ${hidden ? "filtered" : ""}`} style={hidden ? { display: "none" } : {}}>
                  <Link href={`/proyectos/${p.slug}`} className="proj-card block h-80">
                    <img src={`/assets/clientes/${p.image}`} alt={p.title} />
                    <div className="overlay"></div>
                    <div className="absolute inset-0 p-6 flex flex-col justify-end">
                      <p className="text-xs uppercase tracking-widest font-semibold mb-2" style={{ color: "rgba(255,150,0,0.85)" }}>
                        {p.tags.join(" · ")}
                      </p>
                      <h3 className="text-xl font-black mb-1">{p.title}</h3>
                      <p className="text-xs mb-3" style={{ color: "rgba(255,255,255,0.5)" }}>{p.subtitle}</p>
                      <div className="proj-cta">
                        <span className="text-xs font-bold uppercase tracking-widest grad-text">Ver proyecto →</span>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA BAND */}
      <section className="sec-black py-20 px-6 md:px-12" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-4xl mx-auto text-center">
          <p className="section-label mb-4">¿Sos el próximo?</p>
          <h2 className="text-4xl md:text-6xl font-black uppercase leading-tight mb-8">
            Hablemos de <span className="grad-text">tu marca</span>
          </h2>
          <Link href="/#contacto" className="btn-grad btn-magnetic inline-block px-10 py-5 rounded-sm text-sm uppercase tracking-widest font-black">
            Empecemos ahora →
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default function ProyectosPage() {
  return (
    <Suspense fallback={null}>
      <ProyectosInner />
    </Suspense>
  );
}
