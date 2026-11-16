// 本站已搬到 https://veryvisa.github.io/academy-exams/resp/。这个 worker 清掉旧的离线缓存（只清 vv-resp- 前缀）、注销自己并刷新已打开的页面。
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(
  caches.keys().then(ks => Promise.all(ks.filter(k => k.startsWith('vv-resp-')).map(k => caches.delete(k))))
    .then(() => self.registration.unregister())
    .then(() => self.clients.matchAll({type: 'window'}))
    .then(cs => cs.forEach(c => c.navigate(c.url)))));
