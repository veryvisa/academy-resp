/* 微出国·学 · RESP 从业双证 · 离线缓存。版本＝内容哈希，新发布自动汰旧。 */
const CACHE_PREFIX = 'vv-resp-';
const VERSION = CACHE_PREFIX + '39f22febe3a0';
const PRECACHE = ["./assets/app.js", "./assets/cards/conduct-rebate.png", "./assets/cards/conduct-rebate.t.jpg", "./assets/cards/cst-plans.png", "./assets/cards/cst-plans.t.jpg", "./assets/cards/cst-qc.png", "./assets/cards/cst-qc.t.jpg", "./assets/cards/disc-60days.png", "./assets/cards/disc-60days.t.jpg", "./assets/cards/disc-three-standards.png", "./assets/cards/disc-three-standards.t.jpg", "./assets/cards/eco-accounts.png", "./assets/cards/eco-accounts.t.jpg", "./assets/cards/eco-scholarship-unit.png", "./assets/cards/eco-scholarship-unit.t.jpg", "./assets/cards/kyc-five.png", "./assets/cards/kyc-five.t.jpg", "./assets/cards/reg-clocks.png", "./assets/cards/reg-clocks.t.jpg", "./assets/cards/reg-parttime.png", "./assets/cards/reg-parttime.t.jpg", "./assets/cards/resp-two-exams.png", "./assets/cards/resp-two-exams.t.jpg", "./assets/cards/resp-weights.png", "./assets/cards/resp-weights.t.jpg", "./assets/cards.js", "./assets/cover/home.jpg", "./assets/decks/conduct-kyc-ethics.json", "./assets/decks/cst-product-line.json", "./assets/decks/disclosure-and-fees.json", "./assets/decks/economy-markets-primer.json", "./assets/decks/grants-2026.json", "./assets/decks/regulatory-map.json", "./assets/decks/resp-tax-machine.json", "./assets/decks/saving-for-education.json", "./assets/decks/scholarship-plan-mechanics.json", "./assets/decks.json", "./assets/fsrs.mjs", "./assets/learning-data.mjs", "./assets/manifest.json", "./assets/questions.json", "./assets/search-index.json", "./assets/slides.js", "./assets/style.css", "./cards/conduct-rebate.html", "./cards/cst-plans.html", "./cards/cst-qc.html", "./cards/disc-60days.html", "./cards/disc-three-standards.html", "./cards/eco-accounts.html", "./cards/eco-scholarship-unit.html", "./cards/index.html", "./cards/kyc-five.html", "./cards/reg-clocks.html", "./cards/reg-parttime.html", "./cards/resp-two-exams.html", "./cards/resp-weights.html", "./docs/conduct-kyc-ethics.html", "./docs/cst-product-line.html", "./docs/disclosure-and-fees.html", "./docs/economy-markets-primer.html", "./docs/index.html", "./docs/regulatory-map.html", "./drill.html", "./exam.html", "./index.html", "./progress.html", "./slides.html", "./vf/framework.css", "./vf/framework.js", "./workspace/index.html", "./assets/img/5a01d931d1dd.webp", "./assets/img/683f85a9d457.webp", "./assets/img/7d9b62e4c913.webp", "./assets/img/e5490e776883.webp", "./manifest.webmanifest"];
self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(VERSION).then(async (c) => {
    for (const u of PRECACHE) { try { await c.add(new Request(u, {cache: 'reload'})); } catch (_) {} }
  }).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k.startsWith(CACHE_PREFIX) && k !== VERSION).map((k) => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  const isHTML = req.mode === 'navigate' || (req.headers.get('accept') || '').includes('text/html');
  if (isHTML) {
    e.respondWith(fetch(req).then((r) => { const cp = r.clone(); caches.open(VERSION).then((c) => c.put(req, cp)); return r; })
      .catch(() => caches.match(req).then((r) => r || caches.match('./index.html'))));
  } else {
    e.respondWith(caches.match(req).then((r) => r || fetch(req).then((res) => {
      const cp = res.clone(); caches.open(VERSION).then((c) => c.put(req, cp)); return res; })));
  }
});
