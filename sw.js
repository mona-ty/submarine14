// sw.js — シンプル通知用（Pushなし）
// showNotification() を使うための最小実装

self.addEventListener('install', (e) => {
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  self.clients.claim();
});

// 通知クリックで既存タブをフォーカス
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil((async () => {
    const allClients = await clients.matchAll({ type: 'window', includeUncontrolled: true });
    if (allClients.length) {
      allClients[0].focus();
    }
  })());
});
