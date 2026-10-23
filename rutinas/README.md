# Rutinas personalizadas

Para armar rutinas y mandárselas a tus alumnos por WhatsApp. Cada alumno
tiene su link y ese link **no cambia nunca**: edites lo que edites, el
alumno abre el mismo de siempre y ve lo nuevo.

Las rutinas se guardan **cifradas**. Este repositorio es público, así que
cualquiera puede ver sus archivos — pero dentro solo hay texto ilegible.

---

## Cómo funciona el cifrado

Al exportar, la rutina se cifra con una clave propia. **La clave no se
guarda en ningún archivo**: viaja en el link, después del `#`.

```
https://x5-007.github.io/faithlure/rutinas/r-7k2f-m3x8/#k=_k5y8H8I7MTGE…
└────────────── esto sí llega al servidor ──────────────┘└─ esto NO ─┘
```

Todo lo que va después del `#` se queda en el navegador: no se envía al
servidor, no aparece en los registros de GitHub y no está en el repositorio.
Solo quien tiene el link completo puede leer la rutina.

Por eso las carpetas se llaman `r-7k2f-m3x8` y no `juan-perez`: quien
navegue el repositorio no debe poder saber ni de quién es cada rutina.

**Lo único sin cifrar es el nombre de pila**, porque es lo que aparece en la
vista previa cuando mandas el link por WhatsApp ("Rutina de Juan"). El
apellido, el objetivo, los días, los ejercicios y tus notas van cifrados.

---

## Cómo armar y mandar una rutina

**1. Abre el armador**

```
https://x5-007.github.io/faithlure/rutinas/armador/
```

Guárdalo en favoritos. Es solo para ti y le pedimos a Google que no lo
indexe. **Tiene que abrirse desde el sitio con `https`**: el navegador no
deja cifrar en un archivo abierto con doble clic.

**2. Llena los datos y arma los días**

Pulsa «+ Agregar día», ponle nombre y enfoque. El día con borde dorado es el
**día activo**: ahí se agregan los ejercicios que elijas de la biblioteca.
Se agrupan solos por grupo muscular.

**3. Revisa con «Vista previa»** y exporta

**4. Sube solo `index.html` a GitHub**

1. En tu computadora, crea una carpeta con el código que te dio el armador
   (`r-7k2f-m3x8`) y mete dentro el `index.html`.
2. En tu repositorio, entra a la carpeta `rutinas`.
3. **Add file → Upload files** y arrastra **la carpeta completa**.
   GitHub respeta la estructura; si arrastras el archivo suelto, se te va a
   la raíz y el link no funciona.
4. **Commit changes**.

> ¿Prefieres no crear carpetas? **Add file → Create new file**, escribe como
> nombre `r-7k2f-m3x8/index.html` (al teclear la `/` se crea la carpeta sola),
> abre el `index.html` descargado con el Bloc de notas, copia todo y pégalo.

**5. Pulsa «Copiar mensaje para WhatsApp»** y pégalo en el chat.

> ⚠️ El link tiene que llegar **completo**, con la parte del `#`. Si se corta,
> el alumno ve un aviso que le dice que te lo pida de nuevo.

---

## El respaldo

Al exportar también puedes descargar `respaldo-r-7k2f-m3x8.json`. Ese archivo
**tiene la clave sin cifrar**:

- Guárdalo en tu computadora. Es lo que te deja volver a editar la rutina.
- **Nunca lo subas a GitHub.** Si lo subes, el cifrado deja de servir.

¿Lo perdiste? No pasa nada: usa **«Abrir desde link»** y pega la URL completa
del alumno. El armador la descarga, la descifra y la carga lista para editar.
Tus links son tu respaldo.

---

## Cómo editar una rutina ya enviada

1. «Abrir respaldo» (el .json) o «Abrir desde link» (la URL del alumno).
2. Haz los cambios y actualiza la fecha.
3. Exporta y sube el `index.html` **a la misma carpeta**, reemplazando el anterior.

El código y la clave no cambian, así que **el link del alumno sigue siendo el
mismo**. No tienes que mandarle nada nuevo.

---

## Agregar ejercicios a la biblioteca

Edita `ejercicios.js`:

```js
{
  id: "remo-con-barra",          // único, minúsculas y guiones
  nombre: "Remo con barra",      // como lo ve el alumno
  grupo: "Espalda",              // uno de los de GRUPOS
  clip: "remo-con-barra.mp4",    // el archivo dentro de clips/
  poster: "remo-con-barra.jpg",  // opcional
},
```

Si todavía no grabaste el video, deja `clip: ""`: el ejercicio sale igual,
con un recuadro en lugar de la animación.

Specs de los videos en **`clips/LEEME.txt`** — 3 a 6 segundos, MP4, menos de
1 MB. Los tres que vienen son de ejemplo: reemplázalos por los tuyos con el
mismo nombre de archivo.

Los clips **no se cifran**: son demostraciones genéricas, iguales para todos,
y no dicen nada de ningún alumno.

---

## Qué hay en cada carpeta

| | |
|---|---|
| `armador/` | Tu panel para crear rutinas. Solo tuyo. |
| `ejercicios.js` | La biblioteca de ejercicios. |
| `clips/` | Los videos y sus miniaturas. |
| `base/` | Diseño y motor de la rutina del alumno. No se toca para cambiar una rutina. |
| `og.jpg` | La imagen de la vista previa de WhatsApp. |
| `r-zqig-kpug/` | Rutina de ejemplo con datos inventados. Bórrala cuando quieras. |

---

## Cosas que conviene saber

**Lo que sigue siendo visible** para quien navegue el repositorio: cuántas
rutinas tienes, el nombre de pila de cada alumno y tu biblioteca de
ejercicios. Nunca el contenido de las rutinas.

**Quien tenga el link puede abrirlo.** El cifrado evita que alguien husmee el
repositorio, no que un alumno reenvíe su link a un amigo.

**Los videos no se descargan hasta que se ven.** Cada clip carga cuando el
alumno llega a ese ejercicio y se pausa al cambiar de día, para no gastarle
datos móviles.

**Si un celular no reproduce solo el video** (iPhone en Modo de Bajo Consumo),
aparece un botón de play y basta un toque.

**El alumno puede guardar su rutina en PDF** desde el menú de imprimir de su
navegador: salen todos los días, sin los videos.

**Tu WhatsApp sale de `config.js`.** Si lo cambias ahí, las rutinas nuevas lo
toman solo. Las ya publicadas conservan el número con el que se crearon.
