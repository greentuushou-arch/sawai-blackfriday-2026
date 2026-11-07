/* ================================================================
   本番版(honban.html)のデータ。11/17ごろに差し替える想定。
   shop-data.js の商品・お買い得・売り場をそのまま使い、
   先行セールと新春福袋を外して本番の内容だけにする。
   ================================================================ */
(function () {
  'use strict';
  var base = window.BF_SHOP;

  window.BF_SHOP = Object.assign({}, base, {
    sections: ['teaser', 'deal', 'coupon', 'bargain', 'category'],

    ticker: ['BLACK FRIDAY 本番', '30種のBLACK FRIDAY福袋', '11/22は楽天スーパーDEAL 20倍', '1,000円ポッキリ', 'オトクなクーポン'],

    schedule: base.schedule,
    nav: [
      { id: 'teaser', label: 'BLACK FRIDAY福袋', short: '福袋', sp: true },
      { id: 'deal', label: '楽天スーパーDEAL 20倍', short: '20倍', sp: true },
      { id: 'coupon', label: 'オトクなクーポン', short: 'クーポン' },
      { id: 'bargain', label: '1,000円ポッキリ', short: 'お買い得', sp: true },
      { id: 'category', label: '売り場から探す', short: '売り場', sp: true }
    ],

    fv: Object.assign({}, base.fv, {
      signBand: null,
      catch: ['年に一度の', 'お祭り本番'],
      ship: ['11/19(木) 20:00〜', '11/25(水) 01:59'],
      boxLabel: 'BLACK FRIDAY福袋',
      cards: ['images/p-saledripbag.webp', 'images/p-483533.webp', 'images/p-dpfvgiga400.webp', 'images/p-coffee10s200.webp'],
      priceLead: 'BLACK FRIDAY福袋',
      price: 30,
      priceTail: '種'
    }),

    countdown: {
      startISO: '2026-11-19T20:00:00+09:00',
      endISO: '2026-11-25T01:59:59+09:00',
      before: '本番スタートまで',
      after: 'ブラックフライデー開催中',
      ended: 'ブラックフライデーは終了しました'
    },

    teaser: Object.assign({}, base.teaser, { kicker: 'BLACK FRIDAY 本番', period: null, secret: null }), /* 期間はFVに出すので重ねない */

    deal: Object.assign({}, base.deal, { notice: '本番の特別企画', secret: null }),

    coupon: Object.assign({}, base.coupon, { title: ['BLACK FRIDAY', '本番期間の', 'オトクなクーポン'] }),

    notes: base.notes.filter(function (n) { return n.indexOf('数量限定') < 0; })
  });
})();
