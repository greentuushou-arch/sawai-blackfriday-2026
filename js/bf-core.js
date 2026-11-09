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
  var SLOT_AREAS = '.fv, .feature'; /* 数字がそろう演出は福袋の場所だけ。ほかの価格は最初から止まった状態 */

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
      '<span class="card-img"><img src="' + esc(item.img) + '" alt="' + esc(item.name) + '" loading="lazy">' +
      (item.badge ? '<span class="card-badge">' + esc(item.badge) + '</span>' : '') + '</span>' +
      '<span class="card-body"><span class="card-name">' + esc(item.name) + '</span>' +
      (item.spec ? '<span class="card-spec">' + esc(item.spec) + '</span>' : '') + priceHtml(item) +
      (item.note ? '<span class="card-note">' + esc(item.note) + '</span>' : '') +
      (item.ship ? '<span class="ship">' + esc(item.ship) + '</span>' : '') + '</span></a>';
  }

  function secHead(kicker, title, lead) {
    return '<header class="sec-head rv"><p class="kicker">' + esc(kicker) + '</p><h2>' + lines(title) + '</h2>' +
      (lead ? '<p class="lead">' + esc(lead) + '</p>' : '') + '</header>';
  }

  /* 期間の大きな表示。p = { label, from:[日付,曜日,時刻], to:[...], note } */
  function periodHtml(p) {
    if (!p) return '';
    var row = function (a) { return '<span class="pd-row"><b>' + esc(a[0]) + '</b><span>' + esc(a[1]) + '</span><b>' + esc(a[2]) + '</b></span>'; };
    return '<div class="period rv"><p class="pd-label">' + esc(p.label) + '</p><p class="pd-when">' + row(p.from) + '<span class="pd-to">〜</span>' + row(p.to) + '</p>' +
      (p.note ? '<p class="pd-note">' + esc(p.note) + '</p>' : '') + '</div>';
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
    return '<section class="fv' + (f.style ? ' fv--' + esc(f.style) : '') + '" id="top" data-zone="black">' +
      '<div class="sign" id="sign"><svg class="bulbs" aria-hidden="true"><rect class="b-off"/><rect class="b-on"/></svg>' +
      '<p class="sign-small">' + esc(f.signSmall) + '</p>' +
      '<p class="sign-main" aria-label="' + esc(f.signLines.join(' ')) + '">' + lines(f.signLines) + '</p>' +
      (f.signBand ? '<p class="sign-band">' + esc(f.signBand) + '</p>' : '') + '</div>' +
      '<h1 class="fv-catch">' + lines(f.catch) + '</h1>' +
      (f.ship ? '<p class="fv-ship">' + (Array.isArray(f.ship) ? lines(f.ship) : esc(f.ship)) + '</p>' : '') +
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
        '<span class="sch-body">' + (Array.isArray(it.body) ? lines(it.body) : esc(it.body)) + '</span></a>';
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
    var ny = F.newYear;
    var head = ny
      ? '<header class="ny-head rv"><div><p class="kicker">' + esc(F.kicker) + '</p><p class="ny-year">' + esc(ny.year) + '</p><h2 class="ny-title">' + esc(ny.title) + '</h2></div>' +
        '<p class="ny-seal">' + lines(ny.seal) + '</p>' + '<p class="ny-catch">' + lines(F.title) + '</p>' +
        '<div class="ny-period">' + periodHtml(F.period) + '</div>' +
        (ny.ship ? '<p class="ny-ship">' + esc(ny.ship) + '</p>' : '') + '<p class="lead">' + esc(F.lead) + '</p>' +
        (F.soldout ? '<p class="ny-soldout">' + esc(F.soldout) + '</p>' : '') + '</header>'
      : secHead(F.kicker, F.title, F.lead);
    var zone = ny ? 'newyear' : 'black';
    return '<section class="feature ' + (ny ? 'z-newyear' : 'z-black') + '" id="feature" data-zone="' + zone + '" data-burst>' + head +
      '<div class="band rv"><p class="band-lead">' + esc(F.bandLead) + '</p><p class="band-price"><span data-slot="' + yen(F.bandPrice) + '">' + yen(F.bandPrice) + '</span><small>' + esc(F.bandTail) + '</small></p>' +
      '<div class="hero-pair">' + F.half.map(halfCard).join('') + '</div></div>' +
      F.wide.map(wideCard).join('') + '</section>';
  };

  PARTS.deal = function () {
    var d = D.deal;
    if (d.secret) {
      return '<section class="deal z-black is-secret" id="deal" data-zone="black"><i class="rays" aria-hidden="true"></i>' +
        (d.notice ? '<p class="deal-notice rv">' + esc(d.notice) + '</p>' : '') +
        '<p class="deal-date rv"><span>' + esc(d.date.pre) + '</span><b>' + esc(d.date.day) + '</b><span>' + esc(d.date.tail) + '</span></p>' +
        '<p class="deal-limit rv">' + esc(d.limit) + '</p>' +
        '<p class="deal-tease rv">' + lines(d.secret.lines) + '</p>' +
        '<div class="deal-hero secret-photo rv"><img src="' + esc(d.hero) + '" alt="" loading="lazy"><b>?</b></div>' +
        (d.secret.hint ? '<p class="deal-hint rv">' + esc(d.secret.hint) + '</p>' : '') +
        '<p class="soon rv">' + esc(d.secret.soon) + '</p></section>';
    }
    return '<section class="deal z-black" id="deal" data-zone="black" data-burst><i class="rays" aria-hidden="true"></i>' +
      (d.notice ? '<p class="deal-notice rv">' + esc(d.notice) + '</p>' : '') +
      '<p class="deal-date rv"><span>' + esc(d.date.pre) + '</span><b>' + esc(d.date.day) + '</b><span>' + esc(d.date.tail) + '</span></p>' +
      '<p class="deal-limit rv">' + esc(d.limit) + '</p>' +
      '<h2 class="deal-title rv"><span class="deal-tag">' + esc(d.tag) + '</span><span class="deal-name">' + esc(d.name) + '</span></h2>' +
      '<p class="deal-big rv"><span class="deal-num">' + esc(d.number) + '</span><span class="deal-unit">' + esc(d.unit) + '</span></p>' +
      '<p class="deal-head rv">' + esc(d.head) + '</p>' +
      '<ul class="deal-why rv">' + d.reasons.map(function (r) { return '<li>' + esc(r) + '</li>'; }).join('') + '</ul>' +
      (d.hero
        ? '<a class="deal-hero rv" href="' + esc(d.item.url) + '"><img src="' + esc(d.hero) + '" alt="' + esc(d.item.name) + '" loading="lazy"></a>' +
          '<div class="deal-detail rv"><p class="card-spec big">' + esc(d.item.spec) + '</p><h3>' + esc(d.item.name) + '</h3>' + priceHtml(d.item, 'price-l') +
          (d.item.ship ? '<p class="ship">' + esc(d.item.ship) + '</p>' : '') +
          (d.item.points ? '<ul class="deal-points">' + d.item.points.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('') + '</ul>' : '') +
          '<a class="btn" href="' + esc(d.item.url) + '">' + esc(d.item.cta || '商品を見る') + '</a></div>'
        : '<a class="deal-item rv" href="' + esc(d.item.url) + '"><img src="' + esc(d.item.img) + '" alt="' + esc(d.item.name) + '" loading="lazy">' +
          '<span class="card-body"><span class="card-name">' + esc(d.item.name) + '</span><span class="card-spec">' + esc(d.item.spec) + '</span>' + priceHtml(d.item) + '</span></a>') +
      '<a class="btn btn-gold rv" href="' + esc(d.link) + '">' + esc(d.linkLabel) + '</a></section>';
  };

  PARTS.bargain = function () {
    var b = D.bargain;
    return '<section class="bargain z-black" id="bargain" data-zone="black">' +
      '<header class="sec-head rv"><p class="kicker">' + esc(b.kicker) + '</p><h2 class="poki">' + b.title.map(function (t) {
        return '<span class="ln">' + esc(t).replace(/円$/, '<small>円</small>') + '</span>';
      }).join('') + '</h2><p class="lead">' + esc(b.lead) + '</p></header>' +
      '<div class="grid">' + b.items.map(miniCard).join('') + '</div>' +
      (b.more ? '<h3 class="sub-head rv">' + esc(b.more.head) + '</h3><div class="grid">' + b.more.items.map(miniCard).join('') + '</div>' : '') + '</section>';
  };

  PARTS.coupon = function () {
    var c = D.coupon;
    if (c.layout === 'ladder') return couponLadder(c);
    var tiers = c.tiers.map(function (t, i) {
      var ready = t.url && t.url !== '#';
      var unit = t.unit || ['円', 'OFF'];
      return '<a class="ticket rv t-' + i + (t.style ? ' is-' + esc(t.style) : '') + '" href="' + esc(t.url) + '"' + (ready ? '' : ' aria-disabled="true"') + '>' +
        (t.tag ? '<span class="ticket-tag">' + esc(t.tag) + '</span>' : '') +
        '<span class="ticket-min">' + esc(t.cond || (t.min + 'で')) + '</span>' +
        '<span class="ticket-off"><b>' + esc(t.off) + '</b><span>' + esc(unit[0]) + '<br>' + esc(unit[1]) + '</span></span>' +
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
    var period = periodHtml(t.period);
    if (t.secret) {
      /* 先行中は本番の中身を伏せて匂わせる。袋の数で種類数が分からないよう secret.count 個だけ並べる */
      bags = '';
      for (var j = 0; j < (t.secret.count || 12); j++) bags += '<i style="--i:' + j + '">' + BAG_SVG + '</i>';
      var kick = Array.isArray(t.kicker) ? '<h2 class="teaser-head rv">' + lines(t.kicker) + '</h2>' : '<p class="kicker rv">' + esc(t.kicker) + '</p>';
      return '<section class="teaser z-black is-secret" id="teaser" data-zone="black">' + kick + period +
        '<h2 class="secret-title rv">' + lines(t.secret.title) + '</h2>' +
        '<div class="bags" data-bags>' + bags + '</div><p class="soon rv">' + esc(t.secret.soon) + '</p></section>';
    }
    return '<section class="teaser z-black" id="teaser" data-zone="black"><p class="kicker rv">' + esc(t.kicker) + '</p>' + period +
      '<p class="teaser-num rv"><span>' + esc(t.numberLead) + '</span><b>' + esc(t.numberText) + '</b><span>' + esc(t.unit) + 'の</span></p><h2 class="rv">' + esc(t.title) + '</h2>' +
      '<div class="bags" data-bags>' + bags + '</div><p class="lead rv">' + esc(t.body) + '</p></section>';
  };

  /* 段階クーポン: 下へ行くほど幅と数字が大きくなる階段 */
  function couponLadder(c) {
    var n = c.tiers.length;
    var ready = c.url && c.url !== '#';
    var rows = c.tiers.map(function (t, i) {
      return '<li class="rv" style="--i:' + i + ';--n:' + n + '"><span class="ld-min">' + esc(t.min) + '</span>' +
        '<span class="ld-off"><b>' + esc(t.off) + '</b><span>円OFF</span></span></li>';
    }).join('');
    return '<section class="coupon z-gold" id="coupon" data-zone="gold">' + secHead(c.kicker, c.title, c.lead) +
      '<ol class="ladder">' + rows + '</ol>' +
      '<a class="btn' + (ready ? '' : ' is-wait') + ' rv" href="' + esc(c.url || '#') + '">' + esc(ready ? c.cta : '準備中') + '</a>' +
      (c.items ? '<h3 class="sub-head rv">' + esc(c.itemsHead) + '</h3><div class="grid">' + c.items.map(miniCard).join('') + '</div>' : '') + '</section>';
  }

  /* おまけ: 金額に応じたプレゼント + キーワード */
  PARTS.omake = function () {
    var o = D.omake;
    var gifts = o.tiers.map(function (t) {
      return '<div class="gift rv"><p class="gift-min"><b>' + esc(t.min) + '</b><span>お買い上げで</span></p>' +
        '<p class="gift-what"><span>' + esc(t.item) + '</span><b>' + esc(t.qty) + '</b><span>' + esc(t.unit) + '</span></p>' +
        '<p class="gift-tag">プレゼント</p></div>';
    }).join('');
    var kw = o.keyword ? '<div class="keyword rv"><p class="kw-lead">' + esc(o.keyword.lead) + '</p><p class="kw-word">' + esc(o.keyword.word) + '</p><p class="kw-body">' + esc(o.keyword.body) + '</p></div>' : '';
    return '<section class="omake z-black" id="omake" data-zone="black" data-burst>' + secHead(o.kicker, o.title) +
      periodHtml(o.period) + '<div class="gifts">' + gifts + '</div>' +
      (o.note ? '<p class="omake-note rv">' + esc(o.note) + '</p>' : '') + kw + '</section>';
  };

  /* 商品一覧: グループごとに大きな札(半額など)と見出し */
  PARTS.lineup = function () {
    var L = D.lineup;
    var groups = L.groups.map(function (g) {
      return '<div class="lineup-group" id="' + esc(g.id) + '"><header class="lg-head rv"><span class="lg-badge">' + esc(g.badge) + '</span>' +
        '<div><h3>' + esc(g.title) + '</h3>' + (g.lead ? '<p>' + esc(g.lead) + '</p>' : '') + '</div></header>' +
        '<div class="grid">' + g.items.map(miniCard).join('') + '</div></div>';
    }).join('');
    return '<section class="lineup z-black" id="lineup" data-zone="black">' + secHead(L.kicker, L.title, L.lead) + groups + '</section>';
  };

  /* 目玉アイテム: FV直下の控えめな横並び。下の福袋へつなぐ一言つき */
  PARTS.picks = function () {
    var p = D.picks;
    var cards = p.items.map(function (it) {
      return '<a class="pick rv" href="' + esc(it.url) + '"><span class="pick-img"><img src="' + esc(it.img) + '" alt="' + esc(it.name) + '" loading="lazy"></span>' +
        '<span class="pick-body"><span class="pick-name">' + esc(it.name) + '</span>' +
        '<span class="pick-price"><b>' + yen(it.price) + '</b>円' + (it.from ? '〜' : '') + '</span></span></a>';
    }).join('');
    return '<section class="picks z-black" id="picks" data-zone="black"><h2 class="picks-head rv">' + esc(p.title) + '</h2>' +
      '<div class="picks-row">' + cards + '</div>' +
      (p.next ? '<a class="picks-next rv" href="' + esc(p.next.href) + '"><span>' + esc(p.next.lead) + '</span><b>' + esc(p.next.text) + '</b><i aria-hidden="true"></i></a>' : '') +
      '</section>';
  };

  /* クーポン獲得ボタン。url が # の間はリンクなしで見た目だけ出す */
  function couponBtn(c) {
    if (!c) return '';
    var ready = c.url && c.url !== '#';
    var inner = '<b>' + esc(c.amount) + '</b>円クーポン<span>獲得する</span>';
    return ready
      ? '<a class="btn-coupon" href="' + esc(c.url) + '">' + inner + '</a>'
      : '<span class="btn-coupon" aria-disabled="true">' + inner + '</span>';
  }

  /* 白と黒: 左右で白地と黒地に分けた2商品の紹介 */
  PARTS.duo = function () {
    var d = D.duo;
    var heads = d.heads.map(function (h) {
      return '<p class="duo-h duo-h--' + esc(h.tone) + '">' + esc(h.text) + '</p>';
    }).join('');
    var cards = d.items.map(function (it) {
      return '<article class="duo-card duo-card--' + esc(it.tone) + ' rv">' +
        '<a class="duo-img" href="' + esc(it.url) + '"><img src="' + esc(it.img) + '" alt="' + esc(it.name) + '" loading="lazy"></a>' +
        '<div class="duo-body"><p class="card-spec big">' + esc(it.spec) + '</p><h3>' + esc(it.name) + '</h3>' +
        '<p class="duo-perks"><span class="duo-off">' + esc(it.off) + '</span><span class="duo-pt">' + esc(it.point[0]) + '<b>' + esc(it.point[1]) + '</b>' + esc(it.point[2]) + '</span></p>' +
        '<s class="was">通常 ' + yen(it.was) + '円</s>' +
        '<p class="price price-l"><span class="num">' + yen(it.price) + '</span><span class="yen">円</span></p>' +
        '<p class="duo-note">' + esc(it.note) + '</p>' + (it.ship ? '<p class="ship">' + esc(it.ship) + '</p>' : '') +
        couponBtn(it.coupon) +
        '<a class="btn" href="' + esc(it.url) + '">商品を見る</a></div></article>';
    }).join('');
    return '<section class="duo" id="duo" data-zone="black">' +
      '<header class="duo-head rv"><p class="kicker">' + esc(d.kicker) + '</p><div class="duo-hs">' + heads + '</div></header>' +
      periodHtml(d.period) +
      (d.photo ? '<figure class="duo-photo rv"><img src="' + esc(d.photo) + '" alt="" loading="lazy"></figure>' : '') +
      '<p class="lead duo-lead rv">' + esc(d.lead) + '</p>' +
      '<div class="duo-cards">' + cards + '</div></section>';
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
    var now = nowDate();
    var diff = new Date(c.startISO) - now;
    var nodes = document.querySelectorAll('[data-count]');
    var html;
    if (c.endISO && now >= new Date(c.endISO)) {
      html = '<p class="count-live">' + esc(c.ended) + '</p>';
    } else if (diff <= 0) {
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
    if (REDUCED || el.dataset.done || !el.closest(SLOT_AREAS)) return;
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
