# FaithLure Supplements — página de catálogo

Sitio estático (HTML + CSS + JavaScript). No hay que compilar nada ni instalar
programas: se sube tal cual y funciona.

## Archivos

| Archivo | Para qué sirve |
|---|---|
| `catalogo.js` | **El único archivo que necesitas editar.** Textos, categorías, productos, precios y contacto. |
| `index.html` | Estructura de la página (el orden de las secciones). |
| `style.css` | Todo el diseño: colores, tipografías, espaciados, responsive. |
| `script.js` | Dibuja el catálogo, los filtros, la ficha del producto y la lista de pedido. |
| `img/faithlure-logo.svg` | El logo en línea (versión suelta). |
| `img/faithlure-mark.svg` | El logo sobre fondo oscuro, se usa como ícono de pestaña. |
| `img/productos/` | Las fotos de los productos, una por cada uno. |

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

### Cambiar la foto de un producto

1. Guarda la imagen en `img/productos/` (por ejemplo `mut-creakong.webp`).
2. En `catalogo.js`, escribe esa ruta en el campo `image` del producto:

```js
image: "img/productos/mut-creakong.webp",
```

Para que se vean parejas, lo ideal es:

- **Fondo transparente** (PNG o WebP), no fondo blanco.
- Alrededor de **640 px de alto**, con el producto centrado.
- Formato **WebP**, que pesa mucho menos que PNG y se ve igual.

Si dejas `image: ""`, la tarjeta muestra un marcador con las iniciales de la
marca en lugar de quedarse vacía.

### Agregar una categoría nueva

Añade un bloque en `categories` y usa su `id` en los productos que le
correspondan:

```js
{
  id: "vitaminas",
  name: "Vitaminas",
  tagline: "Lo que te falta cuando entrenas fuerte.",
  icon: "shield",        // bolt | flame | shake | shield | grid
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

---

## Qué trae la página

- **Catálogo dividido por categorías** con filtros arriba y contador por categoría.
- **Foto real de cada producto** sobre un fondo de estudio, con sombra y un
  acercamiento suave al pasar el cursor.
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
- **Fotos:** se cambian producto por producto con el campo `image`.
