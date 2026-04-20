"use client";

import { useEffect } from "react";

function startHeroTitleAnim() {
  const ease = "cubic-bezier(0.16,1,0.3,1)";
  const l1 = document.getElementById("ht-line1");
  const l2 = document.getElementById("ht-line2");
  if (l1) l1.style.animation = "heroTitleIn 0.85s " + ease + " 0.1s forwards";
  if (l2) l2.style.animation = "heroTitleIn 0.85s " + ease + " 0.35s forwards";
}

export default function Preloader() {
  useEffect(() => {
    if (sessionStorage.getItem("be_loaded")) {
      const pre = document.getElementById("preloader");
      if (pre) pre.style.display = "none";
      startHeroTitleAnim();
      window.dispatchEvent(new CustomEvent("be:hero-ready"));
      return;
    }
    const name = "Be Management";
    const nameEl = document.getElementById("preloader-name");
    if (nameEl && nameEl.childElementCount === 0) {
      name.split("").forEach((ch, i) => {
        const s = document.createElement("span");
        s.textContent = ch === " " ? "\u00A0" : ch;
        s.style.animationDelay = 0.5 + i * 0.04 + "s";
        nameEl.appendChild(s);
      });
    }
    const fill = document.getElementById("preloader-fill");
    let w = 0;
    const iv = setInterval(() => {
      w = Math.min(w + 2, 100);
      if (fill) fill.style.width = w + "%";
      if (w >= 100) clearInterval(iv);
    }, 20);
    const t = setTimeout(() => {
      const pre = document.getElementById("preloader");
      if (pre) {
        pre.classList.add("hide");
        pre.addEventListener(
          "transitionend",
          () => {
            startHeroTitleAnim();
            window.dispatchEvent(new CustomEvent("be:hero-ready"));
          },
          { once: true }
        );
      }
      sessionStorage.setItem("be_loaded", "1");
    }, 2200);

    return () => {
      clearInterval(iv);
      clearTimeout(t);
    };
  }, []);

  return (
    <div id="preloader">
      <img id="preloader-logo" src="/assets/Logo.png" alt="Be Management" />
      <div id="preloader-bar">
        <div id="preloader-fill"></div>
      </div>
      <div id="preloader-name"></div>
    </div>
  );
}
