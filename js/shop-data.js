/* ================================================================
   店舗データ: 澤井珈琲 ブラックフライデー 2026
   ページの中身はここだけ編集すれば変わる。
   見た目は css/theme-*.css、部品の動きは js/bf-core.js。

   【日時の注意】楽天ブラックフライデー本番の開催日時は、ページにも
   このソースにも書かない(本文・カレンダー・カウントダウンすべて)。
   自動で日付を判定するのは店舗独自の施策(startISO)のみ。
   本番が始まったら mainLive を true にして手動で切り替える。

   【price】税込の数字。可変サイズは from:true で「〜」を付ける。
   【was】通常価格。入れると取り消し線付きで表示する。根拠のある
   数字だけを入れること。
   ================================================================ */
window.BF_SHOP = {
  name: '澤井珈琲',
  logo: 'images/logo.png',
  shopUrl: 'https://www.rakuten.co.jp/sawaicoffee-tea/',
  isDemo: true, /* 納品時 false。確認用の帯を消す */

  /* 本番開始後に true へ */
  mainLive: false,

  /* どの部品をどの順で並べるか。入れ替え・削除が可能 */
  sections: ['schedule', 'feature', 'deal', 'bargain', 'coupon', 'category', 'teaser'],

  ticker: ['ブラックフライデー先行セール', '2027年 新春福袋を数量限定で先行販売', '福袋 2,027円から', '1,000円ポッキリ', 'まとめて買うほどクーポン'],

  nav: [
    { id: 'feature', label: 'フライング福袋', short: '福袋', sp: true },
    { id: 'deal', label: '楽天スーパーDEAL 20％', short: '20％' },
    { id: 'bargain', label: '1,000円ポッキリ', short: 'お買い得', sp: true },
    { id: 'coupon', label: 'まとめ買いクーポン', short: 'クーポン', sp: true },
    { id: 'category', label: '売り場から探す', short: '売り場', sp: true },
    { id: 'teaser', label: '本番の福袋 約30種', short: '本番' }
  ],

  fv: {
    signSmall: '澤井珈琲の',
    signLines: ['BLACK', 'FRIDAY'],
    signBand: '先行セール',
    catch: ['2027年福袋を', '先行販売！'],
    ship: '12月中旬発送！',
    boxLabel: 'フライング福袋',
    cards: ['images/f-10000.webp', 'images/f-newyear.webp', 'images/f-30000.webp', 'images/f-32p.webp'],
    priceLead: '福袋が',
    price: 2027,
    priceTail: '円から'
  },

  /* 店舗独自の施策の日付。楽天本番の日時は入れない */
  countdown: {
    startISO: '2026-11-12T10:00:00+09:00',
    before: '先行セール開始まで',
    after: '先行セール開催中'
  },

  schedule: {
    title: ['お祭りは', '3回来ます'],
    items: [
      { no: '第1弾', when: '11/12(木) 朝10時', head: 'ブラックフライデー 先行セール', body: '元旦用の福袋を、フライングで先行販売', startISO: '2026-11-12T10:00:00+09:00', href: '#feature' },
      { no: '第2弾', when: '開催日は近日公開', head: '本番', body: 'ブラックフライデー福袋が約30種', href: '#teaser', manual: 'main' },
      { no: '第3弾', when: '11/22(日) 24時間限定', head: '楽天スーパーDEAL 20％ポイント還元', body: '特別企画！レビュー5万件突破記念', startISO: '2026-11-22T00:00:00+09:00', href: '#deal' }
    ]
  },

  feature: {
    kicker: 'フライング福袋',
    /* newYear を消すと通常の見出しに戻る(title を使う) */
    newYear: { year: '2027', title: '新春福袋', seal: ['数量', '限定'], ship: '12月中旬発送' },
    title: ['元旦まで', '待てない人へ'],
    lead: '元旦の初売りのために用意した2027年の福袋を、数量限定でひと足先にお届けします。なくなり次第終了です。',
    bandPrice: 2027,
    bandLead: '2027年のはじまりを',
    bandTail: '円で',
    half: [
      {
        name: '謹賀新年福袋', spec: '新年だけの3種 450g', img: 'images/f-newyear.webp', price: 2027, ship: '送料無料', perCup: '約45円',
        url: 'https://item.rakuten.co.jp/sawaicoffee-tea/newyear/',
        inside: ['初夢ブレンド 150g', '干支ブレンド 150g', '新春ブレンド 150g', '金持神社でご祈願いただいたドリップバッグ 2袋']
      },
      {
        name: 'ドリップ福袋32P', spec: '深煎り4種 32袋', img: 'images/f-32p.webp', price: 2027, ship: '送料無料', perCup: '約63円',
        url: 'https://item.rakuten.co.jp/sawaicoffee-tea/newyear32p/',
        inside: ['ハウスブレンド 7g×10袋', 'オフィスブレンド 7g×10袋', 'ビジネスブレンド 7g×10袋', 'プレミアムゴールド 8g×2袋']
      }
    ],
    wide: [
      {
        name: '初売りセール限定 1万円福袋', spec: '10種 280杯分', img: 'images/f-10000.webp', price: 10000, ship: '送料無料', perCup: '約36円',
        url: 'https://item.rakuten.co.jp/sawaicoffee-tea/osechi-500set/',
        inside: ['9種 各30袋 + 1種 10袋', 'ライト・マイルド・ビターなど人気の10種', '1日3杯で約3か月分']
      },
      {
        name: '初売りセール限定 3万円福袋', spec: '14種 840杯分', img: 'images/f-30000.webp', price: 30000, ship: '送料無料', perCup: '約36円',
        url: 'https://item.rakuten.co.jp/sawaicoffee-tea/ny2025fuku3th/',
        inside: ['14種 各60袋', 'プレミアムゴールド 2袋', '職場でも家族でも分けられる大容量']
      }
    ]
  },

  deal: {
    date: { pre: '11/', day: '22', tail: '(日)' },
    limit: '22日限定企画',
    tag: '特別企画！',
    name: '楽天スーパーDEAL',
    number: '20',
    unit: '％',
    head: 'ポイント還元',
    reasons: ['レビュー5万件突破記念', 'ブラックフライデーの超目玉企画'],
    item: { name: '1番選ばれるコーヒーセット', spec: 'グルメ大賞9度受賞', img: 'images/p-acsale1960.webp', price: 2788, from: true, url: 'https://item.rakuten.co.jp/sawaicoffee-tea/ac-sale-1960/' },
    linkLabel: '特別企画のページを見る',
    link: 'https://greentuushou-arch.github.io/sawai-review50k-2026/'
  },

  bargain: {
    kicker: 'お買い得',
    title: ['1,000円', 'ポッキリ'],
    lead: 'まずはお試しに',
    items: [
      { name: '人気2種 飲み比べ', spec: '100g×2袋 約20杯', img: 'images/p-acsalekomi2fv.webp', price: 1000, ship: '送料無料', url: 'https://item.rakuten.co.jp/sawaicoffee-tea/ac-sale-komi2fv/' },
      { name: 'フレーバードリップ', spec: '4種 10袋', img: 'images/p-dpflavorfuku12.webp', price: 1000, ship: '送料無料', url: 'https://item.rakuten.co.jp/sawaicoffee-tea/dp-flavorfuku12/' },
      { name: 'カフェインレス お試し', spec: 'ドリップ 3種 9袋', img: 'images/p-dpnoncafedrip20p.webp', price: 1000, ship: '送料無料', url: 'https://item.rakuten.co.jp/sawaicoffee-tea/dp-noncafedrip20p/' },
      { name: '飲みきり お試し', spec: 'レギュラーコーヒー 200g', img: 'images/p-acsupersale005.webp', price: 1000, ship: '送料無料', url: 'https://item.rakuten.co.jp/sawaicoffee-tea/ac-supersale-005/' }
    ],
    more: {
      head: 'もう少し飲みたい人へ',
      items: [
        { name: 'ビタークラシック', spec: 'ドリップ 30袋', img: 'images/p-dpbitterclassic50.webp', price: 1100, url: 'https://item.rakuten.co.jp/sawaicoffee-tea/dp-bitterclassic50/' },
        { name: 'プレミアムブレンド', spec: '400g 40杯分', img: 'images/p-sale001.webp', price: 1207, url: 'https://item.rakuten.co.jp/sawaicoffee-tea/sale001/' },
        { name: 'ドリップ飲み比べ', spec: 'ライト・マイルド・ビター', img: 'images/p-saledripbag.webp', price: 2625, from: true, ship: '送料無料', url: 'https://item.rakuten.co.jp/sawaicoffee-tea/saledripbag/' },
        { name: 'グルメブレンド', spec: '500g×2袋 100杯分', img: 'images/p-acsalegurume1000.webp', price: 2799, url: 'https://item.rakuten.co.jp/sawaicoffee-tea/ac-sale-gurume1000/' }
      ]
    }
  },

  coupon: {
    kicker: 'まとめ買いでオトク',
    title: ['買うほど', '引かれる'],
    isSample: true, /* クーポンが確定したら false。「仮」表示を消す */
    tiers: [
      { min: '5,000円以上', off: '500', url: '#' },
      { min: '10,000円以上', off: '1,500', url: '#' },
      { min: '20,000円以上', off: '4,000', url: '#' }
    ],
    itemsHead: 'まとめ買いにおすすめ',
    items: [
      { name: '6種アソート', spec: 'ドリップ 52袋', img: 'images/p-hajimetedripbag70m.webp', price: 2699, ship: '送料無料', url: 'https://item.rakuten.co.jp/sawaicoffee-tea/hajimete_dripbag70-m201501-ss1/' },
      { name: '選べる極上福袋', spec: '400g×3袋', img: 'images/p-483533.webp', price: 4499, ship: '送料無料', url: 'https://item.rakuten.co.jp/sawaicoffee-tea/483533/' },
      { name: 'ハウスブレンド', spec: 'ドリップ 200袋', img: 'images/p-dphouse200.webp', price: 6999, ship: '送料無料', url: 'https://item.rakuten.co.jp/sawaicoffee-tea/dp-house200/' },
      { name: 'ギガ盛りドリップ', spec: '2種の大容量', img: 'images/p-dpfvgiga400.webp', price: 10700, from: true, ship: '送料無料', url: 'https://item.rakuten.co.jp/sawaicoffee-tea/dp_fvgiga400/' }
    ]
  },

  /* カテゴリは店ごとに自由。季節もの(お歳暮等)もここに入れる */
  category: {
    kicker: '売り場から探す',
    title: ['買い足しは', 'このフロアで'],
    floors: [
      {
        id: 'cat-oseibo', name: 'お歳暮ギフト', more: 'https://search.rakuten.co.jp/search/mall/%E3%81%8A%E6%AD%B3%E6%9A%AE/?sid=198667',
        items: [
          { name: 'ドリップ6種 飲み比べ', spec: '24袋', img: 'images/p-6dripassortgift.webp', price: 2980, ship: '送料無料', url: 'https://item.rakuten.co.jp/sawaicoffee-tea/6dripassortgift/' },
          { name: 'カフェラテベース&アイス', spec: '2本セット', img: 'images/p-cafebasepbgift.webp', price: 2880, ship: '送料無料', url: 'https://item.rakuten.co.jp/sawaicoffee-tea/cafebasepbgift/' },
          { name: 'コーヒー&ダックワーズ', spec: 'スイーツセット', img: 'images/p-dqgiftset.webp', price: 3080, ship: '送料無料', url: 'https://item.rakuten.co.jp/sawaicoffee-tea/dqgiftset/' },
          { name: 'ドリップ60袋 ボックス', spec: '3種', img: 'images/p-dp60box.webp', price: 4000, ship: '送料無料', url: 'https://item.rakuten.co.jp/sawaicoffee-tea/dp-60box/' }
        ]
      },
      {
        id: 'cat-xmas', name: 'クリスマス限定', more: 'https://search.rakuten.co.jp/search/mall/%E3%82%AF%E3%83%AA%E3%82%B9%E3%83%9E%E3%82%B9/?sid=198667',
        items: [
          { name: 'クリスマス ブックギフト', spec: 'ドリップ3種 24袋', img: 'images/p-christmasbookgift.webp', price: 3500, ship: '送料無料', url: 'https://item.rakuten.co.jp/sawaicoffee-tea/christmasbookgift/' },
          { name: '13Drip クリスマス', spec: '2種 10袋', img: 'images/p-christmas13dripgif.webp', price: 2970, ship: '送料無料', url: 'https://item.rakuten.co.jp/sawaicoffee-tea/christmas13dripgift/' }
        ]
      },
      {
        id: 'cat-bean', name: '焙煎したての豆', more: 'https://search.rakuten.co.jp/search/mall/%E3%82%B3%E3%83%BC%E3%83%92%E3%83%BC%E8%B1%86/?sid=198667',
        items: [
          { name: 'やくもブレンド福袋', spec: '看板メニュー', img: 'images/p-acyakumofuku2000.webp', price: 4200, from: true, ship: '送料無料', url: 'https://item.rakuten.co.jp/sawaicoffee-tea/ac-yakumofuku-2000/' },
          { name: '金銀銅 飲み比べ', spec: '400g×3袋', img: 'images/p-gldslvbrz.webp', price: 4299, ship: '送料無料', url: 'https://item.rakuten.co.jp/sawaicoffee-tea/gldslvbrz/' },
          { name: '訳ありコーヒー', spec: '400g×3袋 120杯分', img: 'images/p-1438652.webp', price: 4499, ship: '送料無料', url: 'https://item.rakuten.co.jp/sawaicoffee-tea/1438652/' },
          { name: '10種 飲み比べ福袋', spec: '200g×10袋', img: 'images/p-coffee10s200.webp', price: 14658, ship: '送料無料', url: 'https://item.rakuten.co.jp/sawaicoffee-tea/coffee10s200/' }
        ]
      },
      {
        id: 'cat-tea', name: '紅茶とお菓子', more: 'https://search.rakuten.co.jp/search/mall/%E7%B4%85%E8%8C%B6/?sid=198667',
        items: [
          { name: '紅茶のお試しセット', spec: 'ティーバッグ', img: 'images/p-acteaset20.webp', price: 1598, url: 'https://item.rakuten.co.jp/sawaicoffee-tea/ac-teaset-20/' },
          { name: '紅茶とお菓子のセット', spec: 'リーフ+クッキー', img: 'images/p-337946.webp', price: 2351, ship: '送料無料', url: 'https://item.rakuten.co.jp/sawaicoffee-tea/337946/' },
          { name: 'ふくろうもなか', spec: '8個入り', img: 'images/p-fukurouset.webp', price: 1757, url: 'https://item.rakuten.co.jp/sawaicoffee-tea/fukurouset/' },
          { name: 'お配りギフト', spec: 'ドリップ 50袋', img: 'images/p-dpthank50p.webp', price: 3810, ship: '送料無料', url: 'https://item.rakuten.co.jp/sawaicoffee-tea/dp-thank50p/' }
        ]
      }
    ]
  },

  teaser: {
    kicker: '第2弾 本番',
    count: 30,
    numberLead: '約',
    numberText: '30',
    unit: '種',
    title: '福袋がそろいます',
    body: 'ラインナップは本番の開始とともに公開します。',
    /* 本番の福袋。mainLive:true のときに一覧表示する */
    bags: []
  },

  notes: [
    '価格はすべて税込です。',
    '福袋は数量限定です。なくなり次第終了します。',
    '商品の内容は変更になる場合があります。福袋の内容はお選びいただけません。',
    'クーポンは取得が必要です。対象商品と利用条件はクーポンページでご確認ください。'
  ]
};
