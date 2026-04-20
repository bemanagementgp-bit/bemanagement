import { Montserrat } from "next/font/google";
import "./globals.css";
import Preloader from "@/components/Preloader";
import SiteEffects from "@/components/SiteEffects";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata = {
  title: "Be Management — Marketing Agency La Plata",
  description:
    "Be Management es una agencia de marketing full-service en La Plata, Buenos Aires. Diseño, redes sociales, publicidad digital, IA generativa y desarrollo web.",
  icons: { icon: "/assets/favicon-be.png" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={montserrat.variable}>
      <body>
        <div id="noise"></div>
        <div id="cursor-dot"></div>
        <div id="cursor-ring"></div>
        <Preloader />
        {children}
        <SiteEffects />
      </body>
    </html>
  );
}
