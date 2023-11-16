import 'regenerator-runtime';
import CacheHelper from './utils/cache-helper';

const assetsToCache = [
  './',
  './icons/icon-16x16.png',
  './icons/icon-32x32.png',
  './icons/icon-192x192.png',
  './icons/icon-512x512.png',
  './index.html',
  './ikon.png',
  './app.bundle.js',
  './app.webmanifest',
  './sw.bundle.js',
];

const self = this;
self.addEventListener('install', (event) => {
  event.waitUntil(CacheHelper.cachingAppShell([...assetsToCache]));

  // TODO: Caching App Shell Resource
});

self.addEventListener('activate', (event) => {
  event.waitUntil(CacheHelper.deleteOldCache());
  // TODO: Delete old caches
});

self.addEventListener('fetch', (event) => {
  event.respondWith(CacheHelper.revalidateCache(event.request));
});

self.addEventListener('push', (event) => {
  const notificationData = {
    title: 'Push Notification',
    options: {
      body: 'This is a push notification',
      icon: '/icon.png',
      image: '/icon-512x512/icon-512x512.jpg',
    },
  };
  const showNotification = self.registration.showNotification(
    notificationData.title,
    notificationData.options,
  );
  event.waitUntil(showNotification);
});
