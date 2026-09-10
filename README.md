# FaithLure Supplements — página de catálogo

Sitio estático (HTML + CSS + JavaScript). No hay que compilar nada ni instalar
programas: se sube tal cual y funciona.

## Archivos

| Archivo | Para qué sirve |
|---|---|
| `catalogo.js` | **El único archivo que necesitas editar.** Textos, categorías, productos, precios y contacto. |
| `index.html` | Estructura de la página (el orden de las secciones). |
| `style.css` | Todo el diseño: colores, tipografías, espaciados, responsive. |
| `script.js` | Dibuja el catálogo, arma los botes 3D, los filtros y la lista de pedido. |
| `img/faithlure-logo.svg` | El logo en línea (versión suelta). |
| `img/faithlure-mark.svg` | El logo sobre fondo oscuro, se usa como ícono de pestaña. |
| `img/productos/` | Carpeta donde puedes poner las fotos reales de los productos. |

> El logo es una reconstrucción del original en SVG. Si tienes el archivo
> oficial, reemplaza los dos archivos de `img/` conservando los mismos nombres.

---

## Cómo cambiar la información

Abre `catalogo.js` y edita lo que está entre comillas `" "`. No borres las comas.

### Agregar un producto

Copia un bloque completo de `products`, pégalo debajo y cambia sus datos:

```js
{
  id: "nombre-corto-unico",     // sin espacios y distinto a los demás
  category: "proteinas",        // creatinas | preentrenos | proteinas
  brand: "Marca",
  name: "Nombre del producto",
  variant: "Sabor",
  size: "2 lbs",
  price: "",                    // se ve solo si showPrices está en true
  badge: "Nuevo",               // distintivo opcional, deja "" para quitarlo
  featured: false,              // true resalta la tarjeta
  stock: true,                  // false muestra "Bajo pedido"
  short: "Una línea que explique para qué sirve.",
  bullets: ["Punto 1", "Punto 2", "Punto 3"],
  image: "",                    // opcional: "img/productos/archivo.png"
},
```

### Cambiar el envase 3D de un producto

Cada producto trae un bloque `model` con los colores de su envase real:

```js
model: {
  shape: "bote",          // "bote" (tarro con tapa) o "bolsa" (bolsa de pie)
  body: "#141414",        // color del envase
  lid: "#d8232a",         // color de la tapa (solo en "bote")
  label: "#0d0d0d",       // fondo de la etiqueta
  ink: "#ffffff",         // color del texto
  accent: "#cf2027",      // color del nombre y las líneas
  stripe: "#f2d600",      // opcional: franja vertical de color
  title: "CreaKong",      // opcional: el nombre tal como va impreso
},
```

Si un producto no trae `model`, se usa el envase de respaldo de su categoría.

### Agregar una categoría nueva

Añade un bloque en `categories` y usa su `id` en los productos que le
correspondan. Los colores definen cómo se ve el bote 3D de esa categoría:

```js
{
  id: "vitaminas",
  name: "Vitaminas",
  tagline: "Lo que te falta cuando entrenas fuerte.",
  icon: "shield",                                        // bolt | flame | shake | shield | grid
  colors: { body: "#2a2724", band: "#c9a15a", cap: "#171512", text: "#171512" },
},
```

La categoría aparece sola en los filtros y en el catálogo.

### Encender los precios

En `catalogo.js` cambia:

```js
showPrices: true,
```

y llena el campo `price` de cada producto (por ejemplo `"$650 MXN"`).
Mientras esté en `false` se muestra **"Precio a consultar"** y el espacio del
precio ya queda reservado, así que al encenderlos nada se mueve de lugar.

### Cambiar el WhatsApp

```js
whatsappNumber: "3131536627",   // solo los 10 dígitos
whatsappDisplay: "313 - 153 - 6627",
```

Todos los botones (cotizar, comprar, flotante y el envío de la lista de pedido)
se actualizan solos.

### Poner fotos reales

Guarda las imágenes en `img/productos/` (lo ideal: PNG con fondo transparente,
alrededor de 800 px de alto) y escribe la ruta en el campo `image` del producto.
Cuando hay foto, la tarjeta la muestra en un marco con inclinación 3D en lugar
del bote generado.

---

## Qué trae la página

- **Catálogo dividido por categorías** con filtros arriba y contador por categoría.
- **Envases en 3D** generados por código, copiados del envase real de cada
  producto: tarros con tapa estriada y bolsas de pie, con su etiqueta impresa
  (marca, nombre, sabor y tamaño). Giran solos y se pueden arrastrar para
  girarlos a mano dentro de la ficha del producto.
- **Ficha de producto** con los detalles, disponibilidad, precio y botones.
- **Lista de pedido**: el cliente agrega varios productos y se envían todos
  juntos en un solo mensaje de WhatsApp, con cantidades. La lista se guarda en
  el navegador, así que no se pierde si cierra la página.
- **Botones con luz**: destello al pasar el cursor y halo dorado en los
  botones principales.
- **Precio resaltado** con espacio reservado aunque esté oculto.
- **Botón flotante de WhatsApp** siempre visible.
- Diseño responsive desde 320 px, aparición progresiva al hacer scroll,
  navegación por teclado, `prefers-reduced-motion` y estilos de impresión.

---

## Publicar la página

Los archivos de esta carpeta son todo lo que se necesita. Tres formas de subirla:

### 1. Dentro del sitio del coach (lo más rápido)

Ya está lista: al publicar el repositorio queda en
`tudominio.com/suplementos/`, y la sección "Suplementos" de la página del coach
enlaza directo aquí.

### 2. Con su propio dominio en GitHub Pages

1. Crea un repositorio nuevo (por ejemplo `faithlure`).
2. Sube **el contenido de esta carpeta** a la raíz de ese repositorio
   (que `index.html` quede hasta arriba, no dentro de `suplementos/`).
3. En el repositorio: `Settings` → `Pages` → *Source*: `Deploy from a branch`,
   rama `main`, carpeta `/ (root)`.
4. En `Settings` → `Pages` → *Custom domain* escribe tu dominio
   (por ejemplo `faithlure.com`) y guarda. GitHub crea solo el archivo `CNAME`.
5. En el panel de tu proveedor de dominio agrega:

   | Tipo | Nombre | Valor |
   |---|---|---|
   | A | @ | 185.199.108.153 |
   | A | @ | 185.199.109.153 |
   | A | @ | 185.199.110.153 |
   | A | @ | 185.199.111.153 |
   | CNAME | www | `tuusuario.github.io` |

6. Espera a que aparezca el candado y activa **Enforce HTTPS**.

### 3. Con Netlify o Vercel

Arrastra esta carpeta a [app.netlify.com/drop](https://app.netlify.com/drop) o
conecta el repositorio en Vercel. En ambos casos el dominio se agrega desde
*Domain settings* siguiendo las instrucciones que te den ahí.

---

## Google Analytics (opcional)

Para saber cuántas visitas tienes, en `catalogo.js`:

```js
analytics: {
  enabled: true,
  measurementId: "G-XXXXXXXXXX",
},
```

---

## Versiones futuras

La página está preparada para crecer sin rehacerla:

- **Pagos en línea:** hoy todo se cierra por WhatsApp. Cuando quieras cobrar
  desde la página, la lista de pedido ya tiene los productos y las cantidades
  listos para conectarse a Mercado Pago o Stripe.
- **Más categorías y productos:** se agregan desde `catalogo.js`.
- **Fotos reales:** se activan producto por producto con el campo `image`.
