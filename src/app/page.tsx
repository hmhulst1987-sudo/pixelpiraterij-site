"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Home() {
  const [textStage, setTextStage] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setTextStage(1), 700);
    const t2 = setTimeout(() => setTextStage(2), 1400);
    const t3 = setTimeout(() => setTextStage(3), 2200);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  return (
    <main className="relative min-h-screen overflow-x-hidden selection:bg-green-500 selection:text-black pb-20">
      <div
        className="pointer-events-none fixed inset-0 z-50 opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage:
            "linear-gradient(transparent 50%, rgba(0,0,0,0.25) 50%)",
          backgroundSize: "100% 4px",
        }}
      />
      <div
        className="fixed inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,255,0,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,0,0.2) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-16">
        <motion.section
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="w-full text-center border border-green-500/30 bg-black/80 p-8 md:p-16 shadow-[0_0_40px_rgba(0,255,0,0.1)] relative overflow-hidden"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-24 bg-green-500/20 blur-[80px]" />
          <h1
            className="relative text-5xl md:text-7xl font-black mb-4 tracking-tighter uppercase"
            style={{ textShadow: "3px 0 0 red, -3px 0 0 cyan" }}
          >
            PIXEL_PIRATERIJ
          </h1>
          <p className="text-base md:text-xl text-green-400/80 mb-8 lowercase tracking-widest">
            &gt; init_digital_takeover.sh
          </p>
          <div className="max-w-2xl mx-auto text-left bg-black border border-green-500/50 p-6 mb-10 text-sm md:text-base min-h-48 shadow-[inset_0_0_15px_rgba(0,255,0,0.1)]">
            <p className="text-green-500/50">root@pixel-piraterij:~# ./connect.sh</p>
            {textStage >= 1 && (
              <p className="mt-2 text-green-300">
                &gt; Verbinding maken met anonieme server... [OK]
              </p>
            )}
            {textStage >= 2 && (
              <p className="mt-2 text-green-300">
                &gt; Firewall omzeilen... [SUCCES]
              </p>
            )}
            {textStage >= 3 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <p className="mt-4 font-bold text-white">
                  &gt; WAARSCHUWING: Wij bouwen geen standaard websites.
                </p>
                <p className="mt-2 text-green-300/80">
                  &gt; Wij kapen de markt met brute UX design &amp; premium headless e-commerce.
                </p>
                <p className="mt-4 animate-pulse text-green-500">_</p>
              </motion.div>
            )}
          </div>
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="mailto:inbox@pixelpiraterij.nl"
            className="relative inline-block bg-green-500 text-black px-10 py-4 font-bold text-lg uppercase tracking-wider hover:bg-green-400 transition-colors shadow-[0_0_20px_rgba(0,255,0,0.4)] group"
          >
            <span className="absolute inset-0 border border-green-500 scale-110 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300" />
            [ START_PROJECT ]
          </motion.a>
        </motion.section>

        <section className="w-full mt-24">
          <h2 className="text-3xl font-bold mb-10 text-center uppercase tracking-widest border-b border-green-500/20 pb-4">
            <span className="text-green-500/50 mr-4">01.</span>Ons_Arsenaal
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { emoji: "💻", title: "Frontend Takeover", body: "Bloedsnelle websites in Next.js en React. Geen trage WordPress ellende — keiharde, op maat gemaakte code die presteert." },
              { emoji: "🛒", title: "E-Commerce Heist", body: "Headless webshops met Stripe en Directus. Geoptimaliseerd voor conversie, gebouwd om de concurrentie te vernietigen." },
              { emoji: "⚡", title: "Safehouse Hosting", body: "Je site veilig op onze privé servers. Geen zorgen over onderhoud, DDoS of downtime. Wij bewaken jouw digitale fort." },
            ].map((s, i) => (
              <motion.div
                key={s.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="bg-black/60 border border-green-500/30 p-6 hover:border-green-500 transition-colors group"
              >
                <div className="text-4xl mb-4 opacity-50 group-hover:opacity-100 transition-opacity">{s.emoji}</div>
                <h3 className="text-xl font-bold text-white mb-2">&gt; {s.title}</h3>
                <p className="text-sm text-green-400/70 leading-relaxed">{s.body}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="w-full mt-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold uppercase tracking-widest mb-4">
              <span className="text-green-500/50 mr-4">02.</span>Smart_Contracts
            </h2>
            <p className="text-green-400/60 text-sm max-w-xl mx-auto">
              &gt; Geen verborgen kosten. Geen trage plugins. Kies een infrastructuur en wij bouwen je digitale fort.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <PriceCard icon="📄" title="Static Engine" tagline="Corporate / Portfolio" features={["Next.js 16 Architectuur", "100/100 Lighthouse Score", "Custom UI/UX Design", "Contact / Lead Funnels"]} price="Vanaf €1.499" />
            <PriceCard icon="🛒" title="Headless Commerce" tagline="Webshops / Artiesten" features={["Alles uit Static Engine", "Directus Backend CMS", "Custom Stripe Betalingen", "Dynamische Productpagina's", "Geen Shopify kosten"]} price="Vanaf €2.999" highlight />
            <PriceCard icon="⚡" title="Safehouse Hosting" tagline="Onderhoud / Servers" features={["Private Ubuntu VPS Hosting", "99.9% Uptime Garantie", "Security Updates", "SSL Certificaten & Backups", "24/7 Monitoring"]} price="€75 / maand" />
          </div>
        </section>

        <section className="w-full mt-24 mb-12 border border-green-500/30 bg-black/60 p-10 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 uppercase tracking-widest">
            Klaar om de markt te kapen?
          </h2>
          <p className="text-green-400/70 mb-8 max-w-xl mx-auto">
            &gt; Mail ons direct of plan een gesprek. Geen sales-pitch, gewoon code en koffie.
          </p>
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="mailto:inbox@pixelpiraterij.nl"
            className="inline-block bg-green-500 text-black px-10 py-4 font-bold text-lg uppercase tracking-wider hover:bg-green-400 transition-colors shadow-[0_0_20px_rgba(0,255,0,0.4)]"
          >
            [ inbox@pixelpiraterij.nl ]
          </motion.a>
        </section>

        <footer className="text-center text-xs text-green-500/30 uppercase tracking-widest">
          © {new Date().getFullYear()} Pixel Piraterij
        </footer>
      </div>
    </main>
  );
}

function PriceCard({
  icon,
  title,
  tagline,
  features,
  price,
  highlight = false,
}: {
  icon: string;
  title: string;
  tagline: string;
  features: string[];
  price: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={
        highlight
          ? "border border-green-400 bg-green-900/10 p-8 relative flex flex-col lg:-translate-y-4 shadow-[0_0_30px_rgba(0,255,0,0.15)]"
          : "border border-green-500/30 bg-black/40 p-8 hover:border-green-500 hover:bg-black/60 transition-all flex flex-col"
      }
    >
      {highlight && (
        <div className="absolute top-0 left-0 right-0 bg-green-500 text-black text-[0.65rem] font-bold uppercase tracking-widest text-center py-1">
          Meest Gekozen
        </div>
      )}
      <div className={highlight ? "text-4xl mb-4 mt-2 opacity-80" : "text-4xl mb-4 opacity-50"}>{icon}</div>
      <h3 className="text-xl font-bold text-white uppercase tracking-wider mb-2">{title}</h3>
      <p className="text-xs text-green-400/50 uppercase tracking-widest mb-6 border-b border-green-500/20 pb-4">{tagline}</p>
      <ul className="text-sm text-green-300/70 space-y-3 mb-8 flex-1">
        {features.map((f, i) => (
          <li key={f} className={highlight && i === 0 ? "text-white font-bold" : ""}>
            [+] {f}
          </li>
        ))}
      </ul>
      <div className="mt-auto">
        <p className={highlight ? "text-white font-black text-3xl mb-4" : "text-white font-bold text-2xl mb-4"}>{price}</p>
        <a
          href="mailto:inbox@pixelpiraterij.nl"
          className={
            highlight
              ? "w-full block text-center bg-green-500 text-black py-3 text-xs uppercase font-black tracking-widest hover:bg-green-400 transition-colors shadow-[0_0_15px_rgba(0,255,0,0.4)]"
              : "w-full block text-center border border-green-500 text-green-500 py-3 text-xs uppercase font-bold tracking-widest hover:bg-green-500 hover:text-black transition-colors"
          }
        >
          {highlight ? "Initieer Overname" : "Selecteer"}
        </a>
      </div>
    </div>
  );
}
