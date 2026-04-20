"use client";

import { useEffect } from "react";

/**
 * Global site effects ported from the original static site:
 * - Custom cursor (dot + ring with lerp)
 * - Navbar scrolled state
 * - Scroll reveal observer
 * - Magnetic buttons
 * - Counter animation
 */
export default function SiteEffects() {
  useEffect(() => {
    const dot = document.getElementById("cursor-dot");
    const ring = document.getElementById("cursor-ring");
    let ringX = 0, ringY = 0, mouseX = 0, mouseY = 0;

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dot) {
        dot.style.left = mouseX + "px";
        dot.style.top = mouseY + "px";
      }
    };
    document.addEventListener("mousemove", onMove);

    let rafId;
    const lerp = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      if (ring) {
        ring.style.left = ringX + "px";
        ring.style.top = ringY + "px";
      }
      rafId = requestAnimationFrame(lerp);
    };
    lerp();

    const enterHandlers = [];
    const leaveHandlers = [];
    const onEnter = () => {
      if (!dot || !ring) return;
      dot.style.width = "12px"; dot.style.height = "12px";
      ring.style.width = "44px"; ring.style.height = "44px";
    };
    const onLeave = () => {
      if (!dot || !ring) return;
      dot.style.width = "8px"; dot.style.height = "8px";
      ring.style.width = "32px"; ring.style.height = "32px";
    };
    document.querySelectorAll("a, button").forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
      enterHandlers.push([el, onEnter]);
      leaveHandlers.push([el, onLeave]);
    });

    // Navbar scrolled
    const navbar = document.getElementById("navbar");
    const onScroll = () => {
      if (navbar) navbar.classList.toggle("scrolled", window.scrollY > 40);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    // Reveal observer
    const revealObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            revealObs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll(".reveal").forEach((el, i) => {
      if (!el.style.transitionDelay) el.style.transitionDelay = (i % 5) * 0.07 + "s";
      revealObs.observe(el);
    });

    // Magnetic buttons
    const magHandlers = [];
    document.querySelectorAll(".btn-magnetic").forEach((btn) => {
      const move = (e) => {
        const r = btn.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        btn.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`;
      };
      const leave = () => { btn.style.transform = ""; };
      btn.addEventListener("mousemove", move);
      btn.addEventListener("mouseleave", leave);
      magHandlers.push([btn, move, leave]);
    });

    // Counter animation
    const counterObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target;
          const target = parseInt(el.dataset.counter, 10);
          const prefix = el.dataset.prefix || "";
          const suffix = el.dataset.suffix || "";
          let current = 0;
          const step = Math.ceil(target / 40);
          const iv = setInterval(() => {
            current = Math.min(current + step, target);
            el.textContent = prefix + current + suffix;
            if (current >= target) clearInterval(iv);
          }, 30);
          counterObs.unobserve(el);
        });
      },
      { threshold: 0.5 }
    );
    document.querySelectorAll("[data-counter]").forEach((el) => counterObs.observe(el));

    return () => {
      document.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
      enterHandlers.forEach(([el, fn]) => el.removeEventListener("mouseenter", fn));
      leaveHandlers.forEach(([el, fn]) => el.removeEventListener("mouseleave", fn));
      magHandlers.forEach(([btn, mv, lv]) => {
        btn.removeEventListener("mousemove", mv);
        btn.removeEventListener("mouseleave", lv);
      });
      revealObs.disconnect();
      counterObs.disconnect();
    };
  }, []);

  return null;
}
