/* ================================================================
   BF テンプレート コア
   BF_SHOP (shop-data.js) を読んでページを組み立てる。
   パーツ = PARTS の各関数。店舗データの sections に名前を並べるだけ。
   ================================================================ */
(function () {
  'use strict';

  var D = window.BF_SHOP;
  var REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var CONFETTI_COUNT = { load: 120, section: 46 };
  var SLOT_MS_PER_DIGIT = 260;

  /* ---------- 小さな道具 ---------- */
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function yen(n) { return Number(n).toLocaleString('ja-JP'); }
  function lines(arr) { return arr.map(function (t) { return '<span class="ln">' + esc(t) + '</span>'; }).join(''); }
  function nowDate() {
    var q = new URLSearchParams(location.search).get('now'); /* 確認用 ?now=2026-11-13T10:00 */
    return q ? new Date(q) : new Date();
  }

  var BAG_SVG = '<svg viewBox="0 0 60 66" aria-hidden="true"><path d="M30 15C25 9 17 6 17 6l6 9C11 21 4 34 4 45c0 13 13 18 26 18s26-5 26-18c0-11-7-24-19-30l6-9s-8 3-13 9z"/><rect x="21" y="13" width="18" height="4" rx="2"/></svg>';

  /* ---------- 価格 ---------- */
  function priceHtml(item, cls) {
    var was = item.was ? '<s class="was">' + yen(item.was) + '円</s>' : '';
    var from = item.from ? '<span class="from">〜</span>' : '';
    var long = String(item.price).length >= 5 && !cls ? ' is-long' : '';
    return was + '<p class="price ' + (cls || '') + long + '"><span class="num" data-slot="' + yen(item.price) + '">' + yen(item.price) + '</span><span class="yen">円</span>' + from + '</p>';
  }

  function insideHtml(item) {
    if (!item.inside) return '';
    return '<details class="inside"><summary>中身を見る</summary><ul>' +
      item.inside.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('') + '</ul></details>';
  }

  function miniCard(item) {
    return '<a class="card rv" href="' + esc(item.url) + '">' +
      '<span class="card-img"><img src="' + esc(item.img) + '" alt="' + esc(item.name) + '" loading="lazy"></span>' +
      '<span class="card-body"><span class="card-name">' + esc(item.name) + '</span>' +
      '<span class="card-spec">' + esc(item.spec) + '</span>' + priceHtml(item) +
      (item.ship ? '<span class="ship">' + esc(item.ship) + '</span>' : '') + '</span></a>';
  }

  function secHead(kicker, title, lead) {
    return '<header class="sec-head rv"><p class="kicker">' + esc(kicker) + '</p><h2>' + lines(title) + '</h2>' +
      (lead ? '<p class="lead">' + esc(lead) + '</p>' : '') + '</header>';
  }

  /* ---------- パーツ ---------- */
  var PARTS = {};

  PARTS.ticker = function () {
    var run = D.ticker.map(function (t) { return '<span>' + esc(t) + '</span>'; }).join('');
    return '<div class="ticker" aria-hidden="true"><div class="ticker-run">' + run + run + run + '</div></div>';
  };

  PARTS.fv = function () {
    var f = D.fv;
    var cards = f.cards.map(function (src, i) {
      return '<img class="fan fan-' + i + '" src="' + esc(src) + '" alt="">';
    }).join('');
    return '<section class="fv" id="top" data-zone="black">' +
      '<div class="sign" id="sign"><svg class="bulbs" aria-hidden="true"><rect class="b-off"/><rect class="b-on"/></svg>' +
      '<p class="sign-small">' + esc(f.signSmall) + '</p>' +
      '<p class="sign-main" aria-label="' + esc(f.signLines.join(' ')) + '">' + lines(f.signLines) + '</p>' +
      (f.signBand ? '<p class="sign-band">' + esc(f.signBand) + '</p>' : '') + '</div>' +
      '<h1 class="fv-catch">' + lines(f.catch) + '</h1>' +
      '<div class="tag"><span class="tag-lead">' + esc(f.priceLead) + '</span>' +
      '<span class="tag-num" data-slot="' + yen(f.price) + '">' + yen(f.price) + '</span>' +
      '<span class="tag-tail">' + esc(f.priceTail) + '</span></div>' +
      '<div class="burst">' + cards +
      '<div class="box"><i class="flap flap-l"></i><i class="flap flap-r"></i><div class="box-front"><span>' + esc(f.boxLabel) + '</span></div></div></div>' +
      '<div class="count" data-count></div>' +
      '</section>';
  };

  PARTS.schedule = function () {
    var S = D.schedule;
    var now = nowDate();
    var rows = S.items.map(function (it) {
      var on = it.manual === 'main' ? D.mainLive : (it.startISO && now >= new Date(it.startISO));
      return '<a class="sch rv' + (on ? ' is-on' : '') + '" href="' + esc(it.href) + '">' +
        '<span class="sch-no">' + esc(it.no) + '</span>' +
        '<span class="sch-when">' + esc(it.when) + '</span>' +
        '<span class="sch-head">' + esc(it.head) + '</span>' +
        '<span class="sch-body">' + esc(it.body) + '</span></a>';
    }).join('');
    return '<section class="schedule z-black" id="schedule" data-zone="black"><h2 class="sch-title rv">' + lines(S.title) + '</h2><div class="sch-list">' + rows + '</div></section>';
  };

  function halfCard(it) {
    return '<div class="hero-m rv"><a href="' + esc(it.url) + '"><img src="' + esc(it.img) + '" alt="' + esc(it.name) + '" loading="lazy"></a>' +
      '<div class="hero-body"><h3>' + esc(it.name) + '</h3><p class="card-spec">' + esc(it.spec) + '</p>' +
      '<p class="ship">' + esc(it.ship) + '</p>' + insideHtml(it) +
      '<a class="btn btn-s" href="' + esc(it.url) + '">商品を見る</a></div></div>';
  }
  function wideCard(it) {
    return '<article class="hero-l rv"><a class="hero-l-img" href="' + esc(it.url) + '"><img src="' + esc(it.img) + '" alt="' + esc(it.name) + '" loading="lazy"></a>' +
      '<div class="hero-body"><p class="card-spec big">' + esc(it.spec) + '</p><h3>' + esc(it.name) + '</h3>' +
      '<div class="hero-price">' + priceHtml(it, 'price-l') + '<p class="ship">' + esc(it.ship) + '</p></div>' +
      '<p class="percup"><span>1杯あたり</span><b>' + esc(it.perCup) + '</b></p>' + insideHtml(it) +
      '<a class="btn" href="' + esc(it.url) + '">この福袋を見る</a></div></article>';
  }

  PARTS.feature = function () {
    var F = D.feature;
    return '<section class="feature z-black" id="feature" data-zone="black" data-burst>' +
      secHead(F.kicker, F.title, F.lead) +
      '<div class="band rv"><p class="band-lead">' + esc(F.bandLead) + '</p><p class="band-price"><span data-slot="' + yen(F.bandPrice) + '">' + yen(F.bandPrice) + '</span><small>' + esc(F.bandTail) + '</small></p>' +
      '<div class="hero-pair">' + F.half.map(halfCard).join('') + '</div></div>' +
      F.wide.map(wideCard).join('') + '</section>';
  };

  PARTS.deal = function () {
    var d = D.deal;
    return '<section class="deal z-red" id="deal" data-zone="red"><i class="rays" aria-hidden="true"></i>' +
      '<p class="deal-when rv">' + esc(d.when) + '</p>' +
      '<p class="deal-big rv"><span class="deal-head">' + esc(d.head) + '</span><span class="deal-num">' + esc(d.number) + '</span><span class="deal-unit">' + esc(d.unit) + '</span></p>' +
      '<p class="deal-body rv">' + esc(d.body) + '</p>' +
      '<a class="deal-item rv" href="' + esc(d.item.url) + '"><img src="' + esc(d.item.img) + '" alt="' + esc(d.item.name) + '" loading="lazy">' +
      '<span class="card-body"><span class="card-name">' + esc(d.item.name) + '</span><span class="card-spec">' + esc(d.item.spec) + '</span>' + priceHtml(d.item) + '</span></a>' +
      '<a class="btn btn-gold rv" href="' + esc(d.link) + '">' + esc(d.linkLabel) + '</a></section>';
  };

  PARTS.bargain = function () {
    var b = D.bargain;
    return '<section class="bargain z-black" id="bargain" data-zone="black">' +
      '<header class="sec-head rv"><p class="kicker">' + esc(b.kicker) + '</p><h2 class="poki">' + lines(b.title) + '</h2><p class="lead">' + esc(b.lead) + '</p></header>' +
      '<div class="grid">' + b.items.map(miniCard).join('') + '</div>' +
      (b.more ? '<h3 class="sub-head rv">' + esc(b.more.head) + '</h3><div class="grid">' + b.more.items.map(miniCard).join('') + '</div>' : '') + '</section>';
  };

  PARTS.coupon = function () {
    var c = D.coupon;
    var tiers = c.tiers.map(function (t, i) {
      var ready = t.url && t.url !== '#';
      return '<a class="ticket rv t-' + i + '" href="' + esc(t.url) + '"' + (ready ? '' : ' aria-disabled="true"') + '>' +
        '<span class="ticket-min">' + esc(t.min) + 'で</span>' +
        '<span class="ticket-off"><b>' + esc(t.off) + '</b><span>円<br>OFF</span></span>' +
        '<span class="ticket-go">' + (ready ? '取得する' : '準備中') + '</span></a>';
    }).join('');
    return '<section class="coupon z-gold" id="coupon" data-zone="gold" data-burst>' + secHead(c.kicker, c.title) +
      (c.isSample ? '<p class="sample rv">金額は仮です</p>' : '') +
      '<div class="tickets">' + tiers + '</div>' +
      '<h3 class="sub-head rv">' + esc(c.itemsHead) + '</h3>' +
      '<div class="grid">' + c.items.map(miniCard).join('') + '</div></section>';
  };

  PARTS.category = function () {
    var c = D.category;
    var chips = c.floors.map(function (f) { return '<a class="chip" href="#' + esc(f.id) + '">' + esc(f.name) + '</a>'; }).join('');
    var floors = c.floors.map(function (f, i) {
      return '<div class="floor" id="' + esc(f.id) + '"><h3 class="floor-head rv"><span class="fl-no">' + (c.floors.length - i) + 'F</span>' + esc(f.name) + '</h3>' +
        '<div class="grid">' + f.items.map(miniCard).join('') + '</div>' +
        (f.more ? '<a class="more rv" href="' + esc(f.more) + '">' + esc(f.name) + 'をもっと見る</a>' : '') + '</div>';
    }).join('');
    return '<section class="category z-black" id="category" data-zone="black">' + secHead(c.kicker, c.title) +
      '<div class="chips rv">' + chips + '</div>' + floors + '</section>';
  };

  PARTS.teaser = function () {
    var t = D.teaser;
    if (D.mainLive && t.bags.length) {
      return '<section class="teaser z-black" id="teaser" data-zone="black">' + secHead(t.kicker, [t.title]) +
        '<div class="grid">' + t.bags.map(miniCard).join('') + '</div></section>';
    }
    var bags = '';
    for (var i = 0; i < t.count; i++) bags += '<i style="--i:' + i + '">' + BAG_SVG + '</i>';
    return '<section class="teaser z-black" id="teaser" data-zone="black"><p class="kicker rv">' + esc(t.kicker) + '</p>' +
      '<p class="teaser-num rv"><span>' + esc(t.numberLead) + '</span><b>' + esc(t.numberText) + '</b><span>' + esc(t.unit) + 'の</span></p><h2 class="rv">' + esc(t.title) + '</h2>' +
      '<div class="bags" data-bags>' + bags + '</div><p class="lead rv">' + esc(t.body) + '</p></section>';
  };

  function footer() {
    return '<footer class="foot"><ul>' + D.notes.map(function (n) { return '<li>' + esc(n) + '</li>'; }).join('') + '</ul>' +
      '<a class="btn btn-gold" href="' + esc(D.shopUrl) + '">' + esc(D.name) + ' トップへ</a></footer>';
  }

  /* ---------- 両脇のレール(PC) ---------- */
  function renderRails() {
    document.getElementById('railL').innerHTML =
      '<p class="rail-sign">' + lines(D.fv.signLines) + '</p>' +
      (D.fv.signBand ? '<p class="rail-band">' + esc(D.fv.signBand) + '</p>' : '') +
      '<p class="rail-shop">' + esc(D.name) + '</p>' +
      '<div class="count count-rail" data-count></div>' +
      '<a class="rail-tag" href="#feature"><span>' + esc(D.fv.priceLead) + '</span><b>' + yen(D.fv.price) + '</b><span>' + esc(D.fv.priceTail) + '</span></a>';
    document.getElementById('railR').innerHTML =
      '<p class="rail-title">売り場案内</p><ul class="rail-nav">' + D.nav.map(function (n, i) {
        return '<li><a href="#' + esc(n.id) + '" data-nav="' + esc(n.id) + '"><span>' + esc(n.label) + '</span><em>' + (i + 1) + '</em></a></li>';
      }).join('') + '</ul>';
    document.getElementById('tabbar').innerHTML = D.nav.filter(function (n) { return n.sp; }).map(function (n) {
      return '<a href="#' + esc(n.id) + '" data-nav="' + esc(n.id) + '">' + esc(n.short) + '</a>';
    }).join('');
  }

  /* ---------- 組み立て ---------- */
  function render() {
    var html = '';
    if (D.isDemo) html += '<p class="demo">確認用サンプル: 商品・価格・クーポンは仮です</p>';
    html += PARTS.ticker() + PARTS.fv();
    D.sections.forEach(function (name) {
      if (!PARTS[name]) { console.warn('未定義のパーツ: ' + name); return; }
      html += PARTS[name]();
    });
    html += footer();
    document.getElementById('app').innerHTML = html;
    renderRails();
  }

  /* ---------- カウントダウン ---------- */
  function tickCount() {
    var c = D.countdown;
    var diff = new Date(c.startISO) - nowDate();
    var nodes = document.querySelectorAll('[data-count]');
    var html;
    if (diff <= 0) {
      html = '<p class="count-live">' + esc(c.after) + '</p>';
    } else {
      var s = Math.floor(diff / 1000);
      var pad = function (n) { return String(n).padStart(2, '0'); };
      html = '<p class="count-lead">' + esc(c.before) + '</p><p class="count-num">' +
        '<b>' + Math.floor(s / 86400) + '</b><i>日</i><b>' + pad(Math.floor(s / 3600) % 24) + '</b><i>時間</i><b>' +
        pad(Math.floor(s / 60) % 60) + '</b><i>分</i><b>' + pad(s % 60) + '</b><i>秒</i></p>';
    }
    nodes.forEach(function (n) { n.innerHTML = html; });
  }

  /* ---------- 電球の縁取り ---------- */
  function sizeBulbs() {
    var sign = document.getElementById('sign');
    if (!sign) return;
    var r = sign.getBoundingClientRect();
    if (r.width < 20) return;
    var svg = sign.querySelector('.bulbs');
    svg.setAttribute('viewBox', '0 0 ' + r.width + ' ' + r.height);
    svg.querySelectorAll('rect').forEach(function (el) {
      el.setAttribute('x', 7); el.setAttribute('y', 7);
      el.setAttribute('width', r.width - 14); el.setAttribute('height', r.height - 14);
      el.setAttribute('rx', 14);
    });
  }

  /* ---------- 数字がそろう演出 ---------- */
  function spin(el) {
    if (REDUCED || el.dataset.done) return;
    el.dataset.done = '1';
    var target = el.dataset.slot;
    var digits = target.split('');
    var start = performance.now();
    (function step(t) {
      var settled = Math.floor((t - start) / SLOT_MS_PER_DIGIT);
      var txt = digits.map(function (ch, i) {
        if (!/\d/.test(ch) || i < settled) return ch;
        return String(Math.floor(Math.random() * 10));
      }).join('');
      el.textContent = txt;
      if (settled <= digits.length) { requestAnimationFrame(step); return; }
      el.textContent = target;
      el.classList.add('hit');
    })(start);
  }

  /* ---------- 紙吹雪とコーヒー豆 ---------- */
  var FX = (function () {
    var cv = document.getElementById('fx');
    var ctx = cv.getContext('2d');
    var parts = [];
    var running = false;
    var cs = getComputedStyle(document.documentElement);
    function color(name) { return cs.getPropertyValue(name).trim() || '#e9c264'; }
    function resize() { cv.width = innerWidth; cv.height = innerHeight; }
    function add(x, y, n) {
      if (REDUCED) return;
      var pal = [color('--c-gold'), color('--c-gold-light'), color('--c-gold-deep'), color('--c-red')];
      for (var i = 0; i < n; i++) {
        var a = Math.random() * Math.PI * 2;
        var v = 3 + Math.random() * 9;
        parts.push({
          x: x + (Math.random() - .5) * 140, y: y, vx: Math.cos(a) * v, vy: Math.sin(a) * v - 6, r: Math.random() * 6.28, vr: (Math.random() - .5) * .3,
          s: 5 + Math.random() * 7, bean: Math.random() < .28, c: pal[i % pal.length], life: 120 + Math.random() * 60
        });
      }
      if (!running) { running = true; requestAnimationFrame(frame); }
    }
    function drawBean(p) {
      ctx.fillStyle = '#3a2112';
      ctx.beginPath(); ctx.ellipse(0, 0, p.s, p.s * .68, 0, 0, 6.29); ctx.fill();
      ctx.strokeStyle = '#120a05'; ctx.lineWidth = 1.4;
      ctx.beginPath(); ctx.moveTo(-p.s, 0); ctx.quadraticCurveTo(0, p.s * .4, p.s, 0); ctx.stroke();
    }
    function frame() {
      ctx.clearRect(0, 0, cv.width, cv.height);
      parts = parts.filter(function (p) { return p.life > 0 && p.y < cv.height + 40; });
      parts.forEach(function (p) {
        p.x += p.vx; p.y += p.vy; p.vy += .22; p.vx *= .985; p.r += p.vr; p.life--;
        ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.r); ctx.globalAlpha = Math.min(1, p.life / 30);
        if (p.bean) { drawBean(p); } else { ctx.fillStyle = p.c; ctx.fillRect(-p.s / 2, -p.s / 4, p.s, p.s * Math.abs(Math.cos(p.r * 2)) * .7 + 1); }
        ctx.restore();
      });
      if (parts.length) { requestAnimationFrame(frame); } else { running = false; ctx.clearRect(0, 0, cv.width, cv.height); }
    }
    resize();
    addEventListener('resize', resize);
    return { burst: add };
  })();

  /* ---------- スクロール連動 ---------- */
  function observe() {
    var revealIO = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add('in');
        e.target.querySelectorAll('[data-slot]').forEach(spin);
        revealIO.unobserve(e.target);
      });
    }, { threshold: .18 });
    document.querySelectorAll('.rv').forEach(function (el) { revealIO.observe(el); });

    var bagsIO = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('lit'); bagsIO.unobserve(e.target); } });
    }, { threshold: .3 });
    document.querySelectorAll('[data-bags]').forEach(function (el) { bagsIO.observe(el); });

    var burstIO = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        FX.burst(innerWidth / 2, innerHeight * .3, CONFETTI_COUNT.section);
        burstIO.unobserve(e.target);
      });
    }, { rootMargin: '-40% 0px -40% 0px' });
    document.querySelectorAll('[data-burst]').forEach(function (el) { burstIO.observe(el); });

    /* 現在地: 帯の色・右メニューの点灯 */
    var navIds = D.nav.map(function (n) { return n.id; });
    var spyIO = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        document.body.dataset.zone = e.target.dataset.zone || 'black';
        document.querySelectorAll('[data-nav]').forEach(function (a) {
          a.classList.toggle('is-here', a.dataset.nav === e.target.id);
        });
      });
    }, { rootMargin: '-50% 0px -50% 0px' });
    document.querySelectorAll('section[id]').forEach(function (s) {
      if (navIds.indexOf(s.id) >= 0 || s.dataset.zone) spyIO.observe(s);
    });
  }

  /* ---------- 開始 ---------- */
  function intro() {
    document.body.classList.add('lit');
    document.querySelectorAll('.fv [data-slot]').forEach(function (el) { setTimeout(function () { spin(el); }, 900); });
    var burst = document.querySelector('.burst');
    setTimeout(function () {
      var r = burst.getBoundingClientRect();
      FX.burst(r.left + r.width / 2, r.top + r.height * .55, CONFETTI_COUNT.load);
    }, 950);
  }

  render();
  tickCount();
  setInterval(tickCount, 1000);
  sizeBulbs();
  addEventListener('resize', sizeBulbs);
  observe();
  if (document.fonts && document.fonts.ready) { document.fonts.ready.then(sizeBulbs); }
  setTimeout(intro, 60);
})();
