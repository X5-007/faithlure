# FaithLure — embudo de ventas

Sitio estático (HTML + CSS + JavaScript). No hay que compilar ni instalar nada:
se sube tal cual a GitHub Pages y funciona.

## El embudo

```
                    ┌──────────────────────────────┐
                    │   PUERTA  ·  "Ya te la sabes" │   paso 1: eliges
                    └──────────────┬───────────────┘
                 ┌─────────────────┴─────────────────┐
                 ▼                                   ▼
       /suplementos/                         /entrenamiento/        paso 2: conoces
   video → A→B → tu objetivo → combo      video → A→B → método → coach
   → catálogo → sorteo → preguntas        → tu plan → paquetes → cupos
                 │                                   │
                 └─────────────────┬─────────────────┘
                                   ▼
                    WhatsApp con el mensaje ya escrito               paso 3: hablamos
         (de dónde viene, qué quiere lograr, qué quiere comprar)
```

Cada botón de WhatsApp arma su mensaje en el momento del clic con lo que el
prospecto eligió. Te llega así:

```
Vengo de la página de suplementos.
Mi objetivo: Ganar músculo.

Me interesa este combo:
• Optimum Nutrition 100% Whey Gold Standard (Vainilla, 899 g · 29 servicios) — $880
• Insane Labz ACS Creatine (Sin sabor, 60 servicios) — $450

Total: $1,330
¿Me confirmas disponibilidad y entrega?
```

## Archivos

| Archivo | Para qué sirve |
|---|---|
| `config.js` | **El único que editas.** Textos, videos, productos, precios, paquetes, WhatsApp. |
| `index.html` | La puerta: "Ya te la sabes" y los dos caminos. |
| `suplementos/index.html` | Landing de suplementos. |
| `entrenamiento/index.html` | Landing de entrenamiento. |
| `assets/faithlure.css` | Los estilos de las tres páginas. Uno solo, para que la marca sea idéntica. |
| `assets/faithlure.js` | El motor: arma las páginas desde `config.js`. |
| `img/` | Logo, tu foto y las fotos de los productos. |

## Lo primero que tienes que hacer: pegar tus videos

En `config.js` busca `video:` (hay uno en suplementos y otro en entrenamiento)
y pega el link tal como lo copias de YouTube:

```js
video: {
  youtube: "https://youtu.be/AbCdEfGhIjK",
  duracion: "1:40",        // opcional: se muestra junto al botón de play
  titulo: "Cómo elegir el suplemento correcto",
},
```

Sirve cualquier formato de link (`youtube.com/watch?v=…`, `youtu.be/…` o un
Short). Si es un Short, el reproductor se pone vertical solo. Mientras no pegues
el link, la portada dice **"Video muy pronto"** y la página funciona igual.

El video se reproduce desde `youtube-nocookie.com`: no deja cookies de
publicidad hasta que el cliente le da play.

## Cambiar cosas frecuentes

- **Precios:** el campo `precio` de cada producto. El "por toma" se calcula solo.
- **Rebaja:** pon el precio anterior real en `antes`. La tarjeta tacha el
  precio y calcula el porcentaje sola.
- **Combos por objetivo:** en `suplementos.objetivo.opciones`, cada objetivo
  lleva los `id` de dos productos.
- **Paquete que se recomienda:** en `entrenamiento.objetivo.modalidades`,
  cada modalidad apunta al `titulo` exacto de un paquete.
- **Precios de entrenamiento:** `mostrarPrecios: true` para mostrarlos.
- **Sorteo:** cuando termine, `sorteo.activo: false`.

## Solo datos reales

Estas partes vienen vacías a propósito y aparecen solas cuando las llenas:

| Campo | Qué pasa al llenarlo |
|---|---|
| `testimonios` | Aparece la sección "Ellos ya se la saben" con las reseñas. |
| `garantia` | Aparece un recuadro con tu garantía en "Compra sin riesgo". |
| `cupos.disponibles` | La banda de cupos muestra "3 lugares este mes". |

Inventar reseñas, cupos, descuentos o garantías es publicidad engañosa y
PROFECO la sanciona. Además, un prospecto que llega por una promesa falsa se
cae en el chat. Usa solo lo que puedas sostener.

## Estímulos de persuasión incluidos

| # | Estímulo | Dónde está | En qué ayuda |
|---|---|---|---|
| 1 | Menos opciones (ley de Hick) | Puerta con solo 2 caminos | Nadie se paraliza: elige en segundos |
| 2 | Compromiso y coherencia | Camino → objetivo → modalidad | Cada pequeño "sí" hace más fácil el siguiente: escribirte |
| 3 | Progreso incompleto (Zeigarnik) | "Paso 2 de 3 · Eliges · Conoces · Hablamos" | Un proceso empezado pide terminarse; el paso 3 es tu chat |
| 4 | Brecha de curiosidad | "En este video te explico cómo…" + play con pulso | Abre una pregunta que solo el video cierra |
| 5 | Reciprocidad | Video gratis, combo recomendado, "asesoría sin costo" | Das valor antes de pedir; la conversación se siente justa |
| 6 | Autoridad | Tu cara en el video, "+3 años", el método en 3 pasos | Confían en quien demuestra que sabe |
| 7 | Simpatía | Tu foto y tu voz, primera persona ("te escucho") | Se le compra a quien cae bien |
| 8 | Pertenencia | "Ya te la sabes", Colima | El prospecto siente que es de los tuyos |
| 9 | Transformación A → B | Bloque "De dónde vienes, a dónde vas" | Se compra el cambio, no el frasco |
| 10 | Personalización | "Tu combo", "Tu plan", "Para ti" | Lo que se siente propio se valora más |
| 11 | Anclaje de precio | "$4.93 por toma", total del combo, VIP como referencia | Un precio partido en tomas se siente pequeño |
| 12 | Escasez real | Sorteo de 25 lugares, cupos limitados | Lo escaso se desea más (con datos reales) |
| 13 | Reversión de riesgo | Pago al recibir, sin pagos en línea | Quita el miedo a perder dinero |
| 14 | Objeciones anticipadas | "Antes de que me preguntes" | Resuelve la duda antes de que se vuelva un "luego te escribo" |
| 15 | Prueba social | "Más vendido" y testimonios (cuando los cargues) | Lo que otros eligen se siente seguro |
| 16 | Fricción cero | Mensaje ya escrito, barra fija, sin formularios | Cada paso extra pierde gente |
| 17 | Primacía y recencia | Promesa + video al inicio; WhatsApp al final | Lo primero y lo último es lo que se recuerda |
| 18 | Cierre asumido | "¿Qué sigue para empezar?" al final del mensaje | Llegan en modo compra, no en modo "solo preguntaba" |
| 19 | Efecto halo | Misma marca premium en las 3 páginas | Si se ve profesional, se asume que el servicio también |

## Medición

Con Google Analytics (`analytics` en `config.js`) se registran estos eventos:
`elegir_camino`, `reproducir_video`, `elegir_objetivo`, `elegir_modalidad`,
`ver_producto`, `agregar_producto` y `click_whatsapp`. Con ellos puedes ver en
qué paso se va la gente.

## Links anteriores

`tu-sitio/#entrenamiento` y `tu-sitio/#catalogo` siguen funcionando: la puerta
los manda a su landing.
