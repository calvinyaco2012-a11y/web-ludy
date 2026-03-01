export type ProductPlacement = "hero" | "destacados" | "ninguna"

export interface Product {
  id: string
  name: string
  description: string
  price: number
  comparePrice?: number
  category: string
  stock: number
  sku: string
  images: string[]
  videoUrl?: string
  tags: string[]
  status: "activo" | "borrador" | "agotado"
  featured: boolean
  placement: ProductPlacement
  placementOrder: number
  createdAt: string
}

export const CATEGORIES = [
  "Lazos de Saten",
  "Diademas",
  "Flores Artesanales",
  "Clips de Cabello",
  "Accesorios Boda",
  "Combos",
  "Minimalist",
  "Infantil",
]

export const PLACEMENT_OPTIONS: { value: ProductPlacement; label: string; description: string }[] = [
  {
    value: "hero",
    label: "Banner Principal",
    description: "Imagen grande en la parte superior de la pagina. Solo 1 producto puede estar aqui.",
  },
  {
    value: "destacados",
    label: "Piezas Maestras",
    description: "Seccion de productos destacados en grid. Hasta 4 productos.",
  },
  {
    value: "ninguna",
    label: "Solo en Tienda",
    description: "El producto aparece unicamente en el catalogo, no en la pagina principal.",
  },
]

export type VideoCategory = "proceso" | "tutorial" | "detras-de-camaras" | "lookbook" | "testimonio"

export interface StoreVideo {
  id: string
  title: string
  description: string
  category: VideoCategory
  videoUrl: string
  thumbnailUrl: string
  duration: string
  featured: boolean
  status: "activo" | "borrador"
  createdAt: string
}

export const VIDEO_CATEGORIES: { value: VideoCategory; label: string; description: string }[] = [
  { value: "proceso", label: "Proceso de Creacion", description: "Muestra como se elaboran los productos" },
  { value: "tutorial", label: "Tutorial de Uso", description: "Ensena a usar y combinar los accesorios" },
  { value: "detras-de-camaras", label: "Detras de Camaras", description: "El dia a dia del taller y el equipo" },
  { value: "lookbook", label: "Lookbook / Inspiracion", description: "Combinaciones y estilos de temporada" },
  { value: "testimonio", label: "Testimonios", description: "Clientas compartiendo su experiencia" },
]

export const DEMO_VIDEOS: StoreVideo[] = [
  {
    id: "vid-1",
    title: "Asi Nacen Nuestros Lazos de Saten",
    description: "Descubre el proceso artesanal detras de cada lazo. Desde la seleccion de la tela hasta el acabado final, cada pieza es unica.",
    category: "proceso",
    videoUrl: "",
    thumbnailUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCh2vqcvGBnj5hTLJokLccF9Xy2TRDEx7TbxNb3iWiLE3tJvQgtFz1uJ4FCAStYfH6Ov5znHBnF9qz2_zWpz33IPrXSUc2C52Yhga5D4ZK06T-cwWZtPlTBmIc7nH5vx6SqtDTxz9lJ1rdPBD83LlYTgRvc1vdlryzAanL0vu9t55tJiuTn6tTWkXXsFNZKBnsh7Vnhpvju2vOuDVHfdke-J-GPKgoU6eLJzNiZ2MKf4_ieBkjo8RvfPPg9BuzkXUJxdDE6oFEEcys",
    duration: "2:45",
    featured: true,
    status: "activo",
    createdAt: "2026-01-10",
  },
  {
    id: "vid-2",
    title: "3 Formas de Usar tu Diadema Floral",
    description: "Te ensenamos tres estilos diferentes para lucir tu diadema en cualquier ocasion.",
    category: "tutorial",
    videoUrl: "",
    thumbnailUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDXQTPmr99CgWpEq7GZH5DeBLaUsoY2Nr4cgVqivdxG8WSjk2vk23CtPI1aQt4kwYLcjl1D_i4zJ2BnpOH1GpMylG56gfhvBiG2qHq7EGxXhHsRxp-fWjkS-6EgJNdOhTCp7bRUMUkP4TbhYwwnZKRu7F1c109OwNT7E3e86EITMrI7g0tcX_Qn2Pxua6IqtgOxrjmPaby0pLOZPdQPZiPfJIeXj4-KuQ372W0jnNfOXy8mlLWgkf7TnEbzOjvwfLIyFWA6ZD8Skxw",
    duration: "1:30",
    featured: true,
    status: "activo",
    createdAt: "2026-01-18",
  },
  {
    id: "vid-3",
    title: "Un Dia en Nuestro Taller",
    description: "Conoce a las artesanas que dan vida a cada pieza y el amor que ponen en su trabajo.",
    category: "detras-de-camaras",
    videoUrl: "",
    thumbnailUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDP14iWp_X4N4EvP27MP9ac2CeBRZReOLtJ-t33mlIFsJE648yAOf2RpKeZYnV7edMX2guod851ZcDNalbHMI3PFnp1Q45p5B4NNfs0s-l9lUe5dqbiH0Kw3dLInk7mwaMSE1KFp6J-C5xUnT60yODeO9H-iHbmtmbxDFptEU_V-F8QXOubhMWbkt1JNwr2n9UfwSTb7fr6na-HBAPw-ILmTX6J-ZvQvO6T8lcoZOITC-o3ZxWLHYAwH51q5AV9CYi2YehjkrdxAz4",
    duration: "3:10",
    featured: false,
    status: "activo",
    createdAt: "2026-02-05",
  },
]

export const DEMO_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Lazo de Saten Magenta",
    description: "Elegante lazo de saten hecho a mano con acabados premium. Perfecto para ocasiones especiales.",
    price: 85000,
    category: "Lazos de Saten",
    stock: 15,
    sku: "LAZ-MAG-001",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCh2vqcvGBnj5hTLJokLccF9Xy2TRDEx7TbxNb3iWiLE3tJvQgtFz1uJ4FCAStYfH6Ov5znHBnF9qz2_zWpz33IPrXSUc2C52Yhga5D4ZK06T-cwWZtPlTBmIc7nH5vx6SqtDTxz9lJ1rdPBD83LlYTgRvc1vdlryzAanL0vu9t55tJiuTn6tTWkXXsFNZKBnsh7Vnhpvju2vOuDVHfdke-J-GPKgoU6eLJzNiZ2MKf4_ieBkjo8RvfPPg9BuzkXUJxdDE6oFEEcys",
    ],
    tags: ["saten", "premium", "rosa"],
    status: "activo",
    featured: true,
    placement: "destacados",
    placementOrder: 1,
    createdAt: "2026-01-15",
  },
  {
    id: "2",
    name: "Diadema Encanto Teal",
    description: "Diadema floral con intrincados detalles teal y piedras decorativas. Pieza unica artesanal.",
    price: 120000,
    category: "Diademas",
    stock: 8,
    sku: "DIA-TEA-002",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDXQTPmr99CgWpEq7GZH5DeBLaUsoY2Nr4cgVqivdxG8WSjk2vk23CtPI1aQt4kwYLcjl1D_i4zJ2BnpOH1GpMylG56gfhvBiG2qHq7EGxXhHsRxp-fWjkS-6EgJNdOhTCp7bRUMUkP4TbhYwwnZKRu7F1c109OwNT7E3e86EITMrI7g0tcX_Qn2Pxua6IqtgOxrjmPaby0pLOZPdQPZiPfJIeXj4-KuQ372W0jnNfOXy8mlLWgkf7TnEbzOjvwfLIyFWA6ZD8Skxw",
    ],
    tags: ["diadema", "floral", "teal"],
    status: "activo",
    featured: true,
    placement: "destacados",
    placementOrder: 2,
    createdAt: "2026-01-20",
  },
  {
    id: "3",
    name: "Bucle Seda Atardecer",
    description: "Pequeno y delicado lazo de seda en tonos calidos. Ideal para uso diario con elegancia.",
    price: 65000,
    category: "Minimalist",
    stock: 22,
    sku: "BUC-SED-003",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDP14iWp_X4N4EvP27MP9ac2CeBRZReOLtJ-t33mlIFsJE648yAOf2RpKeZYnV7edMX2guod851ZcDNalbHMI3PFnp1Q45p5B4NNfs0s-l9lUe5dqbiH0Kw3dLInk7mwaMSE1KFp6J-C5xUnT60yODeO9H-iHbmtmbxDFptEU_V-F8QXOubhMWbkt1JNwr2n9UfwSTb7fr6na-HBAPw-ILmTX6J-ZvQvO6T8lcoZOITC-o3ZxWLHYAwH51q5AV9CYi2YehjkrdxAz4",
    ],
    tags: ["seda", "minimalista", "naranja"],
    status: "activo",
    featured: false,
    placement: "destacados",
    placementOrder: 3,
    createdAt: "2026-02-01",
  },
  {
    id: "4",
    name: "Coleccion Jardin Real",
    description: "Set exclusivo de multiples clips artesanales coloridos. El regalo perfecto.",
    price: 150000,
    comparePrice: 180000,
    category: "Combos",
    stock: 5,
    sku: "COL-JAR-004",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAnuObzQ-ccQRUEskRMP49pAvgBidfaNIEpF-40yfYi0kc1Ful-Hr2uDGgbINR2yP3AyHj2Ev1wfq3nUUSBwhKDoijW_5VCUWWZCzOQq53wcHHDyO5rdvat8lqfYk-zgvBAMNt1L7ddpD4x0-3eKIU_PdHteBIhJ6O8ZGabIGozBWhtRlrWxwmM__G9TakpFMr-0yVEnbVlxBISfCe2K_Cm5QoNaNMrcn7l4Tmmg10DkTHo1FlWatwH_977uNqmAfReBssMF98Bc-4",
    ],
    tags: ["combo", "colorido", "regalo"],
    status: "activo",
    featured: true,
    placement: "destacados",
    placementOrder: 4,
    createdAt: "2026-02-10",
  },
  {
    id: "hero-1",
    name: "Lazo Polka Dot Classic",
    description: "Elegante lazo de saten blanco con puntos sobre tela suave. Nuestra pieza de edicion limitada para esta temporada.",
    price: 95000,
    category: "Lazos de Saten",
    stock: 10,
    sku: "LAZ-POL-005",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuASEUAPVmixt8JP_Hw_bAkKvlA0fRoBxWFsVH86U-KNQ7XbZb7w9SAurT7aT1AYBkvh73NZMQAU6eFRX6hSuQEaSEQfEahbTwJXyPJafNxWv0W9tCax43QRGCn5le8k5MCIjdsBKCvHnb-6HP4303Xm9t6qTucrlwRXXRvuhYWmrOuR8Iro869ilE2_KNzLd6fpOohZgnsMC0qlGDP9sHPfp3YHvSBaxA-iTZgxT1Fnq3KrciflR_iI0WW7JPuqrOekfnlRgvgcqTU",
    ],
    tags: ["edicion limitada", "polka dot", "blanco"],
    status: "activo",
    featured: true,
    placement: "hero",
    placementOrder: 1,
    createdAt: "2026-02-15",
  },
]
