/* =========================================================================
   FAITHLURE SUPPLEMENTS — MOTOR DE LA PÁGINA
   =========================================================================
   Este archivo dibuja la página a partir de catalogo.js.
   Para cambiar textos, productos o precios NO toques este archivo:
   todo eso vive en catalogo.js
   ========================================================================= */

(function () {
  'use strict';

  const d = CATALOGO;
  const $ = (id) => document.getElementById(id);
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ====================================================================
     1. UTILIDADES
     ==================================================================== */
  const esc = (str) =>
    String(str == null ? '' : str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');

  const waLink = (text) =>
    `https://wa.me/${d.contact.countryCode || '52'}${d.contact.whatsappNumber}` +
    `?text=${encodeURIComponent(text || `Hola ${d.brand.name}, quiero información sobre sus suplementos.`)}`;

  /* Nombre completo de un producto, tal como se manda por WhatsApp */
  const fullName = (p) => {
    const extra = [p.variant, p.size].filter(Boolean).join(', ');
    return `${p.brand} ${p.name}${extra ? ` (${extra})` : ''}`;
  };

  const categoryOf = (id) => d.categories.find((c) => c.id === id) || d.categories[0];
  const productOf = (id) => d.products.find((p) => p.id === id);

  /* Resalta en cursiva las últimas palabras de un titular */
  const emphasizeTail = (headline, tailWords) => {
    const words = String(headline).trim().split(/\s+/);
    if (words.length <= tailWords + 1) return esc(headline);
    const head = words.slice(0, words.length - tailWords).join(' ');
    const tail = words.slice(words.length - tailWords).join(' ');
    return `${esc(head)} <em>${esc(tail)}</em>`;
  };

  /* ====================================================================
     2. ICONOS
     ==================================================================== */
  const icons = {
    check:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12.5l5 5L20 6.5"/></svg>',
    close:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>',
    plus:     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>',
    minus:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M5 12h14"/></svg>',
    expand:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9V4h5M20 15v5h-5M15 4h5v5M9 20H4v-5"/></svg>',
    bag:      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><path d="M4 8h16l-1.2 12H5.2z"/><path d="M9 8V6.5a3 3 0 0 1 6 0V8"/></svg>',
    whatsapp: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 3a9 9 0 0 0-7.7 13.6L3 21l4.5-1.3A9 9 0 1 0 12 3zm0 16.2a7.2 7.2 0 0 1-3.7-1l-.3-.2-2.7.8.8-2.6-.2-.3A7.2 7.2 0 1 1 12 19.2zm4-5.4c-.2-.1-1.3-.6-1.5-.7-.2-.1-.3-.1-.5.1s-.6.7-.7.9-.3.2-.5.1a5.9 5.9 0 0 1-1.7-1 6.4 6.4 0 0 1-1.2-1.5c-.1-.2 0-.3.1-.4l.3-.4c.1-.1.1-.2.2-.4a.4.4 0 0 0 0-.4c-.1-.1-.5-1.2-.7-1.6s-.4-.4-.5-.4h-.4a.9.9 0 0 0-.6.3 2.6 2.6 0 0 0-.8 2c0 1.2.9 2.3 1 2.5s1.7 2.6 4.2 3.6a5.4 5.4 0 0 0 3.2.2 2.4 2.4 0 0 0 1.5-1.1c.2-.4.2-.7.1-.8s-.2-.1-.4-.2z"/></svg>',
    bolt:     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"><path d="M13 2 4 14h6l-1 8 9-12h-6z"/></svg>',
    flame:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"><path d="M12 3s-5 4.5-5 9.5a5 5 0 0 0 10 0c0-1.6-.7-2.7-1.4-3.7.1 1.4-.6 2.3-1.3 2.3-1 0-1-1-1-1.8 0-1.4-1-2.9-1.3-6.3z"/><path d="M9.5 15.5a2.5 2.5 0 0 0 5 0"/></svg>',
    shake:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"><path d="M7 8h10l-1 12.5H8z"/><path d="M6.5 4.5h11V8h-11z"/><path d="M8.5 12h7"/></svg>',
    grid:     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="4" y="4" width="7" height="7" rx="1.5"/><rect x="13" y="4" width="7" height="7" rx="1.5"/><rect x="4" y="13" width="7" height="7" rx="1.5"/><rect x="13" y="13" width="7" height="7" rx="1.5"/></svg>',
    shield:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"><path d="M12 3l7 3v5.5c0 4.3-2.9 7.6-7 9.5-4.1-1.9-7-5.2-7-9.5V6z"/><path d="M9 12l2 2 4-4"/></svg>',
    advice:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"><path d="M20 15a2 2 0 0 1-2 2H8l-4 3V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2z"/><path d="M9 9h6M9 12.5h4"/></svg>',
    truck:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"><path d="M3 6h11v10H3zM14 9h4l3 3v4h-7z"/><circle cx="7" cy="18" r="1.7"/><circle cx="17.5" cy="18" r="1.7"/></svg>',
    wallet:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"><path d="M4 7.5A2.5 2.5 0 0 1 6.5 5H18v3"/><path d="M4 7.5V17a2 2 0 0 0 2 2h13v-4"/><path d="M20 11h-4a2 2 0 0 0 0 4h4z"/></svg>',
    pin:      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"><path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11z"/><circle cx="12" cy="10" r="2.6"/></svg>',
    clock:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5.3l3.4 2"/></svg>',
    instagram:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3.5" y="3.5" width="17" height="17" rx="4.5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none"/></svg>',
    tiktok:   '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14.5 3c.3 1.9 1.6 3.4 3.5 3.7v2.4a6 6 0 0 1-3.5-1.1v6.4a4.9 4.9 0 1 1-4.2-4.9v2.5a2.5 2.5 0 1 0 1.7 2.4V3h2.5z"/></svg>',
  };

  /* ====================================================================
     3. ENVASES EN 3D
     ====================================================================
     Cada producto se dibuja con la forma de su envase real:
       "bote"  -> tarro cilíndrico con tapa estriada y etiqueta al frente
       "bolsa" -> bolsa de pie con frente, respaldo y fuelles laterales
     El cilindro se arma con tiras verticales giradas en círculo; el brillo
     va pintado en cada tira para que se vea el volumen del plástico.
     ==================================================================== */
  const SEGMENTS = 22;

  /* Aclara (valores positivos) u oscurece (negativos) un color hexadecimal */
  const shade = (hex, amount) => {
    const n = parseInt(String(hex).replace('#', ''), 16);
    const ch = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) => {
      const out = amount >= 0 ? v + (255 - v) * amount : v * (1 + amount);
      return Math.max(0, Math.min(255, Math.round(out)));
    });
    return `rgb(${ch.join(',')})`;
  };

  /* Luz del estudio: difusa + un reflejo cerrado, como plástico brillante */
  const lightAt = (angle) => {
    const c = Math.max(0, Math.cos((angle - 22) * Math.PI / 180));
    return 0.5 + 0.44 * c + 0.3 * Math.pow(c, 16);
  };

  /* Envase de respaldo por si un producto no trae su propio "model" */
  const fallbackModel = (p) => {
    const c = categoryOf(p.category).colors;
    return { shape: 'bote', body: c.body, lid: c.cap, label: c.band, ink: c.text, accent: c.cap };
  };
  const modelOf = (p) => Object.assign(fallbackModel(p), p.model || {});

  /* Un tramo de cilindro (el cuerpo del bote o la tapa) */
  function cylinder(opts) {
    const part = document.createElement('div');
    part.className = 'mdl__part';
    part.style.top = `${opts.top}px`;
    part.style.height = `${opts.height}px`;

    const segW = (2 * opts.radius * Math.tan(Math.PI / SEGMENTS)) + 0.8;
    for (let i = 0; i < SEGMENTS; i++) {
      const angle = (360 / SEGMENTS) * i;
      const seg = document.createElement('div');
      seg.className = 'mdl__seg';
      seg.style.width = `${segW}px`;
      seg.style.marginLeft = `${-segW / 2}px`;
      seg.style.transform = `rotateY(${angle}deg) translateZ(${opts.radius}px)`;
      seg.style.background = opts.background;
      seg.style.filter = `brightness(${lightAt(angle).toFixed(3)})`;
      part.appendChild(seg);
    }
    return part;
  }

  /* Una tapa vista desde arriba (o el fondo del envase) */
  function discFace(opts) {
    const el = document.createElement('div');
    el.className = 'mdl__disc';
    el.style.width = `${opts.radius * 2}px`;
    el.style.height = `${opts.radius * 2}px`;
    el.style.marginLeft = `${-opts.radius}px`;
    el.style.marginTop = `${-opts.radius}px`;
    el.style.top = `${opts.top}px`;
    el.style.transform = 'rotateX(90deg)';
    el.style.background = opts.background;
    return el;
  }

  /* La etiqueta impresa del producto */
  function productLabel(p, m, opts) {
    const el = document.createElement('div');
    el.className = 'plabel';
    el.style.fontSize = `${opts.fontSize}px`;
    el.style.width = `${opts.width}px`;
    el.style.marginLeft = `${-opts.width / 2}px`;
    el.style.top = `${opts.top}px`;
    el.style.transform = `translateZ(${opts.depth}px)`;
    el.style.color = m.ink;
    el.style.setProperty('--accent', m.accent);

    /* Un nombre largo ("CREATINE MONOHYDRATE") se achica para caber en la
       etiqueta, igual que en un envase real */
    const title = m.title || p.name;
    const longest = Math.max.apply(null, title.split(/\s+/).map((word) => word.length));
    const emsAvailable = opts.width / opts.fontSize - 1.35;
    const nameEm = Math.max(0.66, Math.min(1.28, emsAvailable / (longest * 0.66)));
    el.style.setProperty('--name-size', `${nameEm.toFixed(2)}em`);

    const size = [p.size, p.servings].filter(Boolean).join(' · ');
    el.innerHTML =
      (m.stripe ? `<span class="plabel__stripe" style="background:${esc(m.stripe)}"></span>` : '') +
      `<span class="plabel__brand">${esc(p.brand)}</span>` +
      `<b class="plabel__name">${esc(title)}</b>` +
      '<span class="plabel__bar"></span>' +
      (p.variant ? `<span class="plabel__flavor">${esc(p.variant)}</span>` : '') +
      (size ? `<span class="plabel__size">${esc(size)}</span>` : '');
    return el;
  }

  /* --- Bote: cuerpo + tapa estriada + etiqueta --- */
  function buildTub(p, m, w, h) {
    const r = w / 2;
    const lidH = Math.round(h * 0.16);
    const lidR = r * 1.035;
    const bodyTop = Math.round(lidH * 0.72);
    const bodyH = h - bodyTop;

    const jar = document.createElement('div');
    jar.className = 'jar';

    /* Cuerpo: sombra bajo la tapa, franja de la etiqueta y base más oscura */
    jar.appendChild(cylinder({
      radius: r, height: bodyH, top: bodyTop,
      background: [
        'linear-gradient(180deg,',
        `${shade(m.body, -0.45)} 0 3%,`,
        `${shade(m.body, 0.03)} 3% 22%,`,
        `${shade(m.label, 0.02)} 22% 78%,`,
        `${shade(m.body, 0.02)} 78% 94%,`,
        `${shade(m.body, -0.42)} 94% 100%)`,
      ].join(' '),
    }));

    /* Tapa: estrías verticales como las de un tarro real */
    jar.appendChild(cylinder({
      radius: lidR, height: lidH, top: 0,
      background:
        `repeating-linear-gradient(90deg, ${shade(m.lid, 0.10)} 0 2px, ${shade(m.lid, -0.16)} 2px 4.5px),` +
        `linear-gradient(180deg, ${shade(m.lid, 0.16)} 0 14%, ${shade(m.lid, -0.30)} 100%)`,
    }));
    jar.appendChild(discFace({
      radius: lidR, top: 0,
      background: `radial-gradient(circle at 38% 32%, ${shade(m.lid, 0.30)}, ${shade(m.lid, -0.18)} 76%)`,
    }));

    jar.appendChild(productLabel(p, m, {
      fontSize: Math.max(6.5, w * 0.077),
      width: w * 0.70,
      top: bodyTop + bodyH * 0.26,
      depth: r + 0.6,
    }));

    return jar;
  }

  /* --- Bolsa de pie ---------------------------------------------------
     Se arma como un cilindro aplastado: la sección es una elipse ancha y
     poco profunda, así la bolsa se ve inflada por el producto y con los
     costados redondeados, no como una caja.
     -------------------------------------------------------------------- */
  const POUCH_SEGMENTS = 20;

  function buildPouch(p, m, w, h) {
    const rx = w / 2;                 // mitad del ancho
    const rz = (w * 0.34) / 2;        // mitad del fondo
    const jar = document.createElement('div');
    jar.className = 'jar';

    /* Franja de sello arriba, cuerpo y base reforzada */
    const background = [
      'linear-gradient(180deg,',
      `${shade(m.body, -0.55)} 0 4%,`,
      `${shade(m.body, -0.18)} 4% 7%,`,
      `${shade(m.body, 0.02)} 7% 86%,`,
      `${shade(m.body, -0.26)} 86% 96%,`,
      `${shade(m.body, -0.55)} 96% 100%)`,
    ].join(' ');

    const part = document.createElement('div');
    part.className = 'mdl__part';
    part.style.top = '0';
    part.style.height = `${h}px`;

    for (let i = 0; i < POUCH_SEGMENTS; i++) {
      const t0 = (2 * Math.PI * i) / POUCH_SEGMENTS;
      const t1 = (2 * Math.PI * (i + 1)) / POUCH_SEGMENTS;
      const tm = (t0 + t1) / 2;

      const cx = rx * Math.sin(tm);
      const cz = rz * Math.cos(tm);
      const segW = Math.hypot(rx * (Math.sin(t1) - Math.sin(t0)), rz * (Math.cos(t1) - Math.cos(t0))) + 0.8;
      /* Ángulo hacia donde "mira" la cara, según la tangente de la elipse */
      const facing = Math.atan2(rz * Math.sin(tm), rx * Math.cos(tm)) * 180 / Math.PI;

      const seg = document.createElement('div');
      seg.className = 'mdl__seg';
      seg.style.width = `${segW}px`;
      seg.style.marginLeft = `${-segW / 2}px`;
      seg.style.transform = `translate3d(${cx.toFixed(2)}px, 0, ${cz.toFixed(2)}px) rotateY(${facing.toFixed(2)}deg)`;
      seg.style.background = background;
      seg.style.filter = `brightness(${lightAt(facing).toFixed(3)})`;
      part.appendChild(seg);
    }
    jar.appendChild(part);

    /* Tapa plana del sello, achatada para seguir la elipse */
    const top = discFace({
      radius: rx,
      top: 0,
      background: `linear-gradient(180deg, ${shade(m.body, -0.5)}, ${shade(m.body, -0.28)})`,
    });
    top.style.transform = `rotateX(90deg) scaleY(${(rz / rx).toFixed(3)})`;
    jar.appendChild(top);

    jar.appendChild(productLabel(p, m, {
      fontSize: Math.max(6.5, w * 0.072),
      width: w * 0.76,
      top: h * 0.28,
      depth: rz + 0.6,
    }));

    return jar;
  }

  /**
   * Dibuja el envase 3D de un producto.
   * @param {object} p  el producto
   * @param {string} size  'sm' para las tarjetas, 'lg' para la ficha
   */
  function buildModel(p, size) {
    const m = modelOf(p);
    const big = size === 'lg';
    const w = big ? (m.shape === 'bolsa' ? 172 : 176) : (m.shape === 'bolsa' ? 122 : 124);
    const h = big ? (m.shape === 'bolsa' ? 256 : 262) : (m.shape === 'bolsa' ? 182 : 184);

    const wrap = document.createElement('div');
    wrap.className = `jar3d jar3d--${m.shape}`;
    wrap.style.setProperty('--jar-w', `${w}px`);
    wrap.style.setProperty('--jar-h', `${h}px`);
    wrap.appendChild(m.shape === 'bolsa' ? buildPouch(p, m, w, h) : buildTub(p, m, w, h));
    return wrap;
  }

  /* Si el producto tiene foto se muestra la foto en un marco 3D */
  function buildVisual(p, size) {
    if (p.image) {
      const wrap = document.createElement('div');
      wrap.className = 'photo3d';
      const img = document.createElement('img');
      img.src = p.image;
      img.alt = fullName(p);
      img.loading = 'lazy';
      wrap.appendChild(img);
      return wrap;
    }
    return buildModel(p, size);
  }

  /* ====================================================================
     4. CABECERA Y HERO
     ==================================================================== */
  document.title = `${d.brand.name} ${d.brand.tagline} — Suplementos en ${d.brand.location}`;
  $('navBrand').textContent = d.brand.name;
  $('navRole').textContent = d.brand.tagline;
  $('navCta').href = waLink();
  $('whatsappFab').href = waLink();
  $('whatsappFab').innerHTML = icons.whatsapp;

  $('heroEyebrow').textContent = d.hero.eyebrow;
  $('heroHeadline').innerHTML = emphasizeTail(d.hero.headline, 2);
  $('heroSub').textContent = d.hero.subheadline;
  $('heroCtaPrimary').textContent = d.hero.ctaPrimary;
  const heroCta2 = $('heroCtaSecondary');
  heroCta2.textContent = d.hero.ctaSecondary;
  heroCta2.href = waLink();

  $('heroStats').innerHTML = d.hero.stats
    .map((s) => `<li><strong>${esc(s.number)}</strong><span>${esc(s.label)}</span></li>`)
    .join('');

  /* Envase grande del hero: un producto real del catálogo */
  const showcase = productOf(d.hero.showcase.productId) || d.products[0];
  $('heroStage').appendChild(buildVisual(showcase, 'lg'));
  $('heroStageHint').textContent = `${d.brand.claim} · ${d.brand.location}`;

  /* ====================================================================
     5. BARRA DE CONFIANZA
     ==================================================================== */
  $('trustList').innerHTML = d.trust
    .map(
      (t) => `
      <li>
        <span class="trust__icon" aria-hidden="true">${icons[t.icon] || icons.check}</span>
        <div>
          <h3>${esc(t.title)}</h3>
          <p>${esc(t.text)}</p>
        </div>
      </li>`
    )
    .join('');

  /* ====================================================================
     6. CATÁLOGO
     ==================================================================== */
  $('catalogEyebrow').textContent = d.catalog.eyebrow;
  $('catalogTitle').innerHTML = emphasizeTail(d.catalog.title, 2);
  $('catalogText').textContent = d.catalog.text;

  /* --- Bloque de precio (con espacio reservado aunque esté oculto) --- */
  function priceBlock(p) {
    if (d.showPrices && p.price) {
      return `
        <div class="price">
          <span class="price__value">${esc(p.price)}</span>
          <span class="price__note">${esc(p.priceNote || d.currencyNote || '')}</span>
        </div>`;
    }
    return `
      <div class="price price--soon">
        <span class="price__value">${esc(d.priceSoonLabel)}</span>
        <span class="price__note">${esc(d.priceSoonNote)}</span>
      </div>`;
  }

  function stockBlock(p) {
    return p.stock === false
      ? '<span class="stock stock--order">Bajo pedido</span>'
      : '<span class="stock">Disponible</span>';
  }

  /* --- Tarjeta de producto --- */
  function buildCard(p) {
    const card = document.createElement('article');
    card.className = `card${p.featured ? ' card--featured' : ''}`;
    card.dataset.category = p.category;

    const meta = [p.variant, p.size].filter(Boolean).map((x) => `<span>${esc(x)}</span>`).join('');

    card.innerHTML = `
      ${p.badge ? `<span class="badge ${p.featured ? 'badge--clay' : ''} card__badge">${esc(p.badge)}</span>` : ''}
      <button class="card__stage" type="button" aria-label="Ver ${esc(fullName(p))} en 3D">
        <span class="card__zoom" aria-hidden="true">${icons.expand}</span>
      </button>
      <div class="card__body">
        <p class="card__brand">${esc(p.brand)}</p>
        <h3 class="card__name">${esc(p.name)}</h3>
        <p class="card__meta">${meta}</p>
        <p class="card__short">${esc(p.short || '')}</p>
        ${stockBlock(p)}
        ${priceBlock(p)}
        <div class="card__actions">
          <button class="btn btn--ink btn--sm" type="button" data-add="${esc(p.id)}">Agregar</button>
          <a class="btn btn--primary btn--sm btn--glow" href="${waLink(
            `Hola ${d.brand.name}, quiero cotizar: ${fullName(p)}.`
          )}" target="_blank" rel="noopener">Cotizar</a>
        </div>
      </div>`;

    const stage = card.querySelector('.card__stage');
    stage.insertBefore(buildVisual(p, 'sm'), stage.firstChild);
    stage.addEventListener('click', () => openDetail(p.id));
    card.querySelector('[data-add]').addEventListener('click', () => addToCart(p.id));

    return card;
  }

  /* --- Grupos por categoría --- */
  const groupsHost = $('catalogGroups');
  d.categories.forEach((cat) => {
    const items = d.products.filter((p) => p.category === cat.id);
    if (!items.length) return;

    const group = document.createElement('section');
    group.className = 'catalog__group';
    group.dataset.group = cat.id;
    group.innerHTML = `
      <header class="catalog__head">
        <h3 class="catalog__name">${esc(cat.name)}</h3>
        <p class="catalog__tagline">${esc(cat.tagline || '')}</p>
      </header>
      <div class="grid"></div>`;

    const grid = group.querySelector('.grid');
    items.forEach((p) => grid.appendChild(buildCard(p)));
    groupsHost.appendChild(group);
  });

  /* --- Filtros --- */
  const filtersHost = $('filters');
  const filterDefs = [
    { id: 'todos', name: 'Todo el catálogo', icon: 'grid', count: d.products.length },
  ].concat(
    d.categories.map((c) => ({
      id: c.id,
      name: c.name,
      icon: c.icon,
      count: d.products.filter((p) => p.category === c.id).length,
    })).filter((c) => c.count > 0)
  );

  filtersHost.innerHTML = filterDefs
    .map(
      (f, i) => `
      <button class="filter${i === 0 ? ' is-active' : ''}" type="button" role="tab"
              aria-selected="${i === 0}" data-filter="${esc(f.id)}">
        ${icons[f.icon] || icons.grid}
        <span>${esc(f.name)}</span>
        <span class="filter__count">${f.count}</span>
      </button>`
    )
    .join('');

  filtersHost.addEventListener('click', (e) => {
    const btn = e.target.closest('.filter');
    if (!btn) return;
    const value = btn.dataset.filter;

    filtersHost.querySelectorAll('.filter').forEach((b) => {
      const on = b === btn;
      b.classList.toggle('is-active', on);
      b.setAttribute('aria-selected', String(on));
    });

    groupsHost.querySelectorAll('.catalog__group').forEach((g) => {
      g.hidden = value !== 'todos' && g.dataset.group !== value;
    });
  });

  /* ====================================================================
     7. FICHA EN 3D (modal con giro manual)
     ==================================================================== */
  const modal = $('productModal');
  const modalBody = $('modalBody');
  let lastFocused = null;
  let dragState = null;

  $('modalClose').innerHTML = icons.close;

  function openDetail(id) {
    const p = productOf(id);
    if (!p) return;
    lastFocused = document.activeElement;

    const bullets = (p.bullets || [])
      .map((b) => `<li>${icons.check}<span>${esc(b)}</span></li>`)
      .join('');

    modalBody.innerHTML = `
      <div class="detail">
        <div class="detail__stage" id="detailStage">
          <p class="detail__drag">Arrastra para girar</p>
        </div>
        <div class="detail__body">
          <p class="detail__brand">${esc(p.brand)}</p>
          <h2 class="detail__name" id="modalName">${esc(p.name)}</h2>
          <p class="detail__short">${esc(p.short || '')}</p>
          <ul class="detail__list">${bullets}</ul>
          ${stockBlock(p)}
          <div class="detail__price">${priceBlock(p)}</div>
          <div class="detail__actions">
            <button class="btn btn--ink" type="button" data-add="${esc(p.id)}">Agregar al pedido</button>
            <a class="btn btn--primary btn--glow" href="${waLink(
              `Hola ${d.brand.name}, quiero cotizar: ${fullName(p)}.`
            )}" target="_blank" rel="noopener">${icons.whatsapp}<span>Cotizar ahora</span></a>
          </div>
        </div>
      </div>`;

    const stage = $('detailStage');
    const visual = buildVisual(p, 'lg');
    stage.insertBefore(visual, stage.firstChild);

    const jar = visual.querySelector('.jar');
    if (jar && !reduceMotion) jar.classList.add('jar--visible');
    setupDrag(stage, visual);

    modalBody.querySelector('[data-add]').addEventListener('click', () => addToCart(p.id));

    modal.hidden = false;
    document.body.classList.add('is-locked');
    $('modalClose').focus();
  }

  function closeDetail() {
    modal.hidden = true;
    modalBody.innerHTML = '';
    dragState = null;
    if (cartEl.hidden) document.body.classList.remove('is-locked');
    if (lastFocused) lastFocused.focus();
  }

  /* Giro con el dedo o el ratón */
  function setupDrag(stage, visual) {
    const jar = visual.querySelector('.jar');
    const photo = visual.classList.contains('photo3d') ? visual : null;
    let spin = 0;
    let velocity = 0;
    let raf = null;

    const apply = () => {
      if (jar) jar.style.transform = `rotateX(-8deg) rotateY(${spin}deg)`;
      if (photo) {
        photo.style.setProperty('--tilt-y', `${Math.max(-28, Math.min(28, spin))}deg`);
      }
    };

    const inertia = () => {
      if (Math.abs(velocity) < 0.05) {
        raf = null;
        if (jar && !reduceMotion) {
          /* Reanuda el giro automático justo donde quedó, sin salto */
          const vuelta = ((spin % 360) + 360) % 360;
          jar.style.animationDelay = `${-(vuelta / 360) * 26}s`;
          jar.style.transform = '';
          jar.classList.remove('jar--manual');
        }
        return;
      }
      spin += velocity;
      velocity *= 0.94;
      apply();
      raf = requestAnimationFrame(inertia);
    };

    stage.addEventListener('pointerdown', (e) => {
      if (jar) jar.classList.add('jar--manual');
      if (raf) { cancelAnimationFrame(raf); raf = null; }
      stage.classList.add('is-dragging');
      stage.setPointerCapture(e.pointerId);
      dragState = { x: e.clientX, spin };
      velocity = 0;
    });

    stage.addEventListener('pointermove', (e) => {
      if (!dragState) return;
      const delta = (e.clientX - dragState.x) * 0.6;
      velocity = delta - (spin - dragState.spin);
      spin = dragState.spin + delta;
      apply();
    });

    const end = () => {
      if (!dragState) return;
      dragState = null;
      stage.classList.remove('is-dragging');
      if (!reduceMotion) raf = requestAnimationFrame(inertia);
    };
    stage.addEventListener('pointerup', end);
    stage.addEventListener('pointercancel', end);
  }

  modal.addEventListener('click', (e) => {
    if (e.target.hasAttribute('data-close')) closeDetail();
  });
  $('modalClose').addEventListener('click', closeDetail);

  /* ====================================================================
     8. LISTA DE PEDIDO
     ==================================================================== */
  const STORE_KEY = 'faithlure_pedido';
  const cartEl = $('cart');
  const cartItemsEl = $('cartItems');
  let order = [];

  try {
    const saved = JSON.parse(localStorage.getItem(STORE_KEY) || '[]');
    if (Array.isArray(saved)) order = saved.filter((it) => productOf(it.id));
  } catch (err) {
    order = [];
  }

  const saveOrder = () => {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(order)); } catch (err) { /* modo privado */ }
  };

  const totalUnits = () => order.reduce((n, it) => n + it.qty, 0);

  function orderMessage() {
    const lines = order.map((it) => {
      const p = productOf(it.id);
      return `• ${it.qty} × ${fullName(p)}`;
    });
    return (
      `Hola ${d.brand.name}, quiero cotizar este pedido:\n\n${lines.join('\n')}\n\n` +
      '¿Me confirmas disponibilidad y total?'
    );
  }

  function renderCart() {
    const count = totalUnits();
    $('cartCount').textContent = String(count);
    $('cartFab').hidden = count === 0;

    if (!order.length) {
      cartItemsEl.innerHTML = '<p class="cart__empty">Tu lista está vacía.<br>Agrega productos del catálogo y mándalos todos juntos por WhatsApp.</p>';
      $('cartSend').classList.add('btn--disabled');
    } else {
      $('cartSend').classList.remove('btn--disabled');
      cartItemsEl.innerHTML = order
        .map((it) => {
          const p = productOf(it.id);
          const cat = categoryOf(p.category);
          return `
            <div class="cart__item">
              <span class="cart__swatch" aria-hidden="true"
                    style="background:${cat.colors.body};color:${cat.colors.band}">${esc(p.brand.slice(0, 2).toUpperCase())}</span>
              <div>
                <h3>${esc(p.name)}</h3>
                <p>${esc([p.brand, p.variant, p.size].filter(Boolean).join(' · '))}</p>
              </div>
              <div class="qty">
                <button type="button" data-dec="${esc(p.id)}" aria-label="Quitar uno">${icons.minus}</button>
                <span>${it.qty}</span>
                <button type="button" data-inc="${esc(p.id)}" aria-label="Agregar uno">${icons.plus}</button>
              </div>
            </div>`;
        })
        .join('');
    }

    $('cartSend').href = order.length ? waLink(orderMessage()) : waLink();
    $('cartSend').innerHTML = `${icons.whatsapp}<span>Enviar pedido por WhatsApp</span>`;
    $('cartNote').textContent =
      order.length
        ? `${count} ${count === 1 ? 'producto' : 'productos'} en tu lista · el precio se confirma por WhatsApp.`
        : 'Sin pagos en línea: se cotiza y se cierra por WhatsApp.';
  }

  function addToCart(id) {
    const found = order.find((it) => it.id === id);
    if (found) found.qty += 1;
    else order.push({ id, qty: 1 });
    saveOrder();
    renderCart();
    showToast(`${productOf(id).name} agregado a tu pedido`);
  }

  cartItemsEl.addEventListener('click', (e) => {
    const inc = e.target.closest('[data-inc]');
    const dec = e.target.closest('[data-dec]');
    if (inc) {
      const it = order.find((x) => x.id === inc.dataset.inc);
      if (it) it.qty += 1;
    } else if (dec) {
      const idx = order.findIndex((x) => x.id === dec.dataset.dec);
      if (idx > -1) {
        order[idx].qty -= 1;
        if (order[idx].qty <= 0) order.splice(idx, 1);
      }
    } else return;
    saveOrder();
    renderCart();
  });

  const openCart = () => {
    renderCart();
    cartEl.hidden = false;
    document.body.classList.add('is-locked');
    $('cartClose').focus();
  };
  const closeCart = () => {
    cartEl.hidden = true;
    if (modal.hidden) document.body.classList.remove('is-locked');
  };

  $('cartFab').addEventListener('click', openCart);
  $('cartFab').querySelector('.fab__icon').innerHTML = icons.bag;
  $('cartClose').innerHTML = icons.close;
  $('cartClose').addEventListener('click', closeCart);
  cartEl.addEventListener('click', (e) => {
    if (e.target.hasAttribute('data-close')) closeCart();
  });
  $('cartClear').addEventListener('click', () => {
    order = [];
    saveOrder();
    renderCart();
  });

  renderCart();

  /* Aviso corto al agregar */
  let toastTimer = null;
  function showToast(text) {
    const toast = $('toast');
    toast.textContent = text;
    toast.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 2200);
  }

  /* ====================================================================
     9. CÓMO COMPRAR
     ==================================================================== */
  if (d.howTo && d.howTo.enabled) {
    $('howEyebrow').textContent = d.howTo.eyebrow;
    $('howTitle').innerHTML = emphasizeTail(d.howTo.title, 2);
    $('howSteps').innerHTML = d.howTo.steps
      .map(
        (s) => `
        <li>
          <span class="steps__num">${esc(s.number)}</span>
          <h3>${esc(s.title)}</h3>
          <p>${esc(s.text)}</p>
        </li>`
      )
      .join('');
    $('howNote').textContent = d.howTo.note || '';
  } else {
    $('como-comprar').remove();
    document.querySelectorAll('a[href="#como-comprar"]').forEach((a) => a.remove());
  }

  /* ====================================================================
     10. ASESORÍA / COACH
     ==================================================================== */
  if (d.coach && d.coach.enabled) {
    $('coachEyebrow').textContent = d.coach.eyebrow;
    $('coachTitle').innerHTML = emphasizeTail(d.coach.title, 2);
    $('coachText').textContent = d.coach.text;
    const cta = $('coachCta');
    cta.textContent = d.coach.ctaText;
    cta.href = d.coach.ctaUrl;
  } else {
    $('asesoria').remove();
    document.querySelectorAll('a[href="#asesoria"]').forEach((a) => a.remove());
  }

  /* ====================================================================
     11. CONTACTO Y FOOTER
     ==================================================================== */
  $('contactEyebrow').textContent = d.contact.eyebrow;
  $('contactTitle').innerHTML = emphasizeTail(d.contact.title, 1);
  $('contactText').textContent = d.contact.text;

  const contactWa = $('contactWhatsapp');
  contactWa.href = waLink();
  contactWa.innerHTML = `${icons.whatsapp}<span>WhatsApp ${esc(d.contact.whatsappDisplay)}</span>`;

  $('contactMeta').innerHTML = [
    d.brand.location ? `<li>${icons.pin}<span>${esc(d.brand.location)}</span></li>` : '',
    d.contact.hours ? `<li>${icons.clock}<span>${esc(d.contact.hours)}</span></li>` : '',
  ].join('');

  $('contactSocial').innerHTML = [
    d.contact.instagram
      ? `<li><a href="https://instagram.com/${esc(d.contact.instagram)}" target="_blank" rel="noopener" aria-label="Instagram">${icons.instagram}</a></li>`
      : '',
    d.contact.tiktok
      ? `<li><a href="https://tiktok.com/@${esc(d.contact.tiktok)}" target="_blank" rel="noopener" aria-label="TikTok">${icons.tiktok}</a></li>`
      : '',
  ].join('');

  $('footerName').textContent = `${d.brand.name} ${d.brand.tagline}`;
  $('footerText').textContent = d.footer.text;
  $('footerLegal').textContent = d.footer.legal;
  $('footerCopy').textContent = `© ${new Date().getFullYear()} ${d.brand.name}. Todos los derechos reservados.`;

  /* ====================================================================
     12. NAVEGACIÓN
     ==================================================================== */
  const nav = $('nav');
  const navLinks = $('navLinks');
  const navToggle = $('navToggle');

  navToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('is-open');
    navToggle.classList.toggle('is-open', open);
    navToggle.setAttribute('aria-expanded', String(open));
  });
  navLinks.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
      navLinks.classList.remove('is-open');
      navToggle.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });

  const onScroll = () => nav.classList.toggle('is-stuck', window.scrollY > 8);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* Enlace activo según la sección visible */
  const sections = Array.from(document.querySelectorAll('main section[id]'));
  if ('IntersectionObserver' in window) {
    const navObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          navLinks.querySelectorAll('a').forEach((a) => {
            a.classList.toggle('is-active', a.getAttribute('href') === `#${entry.target.id}`);
          });
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    sections.forEach((s) => navObserver.observe(s));
  }

  /* ====================================================================
     13. APARICIÓN AL HACER SCROLL + GIRO SOLO DE LO VISIBLE
     ==================================================================== */
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-in');
          obs.unobserve(entry.target);
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
    );
    document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

    /* Los botes solo giran mientras se ven: ahorra batería en el celular */
    const jarObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle('jar--visible', entry.isIntersecting && !reduceMotion);
        });
      },
      { threshold: 0.15 }
    );
    document.querySelectorAll('.jar').forEach((j) => jarObserver.observe(j));
  } else {
    document.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-in'));
    document.querySelectorAll('.jar').forEach((j) => j.classList.add('jar--visible'));
  }

  /* Las tarjetas también aparecen escalonadas */
  document.querySelectorAll('.card').forEach((card, i) => {
    card.classList.add('reveal');
    card.style.transitionDelay = `${Math.min(i % 4, 3) * 0.07}s`;
    if ('IntersectionObserver' in window) {
      const obs = new IntersectionObserver(
        (entries, o) => {
          entries.forEach((e) => {
            if (!e.isIntersecting) return;
            e.target.classList.add('is-in');
            o.unobserve(e.target);
          });
        },
        { threshold: 0.06 }
      );
      obs.observe(card);
    } else {
      card.classList.add('is-in');
    }
  });

  /* ====================================================================
     14. TECLADO
     ==================================================================== */
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    if (!modal.hidden) closeDetail();
    else if (!cartEl.hidden) closeCart();
  });

  /* ====================================================================
     15. GOOGLE ANALYTICS (opcional)
     ==================================================================== */
  if (d.analytics && d.analytics.enabled && d.analytics.measurementId) {
    const s = document.createElement('script');
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${d.analytics.measurementId}`;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    function gtag() { window.dataLayer.push(arguments); }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', d.analytics.measurementId);
  }
})();
