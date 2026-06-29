import { useState } from "react";
import {
  Search, Filter, ChevronRight, CheckCircle2, Clock, Circle,
  FileText, Users, DollarSign, BarChart2, Shield, Calendar,
} from "lucide-react";
import { PROJECTS, CATEGORY_COLOR, RISK_COLOR } from "../data/projects";
import type { Project } from "../data/projects";
import { ProjectModal } from "./ProjectModal";

const ALL_CATEGORIES = ["Todos", "Bosques y Costas", "Biodiversidad", "Agricultura", "Eficiencia"];
const ALL_STATUS = ["Todos", "En ejecución", "Aprobado", "Cerrado"];

export function MetaRegistro() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Todos");
  const [status, setStatus] = useState("Todos");
  const [modalProject, setModalProject] = useState<Project | null>(null);

  const filtered = PROJECTS.filter((p) => {
    const matchSearch = search === "" ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.country.toLowerCase().includes(search.toLowerCase()) ||
      p.id.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === "Todos" || p.category === category;
    const matchStatus = status === "Todos" || p.status === status;
    return matchSearch && matchCat && matchStatus;
  });

  const totalCredits = PROJECTS.reduce((s, p) => s + p.credits, 0);
  const totalApproved = PROJECTS.reduce((s, p) => s + p.approvedUSD, 0);
  const totalBenef = PROJECTS.reduce((s, p) => s + parseInt(p.beneficiariesDirect.replace(/,/g, "")), 0);

  return (
    <section id="meta-registro" className="py-20 px-6" style={{ backgroundColor: "#060F1E" }}>
      <div className="max-w-7xl mx-auto">

        {/* ── Header ── */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end gap-6 justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs uppercase tracking-widest font-semibold px-3 py-1 rounded-full"
                style={{ backgroundColor: "rgba(16,185,129,0.12)", color: "#6EE7B7" }}>
                Meta-registro
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl text-white mb-2" style={{ fontWeight: 800 }}>
              Proyectos de la Región SICA
            </h2>
            <p className="text-gray-400 max-w-xl text-sm">
              Repositorio centralizado y verificado de proyectos de carbono y biodiversidad. Consulta la ficha técnica completa de cada iniciativa.
            </p>
          </div>
          {/* Summary KPIs */}
          <div className="flex gap-4 flex-shrink-0">
            {[
              { label: "Créditos totales", value: (totalCredits / 1000).toFixed(0) + "K tCO₂e", color: "#10B981" },
              { label: "Monto aprobado", value: "USD " + (totalApproved / 1000000).toFixed(1) + "M", color: "#3B82F6" },
              { label: "Benef. directos", value: totalBenef.toLocaleString(), color: "#8B5CF6" },
            ].map(({ label, value, color }) => (
              <div key={label} className="flex flex-col items-center px-4 py-3 rounded-xl"
                style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <span className="text-lg font-extrabold" style={{ color }}>{value}</span>
                <span className="text-xs mt-0.5" style={{ color: "#475569" }}>{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Filters ── */}
        <div className="mb-6 flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-1 max-w-sm">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#475569" }} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por país, título o ID…"
              className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm outline-none"
              style={{ backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "#E2E8F0" }}
            />
          </div>

          {/* Category filter */}
          <div className="flex items-center gap-1 flex-wrap">
            <Filter size={13} style={{ color: "#475569" }} />
            {ALL_CATEGORIES.map((c) => (
              <button key={c} onClick={() => setCategory(c)}
                className="px-3 py-1.5 rounded-full text-xs font-medium transition-all"
                style={category === c
                  ? { backgroundColor: "#10B981", color: "#fff" }
                  : { backgroundColor: "rgba(255,255,255,0.05)", color: "#64748B", border: "1px solid rgba(255,255,255,0.07)" }}>
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* ── Project list ── */}
        <div className="flex flex-col gap-3">
          {filtered.length === 0 && (
            <div className="text-center py-16 text-gray-500">No se encontraron proyectos con los filtros seleccionados.</div>
          )}

          {filtered.map((p) => (
            <ProjectRow key={p.id} project={p} onOpen={() => setModalProject(p)} />
          ))}
        </div>

        <p className="mt-6 text-xs text-center" style={{ color: "#1E293B" }}>
          Mostrando {filtered.length} de {PROJECTS.length} proyectos registrados · Datos actualizados a jun 2025
        </p>
      </div>

      {modalProject && <ProjectModal project={modalProject} onClose={() => setModalProject(null)} />}
    </section>
  );
}

// ── Individual project row ────────────────────────────────────────────────────

function ProjectRow({ project: p, onOpen }: { project: Project; onOpen: () => void }) {
  const accent = CATEGORY_COLOR[p.category] || "#10B981";
  const activeMilestone = p.milestones.find((m) => m.status === "active");
  const doneMilestones = p.milestones.filter((m) => m.status === "done").length;

  return (
    <div
      className="rounded-2xl overflow-hidden flex flex-col lg:flex-row group cursor-pointer transition-all hover:border-white/10"
      style={{ backgroundColor: "#0B1E35", border: "1px solid rgba(255,255,255,0.06)" }}
      onClick={onOpen}
    >
      {/* Thumbnail */}
      <div className="lg:w-52 h-44 lg:h-auto relative flex-shrink-0 overflow-hidden">
        <img src={p.image} alt={p.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(90deg,transparent 60%,#0B1E35 100%)" }} />
        <span className="absolute top-3 left-3 text-xs px-2 py-0.5 rounded-full font-semibold"
          style={{ backgroundColor: "rgba(11,22,40,0.8)", color: "#94A3B8", border: "1px solid rgba(255,255,255,0.1)" }}>
          {p.country}
        </span>
      </div>

      {/* Main content */}
      <div className="flex-1 p-5 flex flex-col gap-3 min-w-0">

        {/* Top row: ID + status + category */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-mono px-2 py-0.5 rounded font-semibold"
            style={{ backgroundColor: "rgba(255,255,255,0.06)", color: "#64748B" }}>{p.id}</span>
          <span className="text-xs px-2 py-0.5 rounded-full font-semibold"
            style={{ backgroundColor: "#3B82F622", color: "#93C5FD", border: "1px solid #3B82F622" }}>{p.status}</span>
          <span className="text-xs px-2 py-0.5 rounded-full font-semibold"
            style={{ backgroundColor: accent + "22", color: accent, border: `1px solid ${accent}33` }}>{p.category}</span>
          <span className="text-xs px-2 py-0.5 rounded-full font-semibold"
            style={{ backgroundColor: (RISK_COLOR[p.riskRating] || "#10B981") + "18", color: RISK_COLOR[p.riskRating] || "#10B981" }}>
            Riesgo {p.riskRating}
          </span>
        </div>

        {/* Title + prestatario — BCIE style */}
        <div>
          <h3 className="text-sm font-bold leading-snug mb-1" style={{ color: "#E2E8F0" }}>{p.title}</h3>
          <p className="text-xs" style={{ color: "#475569" }}>{p.prestatario}</p>
        </div>

        {/* Key data row — mimics BCIE's metadata strip */}
        <div className="flex flex-wrap gap-4 text-xs" style={{ color: "#475569" }}>
          <span className="flex items-center gap-1">
            <Calendar size={11} /> Aprobado: <span className="ml-0.5 text-gray-300">{p.approvalDate}</span>
          </span>
          <span className="flex items-center gap-1">
            <Calendar size={11} /> Cierre: <span className="ml-0.5 text-gray-300">{p.estimatedClose}</span>
          </span>
          <span className="flex items-center gap-1">
            <Shield size={11} /> {p.eligibility}
          </span>
          <span className="flex items-center gap-1">
            <FileText size={11} /> {p.documents.length} documentos
          </span>
        </div>

        {/* Timeline mini progress — like BCIE */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs" style={{ color: "#334155" }}>
              Línea de tiempo · {doneMilestones}/{p.milestones.length} hitos completados
            </span>
            {activeMilestone && (
              <span className="text-xs flex items-center gap-1" style={{ color: "#3B82F6" }}>
                <Clock size={10} /> {activeMilestone.label}
              </span>
            )}
          </div>
          <div className="flex gap-1">
            {p.milestones.map((m, i) => (
              <div key={i} className="flex-1 h-1.5 rounded-full"
                style={{
                  backgroundColor: m.status === "done" ? "#10B981"
                    : m.status === "active" ? "#3B82F6"
                    : "#1E293B",
                }} />
            ))}
          </div>
        </div>
      </div>

      {/* Right panel: key indicators */}
      <div className="lg:w-64 flex-shrink-0 flex lg:flex-col flex-row flex-wrap gap-0 border-t lg:border-t-0 lg:border-l"
        style={{ borderColor: "rgba(255,255,255,0.05)" }}>

        {/* Monto + desembolso */}
        <div className="flex-1 p-4 flex flex-col gap-2 border-b lg:border-b border-r lg:border-r-0"
          style={{ borderColor: "rgba(255,255,255,0.05)" }}>
          <div className="flex items-center gap-1.5 mb-1">
            <DollarSign size={12} style={{ color: "#10B981" }} />
            <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#10B981" }}>Financiamiento</span>
          </div>
          <div>
            <p className="text-xs" style={{ color: "#334155" }}>Aprobado</p>
            <p className="text-sm font-bold text-white">{p.approved}</p>
          </div>
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span style={{ color: "#334155" }}>Desembolsado</span>
              <span style={{ color: "#10B981" }}>{p.disbursedPct}%</span>
            </div>
            <div className="h-1.5 rounded-full" style={{ backgroundColor: "#1E293B" }}>
              <div className="h-full rounded-full" style={{ width: `${p.disbursedPct}%`, backgroundColor: "#10B981" }} />
            </div>
          </div>
        </div>

        {/* Indicadores */}
        <div className="flex-1 p-4 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <div>
              <p className="text-xs" style={{ color: "#334155" }}>Créditos CO₂</p>
              <p className="text-sm font-bold" style={{ color: "#10B981" }}>{p.credits.toLocaleString()} tCO₂e</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div>
              <p className="text-xs" style={{ color: "#334155" }}>Benef. directos</p>
              <p className="text-sm font-bold text-white">{p.beneficiariesDirect}</p>
            </div>
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); onOpen(); }}
            className="mt-auto w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-semibold transition-all hover:opacity-90"
            style={{ backgroundColor: "#10B981", color: "#fff" }}>
            Ver ficha completa <ChevronRight size={13} />
          </button>
        </div>
      </div>
    </div>
  );
}
