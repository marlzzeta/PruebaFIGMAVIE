import { useState, useEffect, useRef } from "react";
import {
  ArrowRight,
  ChevronRight,
  Leaf,
  Database,
  BookOpen,
  RefreshCw,
  TreePine,
  Wheat,
  Zap,
  Flower2,
  Globe,
  Shield,
  Menu,
  X,
} from "lucide-react";
import { InteractiveMap } from "./components/InteractiveMap";
import { MetaRegistro } from "./components/MetaRegistro";

// ── Animated Counter ────────────────────────────────────────────────────────
function AnimatedCounter({ target, suffix = "" }: { target: string; suffix?: string }) {
  const [display, setDisplay] = useState("0");
  const ref = useRef<HTMLDivElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated.current) {
          animated.current = true;
          const numeric = parseFloat(target.replace(/[^0-9.]/g, ""));
          const isFloat = target.includes(".");
          const duration = 1800;
          const steps = 60;
          const increment = numeric / steps;
          let current = 0;
          let step = 0;
          const interval = setInterval(() => {
            step++;
            current = Math.min(current + increment, numeric);
            setDisplay(
              isFloat ? current.toFixed(1) : Math.round(current).toString()
            );
            if (step >= steps) clearInterval(interval);
          }, duration / steps);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="tabular-nums">
      {display}
      {suffix}
    </div>
  );
}

// ── Hero Image ───────────────────────────────────────────────────────────────
const HERO_IMG =
  "https://images.unsplash.com/photo-1774960693005-e6a8aafc3397?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxtYW5ncm92ZSUyMGZvcmVzdCUyMHRyb3BpY2FsJTIwZWNvc3lzdGVtfGVufDF8fHx8MTc4MjM2OTU2OHww&ixlib=rb-4.1.0&q=80&w=1080";

// ── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white font-sans antialiased" style={{ fontFamily: "'Inter', 'Roboto', system-ui, sans-serif" }}>

      {/* ── TOP BAR ── */}
      <div style={{ backgroundColor: "#0B1628" }} className="py-2 px-6">
        <div className="max-w-7xl mx-auto flex justify-end gap-6">
          {["Transparencia e Integridad", "Mecanismos de Quejas", "Gestión del Conocimiento"].map((link) => (
            <a key={link} href="#" className="text-xs text-blue-300 hover:text-white transition-colors">
              {link}
            </a>
          ))}
        </div>
      </div>

      {/* ── HEADER ── */}
      <header className="bg-white sticky top-0 z-50 shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-1 select-none">
            <span className="text-xl tracking-tight" style={{ color: "#1D4ED8", fontWeight: 800 }}>
              /// BCIE
            </span>
            <span className="mx-1 text-gray-300">|</span>
            <span className="text-xl tracking-tight" style={{ color: "#10B981", fontWeight: 700 }}>
              Terraverde Hub
            </span>
          </div>

          {/* Nav desktop */}
          <nav className="hidden md:flex items-center gap-8">
            {["Acerca de la Plataforma", "Ejes de Acción", "Impacto Regional"].map((item) => (
              <a key={item} href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors font-medium">
                {item}
              </a>
            ))}
            <a
              href="#"
              className="text-sm px-4 py-2 rounded-lg text-white transition-all hover:opacity-90"
              style={{ backgroundColor: "#10B981" }}
            >
              Explorar Proyectos
            </a>
          </nav>

          {/* Mobile toggle */}
          <button className="md:hidden text-gray-700" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white px-6 py-4 flex flex-col gap-4">
            {["Acerca de la Plataforma", "Ejes de Acción", "Impacto Regional"].map((item) => (
              <a key={item} href="#" className="text-sm text-gray-600 font-medium">
                {item}
              </a>
            ))}
          </div>
        )}
      </header>

      {/* ── HERO ── */}
      <section
        className="relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0F172A 0%, #1E3A5F 100%)" }}
      >
        {/* subtle grid texture */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg,transparent,transparent 40px,rgba(255,255,255,0.4) 40px,rgba(255,255,255,0.4) 41px), repeating-linear-gradient(90deg,transparent,transparent 40px,rgba(255,255,255,0.4) 40px,rgba(255,255,255,0.4) 41px)",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-6 py-20 md:py-28 flex flex-col md:flex-row items-center gap-12">
          {/* Left */}
          <div className="flex-1 flex flex-col gap-6">
            <span
              className="inline-flex w-fit items-center gap-2 px-3 py-1 rounded-full text-xs tracking-widest uppercase font-semibold"
              style={{ backgroundColor: "rgba(16,185,129,0.15)", color: "#6EE7B7" }}
            >
              <Leaf size={12} /> Motor de la Transformación Positiva
            </span>

            <h1 className="text-4xl md:text-5xl xl:text-6xl text-white leading-tight" style={{ fontWeight: 800 }}>
              Impulsando mercados ambientales de{" "}
              <span style={{ color: "#10B981" }}>alta integridad</span> en la región SICA.
            </h1>

            <p className="text-lg leading-relaxed max-w-xl" style={{ color: "#94A3B8" }}>
              Una plataforma gestionada por el BCIE para articular, visibilizar y financiar proyectos de carbono y biodiversidad, garantizando transparencia y credibilidad.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="#"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-white text-sm font-semibold transition-all hover:opacity-90 shadow-lg"
                style={{ backgroundColor: "#10B981" }}
              >
                Conocer los Proyectos <ArrowRight size={16} />
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-white text-sm font-semibold border border-white/30 hover:bg-white/10 transition-all"
              >
                Ir al Centro de Conocimiento <ChevronRight size={16} />
              </a>
            </div>
          </div>

          {/* Right image */}
          <div className="flex-1 flex justify-center w-full">
            <div className="relative w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl" style={{ aspectRatio: "4/3" }}>
              <img
                src={HERO_IMG}
                alt="Bosque de manglar — ecosistema costero en Centroamérica"
                className="w-full h-full object-cover"
              />
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(180deg, transparent 60%, rgba(15,23,42,0.5) 100%)" }}
              />
              <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2">
                <span
                  className="text-xs px-2 py-1 rounded-full"
                  style={{ backgroundColor: "rgba(16,185,129,0.85)", color: "#fff" }}
                >
                  Carbono Azul · Centroamérica
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST BADGE ── */}
      <div className="bg-gray-50 border-b border-gray-200 py-5 px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-6">
          <div className="flex items-center gap-3">
            <Globe size={20} style={{ color: "#1D4ED8" }} />
            <span className="text-sm text-gray-600 font-medium">
              Plataforma impulsada por el banco de desarrollo de Centroamérica
            </span>
          </div>
          <div className="h-6 w-px bg-gray-300 hidden sm:block" />
          <div
            className="flex items-center gap-3 px-4 py-2 rounded-lg border"
            style={{ borderColor: "#DBEAFE", backgroundColor: "#EFF6FF" }}
          >
            <Shield size={18} style={{ color: "#1D4ED8" }} />
            <span className="text-sm text-gray-600">Respaldo Institucional:</span>
            <span className="text-base font-extrabold" style={{ color: "#1D4ED8" }}>AA+</span>
            <span className="text-xs text-gray-500">por Standard & Poor's</span>
          </div>
        </div>
      </div>

      {/* ── IMPACTO REGIONAL ── */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl text-center text-gray-900 mb-3" style={{ fontWeight: 800 }}>
            El Potencial de Nuestra Región
          </h2>
          <p className="text-center text-gray-500 max-w-xl mx-auto mb-14 text-base">
            Datos que dimensionan la oportunidad ambiental y climática de Centroamérica y el Caribe.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-white rounded-2xl p-8 shadow-md border border-gray-100 flex flex-col gap-3">
              <div className="text-5xl xl:text-6xl font-extrabold leading-none" style={{ color: "#10B981" }}>
                <AnimatedCounter target="168" suffix=" MtCO2e" />
              </div>
              <p className="text-sm text-gray-500 leading-relaxed">
                Emisiones de GEI netas anuales con alto potencial de mitigación al 2035.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-2xl p-8 shadow-md border border-gray-100 flex flex-col gap-3">
              <div className="text-5xl xl:text-6xl font-extrabold leading-none" style={{ color: "#3B82F6" }}>
                5% – 12%
              </div>
              <p className="text-sm text-gray-500 leading-relaxed">
                De la diversidad biológica del planeta albergada en nuestro Hotspot.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-2xl p-8 shadow-md border border-gray-100 flex flex-col gap-3">
              <div className="text-5xl xl:text-6xl font-extrabold leading-none" style={{ color: "#0F172A" }}>
                <AnimatedCounter target="8" suffix=" Países" />
              </div>
              <p className="text-sm text-gray-500 leading-relaxed">
                Guatemala, El Salvador, Costa Rica, Nicaragua, Panamá, Honduras, Belice y República Dominicana.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── EJES DE ACCIÓN ── */}
      <section className="bg-white py-20 px-6 border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl text-gray-900 max-w-xl" style={{ fontWeight: 800 }}>
              Herramientas diseñadas para cerrar brechas y fomentar la alta integridad
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                num: "01",
                icon: <Database size={24} style={{ color: "#10B981" }} />,
                title: "Meta-registro de Proyectos",
                desc: "Un repositorio centralizado y verificado de proyectos de carbono y biodiversidad en la región SICA, con estándares de reporte transparentes.",
                link: "Explorar el registro", href: "#meta-registro",
              },
              {
                num: "02",
                icon: <BookOpen size={24} style={{ color: "#3B82F6" }} />,
                title: "Centro de Conocimiento",
                desc: "Biblioteca de recursos técnicos, metodologías, marcos normativos y publicaciones especializadas sobre mercados ambientales.",
                link: "Acceder a recursos",
              },
              {
                num: "03",
                icon: <RefreshCw size={24} style={{ color: "#8B5CF6" }} />,
                title: "Fondo Revolvente",
                desc: "Mecanismo de financiamiento de corto plazo para apoyar a proyectos en etapas tempranas de desarrollo y certificación.",
                link: "Conocer financiamiento",
              },
            ].map(({ num, icon, title, desc, link }) => (
              <div key={num} className="flex flex-col gap-4 p-6 rounded-2xl hover:shadow-md transition-shadow border border-gray-100">
                <div className="flex items-center gap-3">
                  <span className="text-4xl font-extrabold text-gray-100">{num}</span>
                  <div className="ml-auto">{icon}</div>
                </div>
                <h3 className="text-lg text-gray-900 font-bold">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed flex-1">{desc}</p>
                <a
                  href="#"
                  className="inline-flex items-center gap-1 text-sm font-semibold hover:underline"
                  style={{ color: "#10B981" }}
                >
                  {link} <ArrowRight size={14} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── META-REGISTRO ── */}
      <MetaRegistro />

      {/* ── SECTORES ESTRATÉGICOS ── */}
      <section className="py-20 px-6" style={{ backgroundColor: "#0F172A" }}>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl text-white mb-3" style={{ fontWeight: 800 }}>
            Sectores Estratégicos con Alta Demanda
          </h2>
          <p className="text-gray-400 mb-12 max-w-lg text-base">
            Tipologías de proyectos con mayor potencial de impacto y demanda en los mercados voluntarios de carbono.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                icon: <TreePine size={22} />,
                accent: "#10B981",
                title: "Bosques y Costas",
                desc: "Conservación y restauración (Carbono azul).",
              },
              {
                icon: <Wheat size={22} />,
                accent: "#F59E0B",
                title: "Agricultura",
                desc: "Manejo de suelos agrícolas.",
              },
              {
                icon: <Zap size={22} />,
                accent: "#22D3EE",
                title: "Eficiencia",
                desc: "Estufas eficientes y residuos.",
              },
              {
                icon: <Flower2 size={22} />,
                accent: "#34D399",
                title: "Biodiversidad",
                desc: "Conservación de ecosistemas.",
              },
            ].map(({ icon, accent, title, desc }) => (
              <div
                key={title}
                className="rounded-2xl p-6 flex flex-col gap-4 transition-all hover:translate-y-[-2px]"
                style={{ backgroundColor: "#1E293B", border: "1px solid rgba(255,255,255,0.06)" }}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: accent + "22", color: accent }}
                >
                  {icon}
                </div>
                <h3 className="text-white font-bold text-base">{title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INTERACTIVE MAP ── */}
      <InteractiveMap />

      {/* ── FOOTER ── */}
      <footer className="py-14 px-6" style={{ backgroundColor: "#060F1E" }}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-1 select-none">
              <span className="text-lg font-extrabold tracking-tight" style={{ color: "#3B82F6" }}>
                /// BCIE
              </span>
              <span className="mx-1 text-gray-600">|</span>
              <span className="text-lg font-bold tracking-tight" style={{ color: "#10B981" }}>
                Terraverde Hub
              </span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "#64748B" }}>
              Articulando mercados ambientales de alta integridad para el desarrollo sostenible de Centroamérica y el Caribe.
            </p>
            <p className="text-xs" style={{ color: "#334155" }}>
              © {new Date().getFullYear()} BCIE. Todos los derechos reservados.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs uppercase tracking-widest font-semibold" style={{ color: "#475569" }}>
              Enlaces Directos
            </h4>
            {["Acceso a la Información", "Transparencia", "Meta-registro", "Centro de Conocimiento", "Fondo Revolvente"].map((l) => (
              <a key={l} href="#" className="text-sm hover:text-gray-200 transition-colors" style={{ color: "#64748B" }}>
                {l}
              </a>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="text-xs uppercase tracking-widest font-semibold" style={{ color: "#475569" }}>
              Legal
            </h4>
            {["Términos Legales", "Política de Privacidad", "Mecanismos de Quejas", "Salvaguardas Ambientales"].map((l) => (
              <a key={l} href="#" className="text-sm hover:text-gray-200 transition-colors" style={{ color: "#64748B" }}>
                {l}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
