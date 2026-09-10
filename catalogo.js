/* =========================================================================
   FAITHLURE SUPPLEMENTS — CONTENIDO Y CATÁLOGO
   =========================================================================
   Este es el ÚNICO archivo que necesitas editar.
   Aquí viven los textos, las categorías, los productos y los precios.

   Reglas rápidas:
   - Todo lo que está entre comillas " " es texto que se ve en la página.
   - No borres las comas "," del final de cada línea.
   - Para apagar una sección usa  enabled: false
   - Para agregar un producto, copia un bloque { ... } completo,
     pégalo debajo y cambia sus datos. Respeta las llaves y las comas.
   ========================================================================= */

const CATALOGO = {

  /* -----------------------------------------------------------------------
     1. MARCA
     ----------------------------------------------------------------------- */
  brand: {
    name: "FAITHLURE",
    tagline: "Supplements",
    claim: "Alta agresividad",
    location: "Colima, México",
  },

  /* -----------------------------------------------------------------------
     2. HERO (primer bloque al entrar)
     ----------------------------------------------------------------------- */
  hero: {
    eyebrow: "Suplementación deportiva · Colima, México",
    headline: "Suplementos originales para entrenar en serio.",
    subheadline:
      "Creatinas, preentrenos y proteínas seleccionadas una por una. Te decimos cuál te sirve, sin venderte de más.",
    ctaPrimary: "Ver catálogo",
    ctaSecondary: "Cotizar por WhatsApp",
    // Bote 3D que aparece en el hero (usa los colores de una categoría)
    showcase: {
      label: "Proteína",
      colorKey: "proteinas",
    },
    stats: [
      { number: "100%", label: "Producto original" },
      { number: "24 h", label: "Respuesta por WhatsApp" },
      { number: "Colima", label: "Entrega local" },
    ],
  },

  /* -----------------------------------------------------------------------
     3. BARRA DE CONFIANZA (4 puntos cortos, debajo del hero)
     ----------------------------------------------------------------------- */
  trust: [
    { icon: "shield",  title: "Sellado y original",   text: "Marcas verificadas, nada suelto ni reenvasado." },
    { icon: "advice",  title: "Asesoría incluida",    text: "Te decimos qué tomar según tu entrenamiento." },
    { icon: "truck",   title: "Entrega en Colima",    text: "Punto de entrega acordado o envío nacional." },
    { icon: "wallet",  title: "Pago al recibir",      text: "Sin pagos en línea. Se cierra todo por WhatsApp." },
  ],

  /* -----------------------------------------------------------------------
     4. PRECIOS
     -----------------------------------------------------------------------
     showPrices: false -> se muestra "Precio a consultar" y el botón de cotizar.
                          El espacio del precio queda reservado igual.
     showPrices: true  -> se muestra el campo "price" de cada producto.
     ----------------------------------------------------------------------- */
  showPrices: false,
  priceSoonLabel: "Precio a consultar",
  priceSoonNote: "Cotiza sin compromiso por WhatsApp",
  currencyNote: "Precios en MXN",

  /* -----------------------------------------------------------------------
     5. CATÁLOGO — TÍTULOS DE LA SECCIÓN
     ----------------------------------------------------------------------- */
  catalog: {
    eyebrow: "Catálogo",
    title: "Elige por objetivo, no por moda.",
    text: "Filtra por categoría y toca cualquier producto para verlo en 3D con su ficha completa.",
  },

  /* -----------------------------------------------------------------------
     6. CATEGORÍAS
     -----------------------------------------------------------------------
     El "id" es el que enlaza cada producto con su categoría.
     "colors" define el bote 3D: cuerpo, etiqueta y tapa.
     ----------------------------------------------------------------------- */
  categories: [
    {
      id: "creatinas",
      name: "Creatinas",
      tagline: "Fuerza, volumen y recuperación.",
      icon: "bolt",
      colors: { body: "#2a2724", band: "#c9a15a", cap: "#171512", text: "#171512" },
    },
    {
      id: "preentrenos",
      name: "Preentrenos",
      tagline: "Energía y foco desde la primera serie.",
      icon: "flame",
      colors: { body: "#8e2c22", band: "#171512", cap: "#5f1d16", text: "#f3efe8" },
    },
    {
      id: "proteinas",
      name: "Proteínas",
      tagline: "La base de todo: construir músculo.",
      icon: "shake",
      colors: { body: "#a97b3f", band: "#f7f4ef", cap: "#7a5729", text: "#171512" },
    },
  ],

  /* -----------------------------------------------------------------------
     7. PRODUCTOS
     -----------------------------------------------------------------------
     Campos de cada producto:
       id        -> nombre corto sin espacios (debe ser único)
       category  -> el "id" de una categoría de arriba
       brand     -> marca
       name      -> nombre del producto
       variant   -> sabor o presentación
       size      -> tamaño o servicios
       price     -> "$000 MXN"  (se ve solo si showPrices es true)
       badge     -> distintivo opcional: "Más vendido", "Nuevo", "Últimas piezas"
       featured  -> true resalta la tarjeta
       short     -> una línea de descripción
       bullets   -> hasta 4 puntos para la ficha
       image     -> opcional. Foto del producto: "img/productos/archivo.png"
                    Si la dejas vacía se muestra el bote 3D de la categoría.
       stock     -> true / false ("Disponible" o "Bajo pedido")
     ----------------------------------------------------------------------- */
  products: [

    /* ---------------------------- CREATINAS ---------------------------- */
    {
      id: "ins-acs-creatine",
      category: "creatinas",
      brand: "Insane Labz",
      name: "ACS Creatine",
      variant: "Sin sabor",
      size: "60 servicios",
      price: "",
      badge: "Más vendido",
      featured: true,
      stock: true,
      short: "Creatina pura sin sabor: se mezcla con lo que ya tomas.",
      bullets: [
        "60 servicios por envase",
        "Sin sabor: se disuelve en agua, jugo o proteína",
        "Ideal para empezar con creatina",
      ],
      image: "",
    },
    {
      id: "mut-creakong",
      category: "creatinas",
      brand: "Mutant",
      name: "CreaKong",
      variant: "Sin sabor",
      size: "300 g",
      price: "",
      badge: "",
      featured: false,
      stock: true,
      short: "Mezcla de creatinas para quien ya lleva tiempo entrenando.",
      bullets: [
        "300 gramos por envase",
        "Enfocada en fuerza y volumen",
        "Rinde alrededor de 2 meses",
      ],
      image: "",
    },
    {
      id: "nt-creatine-drive",
      category: "creatinas",
      brand: "Nutrex",
      name: "Creatine Drive Black",
      variant: "Sin sabor",
      size: "300 g",
      price: "",
      badge: "",
      featured: false,
      stock: true,
      short: "Monohidrato de creatina clásico, de los más probados.",
      bullets: [
        "300 gramos por envase",
        "Monohidrato: el más estudiado del mercado",
        "5 g por servicio",
      ],
      image: "",
    },

    /* --------------------------- PREENTRENOS --------------------------- */
    {
      id: "mut-pwo",
      category: "preentrenos",
      brand: "Mutant",
      name: "PWO",
      variant: "Fruit Punch",
      size: "60 servicios",
      price: "",
      badge: "Rinde más",
      featured: false,
      stock: true,
      short: "60 servicios: el preentreno con mejor rendimiento por envase.",
      bullets: [
        "60 servicios por envase",
        "Energía sostenida sin bajón brusco",
        "Sabor Fruit Punch",
      ],
      image: "",
    },
    {
      id: "raw-cbum-thavage",
      category: "preentrenos",
      brand: "Raw Nutrition",
      name: "CBUM Thavage",
      variant: "Tamarindo",
      size: "40 servicios",
      price: "",
      badge: "Más vendido",
      featured: true,
      stock: true,
      short: "Foco limpio y bombeo. El favorito de quienes entrenan pesado.",
      bullets: [
        "40 servicios por envase",
        "Enfocado en concentración y bombeo",
        "Sabor tamarindo",
      ],
      image: "",
    },
    {
      id: "bucked-up-woke-af",
      category: "preentrenos",
      brand: "Bucked Up",
      name: "Woke AF",
      variant: "Blue Razz",
      size: "30 servicios",
      price: "",
      badge: "Alta intensidad",
      featured: false,
      stock: true,
      short: "Fórmula fuerte. No es para tu primer preentreno.",
      bullets: [
        "30 servicios por envase",
        "Estimulación alta: empieza con media dosis",
        "Sabor Blue Razz",
      ],
      image: "",
    },
    {
      id: "ins-psychotic",
      category: "preentrenos",
      brand: "Insane Labz",
      name: "Psychotic",
      variant: "Gummy Candy",
      size: "35 servicios",
      price: "",
      badge: "",
      featured: false,
      stock: true,
      short: "Clásico de alta intensidad para sesiones largas.",
      bullets: [
        "35 servicios por envase",
        "Energía y foco de larga duración",
        "Sabor Gummy Candy",
      ],
      image: "",
    },

    /* ---------------------------- PROTEÍNAS ---------------------------- */
    {
      id: "on-gold-standard",
      category: "proteinas",
      brand: "Optimum Nutrition",
      name: "100% Whey Gold Standard",
      variant: "Vainilla",
      size: "2 lbs",
      price: "",
      badge: "Más vendido",
      featured: true,
      stock: true,
      short: "La proteína de referencia. Si no sabes cuál elegir, es esta.",
      bullets: [
        "2 libras por envase",
        "Whey de absorción rápida",
        "Sabor vainilla",
      ],
      image: "",
    },
    {
      id: "nt-isofit",
      category: "proteinas",
      brand: "Nutrex",
      name: "Isofit",
      variant: "Chocolate Shake",
      size: "2.2 lbs",
      price: "",
      badge: "",
      featured: false,
      stock: true,
      short: "Aislado de proteína: más limpio, más ligero de digerir.",
      bullets: [
        "2.2 libras por envase",
        "Proteína aislada, baja en carbohidratos",
        "Sabor Chocolate Shake",
      ],
      image: "",
    },
    {
      id: "mut-whey",
      category: "proteinas",
      brand: "Mutant",
      name: "Mutant Whey",
      variant: "Chocolate",
      size: "5 lbs",
      price: "",
      badge: "Mejor rendimiento",
      featured: false,
      stock: true,
      short: "5 libras para etapa de volumen sin quedarte a media semana.",
      bullets: [
        "5 libras por envase",
        "Pensada para etapa de volumen",
        "Sabor chocolate",
      ],
      image: "",
    },
  ],

  /* -----------------------------------------------------------------------
     8. CÓMO COMPRAR (3 pasos)
     ----------------------------------------------------------------------- */
  howTo: {
    enabled: true,
    eyebrow: "Cómo comprar",
    title: "Tres pasos y listo.",
    steps: [
      { number: "01", title: "Arma tu pedido", text: "Agrega los productos que te interesan a tu lista." },
      { number: "02", title: "Envíalo por WhatsApp", text: "Con un toque se manda tu lista completa con cantidades." },
      { number: "03", title: "Confirmamos y entregamos", text: "Te paso disponibilidad, total y punto de entrega." },
    ],
    note: "Por ahora no hay pagos en línea: todo se cierra por WhatsApp.",
  },

  /* -----------------------------------------------------------------------
     9. BLOQUE DEL COACH (enlace a tu página de entrenamiento)
     ----------------------------------------------------------------------- */
  coach: {
    enabled: true,
    eyebrow: "Asesoría",
    title: "¿No sabes cuál te toca?",
    text:
      "El suplemento no reemplaza el entrenamiento. Si quieres una rutina y un plan que sí avance, entrena conmigo.",
    ctaText: "Ver planes de entrenamiento",
    // Cambia esta dirección por el dominio final de tu página de coach
    ctaUrl: "https://x5-007.github.io/damian-torres-coach/",
  },

  /* -----------------------------------------------------------------------
     10. CONTACTO
     ----------------------------------------------------------------------- */
  contact: {
    eyebrow: "Contacto",
    title: "Pide lo tuyo hoy.",
    text: "Escríbeme y te digo disponibilidad y precio al momento.",
    whatsappNumber: "3131536627",       // solo los 10 dígitos
    whatsappDisplay: "313 - 153 - 6627",
    countryCode: "52",                  // México
    instagram: "damian.torres2008",
    tiktok: "damian.torres2008",
    hours: "Lunes a sábado · 9:00 a 21:00",
  },

  footer: {
    text: "Suplementación deportiva en Colima, México.",
    legal:
      "Los suplementos alimenticios no son medicamentos ni sustituyen una alimentación equilibrada. " +
      "Consulta a un profesional de la salud antes de iniciar cualquier suplementación.",
  },

  /* -----------------------------------------------------------------------
     11. GOOGLE ANALYTICS (opcional)
     ----------------------------------------------------------------------- */
  analytics: {
    enabled: false,
    measurementId: "",   // ejemplo: "G-XXXXXXXXXX"
  },
};
