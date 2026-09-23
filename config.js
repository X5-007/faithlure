/* =========================================================================
   FAITHLURE — CONFIGURACIÓN DEL SITIO
   =========================================================================
   Este es el ÚNICO archivo que necesitas editar. Aquí viven los textos,
   los videos, los productos, los paquetes y tu WhatsApp.

   Reglas rápidas:
   - Lo que está entre comillas " " es texto que se ve en la página.
   - No borres las comas "," del final de cada línea.
   - Si una lista queda vacía [ ] o un texto queda vacío "", esa parte
     simplemente no se muestra. Nada se rompe.

   ⚠️  TESTIMONIOS, CUPOS Y GARANTÍAS: usa solo datos REALES.
   Inventar reseñas, cupos o garantías es publicidad engañosa y la
   Ley Federal de Protección al Consumidor (PROFECO) la sanciona.
   Por eso vienen vacíos: se muestran solos cuando los llenes.
   ========================================================================= */

const FAITHLURE = {

  /* -----------------------------------------------------------------------
     1. MARCA
     ----------------------------------------------------------------------- */
  marca: {
    nombre: "FaithLure",
    lema: "Ya te la sabes.",
    ciudad: "Colima, México",
    legal:
      "Los suplementos alimenticios no son medicamentos ni sustituyen una alimentación equilibrada. " +
      "Consulta a un profesional de la salud antes de iniciar cualquier suplementación.",
  },

  /* -----------------------------------------------------------------------
     2. WHATSAPP — a donde llega cada prospecto
     ----------------------------------------------------------------------- */
  whatsapp: {
    numero: "3131536627",        // solo los 10 dígitos
    lada: "52",                  // México
    mostrar: "313 153 6627",
    horario: "Lun a sáb · 9:00 a 21:00",
  },

  redes: {
    instagram: "damian.torres2008",
    tiktok: "damian.torres2008",
  },

  /* Mide cuánta gente elige cada camino y cuántos te escriben.
     Pon activo: false para apagarlo. */
  analytics: {
    activo: true,
    id: "G-W892HEVR0S",
  },

  /* -----------------------------------------------------------------------
     3. PUERTA — la primera pantalla, con los dos caminos
     ----------------------------------------------------------------------- */
  puerta: {
    pregunta: "¿A qué vienes hoy?",
    suplementos: {
      titulo: "Suplementos",
      texto: "Originales, sellados y con asesoría.",
    },
    entrenamiento: {
      titulo: "Entrenamiento",
      texto: "Un plan hecho para ti, uno a uno.",
    },
    pie: "Colima, México · Envíos a todo el país",
  },

  /* =======================================================================
     4. LANDING DE SUPLEMENTOS
     ======================================================================= */
  suplementos: {
    etiqueta: "Suplementos",
    eyebrow: "Suplementos originales · Colima",
    titular: "Deja de adivinar qué tomar.",
    subtitulo:
      "En este video te explico cómo pasas de gastar en lo que no te sirve a tomar exactamente lo que tu cuerpo necesita.",

    /* EL VIDEO — pega aquí el link de YouTube tal cual lo copias.
       Sirve cualquier formato: youtube.com/watch?v=…, youtu.be/…, o un Short.
       Si es un Short (video vertical), se acomoda solo. */
    video: {
      youtube: "",
      duracion: "",              // ej. "1:40" — se muestra en el botón
      titulo: "Cómo elegir el suplemento correcto",
    },

    boton: "Quiero mi recomendación",
    sellos: ["100% original y sellado", "Pago al recibir", "Envíos a todo México"],

    ab: {
      titulo: "De dónde vienes, a dónde vas.",
      a: {
        etiqueta: "Punto A · Hoy",
        puntos: [
          "Tomas lo que te recomendó alguien en el gym.",
          "Gastas en suplementos sin saber si te sirven.",
          "Entrenas duro y el cambio no llega.",
        ],
      },
      b: {
        etiqueta: "Punto B · Con FaithLure",
        puntos: [
          "Sabes qué tomar, cuándo y para qué.",
          "Pagas solo por lo que sí necesitas.",
          "Producto original, con alguien que te guía.",
        ],
      },
      puente: "El puente: el suplemento correcto y alguien que te diga cómo usarlo.",
    },

    /* Cada objetivo arma un combo con los "id" de los productos de abajo. */
    objetivo: {
      titulo: "¿Qué quieres lograr?",
      texto: "Elige uno y te armo el combo que sí te sirve.",
      opciones: [
        {
          id: "musculo",
          nombre: "Ganar músculo",
          combo: ["on-gold-standard", "ins-acs-creatine"],
          porque: "La proteína te ayuda a completar lo que comes al día y la creatina a rendir más en cada serie.",
        },
        {
          id: "fuerza",
          nombre: "Más fuerza",
          combo: ["mut-creakong", "raw-cbum-thavage"],
          porque: "Creatina para sostener tu fuerza y un preentreno para llegar con todo a tus levantamientos.",
        },
        {
          id: "energia",
          nombre: "Más energía",
          combo: ["mut-pwo", "ins-acs-creatine"],
          porque: "Un preentreno que te rinde 60 entrenamientos para llegar con energía, y creatina para rendir más en cada serie.",
        },
        {
          id: "definir",
          nombre: "Bajar grasa sin perder músculo",
          combo: ["nt-isofit", "ins-acs-creatine"],
          porque: "Proteína aislada y baja en carbohidratos para cuidar tu músculo, y creatina para no perder fuerza mientras bajas grasa.",
        },
      ],
      nose: "No sé cuál me conviene",
    },

    catalogo: {
      titulo: "Todo el catálogo",
      texto: "Precios en MXN · Sujetos a disponibilidad.",
    },

    categorias: [
      { id: "creatinas", nombre: "Creatinas" },
      { id: "preentrenos", nombre: "Preentrenos" },
      { id: "proteinas", nombre: "Proteínas" },
    ],

    /* Campos de cada producto:
         precio    -> "$000"
         antes     -> opcional. El precio ANTERIOR real, si hay rebaja.
         tomas     -> cuántas tomas trae el envase (calcula el "por toma")
         etiqueta  -> distintivo: "Más vendido", "Nuevo"…  ("" para quitarlo)   */
    productos: [
      {
        id: "ins-acs-creatine", categoria: "creatinas",
        marca: "Insane Labz", nombre: "ACS Creatine",
        sabor: "Sin sabor", tamano: "60 servicios", tomas: 60,
        precio: "$450", antes: "", etiqueta: "Más vendido",
        imagen: "img/productos/ins-acs-creatine.webp",
        resumen: "Creatina pura sin sabor: se mezcla con lo que ya tomas.",
        puntos: ["60 servicios por envase", "Sin sabor: se disuelve en agua, jugo o proteína", "Ideal para empezar con creatina"],
      },
      {
        id: "mut-creakong", categoria: "creatinas",
        marca: "Mutant", nombre: "CreaKong",
        sabor: "Sin sabor", tamano: "300 g · 75 porciones", tomas: 75,
        precio: "$370", antes: "", etiqueta: "",
        imagen: "img/productos/mut-creakong.webp",
        resumen: "Mezcla de creatinas para quien ya lleva tiempo entrenando.",
        puntos: ["300 gramos por envase", "Enfocada en fuerza y volumen", "Rinde alrededor de 2 meses"],
      },
      {
        id: "nt-creatine-drive", categoria: "creatinas",
        marca: "Nutrex", nombre: "Creatine Drive Black",
        sabor: "Sin sabor", tamano: "300 g", tomas: 60,
        precio: "$380", antes: "", etiqueta: "",
        imagen: "img/productos/nt-creatine-drive.webp",
        resumen: "Monohidrato de creatina clásico, de los más probados.",
        puntos: ["300 gramos por envase", "Monohidrato: el más estudiado del mercado", "5 g por servicio"],
      },
      {
        id: "mut-pwo", categoria: "preentrenos",
        marca: "Mutant", nombre: "PWO",
        sabor: "Fruit Punch", tamano: "270 g · 60 porciones", tomas: 60,
        precio: "$430", antes: "", etiqueta: "Rinde más",
        // OJO: esta foto es del Mutant GEAA (aminoácidos), no del PWO.
        imagen: "img/productos/mut-pwo.webp",
        resumen: "60 servicios: el preentreno con mejor rendimiento por envase.",
        puntos: ["60 servicios por envase", "Energía sostenida sin bajón brusco", "Sabor Fruit Punch"],
      },
      {
        id: "raw-cbum-thavage", categoria: "preentrenos",
        marca: "Raw Nutrition", nombre: "CBUM Thavage",
        sabor: "Tamarindo", tamano: "40 servicios", tomas: 40,
        precio: "$780", antes: "", etiqueta: "Más vendido",
        imagen: "img/productos/raw-cbum-thavage.webp",
        resumen: "Foco limpio y bombeo. El favorito de quienes entrenan pesado.",
        puntos: ["40 servicios por envase", "Enfocado en concentración y bombeo", "Sabor tamarindo"],
      },
      {
        id: "bucked-up-woke-af", categoria: "preentrenos",
        marca: "Bucked Up", nombre: "Woke AF",
        sabor: "Blue Razz", tamano: "30 servicios", tomas: 30,
        precio: "$750", antes: "", etiqueta: "Alta intensidad",
        imagen: "img/productos/bucked-up-woke-af.webp",
        resumen: "Fórmula fuerte. No es para tu primer preentreno.",
        puntos: ["30 servicios por envase", "Estimulación alta: empieza con media dosis", "Sabor Blue Razz"],
      },
      {
        id: "ins-psychotic", categoria: "preentrenos",
        marca: "Insane Labz", nombre: "Psychotic",
        sabor: "Gummy Candy", tamano: "35 servicios", tomas: 35,
        precio: "$480", antes: "", etiqueta: "",
        imagen: "img/productos/ins-psychotic.webp",
        resumen: "Clásico de alta intensidad para sesiones largas.",
        puntos: ["35 servicios por envase", "Energía y foco de larga duración", "Sabor Gummy Candy"],
      },
      {
        id: "on-gold-standard", categoria: "proteinas",
        marca: "Optimum Nutrition", nombre: "100% Whey Gold Standard",
        sabor: "Vainilla", tamano: "899 g · 29 servicios", tomas: 29,
        precio: "$880", antes: "", etiqueta: "Más vendido",
        imagen: "img/productos/on-gold-standard.webp",
        resumen: "La proteína de referencia. Si no sabes cuál elegir, es esta.",
        puntos: ["2 libras por envase", "Whey de absorción rápida", "Sabor vainilla"],
      },
      {
        id: "nt-isofit", categoria: "proteinas",
        marca: "Nutrex", nombre: "Isofit",
        sabor: "Chocolate Shake", tamano: "2.2 lbs · 30 servicios", tomas: 30,
        precio: "$850", antes: "", etiqueta: "",
        imagen: "img/productos/nt-isofit.webp",
        resumen: "Aislado de proteína: más limpio, más ligero de digerir.",
        puntos: ["2.2 libras por envase", "Proteína aislada, baja en carbohidratos", "Sabor Chocolate Shake"],
      },
      {
        id: "mut-whey", categoria: "proteinas",
        marca: "Mutant", nombre: "Mutant Whey",
        sabor: "Chocolate Fudge Brownie", tamano: "5 lbs · 60 servicios", tomas: 60,
        precio: "$1,130", antes: "", etiqueta: "Mejor rendimiento",
        imagen: "img/productos/mut-whey.webp",
        resumen: "5 libras para etapa de volumen sin quedarte a media semana.",
        puntos: ["5 libras por envase", "Pensada para etapa de volumen", "Sabor Chocolate Fudge Brownie"],
      },
    ],

    sorteo: {
      activo: true,
      titulo: "Con la compra de cualquier producto entras al sorteo de una proteína.",
      texto: "Solo participan las primeras 25 personas.",
      numero: "25",
      unidad: "lugares",
    },

    confianza: [
      { titulo: "Sellado y original", texto: "Marcas verificadas, nada suelto ni reenvasado." },
      { titulo: "Pago al recibir", texto: "Sin pagos en línea: todo se cierra por WhatsApp." },
      { titulo: "Envíos a todo México", texto: "Guía rastreable, 2 a 5 días hábiles. En Colima, en mano." },
      { titulo: "Asesoría sin costo", texto: "Te digo qué sí y qué no necesitas antes de que pagues." },
    ],

    /* Solo reseñas REALES de clientes (con su permiso). Formato:
       { nombre: "Carlos R.", detalle: "Colima · Gold Standard", texto: "…" }  */
    testimonios: [],

    garantia: "",   // ej. "Si no llega sellado, te lo cambio." — solo si de verdad lo ofreces

    preguntas: [
      { p: "¿Son originales?", r: "Sí. Producto sellado de marcas verificadas: nada suelto ni reenvasado." },
      { p: "¿Cómo pago?", r: "Pagas al recibir. Los detalles de tu entrega los confirmamos por WhatsApp." },
      { p: "¿Cuánto tarda el envío?", r: "Dentro de Colima te lo entrego en mano. Al resto de México llega en 2 a 5 días hábiles, con guía rastreable." },
      { p: "No sé cuál me conviene, ¿qué hago?", r: "Elige tu objetivo arriba o escríbeme directo. Te digo qué sí y qué no necesitas, sin venderte de más." },
      { p: "¿Cómo funciona el sorteo?", r: "Con la compra de cualquier producto entras al sorteo de una proteína. Solo participan las primeras 25 personas." },
    ],

    cierre: {
      titulo: "Ya sabes lo que quieres.",
      texto: "Mándame mensaje y lo dejamos listo hoy.",
      boton: "Escríbeme por WhatsApp",
    },
  },

  /* =======================================================================
     5. LANDING DE ENTRENAMIENTO
     ======================================================================= */
  entrenamiento: {
    etiqueta: "Entrenamiento",
    eyebrow: "Entrenamiento personal · Colima y a distancia",
    titular: "Tu cuerpo cambia cuando tu entrenamiento tiene un plan.",
    subtitulo: "En este video te explico cómo te llevo de donde estás hoy a donde quieres estar.",

    video: {
      youtube: "",
      duracion: "",
      titulo: "Cómo te llevo de punto A a punto B",
    },

    boton: "Armar mi plan",
    sellos: ["Uno a uno, nunca en grupo", "Presencial o a distancia", "Seguimiento real"],

    ab: {
      titulo: "De dónde vienes, a dónde vas.",
      a: {
        etiqueta: "Punto A · Hoy",
        puntos: [
          "Sigues rutinas de internet que no son para ti.",
          "Entrenas sin saber si lo estás haciendo bien.",
          "Te desmotivas porque no ves avance.",
        ],
      },
      b: {
        etiqueta: "Punto B · Conmigo",
        puntos: [
          "Un plan hecho para tu objetivo y tu nivel.",
          "Técnica corregida sesión por sesión.",
          "Progreso medido: peso, grasa y medidas.",
        ],
      },
      puente: "El puente: un plan a tu medida y alguien que te acompaña en cada paso.",
    },

    metodo: {
      titulo: "Así trabajamos.",
      pasos: [
        { titulo: "Asesoría inicial", texto: "Te escucho, vemos dónde estás y fijamos a dónde vas." },
        { titulo: "Tu plan a la medida", texto: "Rutina según tu objetivo, tu nivel y tu tiempo. Nada genérico." },
        { titulo: "Seguimiento y ajustes", texto: "Medimos tu avance y ajustamos para que el cambio no se detenga." },
      ],
    },

    coach: {
      nombre: "Damian Torres",
      rol: "Coach de entrenamiento",
      foto: "img/perfil.webp",
      bio:
        "Tengo 18 años, soy de Colima y llevo más de 3 años ayudando a personas con su cambio físico personal. No entreno a 5 personas a la vez ni te doy una rutina de internet. Diseño cada plan según tu objetivo, tu nivel y tu progreso, y le doy seguimiento de cerca para que cada sesión valga la pena.",
      datos: [
        { numero: "+3", texto: "años ayudando a cambiar" },
        { numero: "1 a 1", texto: "nunca en grupo" },
        { numero: "24/7", texto: "atención por línea a mis clientes" },
      ],
    },

    objetivo: {
      titulo: "Armemos tu plan.",
      texto: "Dos respuestas y te digo qué paquete es para ti.",
      pregunta1: "¿Qué quieres lograr?",
      objetivos: [
        { id: "grasa", nombre: "Bajar grasa" },
        { id: "musculo", nombre: "Ganar músculo" },
        { id: "tonificar", nombre: "Tonificar" },
        { id: "fuerza", nombre: "Más fuerza" },
        { id: "resistencia", nombre: "Resistencia" },
      ],
      pregunta2: "¿Cómo quieres entrenar?",
      /* Cada modalidad recomienda un paquete (por su "titulo" exacto). */
      modalidades: [
        { id: "rutina", nombre: "Solo quiero mi rutina", paquete: "Rutina Enfocada" },
        { id: "distancia", nombre: "A distancia, con seguimiento", paquete: "A Distancia" },
        { id: "presencial", nombre: "Presencial, 1 a 1 en Colima", paquete: "Entrenamiento Personal" },
        { id: "vip", nombre: "Lo quiero todo", paquete: "Atención VIP Exclusiva" },
      ],
    },

    /* true muestra los precios de los paquetes; false deja "Precio por WhatsApp". */
    mostrarPrecios: false,

    paquetes: [
      {
        titulo: "Rutina Enfocada",
        etiqueta: "Rutina personalizada",
        subtitulo: "Tus objetivos, tu transformación.",
        precio: "$349", periodo: "Único pago",
        incluye: [
          "Asesoramiento inicial",
          "Rutina personal (bajar grasa / aumentar músculo)",
          "Entrenamiento dinámico",
          "Atención 24/7 por línea (primera semana con la rutina)",
          "Corrección de técnica",
        ],
      },
      {
        titulo: "A Distancia",
        etiqueta: "Entrenamiento a distancia",
        subtitulo: "Totalmente enfocado, estés donde estés.",
        precio: "$1,199", periodo: "2 meses",
        incluye: [
          "Asesoramiento inicial",
          "Rutina personalizada",
          "Revisión cada 2 semanas (cambio de rutina)",
          "Atención por línea durante los 2 meses",
          "Entrenamiento dinámico",
          "Seguimiento de progreso",
          "Corrección de técnica",
          "Recomendación suplementaria",
        ],
      },
      {
        titulo: "Entrenamiento Personal",
        etiqueta: "Exclusividad y enfoque en ti",
        subtitulo: "5 días a la semana, enfoque 1 a 1.",
        precio: "$799", periodo: "Semanal",
        incluye: [
          "Asesoramiento inicial",
          "Enfoque individual, no grupal",
          "5 días a la semana · 2 hrs por sesión",
          "Voy a tu gimnasio más cercano",
          "Rutina personalizada",
          "Entrenamiento y corrección presencial",
          "Atención en línea 24/7",
          "Medición semanal de grasa, peso y medidas",
        ],
      },
      {
        titulo: "Atención VIP Exclusiva",
        etiqueta: "VIP · El máximo enfoque",
        subtitulo: "Prioridad, seguimiento y resultados trimestrales.",
        precio: "$1,199", periodo: "Semanal",
        destacado: true,
        incluye: [
          "Asesoramiento inicial",
          "Atención prioritaria",
          "5 días a la semana · 2 hrs por sesión",
          "Voy a tu gimnasio más cercano",
          "Rutina personalizada",
          "Entrenamiento y corrección presencial",
          "Atención en línea 24/7",
          "Medición semanal de grasa, peso y medidas",
          "+ Seguimiento de progreso durante 3 meses",
          "+ Sugerencias alimenticias (no dieta)",
        ],
      },
    ],

    cupos: {
      texto: "No entreno a 5 personas a la vez. Por eso los lugares son limitados.",
      disponibles: "",   // ej. "3" — solo si es el número real de este mes
    },

    testimonios: [],
    garantia: "",

    preguntas: [
      { p: "¿Necesito experiencia?", r: "No. El plan se hace según tu nivel, empieces de cero o ya entrenes." },
      { p: "¿Vas a mi gimnasio?", r: "Sí. En los paquetes presenciales voy a tu gimnasio más cercano en Colima." },
      { p: "No vivo en Colima, ¿puedo entrenar contigo?", r: "Sí, con el paquete A Distancia: rutina personalizada, revisión cada 2 semanas y atención por línea." },
      { p: "¿Incluye dieta?", r: "No hago dietas. El paquete VIP incluye sugerencias alimenticias para acompañar tu entrenamiento." },
      { p: "¿Cuánto cuesta?", r: "Depende del paquete. Escríbeme y te paso precios y horarios disponibles." },
    ],

    legal: "Antes de iniciar un programa de ejercicio consulta a tu médico, sobre todo si tienes alguna lesión o condición de salud.",

    cierre: {
      titulo: "El mejor momento para empezar es hoy.",
      texto: "Escríbeme y armamos tu plan.",
      boton: "Empezar por WhatsApp",
    },
  },
};
