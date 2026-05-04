export type Artist = {
  id: string;
  name: string;
  specialty: string;
  rate: number;
  hoursPerDay: number;
  bio: string;
  styles: string[];
  accent: string;
  initials: string;
  photo: string;
};

export const artists: Artist[] = [
  {
    id: "ART-001",
    name: "Nova Ink",
    specialty: "fine line",
    rate: 38000,
    hoursPerDay: 6.25,
    bio: "Trazos limpios y delicados. Especializada en piezas pequeñas con detalle quirúrgico.",
    styles: ["fine line", "minimalista", "florales"],
    accent: "from-rose-500 to-amber-300",
    initials: "NI",
    photo: "/images/artist-01-fineline.jpg",
  },
  {
    id: "ART-002",
    name: "Kuro",
    specialty: "blackwork",
    rate: 45000,
    hoursPerDay: 6.5,
    bio: "Negro denso, geometría y simbolismo. Piezas con peso visual y narrativa fuerte.",
    styles: ["blackwork", "geométrico", "ornamental"],
    accent: "from-zinc-800 to-zinc-500",
    initials: "KU",
    photo: "/images/artist-02-blackwork.jpg",
  },
  {
    id: "ART-003",
    name: "Lina Dot",
    specialty: "minimalista",
    rate: 34000,
    hoursPerDay: 6,
    bio: "Lo justo y necesario. Diseños minimalistas, lettering simple y micro-tatuajes.",
    styles: ["minimalista", "lettering", "puntillismo"],
    accent: "from-indigo-500 to-violet-300",
    initials: "LD",
    photo: "/images/artist-03-minimal.jpg",
  },
  {
    id: "ART-004",
    name: "Rayo",
    specialty: "tradicional",
    rate: 42000,
    hoursPerDay: 6.5,
    bio: "Tradicional americano. Líneas gruesas, color saturado, iconografía clásica reinterpretada.",
    styles: ["tradicional", "neo-tradicional", "old school"],
    accent: "from-red-600 to-orange-400",
    initials: "RA",
    photo: "/images/artist-04-traditional.jpg",
  },
  {
    id: "ART-005",
    name: "Mila Shade",
    specialty: "sombras suaves",
    rate: 40000,
    hoursPerDay: 6.25,
    bio: "Realismo en escala de grises. Retratos, naturaleza y texturas con sombreado sedoso.",
    styles: ["realismo", "sombras", "retrato"],
    accent: "from-slate-500 to-gray-300",
    initials: "MS",
    photo: "/images/artist-05-shadows.jpg",
  },
  {
    id: "ART-006",
    name: "Atlas",
    specialty: "piezas grandes",
    rate: 50000,
    hoursPerDay: 7,
    bio: "Espaldas, mangas y composiciones de gran formato. Sesiones largas, planificación detallada.",
    styles: ["piezas grandes", "japonés", "ornamental"],
    accent: "from-emerald-700 to-teal-300",
    initials: "AT",
    photo: "/images/artist-06-largepieces.jpg",
  },
];

export function formatCLP(amount: number): string {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  }).format(amount);
}
