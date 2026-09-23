/* =========================================================================
   FAITHLURE — MOTOR DEL SITIO
   -------------------------------------------------------------------------
   Arma las tres páginas a partir de config.js. No necesitas editar este
   archivo para cambiar textos, precios, videos o productos.

   Cada página se identifica con <body data-pagina="…">:
     puerta         -> la primera pantalla, con los dos caminos
     suplementos    -> landing de suplementos
     entrenamiento  -> landing de entrenamiento
   ========================================================================= */

(function () {
  'use strict';

  if (typeof FAITHLURE === 'undefined') return;
  const C = FAITHLURE;

  const cuerpo = document.body;
  const PAGINA = cuerpo.dataset.pagina || 'puerta';
  const BASE = cuerpo.dataset.base || '';

  /* ======================================================================
     1. UTILIDADES
     ====================================================================== */
  const $ = (id) => document.getElementById(id);

  const esc = (t) =>
    String(t == null ? '' : t)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');

  /* "$1,130" -> 1130 */
  const numero = (v) => Number(String(v == null ? '' : v).replace(/[^0-9.]/g, '')) || 0;

  /* 1130 -> "$1,130"   ·   7.5 -> "$7.50" */
  const dinero = (n) =>
    '$' + n.toLocaleString('es-MX', {
      minimumFractionDigits: Number.isInteger(n) ? 0 : 2,
      maximumFractionDigits: 2,
    });

  /* Las páginas de las carpetas necesitan "../" delante de las imágenes */
  const ruta = (p) => (!p || /^(https?:)?\/\//.test(p) || p.charAt(0) === '/' ? p : BASE + p);

  /* Pinta en oro las últimas palabras de un titular */
  const destacarFinal = (texto, cuantas) => {
    const palabras = String(texto).trim().split(/\s+/);
    if (palabras.length <= cuantas) return `<span class="oro-texto">${esc(texto)}</span>`;
    const inicio = palabras.slice(0, -cuantas).join(' ');
    const fin = palabras.slice(-cuantas).join(' ');
    return `${esc(inicio)} <span class="oro-texto">${esc(fin)}</span>`;
  };

  const guardar = (clave, valor) => {
    try { sessionStorage.setItem(clave, JSON.stringify(valor)); } catch (e) { /* modo privado */ }
  };
  const leer = (clave) => {
    try { return JSON.parse(sessionStorage.getItem(clave)); } catch (e) { return null; }
  };

  /* ======================================================================
     2. ÍCONOS
     ====================================================================== */
  const ICO = {
    flecha: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    abajo: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 5v14M6 13l6 6 6-6"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>',
    cruz: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M7 7l10 10M17 7L7 17"/></svg>',
    cerrar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>',
    play: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 4.5v15l13-7.5z"/></svg>',
    mas: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>',
    menos: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M5 12h14"/></svg>',
    bolsa: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round" aria-hidden="true"><path d="M4 8h16l-1.2 12H5.2z"/><path d="M9 8V6.5a3 3 0 0 1 6 0V8"/></svg>',
    escudo: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round" aria-hidden="true"><path d="M12 3l7 3v5.5c0 4.3-2.9 7.6-7 9.5-4.1-1.9-7-5.2-7-9.5V6z"/><path d="M9 12l2 2 4-4"/></svg>',
    estrella: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.6l2.6 6.1 6.6.6-5 4.3 1.5 6.4L12 16.6 6.3 20l1.5-6.4-5-4.3 6.6-.6z"/></svg>',
    wa: '<svg class="ico-wa" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 3a9 9 0 0 0-7.7 13.6L3 21l4.5-1.3A9 9 0 1 0 12 3zm0 16.2a7.2 7.2 0 0 1-3.7-1l-.3-.2-2.7.8.8-2.6-.2-.3A7.2 7.2 0 1 1 12 19.2zm4-5.4c-.2-.1-1.3-.6-1.5-.7-.2-.1-.3-.1-.5.1s-.6.7-.7.9-.3.2-.5.1a5.9 5.9 0 0 1-1.7-1 6.4 6.4 0 0 1-1.2-1.5c-.1-.2 0-.3.1-.4l.3-.4c.1-.1.1-.2.2-.4a.4.4 0 0 0 0-.4c-.1-.1-.5-1.2-.7-1.6s-.4-.4-.5-.4h-.4a.9.9 0 0 0-.6.3 2.6 2.6 0 0 0-.8 2c0 1.2.9 2.3 1 2.5s1.7 2.6 4.2 3.6a5.4 5.4 0 0 0 3.2.2 2.4 2.4 0 0 0 1.5-1.1c.2-.4.2-.7.1-.8s-.2-.1-.4-.2z"/></svg>',
    instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="4.5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none"/></svg>',
    tiktok: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M14.5 3c.3 1.9 1.6 3.4 3.5 3.7v2.4a6 6 0 0 1-3.5-1.1v6.4a4.9 4.9 0 1 1-4.2-4.9v2.5a2.5 2.5 0 1 0 1.7 2.4V3h2.5z"/></svg>',
  };

  /* La cruz de FaithLure */
  const CRUZ =
    '<svg viewBox="0 0 100 100" fill="currentColor" aria-hidden="true">' +
    '<polygon points="43,22 50,5 57,22 57,74 50,96 43,74"/>' +
    '<polygon points="24,38 7,45.5 24,53 76,53 93,45.5 76,38"/>' +
    '<polygon points="62,13 87,13 87,30 74,30 62,18"/>' +
    '<polygon points="62,79 87,79 87,62 74,62 62,74"/></svg>';

  /* ======================================================================
     3. MEDICIÓN (Google Analytics)
     ====================================================================== */
  (function iniciarAnalytics() {
    const a = C.analytics;
    if (!a || !a.activo || !a.id) return;
    const s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(a.id);
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', a.id);
  })();

  /* "beacon" hace que el evento se envíe aunque la página cambie al instante */
  const medir = (evento, datos) => {
    if (typeof window.gtag === 'function') {
      window.gtag('event', evento, Object.assign({ transport_type: 'beacon' }, datos || {}));
    }
  };

  /* ======================================================================
     4. WHATSAPP — cada botón lleva el contexto de lo que el prospecto eligió
     ====================================================================== */
  const linkWA = (mensaje) =>
    `https://wa.me/${C.whatsapp.lada}${C.whatsapp.numero}?text=${encodeURIComponent(mensaje)}`;

  /* Cada landing define cómo se escribe su mensaje (ver secciones 9 y 10) */
  let construirMensaje = () => '';

  function refrescarWA(raiz) {
    (raiz || document).querySelectorAll('[data-wa]').forEach((a) => {
      a.href = linkWA(construirMensaje(a.dataset.wa, a.dataset.dato));
      a.target = '_blank';
      a.rel = 'noopener';
    });
  }

  /* El mensaje se recalcula en el clic: siempre sale con lo último elegido */
  document.addEventListener('click', (e) => {
    const a = e.target.closest('[data-wa]');
    if (!a) return;
    a.href = linkWA(construirMensaje(a.dataset.wa, a.dataset.dato));
    medir('click_whatsapp', { pagina: PAGINA, origen: a.dataset.origen || a.dataset.wa });
  });

  const botonWA = (tipo, texto, clases, origen, dato) =>
    `<a class="btn ${clases}" data-wa="${esc(tipo)}"${dato ? ` data-dato="${esc(dato)}"` : ''} data-origen="${esc(origen || tipo)}" href="#">${ICO.wa}<span>${esc(texto)}</span></a>`;

  /* ======================================================================
     5. PIEZAS COMPARTIDAS (marca, pasos, video, secciones comunes)
     ====================================================================== */
  function pintarMarca() {
    document.querySelectorAll('[data-marca]').forEach((el) => {
      const sub = el.dataset.marca;
      el.innerHTML =
        `<span class="marca__cruz">${CRUZ}</span>` +
        `<span class="marca__nombre"><b>${esc(C.marca.nombre.toUpperCase())}</b>${sub ? `<small>${esc(sub)}</small>` : ''}</span>`;
    });
  }

  /* Paso 2 de 3: ya eligió, ahora conoce, luego hablamos */
  function pintarPasos() {
    const el = $('pasos');
    if (!el) return;
    el.setAttribute('aria-label', 'Tu avance: paso 2 de 3');
    el.innerHTML =
      '<ol>' +
      `<li class="hecho"><span class="pasos__punto">${ICO.check}</span>Eliges</li>` +
      '<li class="actual" aria-current="step"><span class="pasos__punto">2</span>Conoces</li>' +
      '<li><span class="pasos__punto">3</span>Hablamos</li>' +
      '</ol><span class="pasos__corto" aria-hidden="true">Paso 2 de 3</span>';
  }

  const cabeza = (antes, titulo, texto, centro) =>
    `<header class="cabeza${centro ? ' cabeza--centro' : ''} revela">` +
    (antes ? `<p class="antes">${esc(antes)}</p>` : '') +
    `<h2>${titulo}</h2>` +
    (texto ? `<p>${esc(texto)}</p>` : '') +
    '</header>';

  /* --- Video de YouTube -------------------------------------------------- */
  function idYouTube(valor) {
    if (!valor) return '';
    const v = String(valor).trim();
    if (/^[\w-]{11}$/.test(v)) return v;
    const m = v.match(/(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/|v\/))([\w-]{11})/);
    return m ? m[1] : '';
  }

  function pintarVideo(cfg) {
    const host = $('video');
    if (!host || !cfg) return;
    const id = idYouTube(cfg.youtube);
    const vertical = /\/shorts\//.test(cfg.youtube || '') || cfg.formato === 'vertical';
    const coach = C.entrenamiento.coach;
    host.classList.toggle('video--vertical', vertical);

    const accion = id
      ? `<span class="portada__boton">${ICO.play}</span><span>${esc(cfg.duracion ? `Mira el video · ${cfg.duracion}` : 'Mira el video')}</span>`
      : '<span class="portada__pronto">Video muy pronto</span>';

    host.innerHTML =
      '<div class="video__marco">' +
      `<button class="portada" type="button"${id ? '' : ' disabled'} aria-label="${esc(id ? `Reproducir video: ${cfg.titulo}` : 'El video estará disponible muy pronto')}">` +
      `<img class="portada__foto" src="${esc(ruta(coach.foto))}" alt="" width="360" height="360">` +
      `<span class="portada__play">${accion}</span>` +
      '<span class="portada__texto">' +
      `<span class="portada__etiqueta">${esc(coach.nombre)}</span>` +
      `<span class="portada__titulo">${esc(cfg.titulo)}</span>` +
      '</span></button></div>';

    if (!id) return;
    host.querySelector('.portada').addEventListener('click', () => {
      const marco = host.querySelector('.video__marco');
      marco.innerHTML =
        `<iframe src="https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1&playsinline=1" ` +
        `title="${esc(cfg.titulo)}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" ` +
        'referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>';
      marco.querySelector('iframe').focus();
      medir('reproducir_video', { pagina: PAGINA });
    });
  }

  /* --- Bloques que comparten las dos landings ---------------------------- */
  function pintarIntro(cfg, botonPrincipal, destino) {
    $('introAntes').textContent = cfg.eyebrow;
    $('introTitulo').innerHTML = destacarFinal(cfg.titular, 2);
    $('introSub').textContent = cfg.subtitulo;
    $('introAcciones').innerHTML =
      `<a class="btn btn--tinta btn--grande" href="#${destino}">${esc(botonPrincipal)}<span class="flecha">${ICO.abajo}</span></a>` +
      botonWA('general', 'Escríbeme', 'btn--claro btn--grande', 'intro');
    $('introSellos').innerHTML = (cfg.sellos || []).map((s) => `<li>${ICO.check}<span>${esc(s)}</span></li>`).join('');
    pintarVideo(cfg.video);
  }

  function pintarAB(ab) {
    const lado = (l, clase, ico) =>
      `<div class="ab__lado ab__lado--${clase}">` +
      `<span class="ab__etiqueta">${esc(l.etiqueta)}</span>` +
      `<ul class="ab__lista">${l.puntos.map((t) => `<li>${ico}<span>${esc(t)}</span></li>`).join('')}</ul></div>`;
    $('ab').innerHTML =
      '<div class="contenedor">' +
      cabeza('', destacarFinal(ab.titulo, 2), '', true) +
      '<div class="ab revela">' +
      lado(ab.a, 'a', ICO.cruz) +
      `<span class="ab__flecha" aria-hidden="true">${ICO.flecha}</span>` +
      lado(ab.b, 'b', ICO.check) +
      '</div>' +
      `<p class="ab__puente revela">${esc(ab.puente)}</p></div>`;
  }

  function pintarTestimonios(lista) {
    const sec = $('testimonios');
    if (!sec) return;
    const reales = (lista || []).filter((t) => t && t.texto);
    if (!reales.length) { sec.remove(); return; }
    const estrellas = `<div class="testimonio__estrellas" aria-hidden="true">${ICO.estrella.repeat(5)}</div>`;
    sec.hidden = false;
    sec.innerHTML =
      '<div class="contenedor">' +
      cabeza('Lo que dicen', 'Ellos ya se <span class="oro-texto">la saben.</span>', '', true) +
      '<div class="testimonios revela">' +
      reales.map((t) =>
        `<figure class="testimonio">${estrellas}<blockquote>“${esc(t.texto)}”</blockquote>` +
        `<figcaption><b>${esc(t.nombre)}</b>${t.detalle ? ` · ${esc(t.detalle)}` : ''}</figcaption></figure>`
      ).join('') +
      '</div></div>';
  }

  function pintarFAQ(lista) {
    $('preguntas').innerHTML =
      '<div class="contenedor">' +
      cabeza('Preguntas frecuentes', 'Antes de que me <span class="oro-texto">preguntes.</span>', '', true) +
      '<div class="faq revela">' +
      (lista || []).map((q) => `<details><summary>${esc(q.p)}</summary><p>${esc(q.r)}</p></details>`).join('') +
      '</div></div>';
  }

  function pintarCierre(cfg, tipoWA) {
    $('cierre').innerHTML =
      '<div class="contenedor"><div class="cierre revela">' +
      `<span class="cierre__lema">${destacarFinal(C.marca.lema, 1)}</span>` +
      `<h2>${esc(cfg.titulo)}</h2>` +
      `<p>${esc(cfg.texto)}</p>` +
      botonWA(tipoWA, cfg.boton, 'btn--tinta btn--grande', 'cierre') +
      `<span class="cierre__horario">Te respondo por WhatsApp · ${esc(C.whatsapp.horario)}</span>` +
      '</div></div>';
  }

  function pintarBanda(host, b) {
    host.innerHTML =
      '<div class="contenedor"><div class="banda revela">' +
      '<div>' +
      `<p class="antes">${esc(b.antes)}</p>` +
      `<h3>${esc(b.titulo)}</h3>` +
      (b.texto ? `<p>${esc(b.texto)}</p>` : '') +
      (b.boton ? `<div style="margin-top:20px">${b.boton}</div>` : '') +
      '</div>' +
      (b.numero ? `<p class="banda__numero"><strong>${esc(b.numero)}</strong><span>${esc(b.unidad)}</span></p>` : '') +
      '</div></div>';
  }

  function pintarPie(etiqueta) {
    const r = C.redes || {};
    $('pie').innerHTML =
      '<div class="contenedor pie__dentro">' +
      '<div class="pie__fila">' +
      `<a class="marca" href="${BASE || './'}" data-marca="${esc(etiqueta || '')}" aria-label="${esc(C.marca.nombre)}, volver al inicio"></a>` +
      '<div class="pie__redes">' +
      (r.instagram ? `<a href="https://instagram.com/${esc(r.instagram)}" target="_blank" rel="noopener" aria-label="Instagram">${ICO.instagram}</a>` : '') +
      (r.tiktok ? `<a href="https://tiktok.com/@${esc(r.tiktok)}" target="_blank" rel="noopener" aria-label="TikTok">${ICO.tiktok}</a>` : '') +
      `<a data-wa="general" data-origen="pie" href="#" aria-label="WhatsApp">${ICO.wa}</a>` +
      '</div></div>' +
      `<p class="pie__legal">${esc((C[PAGINA] && C[PAGINA].legal) || C.marca.legal)}</p>` +
      `<p class="pie__copia">© ${new Date().getFullYear()} ${esc(C.marca.nombre)} · ${esc(C.marca.ciudad)} · WhatsApp ${esc(C.whatsapp.mostrar)}</p>` +
      '</div>';
  }

  /* --- Ventana (hoja del producto y lista de pedido) --------------------- */
  const capa = $('capa');
  let focoPrevio = null;

  function abrirCapa(html, clase) {
    if (!capa) return;
    focoPrevio = document.activeElement;
    const caja = capa.querySelector('.capa__caja');
    caja.className = 'capa__caja' + (clase ? ` ${clase}` : '');
    $('capaCuerpo').innerHTML = html;
    capa.hidden = false;
    document.documentElement.style.overflow = 'hidden';
    refrescarWA(capa);
    capa.querySelector('.capa__cerrar').focus();
    actualizarFija();
  }

  function cerrarCapa() {
    if (!capa || capa.hidden) return;
    capa.hidden = true;
    $('capaCuerpo').innerHTML = '';
    document.documentElement.style.overflow = '';
    if (focoPrevio && document.contains(focoPrevio)) focoPrevio.focus();
    actualizarFija();
  }

  if (capa) {
    capa.querySelector('.capa__cerrar').innerHTML = ICO.cerrar;
    capa.addEventListener('click', (e) => { if (e.target.closest('[data-cerrar]')) cerrarCapa(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') cerrarCapa(); });
  }

  /* --- Aviso corto -------------------------------------------------------- */
  let relojAviso = null;
  function avisar(html) {
    const el = $('aviso');
    if (!el) return;
    el.innerHTML = html;
    el.classList.add('visible');
    clearTimeout(relojAviso);
    relojAviso = setTimeout(() => el.classList.remove('visible'), 2300);
  }

  /* --- Barra fija de abajo ------------------------------------------------ */
  let pintarFija = () => {};
  let introPasada = false;
  let cierreVisible = false;

  function actualizarFija() {
    const fija = $('fija');
    if (!fija) return;
    pintarFija(fija);
    const ver = introPasada && !cierreVisible && (!capa || capa.hidden);
    fija.classList.toggle('visible', ver);
    fija.setAttribute('aria-hidden', String(!ver));
    refrescarWA(fija);
  }

  function vigilarDesplazamiento() {
    const barra = $('barra');
    const intro = document.querySelector('.intro');
    const cierre = $('cierre');
    const alMover = () => {
      if (barra) barra.classList.toggle('pegada', window.scrollY > 8);
      if (intro) {
        const pasada = intro.getBoundingClientRect().bottom < 80;
        if (pasada !== introPasada) { introPasada = pasada; actualizarFija(); }
      }
    };
    alMover();
    window.addEventListener('scroll', alMover, { passive: true });
    if (cierre && 'IntersectionObserver' in window) {
      new IntersectionObserver((entradas) => {
        cierreVisible = entradas[0].isIntersecting;
        actualizarFija();
      }, { threshold: 0.2 }).observe(cierre);
    }
  }

  /* --- Aparición al hacer scroll ----------------------------------------- */
  function observarRevela() {
    const elementos = document.querySelectorAll('.revela:not(.visto)');
    if (!('IntersectionObserver' in window)) {
      elementos.forEach((el) => el.classList.add('visto'));
      return;
    }
    const obs = new IntersectionObserver((entradas) => {
      entradas.forEach((en) => {
        if (!en.isIntersecting) return;
        en.target.classList.add('visto');
        obs.unobserve(en.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    elementos.forEach((el) => obs.observe(el));
  }

  /* ======================================================================
     6. LA PUERTA
     ====================================================================== */
  function puerta() {
    /* Links viejos: faithlure/#entrenamiento seguía funcionando antes */
    const ancla = location.hash.replace('#', '');
    if (ancla === 'entrenamiento') { location.replace('entrenamiento/'); return; }
    if (['catalogo', 'productos', 'como-comprar', 'envios', 'contacto'].indexOf(ancla) > -1) {
      location.replace('suplementos/');
      return;
    }

    const p = C.puerta;
    $('lema').innerHTML = destacarFinal(C.marca.lema, 1);
    $('pregunta').textContent = p.pregunta;
    $('puertaPie').textContent = p.pie;

    const camino = (clave, num) =>
      `<a class="camino entra entra--${num + 2}" href="${clave}/" data-camino="${clave}">` +
      '<span>' +
      `<span class="camino__num">0${num}</span>` +
      `<span class="camino__titulo">${esc(p[clave].titulo)}</span>` +
      `<span class="camino__texto">${esc(p[clave].texto)}</span>` +
      '</span>' +
      `<span class="camino__flecha" aria-hidden="true">${ICO.flecha}</span></a>`;

    $('caminos').innerHTML = camino('suplementos', 1) + camino('entrenamiento', 2);
    $('caminos').addEventListener('click', (e) => {
      const a = e.target.closest('[data-camino]');
      if (a) medir('elegir_camino', { camino: a.dataset.camino });
    });
  }

  /* ======================================================================
     7. LANDING DE SUPLEMENTOS
     ====================================================================== */
  function suplementos() {
    const S = C.suplementos;
    const productos = S.productos || [];
    const producto = (id) => productos.find((p) => p.id === id);
    /* "Mutant" + "Mutant Whey" no debe salir como "Mutant Mutant Whey" */
    const nombreCompleto = (p) => {
      const extra = [p.sabor, p.tamano].filter(Boolean).join(', ');
      const repite = p.nombre.toLowerCase().indexOf(p.marca.toLowerCase()) === 0;
      return `${repite ? '' : `${p.marca} `}${p.nombre}${extra ? ` (${extra})` : ''}`;
    };

    /* --- Estado: objetivo elegido, filtro y pedido --- */
    let objetivo = null;
    let filtro = 'todo';
    const CLAVE_PEDIDO = 'faithlure_pedido';
    let pedido = [];
    try {
      const guardado = JSON.parse(localStorage.getItem(CLAVE_PEDIDO) || '[]');
      if (Array.isArray(guardado)) pedido = guardado.filter((it) => producto(it.id) && it.qty > 0);
    } catch (e) { pedido = []; }
    const guardarPedido = () => {
      try { localStorage.setItem(CLAVE_PEDIDO, JSON.stringify(pedido)); } catch (e) { /* modo privado */ }
    };
    const unidades = () => pedido.reduce((n, it) => n + it.qty, 0);
    const totalPedido = () => pedido.reduce((n, it) => n + numero(producto(it.id).precio) * it.qty, 0);
    const comboActual = () => (objetivo && objetivo.combo ? objetivo.combo.map(producto).filter(Boolean) : []);

    /* --- Mensajes de WhatsApp ---
       Directos, sin saludo de marca: el prospecto llega diciendo de dónde
       viene, qué quiere lograr y qué quiere comprar. */
    construirMensaje = (tipo, dato) => {
      const cab = 'Vengo de la página de suplementos.';
      const lineaObjetivo = objetivo && objetivo.id !== 'nose' ? `\nMi objetivo: ${objetivo.nombre}.` : '';

      if (tipo === 'nose' || (tipo === 'general' && objetivo && objetivo.id === 'nose')) {
        return `${cab}\nNo sé qué me conviene, ¿me ayudas a elegir?`;
      }
      if (tipo === 'combo') {
        const combo = comboActual();
        if (!combo.length) return `${cab}${lineaObjetivo}\nQuiero que me recomiendes qué tomar.`;
        const total = combo.reduce((n, p) => n + numero(p.precio), 0);
        return `${cab}${lineaObjetivo}\n\nMe interesa este combo:\n` +
          combo.map((p) => `• ${nombreCompleto(p)} — ${p.precio}`).join('\n') +
          `\n\nTotal: ${dinero(total)}\n¿Me confirmas disponibilidad y entrega?`;
      }
      if (tipo === 'producto') {
        const [id, qty] = String(dato || '').split('|');
        const p = producto(id);
        const n = Math.max(1, Number(qty) || 1);
        if (!p) return `${cab}\nQuiero información de un producto.`;
        return `${cab}${lineaObjetivo}\nQuiero ${n} × ${nombreCompleto(p)} — ${dinero(numero(p.precio) * n)}.\n¿Lo tienes disponible?`;
      }
      if (tipo === 'pedido' && pedido.length) {
        return `${cab}${lineaObjetivo}\n\nQuiero cotizar este pedido:\n` +
          pedido.map((it) => {
            const p = producto(it.id);
            return `• ${it.qty} × ${nombreCompleto(p)} — ${dinero(numero(p.precio) * it.qty)}`;
          }).join('\n') +
          `\n\nTotal: ${dinero(totalPedido())}\n¿Me confirmas disponibilidad y entrega?`;
      }
      if (tipo === 'sorteo') {
        return `${cab}${lineaObjetivo}\nQuiero entrar al sorteo de la proteína. ¿Qué producto me recomiendas?`;
      }
      return `${cab}${lineaObjetivo}\nQuiero que me recomiendes qué tomar.`;
    };

    /* --- Intro, video y A → B --- */
    pintarIntro(S, S.boton, 'objetivo');
    pintarAB(S.ab);

    /* --- Precio con "por toma" --- */
    const precioHTML = (p) => {
      const ahora = numero(p.precio);
      if (!ahora) return '<div class="precio"><span class="precio__ahora" style="font-size:1rem">Precio por WhatsApp</span></div>';
      const antes = numero(p.antes);
      const rebaja = antes > ahora;
      const toma = p.tomas ? Math.round((ahora / p.tomas) * 100) / 100 : 0;
      return '<div class="precio">' +
        `<span class="precio__ahora${rebaja ? ' precio__ahora--rebaja' : ''}">${esc(p.precio)}</span>` +
        (rebaja ? `<s class="precio__antes">${esc(p.antes)}</s>` : '') +
        (toma ? `<span class="precio__toma">${dinero(toma)} por toma</span>` : '') +
        '</div>';
    };
    const rebajaPct = (p) => {
      const a = numero(p.antes);
      const b = numero(p.precio);
      return a > b && b ? Math.round((1 - b / a) * 100) : 0;
    };

    /* --- Selector de objetivo (el primer "sí") --- */
    const O = S.objetivo;
    $('objetivo').innerHTML =
      '<div class="contenedor">' +
      cabeza('Tu recomendación', destacarFinal(O.titulo, 1), O.texto, false) +
      '<div class="selector revela">' +
      '<div class="chips" id="chipsObjetivo" role="group" aria-label="Tu objetivo">' +
      O.opciones.map((o) =>
        `<button class="chip" type="button" aria-pressed="false" data-obj="${esc(o.id)}"><span class="chip__marca">${ICO.check}</span>${esc(o.nombre)}</button>`
      ).join('') +
      `<button class="chip chip--suave" type="button" aria-pressed="false" data-obj="nose"><span class="chip__marca">${ICO.check}</span>${esc(O.nose)}</button>` +
      '</div></div>' +
      '<div id="resultado" aria-live="polite"></div></div>';

    function pintarResultado() {
      const host = $('resultado');
      if (!objetivo) { host.innerHTML = ''; return; }

      if (objetivo.id === 'nose') {
        host.innerHTML =
          '<div class="resultado plan"><div>' +
          '<p class="antes">Sin problema</p>' +
          '<h3>Te ayudo a elegir.</h3>' +
          '<p>Cuéntame cómo entrenas y qué quieres lograr. Te digo qué sí y qué no necesitas, sin venderte de más.</p>' +
          '</div>' + botonWA('nose', 'Ayúdame a elegir', 'btn--oro btn--grande', 'resultado') + '</div>';
        refrescarWA(host);
        return;
      }

      const combo = comboActual();
      const total = combo.reduce((n, p) => n + numero(p.precio), 0);
      host.innerHTML =
        '<div class="resultado combo">' +
        '<div class="combo__prods">' +
        combo.map((p) =>
          `<div class="combo__prod"><img src="${esc(ruta(p.imagen))}" alt="${esc(nombreCompleto(p))}" loading="lazy">` +
          `<b>${esc(p.nombre)}</b><span>${esc(p.precio)}</span></div>`
        ).join('') +
        '</div>' +
        '<div class="combo__info">' +
        `<p class="antes">Tu combo · ${esc(objetivo.nombre)}</p>` +
        `<h3>${combo.map((p) => esc(p.nombre)).join(' + ')}</h3>` +
        `<p>${esc(objetivo.porque)}</p>` +
        `<div class="combo__total"><strong>${dinero(total)}</strong><span>por los ${combo.length}</span></div>` +
        '<div class="combo__acciones">' +
        botonWA('combo', 'Pedir mi combo por WhatsApp', 'btn--oro btn--bloque', 'combo') +
        '<button class="btn btn--claro btn--bloque" type="button" data-agregar-combo>Agregar a mi pedido</button>' +
        '</div></div></div>';
      refrescarWA(host);
    }

    $('objetivo').addEventListener('click', (e) => {
      const chip = e.target.closest('[data-obj]');
      if (chip) {
        const id = chip.dataset.obj;
        objetivo = id === 'nose' ? { id: 'nose', nombre: O.nose } : O.opciones.find((o) => o.id === id);
        $('chipsObjetivo').querySelectorAll('[data-obj]').forEach((b) => b.setAttribute('aria-pressed', String(b === chip)));
        guardar('fl_objetivo_suplementos', id);
        medir('elegir_objetivo', { pagina: PAGINA, objetivo: id });
        pintarResultado();
        pintarProductos();
        refrescarWA();
        actualizarFija();
        return;
      }
      if (e.target.closest('[data-agregar-combo]')) {
        comboActual().forEach((p) => agregar(p.id, 1, true));
        avisar(`Combo agregado a <b>tu pedido</b>`);
      }
    });

    /* --- Catálogo --- */
    const Cat = S.catalogo;
    $('catalogo').innerHTML =
      '<div class="contenedor">' +
      cabeza('Catálogo', destacarFinal(Cat.titulo, 1), Cat.texto, false) +
      '<div class="filtros" id="filtros" role="group" aria-label="Filtrar por categoría">' +
      '<button class="chip" type="button" aria-pressed="true" data-filtro="todo">Todo</button>' +
      (S.categorias || []).map((c) =>
        `<button class="chip" type="button" aria-pressed="false" data-filtro="${esc(c.id)}">${esc(c.nombre)}</button>`
      ).join('') +
      '</div><div class="productos" id="productos"></div></div>';

    function pintarProductos() {
      const paraTi = comboActual().map((p) => p.id);
      $('productos').innerHTML = productos.map((p) => {
        const esParaTi = paraTi.indexOf(p.id) > -1;
        const pct = rebajaPct(p);
        const sellos =
          (esParaTi ? '<span class="sello sello--oro">Para ti</span>' : '') +
          (pct ? `<span class="sello sello--rebaja">-${pct}%</span>` : '') +
          (p.etiqueta ? `<span class="sello">${esc(p.etiqueta)}</span>` : '');
        const oculto = filtro !== 'todo' && p.categoria !== filtro;
        return `<article class="producto${esParaTi ? ' producto--para-ti' : ''}"${oculto ? ' hidden' : ''}>` +
          `<div class="producto__sellos">${sellos}</div>` +
          `<button class="producto__foto" type="button" data-ver="${esc(p.id)}" aria-label="Ver detalles de ${esc(nombreCompleto(p))}">` +
          `<img src="${esc(ruta(p.imagen))}" alt="${esc(nombreCompleto(p))}" loading="lazy" decoding="async">` +
          '<span class="producto__ver" aria-hidden="true">Ver detalles</span></button>' +
          '<div class="producto__cuerpo">' +
          `<p class="producto__marca">${esc(p.marca)}</p>` +
          `<h3 class="producto__nombre">${esc(p.nombre)}</h3>` +
          `<p class="producto__meta">${esc([p.sabor, p.tamano].filter(Boolean).join(' · '))}</p>` +
          precioHTML(p) +
          `<button class="producto__agregar" type="button" data-agregar="${esc(p.id)}">Agregar</button>` +
          '</div></article>';
      }).join('');
    }

    $('catalogo').addEventListener('click', (e) => {
      const f = e.target.closest('[data-filtro]');
      if (f) {
        filtro = f.dataset.filtro;
        $('filtros').querySelectorAll('[data-filtro]').forEach((b) => b.setAttribute('aria-pressed', String(b === f)));
        pintarProductos();
        return;
      }
      const ver = e.target.closest('[data-ver]');
      if (ver) { abrirHoja(ver.dataset.ver); return; }
      const add = e.target.closest('[data-agregar]');
      if (add) {
        agregar(add.dataset.agregar, 1);
        add.classList.add('hecho');
        add.textContent = 'Agregado ✓';
        setTimeout(() => { add.classList.remove('hecho'); add.textContent = 'Agregar'; }, 1400);
      }
    });

    /* --- Hoja del producto (vista rápida con cantidad) --- */
    function abrirHoja(id) {
      const p = producto(id);
      if (!p) return;
      abrirCapa(
        '<div class="hoja">' +
        `<div class="hoja__foto"><img src="${esc(ruta(p.imagen))}" alt="${esc(nombreCompleto(p))}"></div>` +
        '<div class="hoja__info">' +
        `<p class="producto__marca">${esc(p.marca)}</p>` +
        `<h2 id="capaTitulo">${esc(p.nombre)}</h2>` +
        `<p class="producto__meta">${esc([p.sabor, p.tamano].filter(Boolean).join(' · '))}</p>` +
        precioHTML(p) +
        '<p class="hoja__nota">Precio en MXN. El envío se cotiza por WhatsApp según tu ciudad; en Colima, entrega en mano.</p>' +
        (p.resumen ? `<p class="hoja__resumen">${esc(p.resumen)}</p>` : '') +
        `<ul class="hoja__puntos">${(p.puntos || []).map((t) => `<li>${ICO.check}<span>${esc(t)}</span></li>`).join('')}</ul>` +
        '<div class="hoja__cantidad">Cantidad' +
        `<div class="cantidad"><button type="button" data-paso="-1" aria-label="Quitar uno">${ICO.menos}</button>` +
        `<output id="hojaCantidad" aria-live="polite">1</output>` +
        `<button type="button" data-paso="1" aria-label="Agregar uno">${ICO.mas}</button></div></div>` +
        '<div class="hoja__acciones">' +
        `<button class="btn btn--tinta btn--bloque" type="button" data-agregar-hoja="${esc(p.id)}">${ICO.bolsa}<span>Agregar a mi pedido</span></button>` +
        botonWA('producto', 'Pedir por WhatsApp', 'btn--claro btn--bloque', 'hoja', `${p.id}|1`) +
        '</div>' +
        `<p class="hoja__legal">${esc(C.marca.legal)}</p>` +
        '</div></div>'
      );
      medir('ver_producto', { id: p.id });
    }

    capa.addEventListener('click', (e) => {
      const paso = e.target.closest('[data-paso]');
      if (paso) {
        const out = $('hojaCantidad');
        const n = Math.max(1, Math.min(99, Number(out.textContent) + Number(paso.dataset.paso)));
        out.textContent = String(n);
        const wa = capa.querySelector('[data-wa="producto"]');
        if (wa) { wa.dataset.dato = wa.dataset.dato.split('|')[0] + '|' + n; refrescarWA(capa); }
        return;
      }
      const addHoja = e.target.closest('[data-agregar-hoja]');
      if (addHoja) {
        agregar(addHoja.dataset.agregarHoja, Number($('hojaCantidad').textContent) || 1);
        cerrarCapa();
        return;
      }
      const cambio = e.target.closest('[data-cambio]');
      if (cambio) {
        const [id, delta] = cambio.dataset.cambio.split('|');
        const it = pedido.find((x) => x.id === id);
        if (it) it.qty = Math.max(0, Math.min(99, it.qty + Number(delta)));
        pedido = pedido.filter((x) => x.qty > 0);
        guardarPedido();
        abrirPedido(true);
        actualizarFija();
        return;
      }
      if (e.target.closest('[data-vaciar]')) {
        pedido = [];
        guardarPedido();
        abrirPedido(true);
        actualizarFija();
      }
    });

    /* --- Pedido --- */
    function agregar(id, cantidad, callado) {
      const p = producto(id);
      if (!p) return;
      const n = Math.max(1, Math.min(99, Number(cantidad) || 1));
      const it = pedido.find((x) => x.id === id);
      if (it) it.qty = Math.min(99, it.qty + n);
      else pedido.push({ id, qty: n });
      guardarPedido();
      medir('agregar_producto', { id, cantidad: n });
      if (!callado) avisar(`${n > 1 ? `${n} × ` : ''}<b>${esc(p.nombre)}</b> en tu pedido`);
      const boton = document.querySelector('.fija__pedido');
      if (boton) { boton.classList.remove('late'); void boton.offsetWidth; boton.classList.add('late'); }
      actualizarFija();
    }

    function abrirPedido(yaAbierta) {
      const html =
        '<div class="pedido">' +
        '<div class="pedido__cabeza"><h2 id="capaTitulo">Tu pedido</h2>' +
        '<p>Lo envías por WhatsApp y te confirmo disponibilidad y entrega.</p></div>' +
        '<div class="pedido__items">' +
        (pedido.length
          ? pedido.map((it) => {
            const p = producto(it.id);
            return '<div class="pedido__item">' +
              `<img src="${esc(ruta(p.imagen))}" alt="">` +
              `<div><b>${esc(p.nombre)}</b><span>${esc(p.marca)} · ${esc(p.precio)} c/u</span></div>` +
              `<div class="cantidad"><button type="button" data-cambio="${esc(p.id)}|-1" aria-label="Quitar uno de ${esc(p.nombre)}">${ICO.menos}</button>` +
              `<output>${it.qty}</output>` +
              `<button type="button" data-cambio="${esc(p.id)}|1" aria-label="Agregar uno de ${esc(p.nombre)}">${ICO.mas}</button></div></div>`;
          }).join('')
          : '<p class="pedido__vacio">Tu pedido está vacío.<br>Agrega productos del catálogo o elige tu objetivo.</p>') +
        '</div>' +
        (pedido.length
          ? '<div class="pedido__pie">' +
            `<div class="pedido__total"><span>Total</span><strong>${dinero(totalPedido())}</strong></div>` +
            botonWA('pedido', 'Enviar pedido por WhatsApp', 'btn--tinta btn--bloque btn--grande', 'pedido') +
            '<button class="pedido__vaciar" type="button" data-vaciar>Vaciar pedido</button></div>'
          : '') +
        '</div>';
      if (yaAbierta && !capa.hidden) {
        $('capaCuerpo').innerHTML = html;
        refrescarWA(capa);
      } else {
        abrirCapa(html, 'capa__caja--pedido');
      }
    }

    /* --- Escasez real: el sorteo --- */
    if (S.sorteo && S.sorteo.activo) {
      pintarBanda($('sorteo'), {
        antes: 'Sorteo',
        titulo: S.sorteo.titulo,
        texto: S.sorteo.texto,
        numero: S.sorteo.numero,
        unidad: S.sorteo.unidad,
        boton: botonWA('sorteo', 'Quiero entrar al sorteo', 'btn--oro', 'sorteo'),
      });
    } else {
      $('sorteo').remove();
    }

    /* --- Confianza y garantía --- */
    $('confianza').innerHTML =
      '<div class="contenedor">' +
      cabeza('Compra sin riesgo', 'Así de <span class="oro-texto">fácil.</span>', '', false) +
      '<ul class="confianza revela">' +
      (S.confianza || []).map((c) => `<li><h3>${esc(c.titulo)}</h3><p>${esc(c.texto)}</p></li>`).join('') +
      '</ul>' +
      (S.garantia ? `<p class="garantia revela">${ICO.escudo}<span>${esc(S.garantia)}</span></p>` : '') +
      '</div>';

    pintarTestimonios(S.testimonios);
    pintarFAQ(S.preguntas);
    pintarCierre(S.cierre, 'general');

    /* --- Barra fija: cambia según lo que el prospecto ya hizo --- */
    pintarFija = (fija) => {
      const n = unidades();
      let titulo;
      let sub;
      let tipo;
      let texto;
      if (n) {
        titulo = `Tu pedido · ${n} ${n === 1 ? 'producto' : 'productos'}`;
        sub = `Total ${dinero(totalPedido())}`;
        tipo = 'pedido';
        texto = 'Enviar';
      } else if (objetivo && objetivo.id !== 'nose') {
        titulo = `Tu combo · ${objetivo.nombre}`;
        sub = 'Pídelo por WhatsApp en un mensaje';
        tipo = 'combo';
        texto = 'Pedir';
      } else {
        titulo = '¿No sabes cuál elegir?';
        sub = `Te ayudo por WhatsApp · ${C.whatsapp.horario}`;
        tipo = 'general';
        texto = 'Escríbeme';
      }
      fija.innerHTML =
        `<button class="fija__pedido" type="button" data-abrir-pedido aria-label="Ver tu pedido"${n ? '' : ' hidden'}>${ICO.bolsa}<b>${n}</b></button>` +
        `<p class="fija__texto"><b>${esc(titulo)}</b><span>${esc(sub)}</span></p>` +
        botonWA(tipo, texto, 'btn--oro', 'barra-fija');
    };
    document.addEventListener('click', (e) => {
      if (e.target.closest('[data-abrir-pedido]')) abrirPedido();
    });

    /* --- Recuperar lo que eligió si recarga la página --- */
    const previo = leer('fl_objetivo_suplementos');
    pintarProductos();
    if (previo) {
      const chip = document.querySelector(`[data-obj="${previo}"]`);
      if (chip) {
        objetivo = previo === 'nose' ? { id: 'nose', nombre: O.nose } : O.opciones.find((o) => o.id === previo);
        chip.setAttribute('aria-pressed', 'true');
        pintarResultado();
        pintarProductos();
      }
    }
  }

  /* ======================================================================
     8. LANDING DE ENTRENAMIENTO
     ====================================================================== */
  function entrenamiento() {
    const E = C.entrenamiento;
    const O = E.objetivo;
    let objetivo = null;
    let modalidad = null;
    const paqueteDe = (titulo) => (E.paquetes || []).find((p) => p.titulo === titulo);
    const recomendado = () => (modalidad ? paqueteDe(modalidad.paquete) : null);

    construirMensaje = (tipo, dato) => {
      const cab = 'Vengo de la página de entrenamiento.';
      const lObj = objetivo ? `\nMi objetivo: ${objetivo.nombre}.` : '';
      const lMod = modalidad ? `\nCómo quiero entrenar: ${modalidad.nombre}.` : '';
      if (tipo === 'plan' && recomendado()) {
        return `${cab}${lObj}${lMod}\nMe interesa el paquete ${recomendado().titulo}.\n¿Qué sigue para empezar?`;
      }
      if (tipo === 'paquete' && dato) {
        return `${cab}${lObj}${lMod}\nMe interesa el paquete ${dato}.\n¿Qué sigue para empezar?`;
      }
      if (tipo === 'cupo') {
        return `${cab}${lObj}${lMod}\nQuiero apartar mi lugar. ¿Qué sigue para empezar?`;
      }
      return `${cab}${lObj}${lMod}\nQuiero empezar a entrenar contigo. ¿Qué sigue?`;
    };

    pintarIntro(E, E.boton, 'plan');
    pintarAB(E.ab);

    /* --- Método en 3 pasos --- */
    $('metodo').innerHTML =
      '<div class="contenedor">' +
      cabeza('El método', destacarFinal(E.metodo.titulo, 1), '', false) +
      '<ol class="metodo revela">' +
      E.metodo.pasos.map((p) => `<li><h3>${esc(p.titulo)}</h3><p>${esc(p.texto)}</p></li>`).join('') +
      '</ol></div>';

    /* --- Quién es el coach --- */
    const k = E.coach;
    $('coach').innerHTML =
      '<div class="contenedor"><div class="coach revela">' +
      `<figure class="coach__foto"><img src="${esc(ruta(k.foto))}" alt="${esc(`${k.nombre}, ${k.rol}`)}" loading="lazy"></figure>` +
      '<div>' +
      '<p class="antes">Tu coach</p>' +
      `<p class="coach__nombre"><b>${esc(k.nombre)}</b><span>${esc(k.rol)}</span></p>` +
      `<p class="coach__bio">${esc(k.bio)}</p>` +
      `<div class="coach__datos">${(k.datos || []).map((d) => `<p><strong>${esc(d.numero)}</strong><span>${esc(d.texto)}</span></p>`).join('')}</div>` +
      '</div></div></div>';

    /* --- Armar tu plan: dos preguntas, dos "sí" --- */
    const chips = (lista, attr) =>
      lista.map((o) =>
        `<button class="chip" type="button" aria-pressed="false" data-${attr}="${esc(o.id)}"><span class="chip__marca">${ICO.check}</span>${esc(o.nombre)}</button>`
      ).join('');

    $('plan').innerHTML =
      '<div class="contenedor">' +
      cabeza('Tu plan', destacarFinal(O.titulo, 2), O.texto, false) +
      '<div class="selector revela">' +
      `<p class="selector__pregunta"><span aria-hidden="true">01</span>${esc(O.pregunta1)}</p>` +
      `<div class="chips" id="chipsObjetivo" role="group" aria-label="${esc(O.pregunta1)}">${chips(O.objetivos, 'obj')}</div></div>` +
      '<div class="selector revela">' +
      `<p class="selector__pregunta"><span aria-hidden="true">02</span>${esc(O.pregunta2)}</p>` +
      `<div class="chips" id="chipsModalidad" role="group" aria-label="${esc(O.pregunta2)}">${chips(O.modalidades, 'mod')}</div></div>` +
      '<div id="resultado" aria-live="polite"></div></div>';

    function pintarPlan() {
      const host = $('resultado');
      const paq = recomendado();
      if (!paq) {
        host.innerHTML = objetivo
          ? '<p class="antes" style="margin-top:18px">Ahora dime cómo quieres entrenar</p>'
          : '';
        return;
      }
      host.innerHTML =
        '<div class="resultado plan"><div>' +
        '<p class="antes">Tu plan recomendado</p>' +
        `<h3>${esc(paq.titulo)}</h3>` +
        `<p>${esc(paq.subtitulo)}${objetivo ? ` Tu objetivo: ${esc(objetivo.nombre.toLowerCase())}.` : ''}</p>` +
        '</div>' + botonWA('plan', 'Quiero este plan', 'btn--oro btn--grande', 'plan') + '</div>';
      refrescarWA(host);
    }

    $('plan').addEventListener('click', (e) => {
      const obj = e.target.closest('[data-obj]');
      const mod = e.target.closest('[data-mod]');
      if (!obj && !mod) return;
      if (obj) {
        objetivo = O.objetivos.find((o) => o.id === obj.dataset.obj);
        $('chipsObjetivo').querySelectorAll('[data-obj]').forEach((b) => b.setAttribute('aria-pressed', String(b === obj)));
        medir('elegir_objetivo', { pagina: PAGINA, objetivo: objetivo.id });
      }
      if (mod) {
        modalidad = O.modalidades.find((o) => o.id === mod.dataset.mod);
        $('chipsModalidad').querySelectorAll('[data-mod]').forEach((b) => b.setAttribute('aria-pressed', String(b === mod)));
        medir('elegir_modalidad', { pagina: PAGINA, modalidad: modalidad.id });
      }
      guardar('fl_plan_entrenamiento', { obj: objetivo && objetivo.id, mod: modalidad && modalidad.id });
      pintarPlan();
      pintarPaquetes();
      refrescarWA();
      actualizarFija();
    });

    /* --- Paquetes --- */
    $('paquetes').innerHTML =
      '<div class="contenedor">' +
      cabeza('Paquetes', 'Elige cómo quieres <span class="oro-texto">entrenar.</span>', '', false) +
      '<div class="paquetes revela" id="listaPaquetes"></div></div>';

    function pintarPaquetes() {
      const paraTi = recomendado();
      $('listaPaquetes').innerHTML = (E.paquetes || []).map((p) => {
        const esParaTi = paraTi && paraTi.titulo === p.titulo;
        const cinta = esParaTi
          ? '<span class="sello sello--oro paquete__cinta">Recomendado para ti</span>'
          : (p.destacado && !paraTi ? '<span class="sello paquete__cinta">Más completo</span>' : '');
        const precio = E.mostrarPrecios && p.precio
          ? `<p class="paquete__precio"><strong>${esc(p.precio)}</strong><span>${esc(p.periodo || '')}</span></p>`
          : '<p class="paquete__precio paquete__precio--wa"><strong>Precio por WhatsApp</strong></p>';
        return `<article class="paquete${p.destacado ? ' paquete--destacado' : ''}${esParaTi ? ' paquete--para-ti' : ''}">` +
          cinta +
          `<p class="paquete__etiqueta">${esc(p.etiqueta)}</p>` +
          `<h3>${esc(p.titulo)}</h3>` +
          `<p class="paquete__sub">${esc(p.subtitulo)}</p>` +
          precio +
          `<ul class="paquete__lista">${(p.incluye || []).map((f) => `<li>${ICO.check}<span>${esc(f)}</span></li>`).join('')}</ul>` +
          botonWA('paquete', 'Me interesa', esParaTi ? 'btn--oro btn--bloque' : 'btn--tinta btn--bloque', 'paquete', p.titulo) +
          '</article>';
      }).join('');
      refrescarWA($('listaPaquetes'));
    }

    /* --- Escasez real: cupos --- */
    const cu = E.cupos || {};
    if (cu.texto) {
      pintarBanda($('cupos'), {
        antes: 'Cupos limitados',
        titulo: cu.texto,
        texto: cu.disponibles ? '' : 'Si hoy hay lugar, mañana puede que no.',
        numero: cu.disponibles || '',
        unidad: cu.disponibles ? (Number(cu.disponibles) === 1 ? 'lugar este mes' : 'lugares este mes') : '',
        boton: botonWA('cupo', 'Apartar mi lugar', 'btn--oro', 'cupos'),
      });
    } else {
      $('cupos').remove();
    }

    pintarTestimonios(E.testimonios);
    pintarFAQ(E.preguntas);
    pintarCierre(E.cierre, 'general');

    pintarFija = (fija) => {
      const paq = recomendado();
      const titulo = paq ? `Tu plan · ${paq.titulo}` : 'Empieza hoy tu plan';
      const sub = paq ? 'Te respondo por WhatsApp' : `Respuesta por WhatsApp · ${C.whatsapp.horario}`;
      fija.innerHTML =
        `<p class="fija__texto"><b>${esc(titulo)}</b><span>${esc(sub)}</span></p>` +
        botonWA(paq ? 'plan' : 'general', paq ? 'Lo quiero' : 'Escríbeme', 'btn--oro', 'barra-fija');
    };

    /* --- Recuperar el plan si recarga la página --- */
    const previo = leer('fl_plan_entrenamiento');
    if (previo) {
      objetivo = O.objetivos.find((o) => o.id === previo.obj) || null;
      modalidad = O.modalidades.find((o) => o.id === previo.mod) || null;
      if (objetivo) document.querySelector(`[data-obj="${objetivo.id}"]`).setAttribute('aria-pressed', 'true');
      if (modalidad) document.querySelector(`[data-mod="${modalidad.id}"]`).setAttribute('aria-pressed', 'true');
    }
    pintarPlan();
    pintarPaquetes();
  }

  /* ======================================================================
     9. ARRANQUE
     ====================================================================== */
  if (PAGINA === 'puerta') {
    puerta();
  } else {
    if (PAGINA === 'suplementos') suplementos();
    if (PAGINA === 'entrenamiento') entrenamiento();
    pintarPasos();
    pintarPie(C[PAGINA] && C[PAGINA].etiqueta);
    vigilarDesplazamiento();
    actualizarFija();
  }
  pintarMarca();
  refrescarWA();
  observarRevela();
})();
