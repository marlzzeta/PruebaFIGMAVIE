import { useState, useRef } from "react";
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from "react-simple-maps";
import { ArrowRight, Leaf, Shield, TrendingUp, Plus, Minus } from "lucide-react";
import { PROJECTS, CATEGORY_COLOR, RISK_COLOR } from "../data/projects";
import type { Project } from "../data/projects";
import { ProjectModal } from "./ProjectModal";

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";
const MIN_ZOOM = 1;
const MAX_ZOOM = 8;
const PROJ_SCALE = 140;
const PROJ_CENTER: [number, number] = [-40, 15];

export function InteractiveMap() {
  const [selected, setSelected] = useState<Project>(PROJECTS[0]);
  const [hovered, setHovered] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  const [center, setCenter] = useState<[number, number]>(PROJ_CENTER);
  const [modalProject, setModalProject] = useState<Project | null>(null);

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mousePosRef = useRef<{ x: number; y: number } | null>(null);

  const zoomToMouse = (factor: number) => {
    const newZoom = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, zoom * factor));
    if (mousePosRef.current && mapContainerRef.current) {
      const rect = mapContainerRef.current.getBoundingClientRect();
      const dx = mousePosRef.current.x - rect.width / 2;
      const dy = mousePosRef.current.y - rect.height / 2;
      const latRad = center[1] * (Math.PI / 180);
      const dlng = (dx / (PROJ_SCALE * zoom * Math.cos(latRad))) * (180 / Math.PI);
      const dlat = (-dy / (PROJ_SCALE * zoom)) * (180 / Math.PI);
      const geoLng = center[0] + dlng;
      const geoLat = center[1] + dlat;
      const newDlng = (dx / (PROJ_SCALE * newZoom * Math.cos(latRad))) * (180 / Math.PI);
      const newDlat = (-dy / (PROJ_SCALE * newZoom)) * (180 / Math.PI);
      setCenter([geoLng - newDlng, geoLat - newDlat]);
    }
    setZoom(newZoom);
  };

  const dotR = Math.max(1.2, 2.5 / zoom);
  const dotRHover = dotR * 1.35;
  const dotRSelected = dotR * 1.6;

  return (
    <section style={{ backgroundColor: "#0B1628" }} className="py-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs tracking-widest uppercase font-semibold mb-4"
            style={{ backgroundColor: "rgba(16,185,129,0.15)", color: "#6EE7B7" }}>
            <Leaf size={11} /> Proyectos por País
          </span>
          <h2 className="text-3xl md:text-4xl text-white" style={{ fontWeight: 800 }}>
            ¿Tienes un proyecto de carbono o biodiversidad?
          </h2>
          <p className="text-gray-400 mt-2 max-w-xl">
            Explora los proyectos activos en la región SICA. Selecciona un país para ver su información detallada.
          </p>
        </div>

        {/* Country pills */}
        <div className="mb-6 flex flex-wrap gap-2">
          {PROJECTS.map((c) => (
            <button key={c.name} onClick={() => setSelected(c)}
              className="px-3 py-1.5 rounded-full text-xs font-medium transition-all"
              style={selected.name === c.name
                ? { backgroundColor: "#10B981", color: "#fff" }
                : { backgroundColor: "rgba(255,255,255,0.06)", color: "#94A3B8", border: "1px solid rgba(255,255,255,0.08)" }}>
              {c.name}
            </button>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-6 items-stretch">
          {/* Map */}
          <div ref={mapContainerRef}
            className="flex-1 rounded-2xl overflow-hidden relative"
            style={{ backgroundColor: "#0F1E35", border: "1px solid rgba(255,255,255,0.06)", minHeight: 380 }}
            onMouseMove={(e) => {
              const rect = mapContainerRef.current?.getBoundingClientRect();
              if (rect) mousePosRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
            }}
            onMouseLeave={() => { mousePosRef.current = null; }}>
            <ComposableMap
              projection="geoMercator"
              projectionConfig={{ scale: PROJ_SCALE, center: PROJ_CENTER }}
              style={{ width: "100%", height: "100%", minHeight: 380 }}>
              <ZoomableGroup zoom={zoom} center={center} minZoom={MIN_ZOOM} maxZoom={MAX_ZOOM}
                onMoveEnd={({ coordinates, zoom: z }) => { setCenter(coordinates); setZoom(z); }}>
                <Geographies geography={GEO_URL}>
                  {({ geographies }) => geographies.map((geo) => (
                    <Geography key={geo.rsmKey} geography={geo} fill="#1E3A5F" stroke="#0B1628" strokeWidth={0.4}
                      style={{ default: { outline: "none" }, hover: { outline: "none", fill: "#1E4A7F" }, pressed: { outline: "none" } }} />
                  ))}
                </Geographies>

                {PROJECTS.map((country) => {
                  const isSelected = selected.name === country.name;
                  const isHovered = hovered === country.name;
                  const r = isSelected ? dotRSelected : isHovered ? dotRHover : dotR;
                  return (
                    <Marker key={country.name} coordinates={country.coordinates}
                      onClick={() => setSelected(country)}
                      onMouseEnter={() => setHovered(country.name)}
                      onMouseLeave={() => setHovered(null)}
                      style={{ cursor: "pointer" }}>
                      {isSelected && (
                        <circle r={dotRSelected * 2.8} fill="none" stroke="#10B981" strokeWidth={0.6} opacity={0.45} />
                      )}
                      <circle r={r}
                        fill={isSelected ? "#10B981" : isHovered ? "#34D399" : "#6EE7B7"}
                        stroke={isSelected ? "#fff" : "#0B1628"}
                        strokeWidth={isSelected ? 0.6 : 0.4}
                        style={{ transition: "r 0.15s ease, fill 0.15s ease" }} />
                      {isHovered && !isSelected && (
                        <text textAnchor="middle" y={-(dotRHover + 2)}
                          style={{ fontFamily: "Inter,sans-serif", fontSize: Math.max(3, 7 / zoom), fill: "#E2E8F0", pointerEvents: "none" }}>
                          {country.name}
                        </text>
                      )}
                    </Marker>
                  );
                })}
              </ZoomableGroup>
            </ComposableMap>

            {/* Zoom controls */}
            <div className="absolute top-4 right-4 flex flex-col gap-1">
              {[{ fn: () => zoomToMouse(1.5), icon: <Plus size={14} />, disabled: zoom >= MAX_ZOOM, title: "Acercar" },
                { fn: () => zoomToMouse(1 / 1.5), icon: <Minus size={14} />, disabled: zoom <= MIN_ZOOM, title: "Alejar" }]
                .map(({ fn, icon, disabled, title }) => (
                  <button key={title} onClick={fn} disabled={disabled} title={title}
                    className="w-8 h-8 flex items-center justify-center rounded-lg transition-all disabled:opacity-30"
                    style={{ backgroundColor: "rgba(11,22,40,0.9)", border: "1px solid rgba(255,255,255,0.12)", color: "#E2E8F0" }}>
                    {icon}
                  </button>
                ))}
            </div>

            {/* Legend */}
            <div className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-2 rounded-lg"
              style={{ backgroundColor: "rgba(11,22,40,0.85)" }}>
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#10B981" }} />
              <span className="text-xs text-gray-300">Proyecto activo · Haz clic para explorar</span>
            </div>
          </div>

          {/* Info Card */}
          <div className="w-full lg:w-80 rounded-2xl overflow-hidden flex flex-col"
            style={{ backgroundColor: "#0F1E35", border: "1px solid rgba(255,255,255,0.08)" }}>
            {/* Card image */}
            <div className="relative h-40 overflow-hidden flex-shrink-0">
              <img src={selected.image} alt={selected.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0"
                style={{ background: "linear-gradient(180deg,rgba(15,30,53,0.2) 0%,rgba(15,30,53,0.7) 100%)" }} />
              <div className="absolute top-3 left-3">
                <span className="text-white font-bold text-sm">{selected.name}</span>
              </div>
              <span className="absolute top-3 right-3 text-xs px-2 py-0.5 rounded-full font-semibold"
                style={{
                  backgroundColor: (CATEGORY_COLOR[selected.category] || "#10B981") + "33",
                  color: CATEGORY_COLOR[selected.category] || "#10B981",
                  border: `1px solid ${CATEGORY_COLOR[selected.category] || "#10B981"}55`,
                }}>
                {selected.category}
              </span>
            </div>

            {/* Card body */}
            <div className="p-5 flex flex-col gap-4 flex-1">
              <p className="text-gray-400 text-xs leading-relaxed">{selected.shortDescription}</p>

              <div className="flex gap-3">
                <div className="flex-1 rounded-xl p-3 flex flex-col gap-1"
                  style={{ backgroundColor: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.15)" }}>
                  <span className="text-xs text-gray-500 uppercase tracking-wider">Créditos</span>
                  <span className="text-white font-bold text-base">{selected.credits.toLocaleString()}</span>
                  <span className="text-xs" style={{ color: "#10B981" }}>+{selected.pending.toLocaleString()} en proceso</span>
                </div>
                <div className="flex-1 rounded-xl p-3 flex flex-col gap-1"
                  style={{ backgroundColor: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.15)" }}>
                  <span className="text-xs text-gray-500 uppercase tracking-wider">Proyectos</span>
                  <span className="text-white font-bold text-base">{selected.projectCount}</span>
                  <span className="text-xs text-gray-400">registrados</span>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Shield size={13} style={{ color: "#3B82F6" }} />
                    <span className="text-xs text-gray-400">Elegibilidad</span>
                  </div>
                  <span className="text-xs font-semibold text-white">{selected.eligibility}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingUp size={13} style={{ color: RISK_COLOR[selected.riskRating] || "#10B981" }} />
                    <span className="text-xs text-gray-400">Calificación de riesgo</span>
                  </div>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full"
                    style={{ color: RISK_COLOR[selected.riskRating] || "#10B981", backgroundColor: (RISK_COLOR[selected.riskRating] || "#10B981") + "22" }}>
                    {selected.riskRating}
                  </span>
                </div>
              </div>

              <a href="#"
                className="mt-auto inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold transition-all hover:opacity-90"
                style={{ backgroundColor: "#10B981", color: "#fff" }}>
                Registrar mi Proyecto <ArrowRight size={15} />
              </a>

              <button onClick={() => setModalProject(selected)}
                className="inline-flex items-center justify-center gap-1 text-xs font-medium hover:opacity-80 transition-opacity"
                style={{ color: "#6EE7B7" }}>
                Ver proyecto completo <ArrowRight size={12} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {modalProject && <ProjectModal project={modalProject} onClose={() => setModalProject(null)} />}
    </section>
  );
}
