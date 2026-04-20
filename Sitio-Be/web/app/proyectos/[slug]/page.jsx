import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { projects, getProject, getAllSlugs } from "@/lib/projects";

export function generateStaticParams() {
  return getAllSlugs();
}

export function generateMetadata({ params }) {
  const p = getProject(params.slug);
  if (!p) return { title: "Proyecto — Be Management" };
  return { title: p.pageTitle, description: p.metaDescription };
}

export default function ProjectPage({ params }) {
  const project = getProject(params.slug);
  if (!project) notFound();

  return (
    <>
      <Navbar active="proyectos" />

      {/* HERO */}
      <section
        className="sec-black relative flex items-end pt-32 pb-16 md:pt-40 md:pb-24 px-6 md:px-12 overflow-hidden"
        style={{
          minHeight: "72vh",
          backgroundImage: `linear-gradient(to bottom, rgba(8,8,8,0.4), rgba(8,8,8,0.95)), url('/assets/clientes/${project.heroImage}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <div className="flex flex-wrap gap-2 mb-6 hero-el">
            {project.heroTags.map((t) => (
              <span
                key={t}
                className="text-[0.65rem] font-black uppercase tracking-widest px-3 py-1.5 rounded-full"
                style={{ background: "rgba(255,100,0,0.15)", border: "1px solid rgba(255,100,0,0.3)", color: "#FF9A40" }}
              >
                {t}
              </span>
            ))}
          </div>
          <h1 className="text-5xl md:text-8xl font-black uppercase leading-[0.95] mb-4 hero-el">
            <span className="grad-text">{project.title}</span>
          </h1>
          <p className="text-xl md:text-2xl font-semibold text-white/70 mb-8 hero-el">{project.subtitle}</p>
          <div className="flex flex-wrap items-center gap-5 hero-el">
            <a
              href={project.instagramUrl}
              target="_blank"
              rel="noopener"
              className="btn-grad btn-magnetic px-7 py-3.5 rounded-sm text-xs uppercase tracking-widest font-black flex items-center gap-2"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <rect x="2" y="2" width="20" height="20" rx="5" stroke="white" strokeWidth="1.5" />
                <circle cx="12" cy="12" r="4" stroke="white" strokeWidth="1.5" />
                <circle cx="17.5" cy="6.5" r="1" fill="white" />
              </svg>
              {project.instagramHandle}
            </a>
            {project.websiteUrl && (
              <a href={project.websiteUrl} target="_blank" rel="noopener" className="ghost-link flex items-center gap-2">
                {project.websiteDomain} <span className="text-lg">→</span>
              </a>
            )}
          </div>
        </div>
      </section>

      <div className="divider-bw"></div>

      {/* OVERVIEW */}
      <section className="sec-white py-16 md:py-28 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16">
          <div className="md:col-span-2">
            <p className="section-label mb-4">{project.overviewLabel}</p>
            <h2 className="text-3xl md:text-5xl font-black uppercase leading-tight mb-10" style={{ color: "#080808" }}>
              {project.overviewHeadingBefore}
              <span className="grad-text">{project.overviewHeadingGrad}</span>
              {project.overviewHeadingAfter}
            </h2>
            <div className="space-y-6 text-sm md:text-base leading-relaxed" style={{ color: "rgba(0,0,0,0.6)" }}>
              {project.overviewParagraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
          <aside className="meta-sidebar h-fit">
            <div className="meta-row">
              <p className="meta-label">Cliente</p>
              <p className="meta-value">{project.meta.cliente}</p>
            </div>
            <div className="meta-row">
              <p className="meta-label">Industria</p>
              <p className="meta-value">{project.meta.industria}</p>
            </div>
            <div className="meta-row">
              <p className="meta-label">Servicios</p>
              <p className="meta-value">{project.meta.servicios.join(" · ")}</p>
            </div>
            <div className="meta-row">
              <p className="meta-label">Año</p>
              <p className="meta-value">{project.meta.año}</p>
            </div>
          </aside>
        </div>
      </section>

      <div className="divider-wb"></div>

      {/* SERVICES */}
      <section className="sec-black py-16 md:py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <p className="section-label mb-3">Servicios Entregados</p>
            <h2 className="text-3xl md:text-5xl font-black uppercase leading-tight">
              Lo que <span className="grad-text">hicimos</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {project.services.map((s, i) => (
              <div key={i} className="service-icon-card p-8 rounded-sm">
                <div className="w-14 h-14 flex items-center justify-center rounded-sm mb-6" style={{ background: "rgba(255,80,0,0.1)" }}>
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#FF6A00"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    dangerouslySetInnerHTML={{ __html: s.iconSvg }}
                  />
                </div>
                <h3 className="text-lg font-bold mb-3">{s.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider-bw"></div>

      {/* GALLERY */}
      <section className="sec-white py-16 md:py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10">
            <p className="section-label mb-3">Galería</p>
            <h2 className="text-3xl md:text-5xl font-black uppercase leading-tight" style={{ color: "#080808" }}>
              Algunas <span className="grad-text">piezas</span>
            </h2>
          </div>
          <div className={`grid grid-cols-1 gap-4 ${project.gallery.length >= 4 ? "md:grid-cols-4" : "md:grid-cols-3"}`}>
            {project.gallery.map((img, i) => (
              <img key={i} src={`/assets/clientes/${img}`} alt="" className="gallery-img" />
            ))}
          </div>
        </div>
      </section>

      <div className="divider-wb"></div>

      {/* CTA */}
      <section className="sec-black py-20 px-6 md:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <p className="section-label mb-4">¿Te gustaría algo similar?</p>
          <h2 className="text-4xl md:text-6xl font-black uppercase leading-tight mb-8">
            Hablemos de <span className="grad-text">tu marca</span>
          </h2>
          <Link href="/#contacto" className="btn-grad btn-magnetic inline-block px-10 py-5 rounded-sm text-sm uppercase tracking-widest font-black">
            Empecemos ahora →
          </Link>
        </div>
      </section>

      {/* RELATED */}
      <section className="sec-black py-16 px-6 md:px-12" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <p className="section-label mb-3">Más Proyectos</p>
              <h2 className="text-3xl md:text-4xl font-black uppercase leading-tight">
                Seguí <span className="grad-text">explorando</span>
              </h2>
            </div>
            <Link href="/proyectos" className="ghost-link flex items-center gap-2 shrink-0">
              Ver todos <span className="text-lg">→</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {project.relatedProjects.map((r) => (
              <Link key={r.slug} href={`/proyectos/${r.slug}`} className="proj-link-card block h-64">
                <img src={`/assets/clientes/${r.image}`} alt={r.title} />
                <div className="overlay absolute inset-0" style={{ background: "linear-gradient(to top, rgba(8,8,8,0.92) 0%, rgba(8,8,8,0.3) 60%, transparent 100%)" }}></div>
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <p className="text-xs uppercase tracking-widest font-semibold mb-2" style={{ color: "rgba(255,150,0,0.85)" }}>{r.tags}</p>
                  <h3 className="text-xl font-black">{r.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
