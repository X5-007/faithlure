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
     3. IMAGEN DEL PRODUCTO
     ====================================================================
     Cada producto se muestra con su foto real (campo "image" de catalogo.js).
     Si un producto todavía no tiene foto, se dibuja un marcador con sus
     iniciales para que la tarjeta no quede vacía.
     ==================================================================== */

  function buildVisual(p, size) {
    const wrap = document.createElement('div');
    wrap.className = `shot shot--${size === 'lg' ? 'lg' : 'sm'}`;

    if (p.image) {
      const img = document.createElement('img');
      img.className = 'shot__img';
      img.src = p.image;
      img.alt = fullName(p);
      img.loading = size === 'lg' ? 'eager' : 'lazy';
      img.decoding = 'async';
      wrap.appendChild(img);
    } else {
      const ph = document.createElement('span');
      ph.className = 'shot__placeholder';
      ph.textContent = (p.brand || p.name).slice(0, 2).toUpperCase();
      ph.setAttribute('aria-hidden', 'true');
      wrap.appendChild(ph);
    }
    return wrap;
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

  /* Aviso de cobertura arriba de todo */
  if (d.announcement && d.announcement.enabled && d.announcement.text) {
    $('announceText').textContent = d.announcement.text;
    $('announce').querySelector('.announce__icon').innerHTML = icons.truck;
    $('announce').hidden = false;
  }

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
  if (d.showPrices && d.currencyNote) {
    $('catalogPriceNote').textContent = d.currencyNote;
    $('catalogPriceNote').hidden = false;
  }

  /* --- Bloque de precio (con espacio reservado aunque esté oculto) ---
     En la tarjeta solo va el precio: la moneda se aclara una vez arriba.
     En la ficha sí se repite la moneda, porque se ve sin el resto alrededor. */
  function priceBlock(p, conMoneda) {
    if (d.showPrices && p.price) {
      const nota = p.priceNote || (conMoneda ? d.currencyNote : '');
      return `
        <div class="price">
          <span class="price__value">${esc(p.price)}</span>
          ${nota ? `<span class="price__note">${esc(nota)}</span>` : ''}
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
     7. FICHA DEL PRODUCTO (modal)
     ==================================================================== */
  const modal = $('productModal');
  const modalBody = $('modalBody');
  let lastFocused = null;

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
        <div class="detail__stage" id="detailStage"></div>
        <div class="detail__body">
          <p class="detail__brand">${esc(p.brand)}</p>
          <h2 class="detail__name" id="modalName">${esc(p.name)}</h2>
          <p class="detail__short">${esc(p.short || '')}</p>
          <ul class="detail__list">${bullets}</ul>
          ${stockBlock(p)}
          <div class="detail__price">${priceBlock(p, true)}</div>
          <div class="detail__actions">
            <button class="btn btn--ink" type="button" data-add="${esc(p.id)}">Agregar al pedido</button>
            <a class="btn btn--primary btn--glow" href="${waLink(
              `Hola ${d.brand.name}, quiero cotizar: ${fullName(p)}.`
            )}" target="_blank" rel="noopener">${icons.whatsapp}<span>Cotizar ahora</span></a>
          </div>
        </div>
      </div>`;

    $('detailStage').appendChild(buildVisual(p, 'lg'));

    modalBody.querySelector('[data-add]').addEventListener('click', () => addToCart(p.id));

    modal.hidden = false;
    document.body.classList.add('is-locked');
    $('modalClose').focus();
  }

  function closeDetail() {
    modal.hidden = true;
    modalBody.innerHTML = '';
    if (cartEl.hidden) document.body.classList.remove('is-locked');
    if (lastFocused) lastFocused.focus();
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
          const miniatura = p.image
            ? `<img src="${esc(p.image)}" alt="" loading="lazy">`
            : esc(p.brand.slice(0, 2).toUpperCase());
          return `
            <div class="cart__item">
              <span class="cart__swatch" aria-hidden="true">${miniatura}</span>
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
     9. ENVÍOS Y SORTEO
     ==================================================================== */
  function bandaHTML(b, tipo, extra) {
    return `
      <article class="band band--${tipo}">
        <div class="band__text">
          <p class="eyebrow"><span class="eyebrow__rule" aria-hidden="true"></span><span>${esc(b.eyebrow)}</span></p>
          <h2 class="band__title">${esc(b.title)}</h2>
          <p class="band__note">${esc(b.text)}</p>
          ${extra || ''}
        </div>
        <p class="band__stat">
          <strong>${esc(b.statNumber)}</strong>
          <span>${esc(b.statLabel)}</span>
        </p>
      </article>`;
  }

  const bandas = [];
  if (d.shipping && d.shipping.enabled) {
    bandas.push(bandaHTML(d.shipping, 'light'));
  }
  if (d.raffle && d.raffle.enabled) {
    const cta = d.raffle.ctaText
      ? `<a class="btn btn--primary btn--glow band__cta" href="${waLink(
          `Hola ${d.brand.name}, quiero apartar mi lugar en el sorteo de la proteína.`
        )}" target="_blank" rel="noopener">${icons.whatsapp}<span>${esc(d.raffle.ctaText)}</span></a>`
      : '';
    bandas.push(bandaHTML(d.raffle, 'ink', cta));
  }
  if (bandas.length) {
    $('bands').innerHTML = bandas.join('');
    $('envios').hidden = false;
  }

  /* ====================================================================
     10. CÓMO COMPRAR
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
     11. ASESORÍA / COACH
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
     12. CONTACTO Y FOOTER
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
     13. NAVEGACIÓN
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
     14. APARICIÓN AL HACER SCROLL
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
  } else {
    document.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-in'));
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
     15. TECLADO
     ==================================================================== */
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    if (!modal.hidden) closeDetail();
    else if (!cartEl.hidden) closeCart();
  });

  /* ====================================================================
     16. GOOGLE ANALYTICS (opcional)
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
