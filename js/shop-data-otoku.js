/* ================================================================
   お得福袋版(otoku.html)のデータ。
   おまけ(11/18 0:00〜11/25 23:59)、7段階クーポン、お得福袋25商品。
   店名・ロゴ・注意書きなどは shop-data.js を引き継ぐ。
   was = 通常価格(取り消し線)、price = 割引後の価格。
   ================================================================ */
(function () {
  'use strict';
  var base = window.BF_SHOP;
  var IMG = 'images/o/';
  var URL = 'https://item.rakuten.co.jp/sawaicoffee-tea/';
  function item(slug, img, name, was, price, extra) {
    return Object.assign({ name: name, img: IMG + img, was: was, price: price, url: URL + slug + '/' }, extra || {});
  }

  window.BF_SHOP = Object.assign({}, base, {
    sections: ['omake', 'coupon', 'lineup'],

    ticker: ['BLACK FRIDAY お得福袋25種', '半額福袋 17種', '最大2,500円OFFクーポン', '5,400円以上でドリップバッグ プレゼント'],

    nav: [
      { id: 'omake', label: 'おまけプレゼント', short: 'おまけ', sp: true },
      { id: 'coupon', label: '7段階クーポン', short: 'クーポン', sp: true },
      { id: 'g-half', label: '半額の福袋', short: '半額', sp: true },
      { id: 'g-ten', label: '10%OFFの福袋', short: '10%OFF', sp: true },
      { id: 'g-try', label: 'お試し商品', short: 'お試し' }
    ],

    fv: Object.assign({}, base.fv, {
      signBand: 'お得福袋 25種',
      catch: ['半額の福袋が', '17種そろう'],
      ship: 'おまけも クーポンも',
      boxLabel: 'お得福袋',
      cards: [IMG + 'osechi200set1803ss.webp', IMG + 'goldsilverbitter.webp', IMG + 'goldsilveryakumo1601.webp', IMG + 'osechisw100set1803ss.webp'],
      priceLead: '最大',
      price: 50,
      priceTail: '%OFF'
    }),

    countdown: {
      startISO: '2026-11-18T00:00:00+09:00',
      endISO: '2026-11-25T23:59:59+09:00',
      before: 'おまけスタートまで',
      after: 'おまけ開催中',
      ended: 'おまけは終了しました'
    },

    omake: {
      kicker: 'おまけ',
      title: ['お買い上げ金額で', 'ドリップバッグを', 'プレゼント'],
      period: { label: 'おまけの期間', from: ['11/18', '(水)', '0:00'], to: ['11/25', '(水)', '23:59'] },
      tiers: [
        { min: '5,400円以上', item: 'ドリップバッグ1種', qty: '10', unit: '袋' },
        { min: '10,800円以上', item: 'ドリップバッグ1種', qty: '30', unit: '袋' }
      ],
      note: 'ドリップバッグの種類は選べません。',
      keyword: { lead: 'キーワード', word: 'ブラックサワイコーヒー', body: 'を入れた方にプレゼント' }
    },

    coupon: {
      layout: 'ladder',
      kicker: 'クーポン',
      title: ['買うほど引かれる', '7段階クーポン'],
      tiers: [
        { min: '3,000円以上で', off: '150' },
        { min: '4,200円以上で', off: '300' },
        { min: '5,555円以上で', off: '500' },
        { min: '7,777円以上で', off: '700' },
        { min: '10,800円以上で', off: '1,000' },
        { min: '16,200円以上で', off: '1,700' },
        { min: '21,600円以上で', off: '2,500' }
      ],
      cta: 'クーポンを取得する',
      url: '#'
    },

    lineup: {
      kicker: 'お得福袋 25種',
      title: ['半額から', 'お試しまで'],
      groups: [
        {
          id: 'g-half', badge: '半額', title: '半額の福袋 17種', items: [
            item('goldsilverbitter', 'goldsilverbitter.webp', '金と銀のビターブレンド 160杯分', 11198, 5599, { badge: '半額', note: '50%OFFクーポン利用で' }),
            item('solandluna', 'solandluna.webp', '金と銀のブレンド袋2種 160杯分', 10398, 5199, { badge: '半額' }),
            item('gldslvbrz-1803ss', 'gldslvbrz1803ss.webp', '金と銀と銅のブレンド 120杯分福袋', 8598, 4299, { badge: '半額' }),
            item('goldsilveryakumo160-1803ss', 'goldsilveryakumo1601.webp', '金と銀のやくもブレンド 160杯分福袋', 10998, 5499, { badge: '半額' }),
            item('osechi-sw100set-1803ss', 'osechisw100set1803ss.webp', '甘い香りが好きな方へ ドリップ10種100杯', 11800, 5900, { badge: '半額' }),
            item('osechi-bt100set-1803ss', 'osechibt100set1803ss.webp', '濃い味が好きな方へ ドリップ10種100杯', 10800, 5400, { badge: '半額' }),
            item('osechi-200set-1803ss', 'osechi200set1803ss.webp', 'コーヒーおせち福袋 ドリップ10種200杯分', 15980, 7990, { badge: '半額' }),
            item('mcrich-1803ss', 'mcrich1803ss.webp', 'リッチ@モカ 100杯分福袋', 9200, 4600, { badge: '半額' }),
            item('yakumofruity120-1803ss', 'yakumofruity1201803s.webp', 'フルーティーやくも 120杯分', 9598, 4799, { badge: '半額' }),
            item('dp-blmno1b30-1803ss', 'dpblmno1b301803ss.webp', 'ブルーマウンテンNo.1ブレンド ドリップ30杯分', 5960, 2980, { badge: '半額' }),
            item('bl-cbb-005-2015dec', 'blcbb0052015dec.webp', 'コンチネンタルブレンド 500g', 3236, 1618, { badge: '半額' }),
            item('bl-wib-005-y-2015dec', 'blwib005y2015dec.webp', 'ウィンターブレンド 500g', 3262, 1631, { badge: '半額' }),
            item('bl-qus-005-y-2015dec', 'blqus005y2015dec.webp', 'クイーンシバ 500g', 4643, 2321, { badge: '半額' }),
            item('dp-clcb20p-cp', 'dpclcb20pcp.webp', 'カフェインレスコロンビア ドリップ20杯分', 2800, 1400, { badge: '半額' }),
            item('dp-kob20p-cp', 'dpkob20pcp.webp', '濃い味ブレンド ドリップ20杯分', 2000, 1000, { badge: '半額' }),
            item('dp-vnl20p-cp', 'dpvnl20pcp.webp', 'バニラコーヒー ドリップ20杯分', 2400, 1200, { badge: '半額' }),
            item('dp-bitterclassic50', 'dpbitterclassic50.webp', 'ビタークラシック お試し30杯分福袋', 2200, 1100, { badge: '半額' })
          ]
        },
        {
          id: 'g-ten', badge: '10%OFF', title: '10%OFFの福袋 4種', items: [
            item('dp-noncafedrip60p-1803ss', 'dpnoncafedrip60p1803.webp', 'カフェインレス3種 ドリップ60杯分福袋', 4980, 4482, { badge: '10%OFF' }),
            item('1342457-1803ss', '13424571803ss.webp', '山陰ご当地3種コーヒー福袋', 4197, 3777, { badge: '10%OFF' }),
            item('dp-fuku200-1803ss', 'dpfuku2001803ss.webp', 'ドリップバッグ4種 80杯分福袋', 3980, 3582, { badge: '10%OFF' }),
            item('rkl1500-1803ss', 'rkl15001803ss.webp', 'リフレッシング・キリマンジャロ 120杯分福袋', 6299, 5669, { badge: '10%OFF' })
          ]
        },
        {
          id: 'g-try', badge: 'お試し', title: 'いつもの価格のお試し商品', lead: 'はじめての方はここから', items: [
            item('100g100en', '100g100en.webp', '本日の108円コーヒー', null, 108),
            item('dp-bitterclassic10', 'dpbitterclassic10.webp', 'ビタークラシック お試し10杯分福袋', null, 301),
            item('kiwami500', 'kiwami500.webp', 'ブレンドコクの極み 30杯分福袋', null, 999),
            item('ac-sale-gurume1000', 'acsalegurume1000.webp', '100杯分入りグルメブレンド福袋', null, 2799)
          ]
        }
      ]
    },

    notes: [
      '価格はすべて税込です。',
      '取り消し線の価格は通常価格です。',
      'クーポンは取得が必要です。対象商品と利用条件はクーポンページでご確認ください。',
      'おまけのドリップバッグは種類を選べません。'
    ]
  });
})();
