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
     2. AVISO SUPERIOR (la barra delgada arriba de todo)
     -----------------------------------------------------------------------
     Ponlo en enabled: false si quieres quitar la barra.
     ----------------------------------------------------------------------- */
  announcement: {
    enabled: true,
    text: "Entrega en todo Colima · Envíos a toda la República · Pago al recibir",
  },

  /* -----------------------------------------------------------------------
     3. HERO (primer bloque al entrar)
     ----------------------------------------------------------------------- */
  hero: {
    eyebrow: "Suplementación deportiva · Colima, México",
    headline: "Suplementos originales para entrenar en serio.",
    subheadline:
      "Creatinas, preentrenos y proteínas seleccionadas una por una. Producto sellado, entrega en Colima y envíos a toda la República.",
    ctaPrimary: "Ver catálogo",
    ctaSecondary: "Cotizar por WhatsApp",
    // Producto que se muestra en el hero (usa su "id" de la lista de productos)
    showcase: {
      productId: "bucked-up-woke-af",
    },
    stats: [
      { number: "100%", label: "Producto original" },
      { number: "24 h", label: "Respuesta por WhatsApp" },
      { number: "Colima", label: "Entrega local y envíos" },
    ],
  },

  /* -----------------------------------------------------------------------
     4. BARRA DE CONFIANZA (4 puntos cortos, debajo del hero)
     ----------------------------------------------------------------------- */
  trust: [
    { icon: "shield",  title: "Sellado y original",   text: "Marcas verificadas, nada suelto ni reenvasado." },
    { icon: "advice",  title: "Asesoría incluida",    text: "Te decimos qué tomar según tu entrenamiento." },
    { icon: "truck",   title: "Entrega en todo Colima", text: "Punto de entrega a convenir. Envíos a toda la República." },
    { icon: "wallet",  title: "Pago al recibir",      text: "Sin pagos en línea. Se cierra todo por WhatsApp." },
  ],

  /* -----------------------------------------------------------------------
     5. PRECIOS
     -----------------------------------------------------------------------
     showPrices: false -> se muestra "Precio a consultar" y el botón de cotizar.
                          El espacio del precio queda reservado igual.
     showPrices: true  -> se muestra el campo "price" de cada producto.
     ----------------------------------------------------------------------- */
  showPrices: true,
  priceSoonLabel: "Precio a consultar",
  priceSoonNote: "Cotiza sin compromiso por WhatsApp",
  currencyNote: "Precios en MXN · Sujetos a disponibilidad y cambio sin previo aviso",

  /* -----------------------------------------------------------------------
     6. CATÁLOGO — TÍTULOS DE LA SECCIÓN
     ----------------------------------------------------------------------- */
  catalog: {
    eyebrow: "Catálogo",
    title: "Elige por objetivo, no por moda.",
    text: "Filtra por categoría y toca cualquier producto para ver su ficha completa.",
  },

  /* -----------------------------------------------------------------------
     7. CATEGORÍAS
     -----------------------------------------------------------------------
     El "id" es el que enlaza cada producto con su categoría.
     ----------------------------------------------------------------------- */
  categories: [
    {
      id: "creatinas",
      name: "Creatinas",
      tagline: "Fuerza, volumen y recuperación.",
      icon: "bolt",
    },
    {
      id: "preentrenos",
      name: "Preentrenos",
      tagline: "Energía y foco desde la primera serie.",
      icon: "flame",
    },
    {
      id: "proteinas",
      name: "Proteínas",
      tagline: "La base de todo: construir músculo.",
      icon: "shake",
    },
  ],

  /* -----------------------------------------------------------------------
     8. PRODUCTOS
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
       image     -> foto del producto: "img/productos/archivo.webp"
                    Lo ideal: fondo transparente y unos 640 px de alto.
                    Si la dejas vacía se muestra un marcador con iniciales.
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
      price: "$450",
      badge: "Más vendido",
      featured: true,
      stock: true,
      short: "Creatina pura sin sabor: se mezcla con lo que ya tomas.",
      bullets: [
        "60 servicios por envase",
        "Sin sabor: se disuelve en agua, jugo o proteína",
        "Ideal para empezar con creatina",
      ],
      image: "img/productos/ins-acs-creatine.webp",
    },
    {
      id: "mut-creakong",
      category: "creatinas",
      brand: "Mutant",
      name: "CreaKong",
      variant: "Sin sabor",
      size: "300 g · 75 porciones",
      price: "$370",
      badge: "",
      featured: false,
      stock: true,
      short: "Mezcla de creatinas para quien ya lleva tiempo entrenando.",
      bullets: [
        "300 gramos por envase",
        "Enfocada en fuerza y volumen",
        "Rinde alrededor de 2 meses",
      ],
      image: "img/productos/mut-creakong.webp",
    },
    {
      id: "nt-creatine-drive",
      category: "creatinas",
      brand: "Nutrex",
      name: "Creatine Drive Black",
      variant: "Sin sabor",
      size: "300 g",
      price: "$380",
      badge: "",
      featured: false,
      stock: true,
      short: "Monohidrato de creatina clásico, de los más probados.",
      bullets: [
        "300 gramos por envase",
        "Monohidrato: el más estudiado del mercado",
        "5 g por servicio",
      ],
      image: "img/productos/nt-creatine-drive.webp",
    },

    /* --------------------------- PREENTRENOS --------------------------- */
    {
      id: "mut-pwo",
      category: "preentrenos",
      brand: "Mutant",
      name: "PWO",
      variant: "Fruit Punch",
      size: "270 g · 60 porciones",
      price: "$430",
      badge: "Rinde más",
      featured: false,
      stock: true,
      short: "60 servicios: el preentreno con mejor rendimiento por envase.",
      bullets: [
        "60 servicios por envase",
        "Energía sostenida sin bajón brusco",
        "Sabor Fruit Punch",
      ],
      // OJO: esta foto es del Mutant GEAA (aminoácidos), no del PWO.
      // Cámbiala por la del PWO o renombra el producto a "GEAA".
      image: "img/productos/mut-pwo.webp",
    },
    {
      id: "raw-cbum-thavage",
      category: "preentrenos",
      brand: "Raw Nutrition",
      name: "CBUM Thavage",
      variant: "Tamarindo",
      size: "40 servicios",
      price: "$780",
      badge: "Más vendido",
      featured: true,
      stock: true,
      short: "Foco limpio y bombeo. El favorito de quienes entrenan pesado.",
      bullets: [
        "40 servicios por envase",
        "Enfocado en concentración y bombeo",
        "Sabor tamarindo",
      ],
      image: "img/productos/raw-cbum-thavage.webp",
    },
    {
      id: "bucked-up-woke-af",
      category: "preentrenos",
      brand: "Bucked Up",
      name: "Woke AF",
      variant: "Blue Razz",
      size: "30 servicios",
      price: "$750",
      badge: "Alta intensidad",
      featured: false,
      stock: true,
      short: "Fórmula fuerte. No es para tu primer preentreno.",
      bullets: [
        "30 servicios por envase",
        "Estimulación alta: empieza con media dosis",
        "Sabor Blue Razz",
      ],
      image: "img/productos/bucked-up-woke-af.webp",
    },
    {
      id: "ins-psychotic",
      category: "preentrenos",
      brand: "Insane Labz",
      name: "Psychotic",
      variant: "Gummy Candy",
      size: "35 servicios",
      price: "$480",
      badge: "",
      featured: false,
      stock: true,
      short: "Clásico de alta intensidad para sesiones largas.",
      bullets: [
        "35 servicios por envase",
        "Energía y foco de larga duración",
        "Sabor Gummy Candy",
      ],
      image: "img/productos/ins-psychotic.webp",
    },

    /* ---------------------------- PROTEÍNAS ---------------------------- */
    {
      id: "on-gold-standard",
      category: "proteinas",
      brand: "Optimum Nutrition",
      name: "100% Whey Gold Standard",
      variant: "Vainilla",
      size: "899 g · 29 servicios",
      price: "$880",
      badge: "Más vendido",
      featured: true,
      stock: true,
      short: "La proteína de referencia. Si no sabes cuál elegir, es esta.",
      bullets: [
        "2 libras por envase",
        "Whey de absorción rápida",
        "Sabor vainilla",
      ],
      image: "img/productos/on-gold-standard.webp",
    },
    {
      id: "nt-isofit",
      category: "proteinas",
      brand: "Nutrex",
      name: "Isofit",
      variant: "Chocolate Shake",
      size: "2.2 lbs · 30 servicios",
      price: "$850",
      badge: "",
      featured: false,
      stock: true,
      short: "Aislado de proteína: más limpio, más ligero de digerir.",
      bullets: [
        "2.2 libras por envase",
        "Proteína aislada, baja en carbohidratos",
        "Sabor Chocolate Shake",
      ],
      image: "img/productos/nt-isofit.webp",
    },
    {
      id: "mut-whey",
      category: "proteinas",
      brand: "Mutant",
      name: "Mutant Whey",
      variant: "Chocolate Fudge Brownie",
      size: "5 lbs · 60 servicios",
      price: "$1,130",
      badge: "Mejor rendimiento",
      featured: false,
      stock: true,
      short: "5 libras para etapa de volumen sin quedarte a media semana.",
      bullets: [
        "5 libras por envase",
        "Pensada para etapa de volumen",
        "Sabor Chocolate Fudge Brownie",
      ],
      image: "img/productos/mut-whey.webp",
    },
  ],

  /* -----------------------------------------------------------------------
     9. ENVÍOS Y SORTEO (las dos bandas debajo del catálogo)
     -----------------------------------------------------------------------
     Cualquiera de las dos se apaga con enabled: false.
     Cuando el sorteo termine, ponle enabled: false y desaparece de la página.
     ----------------------------------------------------------------------- */
  shipping: {
    enabled: true,
    eyebrow: "Envíos",
    title: "Enviamos a toda la República Mexicana.",
    text: "Paquetería con guía rastreable. Entrega en mano dentro de Colima.",
    statNumber: "2–5",
    statLabel: "días hábiles",
  },

  raffle: {
    enabled: true,
    eyebrow: "Sorteo",
    title: "Con la compra de cualquier producto entras al sorteo de una proteína.",
    text: "Solo participan las primeras 25 personas.",
    statNumber: "25",
    statLabel: "lugares",
    ctaText: "Apartar mi lugar",
  },

  /* -----------------------------------------------------------------------
     10. CÓMO COMPRAR (3 pasos)
     ----------------------------------------------------------------------- */
  howTo: {
    enabled: true,
    eyebrow: "Cómo comprar",
    title: "Tres pasos y listo.",
    steps: [
      { number: "01", title: "Arma tu pedido", text: "Agrega los productos que te interesan a tu lista." },
      { number: "02", title: "Envíalo por WhatsApp", text: "Con un toque se manda tu lista completa con cantidades." },
      { number: "03", title: "Confirmamos y entregamos", text: "Te paso el total y quedamos en el punto de entrega, o te mando la guía si eres de fuera." },
    ],
    note: "Por ahora no hay pagos en línea: todo se cierra por WhatsApp.",
  },

  /* -----------------------------------------------------------------------
     11. BLOQUE DEL COACH (enlace a tu página de entrenamiento)
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
     12. CONTACTO
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
     13. GOOGLE ANALYTICS (opcional)
     ----------------------------------------------------------------------- */
  analytics: {
    enabled: false,
    measurementId: "",   // ejemplo: "G-XXXXXXXXXX"
  },
};
