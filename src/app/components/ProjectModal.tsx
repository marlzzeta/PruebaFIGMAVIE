import { useState, useEffect } from "react";
import {
  X, ChevronRight, Calendar, Users, DollarSign, FileText,
  BarChart2, Clock, CheckCircle2, Circle, Download, ArrowRight,
  Leaf, Shield, TrendingUp, MapPin, AlertCircle,
} from "lucide-react";
import type { Project } from "../data/projects";
import { CATEGORY_COLOR, RISK_COLOR } from "../data/projects";

const TABS = ["Descripción", "Objetivos", "Cronograma", "Desembolsos", "Documentos"] as const;
type Tab = (typeof TABS)[number];

export function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const [tab, setTab] = useState<Tab>("Descripción");

  useEffect(() => {
    const h = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const maxDisb = Math.max(...project.disbursements.map((d) => d.amount), 1);
  const accent = CATEGORY_COLOR[project.category] || "#10B981";
  const activeMilestone = project.milestones.find((m) => m.status === "active");

  return (
    <div
      className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.75)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="relative w-full max-w-5xl max-h-[95vh] flex flex-col rounded-t-2xl md:rounded-2xl overflow-hidden"
        style={{ backgroundColor: "#0B1628", border: "1px solid rgba(255,255,255,0.08)" }}
      >
        {/* ── HERO ── */}
        <div className="relative h-56 flex-shrink-0 overflow-hidden">
          <img src={project.image} alt={project.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg,rgba(11,22,40,0.25) 0%,rgba(11,22,40,0.90) 100%)" }} />

          <button onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/20 transition-all"
            style={{ backgroundColor: "rgba(0,0,0,0.35)", color: "#fff" }}>
            <X size={15} />
          </button>

          {/* Breadcrumb */}
          <div className="absolute top-4 left-5 flex items-center gap-1 text-xs" style={{ color: "#94A3B8" }}>
            <span>Proyectos SICA</span>
            <ChevronRight size={11} />
            <span style={{ color: "#6EE7B7" }}>{project.country}</span>
          </div>

          {/* Badges + Title */}
          <div className="absolute bottom-5 left-5 right-14 flex flex-col gap-2">
            <div className="flex flex-wrap gap-2">
              <span className="text-xs px-2 py-0.5 rounded-full font-semibold"
                style={{ backgroundColor: "#10B98122", color: "#6EE7B7", border: "1px solid #10B98144" }}>
                {project.id}
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full font-semibold"
                style={{ backgroundColor: "#3B82F622", color: "#93C5FD", border: "1px solid #3B82F633" }}>
                {project.status}
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full font-semibold"
                style={{ backgroundColor: accent + "22", color: accent, border: `1px solid ${accent}44` }}>
                {project.category}
              </span>
            </div>
            <h2 className="text-white leading-snug" style={{ fontWeight: 700, fontSize: "1rem" }}>
              {project.title}
            </h2>
          </div>
        </div>

        {/* ── BODY ── */}
        <div className="flex-1 overflow-y-auto">
          <div className="flex flex-col lg:flex-row">

            {/* ── MAIN (left) ── */}
            <div className="flex-1 min-w-0 flex flex-col divide-y" style={{ borderColor: "rgba(255,255,255,0.05)" }}>

              {/* Tabs */}
              <div className="flex overflow-x-auto sticky top-0 z-10"
                style={{ backgroundColor: "#0B1628", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                {TABS.map((t) => (
                  <button key={t} onClick={() => setTab(t)}
                    className="px-4 py-3 text-xs font-semibold whitespace-nowrap flex-shrink-0 border-b-2 transition-colors"
                    style={tab === t ? { color: "#10B981", borderColor: "#10B981" } : { color: "#475569", borderColor: "transparent" }}>
                    {t}
                  </button>
                ))}
              </div>

              <div className="p-5 flex flex-col gap-6">

                {/* ── DESCRIPCIÓN ── */}
                {tab === "Descripción" && (
                  <>
                    {/* Two-col layout like BCIE: description left, indicators right */}
                    <div className="flex flex-col sm:flex-row gap-6">
                      <div className="flex-1">
                        <p className="text-xs uppercase tracking-widest font-semibold mb-3" style={{ color: "#475569" }}>Descripción del Proyecto</p>
                        <p className="text-sm leading-relaxed mb-3" style={{ color: "#CBD5E1" }}>{project.objective}</p>
                        <p className="text-sm leading-relaxed" style={{ color: "#64748B" }}>{project.shortDescription}</p>
                      </div>
                      {/* Indicadores de Impacto — big numbers like BCIE */}
                      <div className="sm:w-48 flex-shrink-0">
                        <p className="text-xs uppercase tracking-widest font-semibold mb-3" style={{ color: "#475569" }}>Indicadores de Impacto</p>
                        <div className="flex flex-col gap-4">
                          <div>
                            <p className="text-3xl font-extrabold" style={{ color: "#10B981" }}>
                              {(project.credits / 1000).toFixed(1)}K
                            </p>
                            <p className="text-xs mt-0.5" style={{ color: "#64748B" }}>tCO₂e verificados</p>
                          </div>
                          <div>
                            <p className="text-3xl font-extrabold" style={{ color: "#3B82F6" }}>
                              {project.disbursedPct}%
                            </p>
                            <p className="text-xs mt-0.5" style={{ color: "#64748B" }}>desembolsado</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Acciones rápidas — like BCIE's button row */}
                    <div className="flex gap-3 flex-wrap">
                      <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all hover:opacity-90"
                        style={{ backgroundColor: "#10B981", color: "#fff" }}>
                        <Download size={13} /> Descargar Ficha
                      </button>
                      <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold border transition-all hover:bg-white/5"
                        style={{ borderColor: "rgba(255,255,255,0.12)", color: "#94A3B8" }}>
                        <FileText size={13} /> Ver Documentos
                      </button>
                    </div>

                    {/* Datos del proyecto table */}
                    <div>
                      <p className="text-xs uppercase tracking-widest font-semibold mb-3" style={{ color: "#475569" }}>Datos del Proyecto</p>
                      <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.06)" }}>
                        {[
                          { label: "N° de Proyecto", value: project.id },
                          { label: "Prestatario", value: project.prestatario },
                          { label: "Ejecutor", value: project.ejecutor },
                          { label: "Estado", value: project.status },
                          { label: "Monto Aprobado", value: project.approved },
                          { label: "Cofinanciador", value: project.cofinancier },
                          { label: "Fecha de Aprobación", value: project.approvalDate },
                          { label: "Fecha de Inicio", value: project.startDate },
                          { label: "Cierre Estimado", value: project.estimatedClose },
                        ].map(({ label, value }, i) => (
                          <div key={label} className="flex items-start gap-4 px-4 py-2.5 text-xs"
                            style={{ backgroundColor: i % 2 === 0 ? "rgba(255,255,255,0.02)" : "transparent", borderBottom: i < 8 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
                            <span className="w-36 flex-shrink-0" style={{ color: "#475569" }}>{label}</span>
                            <span className="font-medium" style={{ color: "#CBD5E1" }}>{value}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Indicadores grid */}
                    <div>
                      <p className="text-xs uppercase tracking-widest font-semibold mb-3" style={{ color: "#475569" }}>Indicadores Clave</p>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {[
                          { label: "Créditos verificados", value: project.credits.toLocaleString() + " tCO₂e", icon: <Leaf size={12}/>, color: "#10B981" },
                          { label: "En proceso", value: "+" + project.pending.toLocaleString() + " tCO₂e", icon: <TrendingUp size={12}/>, color: "#34D399" },
                          { label: "Proyectos activos", value: String(project.projectCount), icon: <MapPin size={12}/>, color: "#3B82F6" },
                          { label: "Elegibilidad", value: project.eligibility, icon: <Shield size={12}/>, color: "#8B5CF6" },
                          { label: "Calif. de riesgo", value: project.riskRating, icon: <AlertCircle size={12}/>, color: RISK_COLOR[project.riskRating] || "#10B981" },
                          { label: "Documentos", value: String(project.documents.length), icon: <FileText size={12}/>, color: "#F59E0B" },
                        ].map(({ label, value, icon, color }) => (
                          <div key={label} className="rounded-xl p-3 flex flex-col gap-1.5"
                            style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                            <div className="flex items-center gap-1.5" style={{ color }}>
                              {icon}
                              <span className="text-xs" style={{ color: "#475569" }}>{label}</span>
                            </div>
                            <span className="text-sm font-semibold text-white">{value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {/* ── OBJETIVOS ── */}
                {tab === "Objetivos" && (
                  <>
                    <div>
                      <p className="text-xs uppercase tracking-widest font-semibold mb-3" style={{ color: "#475569" }}>Objetivo General</p>
                      <p className="text-sm leading-relaxed" style={{ color: "#CBD5E1" }}>{project.objective}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-widest font-semibold mb-4" style={{ color: "#475569" }}>Objetivos Específicos</p>
                      <ul className="flex flex-col gap-3">
                        {project.objectives.map((obj, i) => (
                          <li key={i} className="flex gap-3 text-sm" style={{ color: "#94A3B8" }}>
                            <span className="w-5 h-5 flex-shrink-0 rounded-full flex items-center justify-center text-xs font-bold mt-0.5"
                              style={{ backgroundColor: "#10B98122", color: "#10B981" }}>{i + 1}</span>
                            {obj}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-widest font-semibold mb-4" style={{ color: "#475569" }}>Resultados Obtenidos</p>
                      <ul className="flex flex-col gap-3">
                        {project.results.map((r, i) => (
                          <li key={i} className="flex gap-3 text-sm" style={{ color: "#94A3B8" }}>
                            <CheckCircle2 size={15} className="flex-shrink-0 mt-0.5" style={{ color: "#10B981" }} />
                            {r}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                )}

                {/* ── CRONOGRAMA ── */}
                {tab === "Cronograma" && (
                  <div>
                    <p className="text-xs uppercase tracking-widest font-semibold mb-5" style={{ color: "#475569" }}>Línea de Tiempo</p>
                    <div className="flex flex-col">
                      {project.milestones.map((m, i) => (
                        <div key={i} className="flex gap-4">
                          <div className="flex flex-col items-center flex-shrink-0">
                            <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                              style={{
                                backgroundColor: m.status === "done" ? "#10B98122" : m.status === "active" ? "#3B82F622" : "rgba(255,255,255,0.03)",
                                border: `2px solid ${m.status === "done" ? "#10B981" : m.status === "active" ? "#3B82F6" : "#1E293B"}`,
                              }}>
                              {m.status === "done" ? <CheckCircle2 size={13} style={{ color: "#10B981" }} />
                                : m.status === "active" ? <Clock size={13} style={{ color: "#3B82F6" }} />
                                : <Circle size={13} style={{ color: "#1E293B" }} />}
                            </div>
                            {i < project.milestones.length - 1 && (
                              <div className="w-px flex-1 my-1" style={{ backgroundColor: "#1E293B", minHeight: 24 }} />
                            )}
                          </div>
                          <div className="pb-5 flex-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-sm font-semibold"
                                style={{ color: m.status === "pending" ? "#334155" : "#E2E8F0" }}>{m.label}</span>
                              {m.status === "active" && (
                                <span className="text-xs px-1.5 py-0.5 rounded-full font-semibold"
                                  style={{ backgroundColor: "#3B82F622", color: "#93C5FD" }}>En progreso</span>
                              )}
                            </div>
                            <div className="flex items-center gap-1 mt-1 text-xs" style={{ color: "#334155" }}>
                              <Calendar size={10} />{m.date}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* ── DESEMBOLSOS ── */}
                {tab === "Desembolsos" && (
                  <>
                    <div>
                      <div className="flex justify-between text-xs mb-2">
                        <span style={{ color: "#64748B" }}>{project.disbursed} de {project.approved}</span>
                        <span className="font-semibold" style={{ color: "#10B981" }}>{project.disbursedPct}% desembolsado</span>
                      </div>
                      <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: "#1E293B" }}>
                        <div className="h-full rounded-full" style={{ width: `${project.disbursedPct}%`, backgroundColor: "#10B981" }} />
                      </div>
                    </div>

                    <div>
                      <p className="text-xs uppercase tracking-widest font-semibold mb-4" style={{ color: "#475569" }}>Historial de Desembolsos</p>
                      <div className="flex flex-col gap-2">
                        {project.disbursements.map((d, i) => (
                          <div key={i} className="flex items-center gap-3">
                            <span className="text-xs w-16 flex-shrink-0" style={{ color: "#475569" }}>{d.period}</span>
                            <div className="flex-1 h-6 rounded overflow-hidden relative" style={{ backgroundColor: "#1E293B" }}>
                              <div className="h-full rounded transition-all" style={{ width: `${(d.amount / maxDisb) * 100}%`, backgroundColor: "#10B98133" }} />
                            </div>
                            <span className="text-xs font-semibold w-20 text-right" style={{ color: "#10B981" }}>
                              USD {(d.amount / 1000).toFixed(0)}K
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.06)" }}>
                      <div className="grid grid-cols-3 px-4 py-2 text-xs font-semibold"
                        style={{ backgroundColor: "rgba(255,255,255,0.04)", color: "#475569" }}>
                        <span>Periodo</span><span className="text-right">Monto (USD)</span><span className="text-right">Acumulado</span>
                      </div>
                      {project.disbursements.map((d, i) => {
                        const acc = project.disbursements.slice(0, i + 1).reduce((s, x) => s + x.amount, 0);
                        return (
                          <div key={i} className="grid grid-cols-3 px-4 py-2.5 text-xs"
                            style={{ backgroundColor: i % 2 === 0 ? "rgba(255,255,255,0.02)" : "transparent", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
                            <span style={{ color: "#94A3B8" }}>{d.period}</span>
                            <span className="text-right" style={{ color: "#CBD5E1" }}>{d.amount.toLocaleString()}</span>
                            <span className="text-right font-semibold" style={{ color: "#10B981" }}>{acc.toLocaleString()}</span>
                          </div>
                        );
                      })}
                    </div>
                  </>
                )}

                {/* ── DOCUMENTOS ── */}
                {tab === "Documentos" && (
                  <div>
                    <p className="text-xs uppercase tracking-widest font-semibold mb-4" style={{ color: "#475569" }}>Documentación del Proyecto</p>
                    <div className="flex flex-col gap-2">
                      {project.documents.map((doc, i) => (
                        <div key={i} className="flex items-center gap-3 px-4 py-3 rounded-xl group transition-all hover:border-white/10"
                          style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                          <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                            style={{ backgroundColor: doc.type === "PDF" ? "#EF444422" : "#10B98122" }}>
                            <FileText size={14} style={{ color: doc.type === "PDF" ? "#EF4444" : "#10B981" }} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate" style={{ color: "#E2E8F0" }}>{doc.name}</p>
                            <p className="text-xs mt-0.5" style={{ color: "#475569" }}>{doc.type} · {doc.size} · {doc.date}</p>
                          </div>
                          <button className="w-7 h-7 flex items-center justify-center rounded-lg opacity-0 group-hover:opacity-100 transition-all"
                            style={{ backgroundColor: "#10B98122", color: "#10B981" }}>
                            <Download size={13} />
                          </button>
                        </div>
                      ))}
                    </div>
                    {/* Documentación complementaria — BCIE style */}
                    <div className="mt-6">
                      <p className="text-xs uppercase tracking-widest font-semibold mb-4" style={{ color: "#475569" }}>Documentación Complementaria de Operaciones</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {[
                          { label: "Informe de supervisión ambiental", date: "Jun 2024" },
                          { label: "Evaluación de salvaguardas sociales", date: "May 2024" },
                          { label: "Informe de auditoría financiera", date: "Mar 2024" },
                          { label: "Matriz de indicadores y resultados", date: "Ene 2024" },
                        ].map(({ label, date }) => (
                          <div key={label} className="rounded-xl overflow-hidden group cursor-pointer"
                            style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                            <div className="h-20 overflow-hidden" style={{ backgroundColor: "#10B98115" }}>
                              <div className="w-full h-full flex items-center justify-center">
                                <FileText size={28} style={{ color: "#10B98155" }} />
                              </div>
                            </div>
                            <div className="p-3">
                              <p className="text-xs font-medium leading-snug" style={{ color: "#CBD5E1" }}>{label}</p>
                              <p className="text-xs mt-1" style={{ color: "#475569" }}>{date}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

              </div>
            </div>

            {/* ── SIDEBAR ── */}
            <div className="lg:w-60 flex-shrink-0 p-4 flex flex-col gap-3"
              style={{ borderLeft: "1px solid rgba(255,255,255,0.05)" }}>

              {/* Monto */}
              <div className="rounded-xl p-4 flex flex-col gap-3"
                style={{ backgroundColor: "rgba(16,185,129,0.06)", border: "1px solid rgba(16,185,129,0.12)" }}>
                <div className="flex items-center gap-2">
                  <DollarSign size={13} style={{ color: "#10B981" }} />
                  <span className="text-xs uppercase tracking-wider font-semibold" style={{ color: "#10B981" }}>Financiamiento</span>
                </div>
                <div>
                  <p className="text-xs" style={{ color: "#64748B" }}>Monto Aprobado</p>
                  <p className="font-bold text-white mt-0.5">{project.approved}</p>
                </div>
                <div>
                  <p className="text-xs" style={{ color: "#64748B" }}>Desembolsado</p>
                  <p className="text-sm font-semibold mt-0.5" style={{ color: "#10B981" }}>{project.disbursed}</p>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span style={{ color: "#475569" }}>Progreso</span>
                    <span style={{ color: "#10B981" }}>{project.disbursedPct}%</span>
                  </div>
                  <div className="h-1.5 rounded-full" style={{ backgroundColor: "#1E293B" }}>
                    <div className="h-full rounded-full" style={{ width: `${project.disbursedPct}%`, backgroundColor: "#10B981" }} />
                  </div>
                </div>
              </div>

              {/* Beneficiarios */}
              <div className="rounded-xl p-4 flex flex-col gap-2.5"
                style={{ backgroundColor: "rgba(59,130,246,0.06)", border: "1px solid rgba(59,130,246,0.12)" }}>
                <div className="flex items-center gap-2">
                  <Users size={13} style={{ color: "#3B82F6" }} />
                  <span className="text-xs uppercase tracking-wider font-semibold" style={{ color: "#3B82F6" }}>Beneficiarios</span>
                </div>
                <div>
                  <p className="text-xs" style={{ color: "#64748B" }}>Directos</p>
                  <p className="font-bold text-white">{project.beneficiariesDirect}</p>
                </div>
                <div>
                  <p className="text-xs" style={{ color: "#64748B" }}>Indirectos</p>
                  <p className="text-sm font-semibold" style={{ color: "#93C5FD" }}>{project.beneficiariesIndirect}</p>
                </div>
              </div>

              {/* Créditos */}
              <div className="rounded-xl p-4 flex flex-col gap-2"
                style={{ backgroundColor: "rgba(139,92,246,0.06)", border: "1px solid rgba(139,92,246,0.12)" }}>
                <div className="flex items-center gap-2">
                  <BarChart2 size={13} style={{ color: "#8B5CF6" }} />
                  <span className="text-xs uppercase tracking-wider font-semibold" style={{ color: "#8B5CF6" }}>Créditos CO₂</span>
                </div>
                <div>
                  <p className="text-xs" style={{ color: "#64748B" }}>Verificados</p>
                  <p className="font-bold text-white">{project.credits.toLocaleString()} tCO₂e</p>
                </div>
                <div>
                  <p className="text-xs" style={{ color: "#64748B" }}>En proceso</p>
                  <p className="text-sm font-semibold" style={{ color: "#C4B5FD" }}>+{project.pending.toLocaleString()} tCO₂e</p>
                </div>
                <span className="text-xs px-2 py-1 rounded-lg text-center font-medium mt-1"
                  style={{ backgroundColor: (RISK_COLOR[project.riskRating] || "#10B981") + "22", color: RISK_COLOR[project.riskRating] || "#10B981" }}>
                  Riesgo {project.riskRating}
                </span>
              </div>

              {/* Hito activo */}
              {activeMilestone && (
                <div className="rounded-xl p-4 flex flex-col gap-2"
                  style={{ backgroundColor: "rgba(59,130,246,0.05)", border: "1px solid rgba(59,130,246,0.1)" }}>
                  <div className="flex items-center gap-2">
                    <Clock size={13} style={{ color: "#3B82F6" }} />
                    <span className="text-xs uppercase tracking-wider font-semibold" style={{ color: "#3B82F6" }}>Hito Activo</span>
                  </div>
                  <p className="text-xs font-medium" style={{ color: "#E2E8F0" }}>{activeMilestone.label}</p>
                  <p className="text-xs" style={{ color: "#475569" }}>{activeMilestone.date}</p>
                </div>
              )}

              {/* Fechas */}
              <div className="rounded-xl p-4 flex flex-col gap-2"
                style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="flex items-center gap-2 mb-1">
                  <Calendar size={13} style={{ color: "#F59E0B" }} />
                  <span className="text-xs uppercase tracking-wider font-semibold" style={{ color: "#F59E0B" }}>Fechas Clave</span>
                </div>
                {[
                  { label: "Aprobación", value: project.approvalDate },
                  { label: "Inicio", value: project.startDate },
                  { label: "Cierre est.", value: project.estimatedClose },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between text-xs">
                    <span style={{ color: "#475569" }}>{label}</span>
                    <span className="font-medium" style={{ color: "#94A3B8" }}>{value}</span>
                  </div>
                ))}
              </div>

              <a href="#"
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold transition-all hover:opacity-90"
                style={{ backgroundColor: "#10B981", color: "#fff" }}>
                Registrar Proyecto <ArrowRight size={14} />
              </a>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
