const CACHE_NAME = 'gihc-cache-v1';
const urlsToCache = [
  'index.html',
  'kitchen_cabs.html',
  'wardrobes.html',
  'sofas.html',
  'tv_stands.html',
  'office_tables.html',
  'dinning_tables.html',
  'book_shelves.html',
  'shoe_racks.html',
  'hidden_draw_cabs.html',
  'manicure_tables.html',
  'otto_pouf.html',
  'end_or_side_tables.html',
  'pharma_cabs.html',
  'cupboards.html',
  'chester_draws.html',
  'coffee_tables.html',
  'console_tables.html',
  'corner_shelf.html',
  'dressing_tables.html',
  'study_tables.html',
  'wall_units.html',
  'washroom_cabs.html',
  'styles.css',
  'scripts.js',
  'manifest.json',
  // Add other static assets as needed
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  // Don't cache or serve 010101.html from cache
  if (event.request.url.includes('010101.html')) {
    return;
  }
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
