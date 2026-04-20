"use client";

import { useEffect } from "react";

export default function HomeGsap() {
  useEffect(() => {
    let cleanup = () => {};
    let cancelled = false;

    (async () => {
      const gsapMod = await import("gsap");
      const stMod = await import("gsap/ScrollTrigger");
      if (cancelled) return;
      const gsap = gsapMod.gsap || gsapMod.default;
      const ScrollTrigger = stMod.ScrollTrigger || stMod.default;
      gsap.registerPlugin(ScrollTrigger);

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) {
        ["#hero-label", "#hero-sub-text", "#hero-ctas", "#hero-scroll-hint"].forEach((s) => {
          const el = document.querySelector(s);
          if (el) { el.style.opacity = "1"; el.style.transform = "none"; }
        });
        return;
      }

      document.querySelectorAll(".reveal").forEach((el) => {
        el.style.transition = "none";
        el.style.opacity = "1";
        el.style.transform = "none";
      });

      function fireHeroGsapEntrance() {
        gsap.set("#hero-label", { opacity: 0, y: 14 });
        gsap.set("#hero-sub-text", { opacity: 0, y: 22 });
        gsap.set("#hero-ctas", { opacity: 0, y: 18 });
        gsap.set("#hero-scroll-hint", { opacity: 0 });
        gsap
          .timeline({ delay: 0.1 })
          .to("#hero-label", { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" })
          .to("#hero-sub-text", { opacity: 1, y: 0, duration: 0.65, ease: "power3.out" }, "-=0.15")
          .to("#hero-ctas", { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.2")
          .to("#hero-scroll-hint", { opacity: 0.3, duration: 0.8, ease: "power1.out" }, "-=0.25");
      }

      const onHeroReady = () => fireHeroGsapEntrance();
      window.addEventListener("be:hero-ready", onHeroReady);
      if (sessionStorage.getItem("be_loaded")) fireHeroGsapEntrance();

      function splitHeading(el) {
        const units = [];
        const nodes = Array.from(el.childNodes);
        el.innerHTML = "";
        nodes.forEach((node) => {
          if (node.nodeType === 3) {
            node.textContent.split(/(\s+)/).forEach((w) => {
              if (!w.trim()) { el.appendChild(document.createTextNode(" ")); return; }
              const out = document.createElement("span");
              out.className = "g-word-outer";
              const inn = document.createElement("span");
              inn.className = "g-word-inner";
              inn.textContent = w;
              out.appendChild(inn);
              el.appendChild(out);
              units.push(inn);
            });
          } else if (node.nodeType === 1) {
            if (node.tagName === "BR") { el.appendChild(node.cloneNode()); return; }
            const out = document.createElement("span");
            out.className = "g-word-outer";
            const inn = document.createElement("span");
            inn.className = "g-word-inner";
            inn.appendChild(node.cloneNode(true));
            out.appendChild(inn);
            el.appendChild(out);
            units.push(inn);
          }
        });
        return units;
      }

      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        const logoWrap = document.getElementById("hero-logo-wrap");
        let tx = 0, ty = 0, cx = 0, cy = 0, rid;
        const onMove = (e) => {
          tx = ((e.clientX / window.innerWidth) - 0.5) * 26;
          ty = -((e.clientY / window.innerHeight) - 0.5) * 20;
        };
        window.addEventListener("mousemove", onMove);
        (function tick() {
          cx += (tx - cx) * 0.05;
          cy += (ty - cy) * 0.05;
          if (logoWrap) {
            gsap.set(logoWrap, {
              rotateY: cx, rotateX: cy,
              transformPerspective: 1000, transformOrigin: "center center",
            });
          }
          rid = requestAnimationFrame(tick);
        })();

        ScrollTrigger.create({
          trigger: "#hero", start: "top top", end: "bottom top", scrub: 1.2,
          onUpdate: (self) => {
            const p = self.progress;
            gsap.set("#hero-content", { y: p * -50, opacity: 1 - p * 0.8 });
            if (logoWrap) gsap.set(logoWrap, { y: p * -80 });
          },
        });

        return () => {
          cancelAnimationFrame(rid);
          window.removeEventListener("mousemove", onMove);
        };
      });

      gsap.utils.toArray(".section-label").forEach((el) => {
        if (el.closest("#hero")) return;
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: "top 90%" },
          opacity: 0, x: -18, duration: 0.5, ease: "power2.out",
        });
      });

      [
        "#servicios h2", "#proyectos-teaser h2", "#ia-generativa h2",
        "#capacitaciones h2", "#nosotros h2", "#contacto h2",
      ].forEach((sel) => {
        const el = document.querySelector(sel);
        if (!el) return;
        const words = splitHeading(el);
        gsap.from(words, {
          scrollTrigger: { trigger: el, start: "top 88%" },
          y: "110%", duration: 0.65, stagger: 0.055, ease: "power3.out",
        });
      });

      gsap.from("#stats .text-center", {
        scrollTrigger: { trigger: "#stats", start: "top 82%" },
        y: 40, opacity: 0, duration: 0.65, stagger: 0.12, ease: "power3.out",
      });
      gsap.from(".service-card", {
        scrollTrigger: { trigger: "#servicios .services-grid", start: "top 80%" },
        y: 52, opacity: 0, duration: 0.65, stagger: 0.08, ease: "power3.out", clearProps: "all",
      });
      gsap.from("#proyectos-teaser .proj-card", {
        scrollTrigger: { trigger: "#proyectos-teaser .grid", start: "top 80%" },
        y: 58, scale: 0.97, opacity: 0, duration: 0.7, stagger: 0.1, ease: "power3.out", clearProps: "all",
      });
      gsap.from("#proyectos-teaser .reveal.mt-10", {
        scrollTrigger: { trigger: "#proyectos-teaser .reveal.mt-10", start: "top 88%" },
        opacity: 0, y: 20, duration: 0.6, ease: "power3.out",
      });
      gsap.from("#ia-generativa .reveal", {
        scrollTrigger: { trigger: "#ia-generativa", start: "top 78%" },
        y: 38, opacity: 0, duration: 0.7, stagger: 0.14, ease: "power3.out",
      });
      gsap.from("#capacitaciones .grid > div", {
        scrollTrigger: { trigger: "#capacitaciones .grid", start: "top 80%" },
        y: 45, opacity: 0, duration: 0.65, stagger: 0.12, ease: "power3.out", clearProps: "all",
      });
      gsap.from("#nosotros .relative.w-56, #nosotros .relative.w-72", {
        scrollTrigger: { trigger: "#nosotros", start: "top 82%" },
        scale: 0.86, opacity: 0, duration: 0.9, ease: "power3.out",
      });
      gsap.from("#nosotros .space-y-8 .flex", {
        scrollTrigger: { trigger: "#nosotros .space-y-8", start: "top 82%" },
        x: -32, opacity: 0, duration: 0.6, stagger: 0.14, ease: "power3.out",
      });
      gsap.from("#contacto .reveal", {
        scrollTrigger: { trigger: "#contacto", start: "top 82%" },
        y: 35, opacity: 0, duration: 0.8, ease: "power3.out",
      });
      gsap.from("footer .max-w-7xl > div", {
        scrollTrigger: { trigger: "footer", start: "top 92%" },
        y: 22, opacity: 0, duration: 0.5, stagger: 0.1, ease: "power2.out",
      });

      ["#servicios h2", "#proyectos-teaser h2", "#nosotros h2", "#capacitaciones h2"].forEach((sel) => {
        const h2 = document.querySelector(sel);
        if (!h2) return;
        const line = document.createElement("div");
        line.style.cssText =
          "width:56px;height:2px;background:linear-gradient(90deg,#FF4500,#FF8C00);margin-top:18px;transform-origin:left center;";
        h2.after(line);
        gsap.from(line, {
          scaleX: 0,
          scrollTrigger: { trigger: h2, start: "top 86%" },
          duration: 0.75, delay: 0.4, ease: "power3.out",
        });
      });

      function wordIlluminate(el, fromColor, toColor) {
        if (!el) return;
        const words = el.textContent.trim().split(/\s+/);
        el.innerHTML = words.map((w) => `<span style="color:${fromColor};display:inline;">${w}</span>`).join(" ");
        gsap.to(el.querySelectorAll("span"), {
          color: toColor,
          stagger: { each: 0.25 },
          scrollTrigger: { trigger: el, start: "top 80%", end: "bottom 45%", scrub: 1.2 },
        });
      }
      document.querySelectorAll("#nosotros .space-y-8 p").forEach((p) => {
        wordIlluminate(p, "rgba(255,255,255,0.1)", "rgba(255,255,255,0.5)");
      });
      wordIlluminate(
        document.querySelector("#ia-generativa p.text-sm.leading-relaxed"),
        "rgba(0,0,0,0.12)",
        "rgba(0,0,0,0.6)"
      );

      if (!window.matchMedia("(hover: none)").matches) {
        document.querySelectorAll(".service-card").forEach((card) => {
          card.style.transformStyle = "preserve-3d";
          card.addEventListener("mousemove", (e) => {
            const r = card.getBoundingClientRect();
            const x = ((e.clientX - r.left) / r.width - 0.5) * 14;
            const y = -((e.clientY - r.top) / r.height - 0.5) * 10;
            gsap.to(card, { rotateY: x, rotateX: y, transformPerspective: 700, duration: 0.35, ease: "power2.out" });
          });
          card.addEventListener("mouseleave", () => {
            gsap.to(card, { rotateY: 0, rotateX: 0, duration: 0.6, ease: "power3.out" });
          });
        });
      }

      function addBgNumber(sectionSel, text, css, parallaxY) {
        const sec = document.querySelector(sectionSel);
        if (!sec) return;
        if (getComputedStyle(sec).position === "static") sec.style.position = "relative";
        sec.style.overflow = "hidden";
        const el = document.createElement("div");
        el.setAttribute("aria-hidden", "true");
        el.textContent = text;
        el.style.cssText = `position:absolute;pointer-events:none;user-select:none;z-index:0;font-family:'Montserrat',sans-serif;font-weight:900;line-height:1;letter-spacing:-0.05em;${css}`;
        sec.appendChild(el);
        gsap.to(el, {
          y: parallaxY,
          scrollTrigger: { trigger: sec, start: "top bottom", end: "bottom top", scrub: 1.8 },
        });
      }
      addBgNumber("#servicios", "360°", "font-size:clamp(140px,24vw,280px);color:rgba(255,255,255,0.024);right:-1%;bottom:5%;", -60);
      addBgNumber("#nosotros", "Be", "font-size:clamp(180px,30vw,360px);color:rgba(255,255,255,0.022);font-style:italic;left:-2%;top:50%;transform:translateY(-50%);", -50);
      addBgNumber("#proyectos-teaser", "08", "font-size:clamp(140px,22vw,260px);color:rgba(255,255,255,0.022);right:0%;top:10%;", -45);

      cleanup = () => {
        window.removeEventListener("be:hero-ready", onHeroReady);
        ScrollTrigger.getAll().forEach((t) => t.kill());
        mm.revert();
      };
    })();

    return () => {
      cancelled = true;
      cleanup();
    };
  }, []);

  return null;
}
