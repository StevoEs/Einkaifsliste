// Verwenden Sie einen Cache-Namen für die Cache-Versionierung
var cacheName = 'v1:static';

// Während der Installationsphase werden Sie in der Regel statische Inhalte zwischenspeichern wollen.
self.addEventListener('install', function(e) {
    // Sobald der Service Worker installiert ist, können Sie die Ressourcen abrufen, damit der Dienst offline funktioniert.
    e.waitUntil(
        caches.open(cacheName).then(function(cache) {
            return cache.addAll([
                './',
                './css/style.css',
                './css/material.min.css',
                './main.js',
                './js/material.min.js',
                './index.html',
                './src/medikamentenapp/dia.html',
                './src/medikamentenapp/medikamentenApp.js',
                './src/medikamentenapp/style.css'
            ]).then(function() {
                self.skipWaiting();
            });
        })
    );
});

// Wenn der Browser eine URL aufruft...
self.addEventListener('fetch', function(event) {
    // … entweder mit dem zwischengespeicherten Objekt antworten oder die tatsächliche URL abrufen
    event.respondWith(
        caches.match(event.request).then(function(response) {
            if (response) {
                // aus dem Cache abrufen
                return response;
            }
            // Normal fetch
            return fetch(event.request);
        })
    );
});
