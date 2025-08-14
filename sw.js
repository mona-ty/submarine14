// sw.js — GitHub Pages での単純通知用（Push不要）
// 何もしなくても showNotification() だけ使えればOK。
// オフライン等は扱わないミニマル構成。

self.addEventListener('install', (e) => {
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  self.clients.claim();
});

// 通知クリックでフォーカスを返す（任意）
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil((async () => {
    const allClients = await clients.matchAll({ type: 'window', includeUncontrolled: true });
    if (allClients.length) {
      const c = allClients[0];
      c.focus();
    }
  })());
});
