// Hält die App-Dateien offline bereit. Bei Änderungen an der App VERSION hochzählen.
const VERSION = 'finanzen-v1';
const DATEIEN = ['./', 'index.html', 'manifest.webmanifest', 'icon-192.png', 'icon-512.png'];
const SCHRIFTEN = ['https://fonts.googleapis.com', 'https://fonts.gstatic.com'];

self.addEventListener('install', function (ereignis) {
  ereignis.waitUntil(caches.open(VERSION).then(function (cache) { return cache.addAll(DATEIEN); }).then(function () { return self.skipWaiting(); }));
});

self.addEventListener('activate', function (ereignis) {
  ereignis.waitUntil(
    caches.keys()
      .then(function (namen) { return Promise.all(namen.filter(function (n) { return n !== VERSION; }).map(function (n) { return caches.delete(n); })); })
      .then(function () { return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function (ereignis) {
  const anfrage = ereignis.request;
  if (anfrage.method !== 'GET') return; // Buchungen (POST) gehen immer direkt ins Netz
  const url = new URL(anfrage.url);
  const eigene = url.origin === self.location.origin;
  const schrift = SCHRIFTEN.indexOf(url.origin) !== -1;
  if (!eigene && !schrift) return;

  // Sofort aus dem Speicher antworten und im Hintergrund auffrischen.
  ereignis.respondWith(
    caches.open(VERSION).then(function (cache) {
      return cache.match(anfrage, { ignoreSearch: eigene }).then(function (treffer) {
        const netz = fetch(anfrage).then(function (antwort) {
          if (antwort && (antwort.ok || antwort.type === 'opaque')) cache.put(anfrage, antwort.clone());
          return antwort;
        }).catch(function () { return treffer; });
        return treffer || netz;
      });
    })
  );
});
