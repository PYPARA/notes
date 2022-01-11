"use strict";function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function _createClass(e,t,n){return t&&_defineProperties(e.prototype,t),n&&_defineProperties(e,n),e}var CACHE_NAME="static-cache",preload=[],PRODUCTION_URL_PREFIX="//cdn.cnbj1.fds.api.mi-img.com",CacheStatus=function(){function e(){_classCallCheck(this,e),this.urls=new Set}return _createClass(e,[{key:"init",value:function(e){var t=this;e.forEach(function(e){t.urls.add(e)})}},{key:"has",value:function(e){return this.urls.has(e)}},{key:"add",value:function(e){this.urls.add(e)}}]),e}(),cacheStatus=new CacheStatus(CACHE_NAME);function isCDNRequest(e){return"string"==typeof e&&(!e.includes("service-worker.js")&&(!e.includes(".html")&&"/"!==e.split(".com")[1]&&!!e.includes(PRODUCTION_URL_PREFIX)))}self.addEventListener("install",function(e){e.waitUntil(caches.open(CACHE_NAME).then(function(e){return Array.isArray(preload)?e.addAll(preload).then(function(){cacheStatus.init(preload)}):e.keys().then(function(e){cacheStatus.init(e.map(function(e){return e.url}))})}))}),self.addEventListener("fetch",function(n){isCDNRequest(n.request.url)&&(cacheStatus.has(n.request.url)?n.respondWith(caches.match(n.request).then(function(e){return void 0===e?fetch(n.request).then(function(e){return e}):e})):n.respondWith(fetch(n.request).then(function(e){var t;return 200!==e.status&&0!==e.status||(t=e.clone(),caches.open(CACHE_NAME).then(function(e){e.put(n.request,t),cacheStatus.add(n.request.url)})),e})))}),self.addEventListener("activate",function(e){e.waitUntil(self.clients.claim())});