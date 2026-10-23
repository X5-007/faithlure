/* =========================================================================
   ARMADOR DE RUTINAS
   =========================================================================
   Arma la rutina, la cifra y exporta el index.html que se sube a GitHub.

   CÓMO FUNCIONA EL CIFRADO
   - Cada rutina tiene una clave propia que se genera una sola vez y se
     guarda junto con la rutina (en el borrador y en el respaldo).
   - Al exportar, la rutina se cifra con AES-GCM y un vector nuevo cada vez.
     En el index.html queda solo el texto cifrado: la clave NO está ahí.
   - La clave viaja en el link, después del "#". Esa parte nunca se envía
     al servidor ni se guarda en el repositorio.
   - Como la clave no cambia entre ediciones, EL LINK DEL ALUMNO SIEMPRE
     ES EL MISMO aunque edites la rutina mil veces.

   Tus datos de coach salen de config.js.
   ========================================================================= */

(function () {
  'use strict';

  const $ = (s) => document.querySelector(s);
  const LS = 'fl_rutina_borrador';
  const SITIO_DEF = 'https://x5-007.github.io/faithlure';

  const COACH = (() => {
    const f = (typeof FAITHLURE !== 'undefined' && FAITHLURE) || {};
    const c = (f.entrenamiento && f.entrenamiento.coach) || {};
    const w = f.whatsapp || {};
    return {
      nombre: c.nombre || 'Damian Torres',
      rol: c.rol || 'Coach de entrenamiento',
      whatsapp: w.numero || '',
      lada: w.lada || '52',
    };
  })();

  const esc = (v) => String(v == null ? '' : v)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;');

  const hoy = () => new Date().toISOString().slice(0, 10);

  /* =====================================================================
     CIFRADO
     ===================================================================== */
  const aB64 = (buf) => {
    const b = new Uint8Array(buf);
    let s = '';
    for (let i = 0; i < b.length; i++) s += String.fromCharCode(b[i]);
    return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  };
  const deB64 = (s) => {
    const base = String(s).replace(/-/g, '+').replace(/_/g, '/');
    const bin = atob(base + '==='.slice((base.length + 3) % 4));
    const out = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
    return out;
  };

  const hayCripto = () => !!(window.crypto && crypto.subtle);

  async function nuevaClave() {
    const k = await crypto.subtle.generateKey({ name: 'AES-GCM', length: 256 }, true, ['encrypt', 'decrypt']);
    return aB64(await crypto.subtle.exportKey('raw', k));
  }

  async function cifrar(objeto, claveB64) {
    const clave = await crypto.subtle.importKey('raw', deB64(claveB64), { name: 'AES-GCM' }, false, ['encrypt']);
    // Vector nuevo en cada exportación: nunca se repite con la misma clave.
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const datos = new TextEncoder().encode(JSON.stringify(objeto));
    const cifrado = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, clave, datos);
    return { v: 1, iv: aB64(iv), d: aB64(cifrado) };
  }

  async function descifrar(sobre, claveB64) {
    const clave = await crypto.subtle.importKey('raw', deB64(claveB64), { name: 'AES-GCM' }, false, ['decrypt']);
    const plano = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: deB64(sobre.iv) }, clave, deB64(sobre.d));
    return JSON.parse(new TextDecoder().decode(plano));
  }

  /* =====================================================================
     ESTADO
     ===================================================================== */
  const vacio = () => ({
    version: 2,
    alumno: '', slug: '', clave: '', objetivo: '', paquete: '', vigencia: '',
    actualizado: hoy(), nota: '', sitio: SITIO_DEF,
    dias: [],
  });

  let R = vacio();
  let diaActivo = 0;
  let filtroGrupo = '';
  let busqueda = '';

  /* =====================================================================
     UTILIDADES
     ===================================================================== */
  function codigo(n) {
    const abc = 'abcdefghijkmnpqrstuvwxyz23456789';
    const bytes = crypto.getRandomValues(new Uint8Array(n));
    let s = '';
    for (let i = 0; i < n; i++) s += abc[bytes[i] % abc.length];
    return s;
  }
  // Sin nombre: el repositorio es público y la carpeta no debe decir de quién es.
  const slugAuto = () => `r-${codigo(4)}-${codigo(4)}`;

  function fechaLarga(iso) {
    const p = String(iso || '').split('-');
    if (p.length !== 3) return iso || '';
    const m = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio',
               'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'][Number(p[1]) - 1];
    return m ? `${Number(p[2])} de ${m} de ${p[0]}` : iso;
  }
  const porId = (id) => EJERCICIOS.find((e) => e.id === id);
  const nombrePila = () => (R.alumno || '').trim().split(/\s+/)[0] || '';

  const base = () => (R.sitio || SITIO_DEF).replace(/\/+$/, '');
  function urlRutina() {
    const u = `${base()}/rutinas/${R.slug || 'r-xxxx'}/`;
    return R.clave ? `${u}#k=${R.clave}` : u;
  }

  let toastT;
  function toast(msg) {
    const t = $('#toast');
    t.textContent = msg;
    t.hidden = false;
    clearTimeout(toastT);
    toastT = setTimeout(() => { t.hidden = true; }, 3200);
  }

  const guardar = () => { try { localStorage.setItem(LS, JSON.stringify(R)); } catch (e) {} };
  function cargar() {
    try {
      const v = localStorage.getItem(LS);
      if (v) R = Object.assign(vacio(), JSON.parse(v));
    } catch (e) {}
  }

  /* =====================================================================
     BIBLIOTECA
     ===================================================================== */
  function renderFiltros() {
    $('#filtros').innerHTML =
      `<button class="filtro${filtroGrupo === '' ? ' is-on' : ''}" data-g="">Todos</button>` +
      GRUPOS.map((g) => `<button class="filtro${filtroGrupo === g ? ' is-on' : ''}" data-g="${esc(g)}">${esc(g)}</button>`).join('');
  }

  function renderBiblio() {
    const q = busqueda.toLowerCase();
    const lista = EJERCICIOS.filter((e) =>
      (!filtroGrupo || e.grupo === filtroGrupo) &&
      (!q || e.nombre.toLowerCase().includes(q) || e.grupo.toLowerCase().includes(q)));

    $('#biblioDestino').textContent = R.dias.length
      ? `Se agrega a: ${R.dias[diaActivo] ? (R.dias[diaActivo].nombre || 'Día ' + (diaActivo + 1)) : '—'}`
      : 'Primero agrega un día';

    $('#biblioList').innerHTML = lista.length
      ? lista.map((e) => `
          <button class="bib-item" data-add="${esc(e.id)}" type="button">
            ${e.poster
              ? `<img class="bib-item__mini" src="../clips/${esc(e.poster)}" alt="" loading="lazy">`
              : `<span class="bib-item__mini"></span>`}
            <span class="bib-item__txt">
              <b>${esc(e.nombre)}</b>
              <span>${esc(e.grupo)}${e.clip ? '' : ' · <i class="bib-item__sin">sin clip</i>'}</span>
            </span>
            <span class="bib-item__add">+</span>
          </button>`).join('')
      : '<p class="vacio">Ningún ejercicio coincide.<br>Agrégalo en <code>ejercicios.js</code>.</p>';
  }

  /* =====================================================================
     DÍAS
     ===================================================================== */
  function renderDias() {
    const cont = $('#dias');
    if (!R.dias.length) {
      cont.innerHTML = '<p class="vacio">Todavía no hay días. Agrega el primero abajo.</p>';
      return;
    }
    cont.innerHTML = R.dias.map((dia, i) => {
      const bloques = agrupar(dia.ejercicios || []);
      const cuerpo = bloques.length
        ? bloques.map((bl) => `
            <div class="bloque-ed">
              <p class="bloque-ed__t">${esc(bl.grupo)}</p>
              ${bl.ejercicios.map((ej) => fila(ej, i, (dia.ejercicios || []).indexOf(ej))).join('')}
            </div>`).join('')
        : '<p class="dia-vacio">Elige ejercicios de la biblioteca para este día.</p>';

      return `
        <article class="dia-card${i === diaActivo ? ' is-activo' : ''}">
          <header class="dia-card__head" data-activar="${i}">
            <span class="dia-card__n">${i + 1}</span>
            <span class="dia-card__inputs">
              <input class="input" data-campo="nombre" data-dia="${i}" value="${esc(dia.nombre || '')}" placeholder="Lunes">
              <input class="input" data-campo="enfoque" data-dia="${i}" value="${esc(dia.enfoque || '')}" placeholder="Pecho / Tríceps">
            </span>
            <span class="dia-card__tools">
              <button class="icon-btn" data-mover-dia="${i}" data-dir="-1" title="Subir" type="button">↑</button>
              <button class="icon-btn" data-mover-dia="${i}" data-dir="1" title="Bajar" type="button">↓</button>
              <button class="icon-btn icon-btn--del" data-borrar-dia="${i}" title="Eliminar día" type="button">✕</button>
            </span>
          </header>
          <div class="dia-card__body">${cuerpo}</div>
        </article>`;
    }).join('');
  }

  function fila(ej, di, ei) {
    return `
      <div class="ej-row">
        ${ej.poster
          ? `<img class="ej-row__mini" src="../clips/${esc(ej.poster)}" alt="" loading="lazy">`
          : `<span class="ej-row__mini"></span>`}
        <div class="ej-row__main">
          <div class="ej-row__name">${esc(ej.nombre)}</div>
          <div class="ej-row__campos">
            <input class="input" data-ej="${di}:${ei}" data-campo="series"   value="${esc(ej.series || '')}"   placeholder="3" aria-label="Series">
            <input class="input" data-ej="${di}:${ei}" data-campo="reps"     value="${esc(ej.reps || '')}"     placeholder="10-12" aria-label="Repeticiones">
            <input class="input" data-ej="${di}:${ei}" data-campo="descanso" value="${esc(ej.descanso || '')}" placeholder="60 s" aria-label="Descanso">
            <input class="input" data-ej="${di}:${ei}" data-campo="nota"     value="${esc(ej.nota || '')}"     placeholder="Nota de técnica" aria-label="Nota">
          </div>
        </div>
        <div class="ej-row__tools">
          <button class="icon-btn" data-mover-ej="${di}:${ei}" data-dir="-1" title="Subir" type="button">↑</button>
          <button class="icon-btn" data-mover-ej="${di}:${ei}" data-dir="1" title="Bajar" type="button">↓</button>
          <button class="icon-btn icon-btn--del" data-borrar-ej="${di}:${ei}" title="Quitar" type="button">✕</button>
        </div>
      </div>`;
  }

  function agrupar(ejercicios) {
    const orden = [];
    const mapa = new Map();
    ejercicios.forEach((ej) => {
      if (!mapa.has(ej.grupo)) { mapa.set(ej.grupo, []); orden.push(ej.grupo); }
      mapa.get(ej.grupo).push(ej);
    });
    return orden.map((g) => ({ grupo: g, ejercicios: mapa.get(g) }));
  }

  const renderLink = () => { $('#linkFinal').textContent = urlRutina(); };

  /* =====================================================================
     DATOS QUE SE CIFRAN
     ===================================================================== */
  function datosRutina() {
    return {
      version: 2,
      alumno: R.alumno.trim(),
      objetivo: R.objetivo.trim(),
      paquete: R.paquete.trim(),
      vigencia: R.vigencia.trim(),
      actualizado: R.actualizado,
      nota: R.nota.trim(),
      coach: COACH,
      dias: R.dias.map((dia) => ({
        nombre: dia.nombre || '',
        enfoque: dia.enfoque || '',
        bloques: agrupar(dia.ejercicios || []).map((bl) => ({
          grupo: bl.grupo,
          ejercicios: bl.ejercicios.map((ej) => ({
            nombre: ej.nombre, grupo: ej.grupo,
            clip: ej.clip || '', poster: ej.poster || '',
            series: ej.series || '', reps: ej.reps || '',
            descanso: ej.descanso || '', nota: ej.nota || '',
          })),
        })),
      })),
    };
  }

  /* ---------------------------------------------------------------------
     PLANTILLA DE LA PÁGINA DEL ALUMNO
     Lo único sin cifrar es el nombre de pila, que va en la vista previa de
     WhatsApp. Todo lo demás (apellido, objetivo, días, ejercicios, notas)
     queda cifrado dentro de #datos.
     --------------------------------------------------------------------- */
  function plantilla(sobre, extraHead) {
    const url = `${base()}/rutinas/${R.slug}/`;
    const pila = nombrePila();
    const titulo = pila
      ? `Rutina de ${pila} — ${COACH.nombre}`
      : `Tu rutina de entrenamiento — ${COACH.nombre}`;
    const desc = 'Tu plan día por día, con video de cada ejercicio. Ábrelo desde el link que te mandaron.';
    const json = JSON.stringify(sobre).replace(/</g, '\\u003c');

    return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(titulo)}</title>
<meta name="description" content="${esc(desc)}">
<meta name="theme-color" content="#171512">
<meta name="robots" content="noindex, nofollow">

<!-- Vista previa al compartir por WhatsApp -->
<meta property="og:type" content="article">
<meta property="og:site_name" content="${esc(COACH.nombre)} — ${esc(COACH.rol)}">
<meta property="og:title" content="${esc(titulo)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${esc(url)}">
<meta property="og:image" content="${esc(base())}/rutinas/og.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="Rutina personalizada de ${esc(COACH.nombre)}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(titulo)}">
<meta name="twitter:description" content="${esc(desc)}">
<meta name="twitter:image" content="${esc(base())}/rutinas/og.jpg">
${extraHead || ''}
<link rel="icon" href="../../img/perfil.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="../base/rutina.css">
</head>
<body>

<header class="barra" id="barra">
  <div class="caja barra__interior">
    <img class="barra__foto" src="../../img/perfil.webp" alt=""
         onerror="this.onerror=null;this.src='../../img/perfil.png'">
    <div>
      <div class="barra__nombre" id="coachNombre"></div>
      <div class="barra__rol" id="coachRol"></div>
    </div>
  </div>
</header>

<section class="ficha">
  <div class="caja ficha__interior">
    <p class="antetitulo">Plan de entrenamiento</p>
    <h1 id="alumno"></h1>
    <p class="ficha__resumen" id="resumen"></p>
    <div class="ficha__chips" id="chips"></div>
    <div class="nota-coach" id="notaCoach"></div>
  </div>
</section>

<nav class="dias" id="dias" aria-label="Días de entrenamiento">
  <div class="caja dias__scroll" id="diasTabs"></div>
</nav>

<div id="diasPaneles"></div>

<footer class="pie">
  <div class="caja">
    <img class="pie__foto" src="../../img/perfil.webp" alt=""
         onerror="this.onerror=null;this.src='../../img/perfil.png'">
    <strong id="pieNombre"></strong>
    <p id="pieRol"></p>
  </div>
</footer>

<a class="wa-boton" id="waBoton" href="#"></a>

<script type="application/json" id="datos">${json}</script>
<script src="../base/rutina.js"></script>
</body>
</html>
`;
  }

  /* =====================================================================
     EXPORTAR, VISTA PREVIA E IMPORTAR
     ===================================================================== */
  function descargar(nombre, texto, tipo) {
    const blob = new Blob([texto], { type: tipo + ';charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = nombre;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 1000);
  }

  async function validar() {
    if (!hayCripto()) {
      toast('Abre el armador desde tu sitio con https, no como archivo local');
      return false;
    }
    if (!R.alumno.trim()) { toast('Ponle el nombre del alumno'); $('#fAlumno').focus(); return false; }
    if (!R.dias.length) { toast('Agrega al menos un día'); return false; }
    if (!R.slug) { R.slug = slugAuto(); $('#fSlug').value = R.slug; }
    if (!R.clave) { R.clave = await nuevaClave(); }
    renderLink();
    guardar();
    return true;
  }

  async function vistaPrevia() {
    if (!(await validar())) return;
    const sobre = await cifrar(datosRutina(), R.clave);
    // Solo para la vista previa: la clave va en una variable para no depender
    // del "#". Esto NO se incluye nunca en el archivo que se exporta.
    const extra = `<base href="${new URL('../vista-previa/', location.href).href}">`
      + `<script>location.hash='k=${R.clave}';<\/script>`;
    const w = window.open('', '_blank');
    if (!w) { toast('Tu navegador bloqueó la ventana emergente'); return; }
    w.document.open();
    w.document.write(plantilla(sobre, extra));
    w.document.close();
  }

  async function exportar() {
    if (!(await validar())) return;
    $('#mRuta').textContent = `rutinas/${R.slug}/`;
    $('#mRespaldo').textContent = `respaldo-${R.slug}.json`;
    $('#modal').hidden = false;
  }

  async function importarDesdeLink(url) {
    let u;
    try { u = new URL(url.trim()); } catch (e) { toast('Ese no parece un link válido'); return; }
    const k = new URLSearchParams(u.hash.replace(/^#/, '')).get('k');
    if (!k) { toast('Al link le falta la parte del # con la clave'); return; }

    const destino = u.origin + u.pathname.replace(/\/?$/, '/') + 'index.html';
    try {
      const resp = await fetch(destino, { cache: 'no-store' });
      if (!resp.ok) throw new Error(resp.status);
      const html = await resp.text();
      const m = html.match(/<script type="application\/json" id="datos">([\s\S]*?)<\/script>/);
      if (!m) throw new Error('sin datos');
      const datos = await descifrar(JSON.parse(m[1]), k);
      const slug = u.pathname.split('/').filter(Boolean).pop();
      // Solo adoptamos la dirección del link si es un sitio real: así, probar
      // con una URL local no deja esa dirección metida en las etiquetas.
      const esReal = u.protocol === 'https:' && !/^(localhost|127\.|\[?::1)/.test(u.hostname);
      const sitio = esReal ? u.origin + u.pathname.split('/rutinas/')[0] : (R.sitio || SITIO_DEF);
      cargarEnEditor(datos, { slug, clave: k, sitio });
      toast(`Rutina de ${R.alumno || 'alumno'} cargada`);
    } catch (e) {
      toast('No se pudo leer esa rutina. Revisa que el link esté completo.');
    }
  }

  function cargarEnEditor(d, extra) {
    R = Object.assign(vacio(), {
      alumno: d.alumno || '', objetivo: d.objetivo || '', paquete: d.paquete || '',
      vigencia: d.vigencia || '', actualizado: d.actualizado || hoy(), nota: d.nota || '',
      slug: (extra && extra.slug) || '', clave: (extra && extra.clave) || '',
      sitio: (extra && extra.sitio) || SITIO_DEF,
      dias: (d.dias || []).map((dia) => ({
        nombre: dia.nombre || '', enfoque: dia.enfoque || '',
        ejercicios: (dia.bloques || []).reduce((a, bl) => a.concat(bl.ejercicios || []), []),
      })),
    });
    diaActivo = 0;
    pintarTodo();
    guardar();
  }

  /* =====================================================================
     EVENTOS
     ===================================================================== */
  const campos = {
    fAlumno: 'alumno', fSlug: 'slug', fObjetivo: 'objetivo', fPaquete: 'paquete',
    fVigencia: 'vigencia', fFecha: 'actualizado', fNota: 'nota', fSitio: 'sitio',
  };
  Object.keys(campos).forEach((id) => {
    $('#' + id).addEventListener('input', (e) => {
      R[campos[id]] = e.target.value;
      renderLink();
      guardar();
    });
  });

  $('#btnSlug').addEventListener('click', () => {
    if (R.slug && !confirm('Si cambias el código, el link anterior deja de funcionar.\n¿Seguro?')) return;
    R.slug = slugAuto();
    $('#fSlug').value = R.slug;
    renderLink();
    guardar();
  });

  $('#buscar').addEventListener('input', (e) => { busqueda = e.target.value; renderBiblio(); });
  $('#filtros').addEventListener('click', (e) => {
    const b = e.target.closest('.filtro');
    if (!b) return;
    filtroGrupo = b.dataset.g;
    renderFiltros();
    renderBiblio();
  });
  $('#biblioList').addEventListener('click', (e) => {
    const b = e.target.closest('[data-add]');
    if (!b) return;
    if (!R.dias.length) { toast('Primero agrega un día'); return; }
    const base = porId(b.dataset.add);
    if (!base) return;
    R.dias[diaActivo].ejercicios.push({
      id: base.id, nombre: base.nombre, grupo: base.grupo,
      clip: base.clip || '', poster: base.poster || '',
      series: '3', reps: '10-12', descanso: '60 s', nota: '',
    });
    renderDias(); guardar();
    toast(`${base.nombre} → ${R.dias[diaActivo].nombre || 'Día ' + (diaActivo + 1)}`);
  });

  $('#btnDia').addEventListener('click', () => {
    const n = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
    R.dias.push({ nombre: n[R.dias.length] || 'Día ' + (R.dias.length + 1), enfoque: '', ejercicios: [] });
    diaActivo = R.dias.length - 1;
    renderDias(); renderBiblio(); guardar();
  });

  $('#dias').addEventListener('click', (e) => {
    const act = e.target.closest('[data-activar]');
    const movD = e.target.closest('[data-mover-dia]');
    const delD = e.target.closest('[data-borrar-dia]');
    const movE = e.target.closest('[data-mover-ej]');
    const delE = e.target.closest('[data-borrar-ej]');

    if (movD) {
      const i = +movD.dataset.moverDia, j = i + Number(movD.dataset.dir);
      if (j < 0 || j >= R.dias.length) return;
      [R.dias[i], R.dias[j]] = [R.dias[j], R.dias[i]];
      if (diaActivo === i) diaActivo = j; else if (diaActivo === j) diaActivo = i;
      renderDias(); renderBiblio(); guardar(); return;
    }
    if (delD) {
      const i = +delD.dataset.borrarDia;
      if (!confirm(`¿Eliminar ${R.dias[i].nombre || 'este día'} y sus ejercicios?`)) return;
      R.dias.splice(i, 1);
      diaActivo = Math.max(0, Math.min(diaActivo, R.dias.length - 1));
      renderDias(); renderBiblio(); guardar(); return;
    }
    if (movE) {
      const [di, ei] = movE.dataset.moverEj.split(':').map(Number);
      const lista = R.dias[di].ejercicios, ej = lista[ei];
      const mismos = lista.map((x, k) => (x.grupo === ej.grupo ? k : -1)).filter((k) => k >= 0);
      const destino = mismos[mismos.indexOf(ei) + Number(movE.dataset.dir)];
      if (destino === undefined) return;
      [lista[ei], lista[destino]] = [lista[destino], lista[ei]];
      renderDias(); guardar(); return;
    }
    if (delE) {
      const [di, ei] = delE.dataset.borrarEj.split(':').map(Number);
      R.dias[di].ejercicios.splice(ei, 1);
      renderDias(); guardar(); return;
    }
    if (act) { diaActivo = +act.dataset.activar; renderDias(); renderBiblio(); }
  });

  $('#dias').addEventListener('input', (e) => {
    const t = e.target;
    if (t.dataset.ej) {
      const [di, ei] = t.dataset.ej.split(':').map(Number);
      R.dias[di].ejercicios[ei][t.dataset.campo] = t.value;
      guardar();
    } else if (t.dataset.dia !== undefined && t.dataset.campo) {
      R.dias[+t.dataset.dia][t.dataset.campo] = t.value;
      guardar();
      if (t.dataset.campo === 'nombre') renderBiblio();
    }
  });

  $('#btnVista').addEventListener('click', vistaPrevia);
  $('#btnExportar').addEventListener('click', exportar);

  $('#btnFileHtml').addEventListener('click', async () => {
    const sobre = await cifrar(datosRutina(), R.clave);
    descargar('index.html', plantilla(sobre), 'text/html');
  });
  $('#btnFileJson').addEventListener('click', () => {
    const respaldo = Object.assign({}, R, { _aviso: 'NO subas este archivo a GitHub: contiene la clave sin cifrar.' });
    descargar(`respaldo-${R.slug}.json`, JSON.stringify(respaldo, null, 2), 'application/json');
  });

  $('#modalX').addEventListener('click', () => { $('#modal').hidden = true; });
  $('#modal').addEventListener('click', (e) => { if (e.target === $('#modal')) $('#modal').hidden = true; });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') $('#modal').hidden = true; });

  async function copiar(texto, ok) {
    try { await navigator.clipboard.writeText(texto); toast(ok); }
    catch (e) { prompt('Copia este texto:', texto); }
  }
  $('#btnCopiarLink').addEventListener('click', async () => {
    if (!(await validar())) return;
    copiar(urlRutina(), 'Link copiado, completo con su clave');
  });
  $('#btnWa').addEventListener('click', async () => {
    if (!(await validar())) return;
    const pila = nombrePila() || 'crack';
    copiar(
      `Hola ${pila}, aquí está tu rutina 💪\n` +
      `Está dividida por días y cada ejercicio trae su video.\n\n${urlRutina()}\n\n` +
      `Ábrela tocando el link completo. Cualquier duda me escribes.`,
      'Mensaje copiado, pégalo en WhatsApp');
  });

  $('#btnImportarLink').addEventListener('click', () => {
    const url = prompt('Pega el link completo del alumno (con la parte del #):');
    if (url) importarDesdeLink(url);
  });

  $('#btnImportar').addEventListener('click', () => $('#fileImport').click());
  $('#fileImport').addEventListener('change', (e) => {
    const f = e.target.files && e.target.files[0];
    if (!f) return;
    const fr = new FileReader();
    fr.onload = () => {
      try {
        const d = JSON.parse(fr.result);
        R = Object.assign(vacio(), d);
        delete R._aviso;
        diaActivo = 0;
        pintarTodo();
        guardar();
        toast(`Rutina de ${R.alumno || 'alumno'} cargada`);
      } catch (err) {
        toast('Ese archivo no es un respaldo válido');
      }
      e.target.value = '';
    };
    fr.readAsText(f);
  });

  $('#btnLimpiar').addEventListener('click', async () => {
    if (!confirm('¿Vaciar el armador y empezar de cero? Se pierde el borrador actual.')) return;
    R = vacio();
    diaActivo = 0;
    try { localStorage.removeItem(LS); } catch (e) {}
    if (hayCripto()) { R.slug = slugAuto(); R.clave = await nuevaClave(); }
    pintarTodo();
    guardar();
  });

  /* =====================================================================
     ARRANQUE
     ===================================================================== */
  function pintarTodo() {
    $('#fAlumno').value = R.alumno;
    $('#fSlug').value = R.slug;
    $('#fObjetivo').value = R.objetivo;
    $('#fPaquete').value = R.paquete;
    $('#fVigencia').value = R.vigencia;
    $('#fFecha').value = R.actualizado;
    $('#fNota').value = R.nota;
    $('#fSitio').value = R.sitio;
    renderFiltros();
    renderBiblio();
    renderDias();
    renderLink();
  }

  (async function inicio() {
    $('#barRol').textContent = `${COACH.nombre} · uso interno`;
    cargar();
    if (!hayCripto()) {
      toast('Ábrelo desde tu sitio con https: aquí no se puede cifrar');
    } else {
      // Clave y código desde el inicio, para que el link esté completo siempre.
      if (!R.slug) R.slug = slugAuto();
      if (!R.clave) R.clave = await nuevaClave();
      guardar();
    }
    pintarTodo();
  })();
})();
