// ── Shared project data for MetaRegistro + ProjectModal ──────────────────────

export interface Milestone {
  label: string;
  date: string;
  status: "done" | "active" | "pending";
}

export interface Disbursement {
  period: string;
  amount: number;
}

export interface ProjectDoc {
  name: string;
  type: string;
  size: string;
  date: string;
}

export interface Project {
  // Map / card fields
  id: string;
  name: string;
  country: string;
  coordinates: [number, number];
  image: string;
  category: string;
  riskRating: string;
  eligibility: string;
  credits: number;
  pending: number;
  projectCount: number;
  shortDescription: string;

  // Ficha / BCIE-style fields
  title: string;
  prestatario: string;
  ejecutor: string;
  status: "En ejecución" | "Aprobado" | "Cerrado";
  approved: string;
  approvedUSD: number;
  disbursed: string;
  disbursedUSD: number;
  disbursedPct: number;
  cofinancier: string;
  approvalDate: string;
  startDate: string;
  estimatedClose: string;
  beneficiariesDirect: string;
  beneficiariesIndirect: string;
  objective: string;
  objectives: string[];
  results: string[];
  milestones: Milestone[];
  disbursements: Disbursement[];
  documents: ProjectDoc[];
}

export const PROJECTS: Project[] = [
  {
    id: "TVH-GT-0012",
    name: "Guatemala",
    country: "Guatemala",
    coordinates: [-90.23, 15.78],
    image: "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=800&q=80",
    category: "Bosques y Costas",
    riskRating: "Bajo",
    eligibility: "Artículo 6.2 Criteria",
    credits: 12375,
    pending: 1420,
    projectCount: 7,
    shortDescription: "Conservación de bosques tropicales y manglares en la cuenca del Usumacinta.",
    title: "Programa de Conservación de Bosques Tropicales y Carbono Azul — Cuenca del Usumacinta",
    prestatario: "Ministerio de Ambiente y Recursos Naturales de Guatemala",
    ejecutor: "CONAP — Consejo Nacional de Áreas Protegidas",
    status: "En ejecución",
    approved: "USD 4,800,000",
    approvedUSD: 4800000,
    disbursed: "USD 2,160,000",
    disbursedUSD: 2160000,
    disbursedPct: 45,
    cofinancier: "GEF — Fondo para el Medio Ambiente Mundial",
    approvalDate: "14 mar 2022",
    startDate: "01 jun 2022",
    estimatedClose: "31 dic 2026",
    beneficiariesDirect: "38,400",
    beneficiariesIndirect: "142,000",
    objective: "Reducir la deforestación y degradación de ecosistemas forestales en la cuenca del Usumacinta, generando créditos de carbono verificados y protegiendo la biodiversidad de la región Petén.",
    objectives: [
      "Proteger 185,000 ha de bosque tropical primario bajo esquemas REDD+.",
      "Generar y verificar al menos 12,000 tCO₂e anuales bajo estándar VCS.",
      "Fortalecer capacidades de 42 comunidades indígenas en gestión forestal.",
      "Desarrollar un sistema de monitoreo satelital de cobertura boscosa.",
    ],
    results: [
      "Reducción del 28% en tasa de deforestación local (línea base 2021).",
      "7,200 tCO₂e verificados y registrados en el meta-registro BCIE.",
      "22 comunidades capacitadas con planes de manejo forestal aprobados.",
    ],
    milestones: [
      { label: "Aprobación del proyecto", date: "14 mar 2022", status: "done" },
      { label: "Firma del convenio", date: "28 abr 2022", status: "done" },
      { label: "Inicio de operaciones", date: "01 jun 2022", status: "done" },
      { label: "Primera verificación VCS", date: "15 ene 2024", status: "done" },
      { label: "Revisión de medio término", date: "30 jun 2025", status: "active" },
      { label: "Segunda verificación VCS", date: "15 ene 2026", status: "pending" },
      { label: "Cierre y evaluación final", date: "31 dic 2026", status: "pending" },
    ],
    disbursements: [
      { period: "Jun 2022", amount: 480000 },
      { period: "Dic 2022", amount: 580000 },
      { period: "Jun 2023", amount: 420000 },
      { period: "Dic 2023", amount: 380000 },
      { period: "Jun 2024", amount: 300000 },
    ],
    documents: [
      { name: "Documento de Proyecto Aprobado", type: "PDF", size: "3.2 MB", date: "mar 2022" },
      { name: "Evaluación Ambiental y Social", type: "PDF", size: "5.8 MB", date: "feb 2022" },
      { name: "Informe de Verificación VCS — 2024", type: "PDF", size: "2.1 MB", date: "ene 2024" },
      { name: "Informe de Supervisión Semestral", type: "PDF", size: "1.4 MB", date: "jun 2024" },
      { name: "Plan de Monitoreo y Evaluación", type: "XLSX", size: "890 KB", date: "may 2022" },
    ],
  },
  {
    id: "TVH-CR-0007",
    name: "Costa Rica",
    country: "Costa Rica",
    coordinates: [-83.76, 9.75],
    image: "https://images.unsplash.com/photo-1552799446-159ba9523315?w=800&q=80",
    category: "Biodiversidad",
    riskRating: "Muy Bajo",
    eligibility: "Gold Standard",
    credits: 28900,
    pending: 3200,
    projectCount: 12,
    shortDescription: "Programa nacional de pagos por servicios ambientales con cobertura en 6 provincias.",
    title: "Pagos por Servicios Ambientales y Biodiversidad — Programa Nacional FONAFIFO",
    prestatario: "Fondo Nacional de Financiamiento Forestal (FONAFIFO)",
    ejecutor: "MINAE — Ministerio de Ambiente, Energía y Telecomunicaciones",
    status: "En ejecución",
    approved: "USD 12,500,000",
    approvedUSD: 12500000,
    disbursed: "USD 9,375,000",
    disbursedUSD: 9375000,
    disbursedPct: 75,
    cofinancier: "BID — Banco Interamericano de Desarrollo",
    approvalDate: "05 sep 2020",
    startDate: "01 ene 2021",
    estimatedClose: "30 jun 2025",
    beneficiariesDirect: "12,800",
    beneficiariesIndirect: "380,000",
    objective: "Fortalecer el sistema de pagos por servicios ambientales de Costa Rica para incrementar la captura de carbono, proteger la biodiversidad y mejorar los ingresos de pequeños y medianos propietarios forestales.",
    objectives: [
      "Incorporar 48,000 ha adicionales al programa PSA durante el periodo de proyecto.",
      "Verificar y registrar 28,000 tCO₂e anuales bajo Gold Standard.",
      "Apoyar la transición de 1,200 fincas hacia sistemas agroforestales certificados.",
      "Crear un fondo fiduciario de largo plazo para la continuidad del programa.",
    ],
    results: [
      "42,300 ha incorporadas al programa PSA (88% de meta).",
      "26,900 tCO₂e verificados y transados en mercados voluntarios.",
      "980 fincas con sistemas agroforestales certificados.",
      "Fondo fiduciario capitalizado en USD 3.2M.",
    ],
    milestones: [
      { label: "Aprobación del proyecto", date: "05 sep 2020", status: "done" },
      { label: "Firma del convenio", date: "15 oct 2020", status: "done" },
      { label: "Inicio de operaciones", date: "01 ene 2021", status: "done" },
      { label: "Primera verificación Gold Standard", date: "20 mar 2022", status: "done" },
      { label: "Constitución del fondo fiduciario", date: "30 sep 2023", status: "done" },
      { label: "Revisión final y cierre", date: "30 jun 2025", status: "active" },
    ],
    disbursements: [
      { period: "Ene 2021", amount: 1500000 },
      { period: "Jul 2021", amount: 2200000 },
      { period: "Ene 2022", amount: 1800000 },
      { period: "Jul 2022", amount: 1900000 },
      { period: "Ene 2023", amount: 1975000 },
    ],
    documents: [
      { name: "Documento de Proyecto Aprobado", type: "PDF", size: "4.6 MB", date: "sep 2020" },
      { name: "Evaluación de Impacto Ambiental", type: "PDF", size: "7.2 MB", date: "ago 2020" },
      { name: "Informe Anual 2023", type: "PDF", size: "3.8 MB", date: "dic 2023" },
      { name: "Verificación Gold Standard — 2023", type: "PDF", size: "2.9 MB", date: "mar 2023" },
    ],
  },
  {
    id: "TVH-HN-0019",
    name: "Honduras",
    country: "Honduras",
    coordinates: [-86.24, 15.20],
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
    category: "Agricultura",
    riskRating: "Medio",
    eligibility: "VCS + CCB",
    credits: 9800,
    pending: 870,
    projectCount: 5,
    shortDescription: "Manejo sostenible de suelos agrícolas y agroforestería en el corredor seco.",
    title: "Manejo Sostenible de Suelos Agrícolas y Agroforestería — Corredor Seco de Honduras",
    prestatario: "Secretaría de Agricultura y Ganadería (SAG) de Honduras",
    ejecutor: "ICF — Instituto de Conservación Forestal",
    status: "En ejecución",
    approved: "USD 3,200,000",
    approvedUSD: 3200000,
    disbursed: "USD 960,000",
    disbursedUSD: 960000,
    disbursedPct: 30,
    cofinancier: "FAO — Organización de las Naciones Unidas para la Alimentación",
    approvalDate: "18 nov 2023",
    startDate: "01 feb 2024",
    estimatedClose: "31 ene 2028",
    beneficiariesDirect: "22,600",
    beneficiariesIndirect: "89,000",
    objective: "Mejorar la resiliencia climática de comunidades agrícolas en el corredor seco hondureño mediante la implementación de prácticas de manejo sostenible de suelos y sistemas agroforestales generadores de créditos de carbono.",
    objectives: [
      "Implementar sistemas agroforestales en 15,000 ha del corredor seco.",
      "Generar 9,800 tCO₂e verificados bajo metodología VM0042.",
      "Reducir la degradación de suelos en un 35% en las áreas de intervención.",
      "Aumentar los ingresos de 4,500 familias rurales mediante mercados de carbono.",
    ],
    results: [
      "3,200 ha con sistemas agroforestales establecidos (1er año).",
      "1,850 tCO₂e pre-verificados bajo metodología VM0042.",
      "1,200 familias incorporadas al programa de pagos.",
    ],
    milestones: [
      { label: "Aprobación del proyecto", date: "18 nov 2023", status: "done" },
      { label: "Firma del convenio", date: "15 ene 2024", status: "done" },
      { label: "Inicio de operaciones", date: "01 feb 2024", status: "done" },
      { label: "Primera auditoría de carbono", date: "30 jun 2025", status: "active" },
      { label: "Verificación VCS — 1er ciclo", date: "31 dic 2025", status: "pending" },
      { label: "Revisión de medio término", date: "30 jun 2026", status: "pending" },
      { label: "Cierre y evaluación final", date: "31 ene 2028", status: "pending" },
    ],
    disbursements: [
      { period: "Feb 2024", amount: 480000 },
      { period: "Ago 2024", amount: 480000 },
    ],
    documents: [
      { name: "Documento de Proyecto Aprobado", type: "PDF", size: "2.8 MB", date: "nov 2023" },
      { name: "Evaluación Ambiental y Social", type: "PDF", size: "4.1 MB", date: "oct 2023" },
      { name: "Metodología VM0042 — Aplicación", type: "PDF", size: "1.9 MB", date: "ene 2024" },
      { name: "Informe de Arranque", type: "PDF", size: "1.2 MB", date: "mar 2024" },
    ],
  },
  {
    id: "TVH-NI-0008",
    name: "Nicaragua",
    country: "Nicaragua",
    coordinates: [-85.21, 12.86],
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    category: "Bosques y Costas",
    riskRating: "Medio",
    eligibility: "Plan Vivo",
    credits: 6540,
    pending: 490,
    projectCount: 4,
    shortDescription: "Restauración de ecosistemas de manglar en la costa del Caribe norte.",
    title: "Restauración de Ecosistemas de Manglar — Costa Caribe Norte de Nicaragua",
    prestatario: "MARENA — Ministerio del Ambiente y los Recursos Naturales",
    ejecutor: "SERENA — Secretaría de Recursos Naturales RACCN",
    status: "En ejecución",
    approved: "USD 2,100,000",
    approvedUSD: 2100000,
    disbursed: "USD 840,000",
    disbursedUSD: 840000,
    disbursedPct: 40,
    cofinancier: "Fondo Verde para el Clima (GCF)",
    approvalDate: "22 ago 2022",
    startDate: "01 nov 2022",
    estimatedClose: "31 oct 2026",
    beneficiariesDirect: "14,200",
    beneficiariesIndirect: "52,000",
    objective: "Restaurar y conservar ecosistemas de manglar en la Costa Caribe Norte de Nicaragua, generando créditos de carbono azul y mejorando la resiliencia costera ante el cambio climático.",
    objectives: [
      "Restaurar 8,500 ha de manglares degradados bajo metodología de carbono azul.",
      "Generar 6,540 tCO₂e anuales verificados bajo Plan Vivo.",
      "Fortalecer la gobernanza comunitaria en 18 territorios indígenas costeros.",
      "Reducir la vulnerabilidad costera de 14 comunidades ante huracanes.",
    ],
    results: [
      "3,200 ha de manglar restauradas (37.6% de meta).",
      "2,180 tCO₂e verificados bajo Plan Vivo.",
      "11 comunidades con planes de manejo costero aprobados.",
    ],
    milestones: [
      { label: "Aprobación del proyecto", date: "22 ago 2022", status: "done" },
      { label: "Firma del convenio", date: "10 oct 2022", status: "done" },
      { label: "Inicio de restauración fase I", date: "01 nov 2022", status: "done" },
      { label: "Verificación Plan Vivo — ciclo 1", date: "15 abr 2024", status: "done" },
      { label: "Inicio fase II restauración", date: "01 ene 2025", status: "active" },
      { label: "Verificación Plan Vivo — ciclo 2", date: "15 abr 2026", status: "pending" },
      { label: "Cierre y evaluación final", date: "31 oct 2026", status: "pending" },
    ],
    disbursements: [
      { period: "Nov 2022", amount: 210000 },
      { period: "May 2023", amount: 280000 },
      { period: "Nov 2023", amount: 210000 },
      { period: "May 2024", amount: 140000 },
    ],
    documents: [
      { name: "Documento de Proyecto Aprobado", type: "PDF", size: "3.5 MB", date: "ago 2022" },
      { name: "Evaluación de Impacto Ambiental", type: "PDF", size: "6.0 MB", date: "jul 2022" },
      { name: "Informe Verificación Plan Vivo 2024", type: "PDF", size: "2.4 MB", date: "abr 2024" },
    ],
  },
  {
    id: "TVH-PA-0015",
    name: "Panamá",
    country: "Panamá",
    coordinates: [-80.78, 8.99],
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80",
    category: "Biodiversidad",
    riskRating: "Bajo",
    eligibility: "Artículo 6.4",
    credits: 19200,
    pending: 2100,
    projectCount: 9,
    shortDescription: "Conservación del corredor biológico del Darién y bosques húmedos tropicales.",
    title: "Conservación del Corredor Biológico del Darién y Bosques Húmedos Tropicales",
    prestatario: "MiAmbiente — Ministerio de Ambiente de Panamá",
    ejecutor: "ANAM — Autoridad Nacional del Ambiente",
    status: "En ejecución",
    approved: "USD 7,400,000",
    approvedUSD: 7400000,
    disbursed: "USD 4,440,000",
    disbursedUSD: 4440000,
    disbursedPct: 60,
    cofinancier: "KfW — Banco Alemán de Desarrollo",
    approvalDate: "10 mar 2021",
    startDate: "01 jun 2021",
    estimatedClose: "31 may 2026",
    beneficiariesDirect: "31,000",
    beneficiariesIndirect: "190,000",
    objective: "Conservar la integridad ecológica del Corredor Biológico del Darién como uno de los últimos bloques de bosque húmedo tropical continuo de América, generando créditos de carbono bajo el estándar Artículo 6.4.",
    objectives: [
      "Proteger 320,000 ha del Corredor Biológico del Darién bajo esquemas REDD+.",
      "Verificar y registrar 19,200 tCO₂e anuales bajo Artículo 6.4 del Acuerdo de París.",
      "Integrar 28 comunidades embera y wounaan en la gestión del corredor.",
      "Establecer un fondo de compensación para comunidades guardianas del bosque.",
    ],
    results: [
      "295,000 ha bajo protección efectiva (92% de meta).",
      "15,600 tCO₂e verificados bajo Artículo 6.4.",
      "24 comunidades indígenas activas en monitoreo y vigilancia.",
      "Fondo de compensación USD 1.8M operativo desde 2023.",
    ],
    milestones: [
      { label: "Aprobación del proyecto", date: "10 mar 2021", status: "done" },
      { label: "Firma del convenio", date: "28 abr 2021", status: "done" },
      { label: "Inicio de operaciones", date: "01 jun 2021", status: "done" },
      { label: "Verificación Art. 6.4 — ciclo 1", date: "20 feb 2023", status: "done" },
      { label: "Establecimiento fondo comunitario", date: "15 ago 2023", status: "done" },
      { label: "Verificación Art. 6.4 — ciclo 2", date: "20 feb 2025", status: "active" },
      { label: "Cierre y evaluación final", date: "31 may 2026", status: "pending" },
    ],
    disbursements: [
      { period: "Jun 2021", amount: 740000 },
      { period: "Dic 2021", amount: 890000 },
      { period: "Jun 2022", amount: 850000 },
      { period: "Dic 2022", amount: 780000 },
      { period: "Jun 2023", amount: 700000 },
      { period: "Dic 2023", amount: 480000 },
    ],
    documents: [
      { name: "Documento de Proyecto Aprobado", type: "PDF", size: "5.2 MB", date: "mar 2021" },
      { name: "Evaluación Ambiental y Social", type: "PDF", size: "8.4 MB", date: "feb 2021" },
      { name: "Verificación Artículo 6.4 — 2023", type: "PDF", size: "3.1 MB", date: "feb 2023" },
      { name: "Informe Anual 2023", type: "PDF", size: "2.6 MB", date: "ene 2024" },
      { name: "Informe Fondo Comunitario", type: "PDF", size: "1.8 MB", date: "sep 2023" },
    ],
  },
  {
    id: "TVH-SV-0004",
    name: "El Salvador",
    country: "El Salvador",
    coordinates: [-88.90, 13.79],
    image: "https://images.unsplash.com/photo-1569163139599-0f4517e36f31?w=800&q=80",
    category: "Eficiencia",
    riskRating: "Bajo",
    eligibility: "Gold Standard",
    credits: 3200,
    pending: 280,
    projectCount: 3,
    shortDescription: "Proyectos de cocinas eficientes y energía renovable en comunidades rurales.",
    title: "Cocinas Eficientes y Energías Renovables para Comunidades Rurales de El Salvador",
    prestatario: "MARN — Ministerio de Medio Ambiente y Recursos Naturales",
    ejecutor: "CNE — Consejo Nacional de Energía",
    status: "En ejecución",
    approved: "USD 1,800,000",
    approvedUSD: 1800000,
    disbursed: "USD 900,000",
    disbursedUSD: 900000,
    disbursedPct: 50,
    cofinancier: "Programa de Pequeñas Donaciones PNUD/GEF",
    approvalDate: "07 jun 2022",
    startDate: "01 sep 2022",
    estimatedClose: "31 ago 2025",
    beneficiariesDirect: "18,400",
    beneficiariesIndirect: "72,000",
    objective: "Reducir las emisiones de GEI y mejorar la calidad del aire interior en comunidades rurales de El Salvador mediante la distribución de cocinas eficientes certificadas y sistemas fotovoltaicos domiciliarios.",
    objectives: [
      "Distribuir e instalar 4,600 cocinas eficientes certificadas Gold Standard.",
      "Instalar 820 sistemas fotovoltaicos domiciliarios de 300W en zonas sin red.",
      "Generar 3,200 tCO₂e anuales bajo metodología AMS-II.G.",
      "Reducir el consumo de leña en un 60% en hogares beneficiados.",
    ],
    results: [
      "2,800 cocinas eficientes instaladas y en operación.",
      "480 sistemas fotovoltaicos instalados.",
      "1,960 tCO₂e verificados bajo Gold Standard.",
      "Reducción promedio de leña del 58% en hogares monitoreados.",
    ],
    milestones: [
      { label: "Aprobación del proyecto", date: "07 jun 2022", status: "done" },
      { label: "Firma del convenio", date: "01 ago 2022", status: "done" },
      { label: "Inicio de distribución fase I", date: "01 sep 2022", status: "done" },
      { label: "Verificación Gold Standard — ciclo 1", date: "28 feb 2024", status: "done" },
      { label: "Distribución fase II", date: "01 ene 2025", status: "active" },
      { label: "Cierre y evaluación final", date: "31 ago 2025", status: "pending" },
    ],
    disbursements: [
      { period: "Sep 2022", amount: 180000 },
      { period: "Mar 2023", amount: 240000 },
      { period: "Sep 2023", amount: 260000 },
      { period: "Mar 2024", amount: 220000 },
    ],
    documents: [
      { name: "Documento de Proyecto Aprobado", type: "PDF", size: "2.2 MB", date: "jun 2022" },
      { name: "Evaluación de Ciclo de Vida — Cocinas", type: "PDF", size: "3.5 MB", date: "may 2022" },
      { name: "Verificación Gold Standard 2024", type: "PDF", size: "1.8 MB", date: "feb 2024" },
      { name: "Informe Semestral — 2do sem 2023", type: "PDF", size: "1.1 MB", date: "ene 2024" },
    ],
  },
  {
    id: "TVH-BZ-0011",
    name: "Belice",
    country: "Belice",
    coordinates: [-88.50, 17.25],
    image: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=800&q=80",
    category: "Bosques y Costas",
    riskRating: "Muy Bajo",
    eligibility: "VCS + CCB",
    credits: 8750,
    pending: 960,
    projectCount: 6,
    shortDescription: "Protección de la barrera de coral y manglares costeros del Mar Caribe.",
    title: "Protección de la Barrera de Coral y Manglares Costeros del Caribe de Belice",
    prestatario: "Fisheries Department — Ministry of Blue Economy Belize",
    ejecutor: "Belize Coastal Zone Management Authority & Institute (CZMAI)",
    status: "En ejecución",
    approved: "USD 3,600,000",
    approvedUSD: 3600000,
    disbursed: "USD 1,800,000",
    disbursedUSD: 1800000,
    disbursedPct: 50,
    cofinancier: "Blue Carbon Initiative — Conservation International",
    approvalDate: "15 abr 2022",
    startDate: "01 jul 2022",
    estimatedClose: "30 jun 2027",
    beneficiariesDirect: "26,800",
    beneficiariesIndirect: "95,000",
    objective: "Conservar y restaurar los ecosistemas de carbono azul de Belice —manglares, praderas de pastos marinos y arrecifes de coral— generando créditos certificados bajo VCS+CCB y fortaleciendo la resiliencia de comunidades costeras.",
    objectives: [
      "Proteger y restaurar 12,400 ha de manglares costeros bajo VCS+CCB.",
      "Conservar 38,000 ha de praderas de pastos marinos como sumidero de carbono.",
      "Verificar 8,750 tCO₂e anuales de carbono azul.",
      "Fortalecer la gestión comunitaria en 14 pueblos pesqueros.",
    ],
    results: [
      "9,800 ha de manglares bajo esquema de protección activa.",
      "28,400 ha de praderas de pastos marinos monitoreadas.",
      "4,200 tCO₂e verificados bajo VCS+CCB.",
      "10 comunidades con planes de gestión costera aprobados.",
    ],
    milestones: [
      { label: "Aprobación del proyecto", date: "15 abr 2022", status: "done" },
      { label: "Firma del convenio", date: "30 may 2022", status: "done" },
      { label: "Inicio de operaciones", date: "01 jul 2022", status: "done" },
      { label: "Verificación VCS+CCB — ciclo 1", date: "20 ene 2024", status: "done" },
      { label: "Expansión zona marina fase II", date: "01 ene 2025", status: "active" },
      { label: "Verificación VCS+CCB — ciclo 2", date: "20 ene 2026", status: "pending" },
      { label: "Cierre y evaluación final", date: "30 jun 2027", status: "pending" },
    ],
    disbursements: [
      { period: "Jul 2022", amount: 360000 },
      { period: "Ene 2023", amount: 440000 },
      { period: "Jul 2023", amount: 520000 },
      { period: "Ene 2024", amount: 480000 },
    ],
    documents: [
      { name: "Documento de Proyecto Aprobado", type: "PDF", size: "4.0 MB", date: "abr 2022" },
      { name: "Evaluación de Impacto Costero", type: "PDF", size: "7.8 MB", date: "mar 2022" },
      { name: "Verificación VCS+CCB 2024", type: "PDF", size: "2.7 MB", date: "ene 2024" },
      { name: "Informe Anual 2023", type: "PDF", size: "2.2 MB", date: "dic 2023" },
    ],
  },
  {
    id: "TVH-DO-0006",
    name: "Rep. Dominicana",
    country: "Rep. Dominicana",
    coordinates: [-70.16, 18.74],
    image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80",
    category: "Biodiversidad",
    riskRating: "Bajo",
    eligibility: "Artículo 6.2 Criteria",
    credits: 5100,
    pending: 430,
    projectCount: 4,
    shortDescription: "Conservación de ecosistemas montañosos y ríos en la Cordillera Central.",
    title: "Conservación de Ecosistemas Montañosos y Ríos — Cordillera Central de República Dominicana",
    prestatario: "MIMARENA — Ministerio de Medio Ambiente y Recursos Naturales",
    ejecutor: "INDRHI — Instituto Nacional de Recursos Hidráulicos",
    status: "En ejecución",
    approved: "USD 2,400,000",
    approvedUSD: 2400000,
    disbursed: "USD 960,000",
    disbursedUSD: 960000,
    disbursedPct: 40,
    cofinancier: "PNUD — Programa de las Naciones Unidas para el Desarrollo",
    approvalDate: "03 oct 2023",
    startDate: "01 ene 2024",
    estimatedClose: "31 dic 2027",
    beneficiariesDirect: "19,600",
    beneficiariesIndirect: "78,000",
    objective: "Conservar los ecosistemas de alta montaña y cuencas hidrográficas de la Cordillera Central dominicana, generando créditos de carbono y fortaleciendo los servicios ecosistémicos hídricos de los que dependen 2.8 millones de habitantes.",
    objectives: [
      "Proteger 92,000 ha de bosques de pino y latifoliados de la Cordillera Central.",
      "Generar 5,100 tCO₂e anuales verificados bajo Artículo 6.2.",
      "Restaurar 4,200 ha de cuencas hidrográficas degradadas.",
      "Implementar pagos por servicios hídricos para 1,800 familias en zonas de recarga.",
    ],
    results: [
      "68,000 ha bajo acuerdos de conservación activos.",
      "1,200 tCO₂e pre-verificados bajo Artículo 6.2.",
      "800 ha de cuencas con trabajos de restauración iniciados.",
    ],
    milestones: [
      { label: "Aprobación del proyecto", date: "03 oct 2023", status: "done" },
      { label: "Firma del convenio", date: "15 nov 2023", status: "done" },
      { label: "Inicio de operaciones", date: "01 ene 2024", status: "done" },
      { label: "Primera auditoría Art. 6.2", date: "30 jun 2025", status: "active" },
      { label: "Verificación Art. 6.2 — ciclo 1", date: "31 dic 2025", status: "pending" },
      { label: "Revisión de medio término", date: "30 jun 2026", status: "pending" },
      { label: "Cierre y evaluación final", date: "31 dic 2027", status: "pending" },
    ],
    disbursements: [
      { period: "Ene 2024", amount: 480000 },
      { period: "Jul 2024", amount: 480000 },
    ],
    documents: [
      { name: "Documento de Proyecto Aprobado", type: "PDF", size: "3.1 MB", date: "oct 2023" },
      { name: "Evaluación Ambiental y Social", type: "PDF", size: "5.4 MB", date: "sep 2023" },
      { name: "Metodología Artículo 6.2 — Aplicación", type: "PDF", size: "2.3 MB", date: "dic 2023" },
      { name: "Informe de Arranque", type: "PDF", size: "1.5 MB", date: "feb 2024" },
    ],
  },
];

export const CATEGORY_COLOR: Record<string, string> = {
  "Bosques y Costas": "#10B981",
  "Biodiversidad": "#34D399",
  "Agricultura": "#F59E0B",
  "Eficiencia": "#22D3EE",
};

export const RISK_COLOR: Record<string, string> = {
  "Muy Bajo": "#10B981",
  "Bajo": "#34D399",
  "Medio": "#F59E0B",
  "Alto": "#EF4444",
};
