/* Shared LGR area cookie utility
   Key: lgr_area  |  Values: gloucester | stroud | cotswold | forest-of-dean | tewkesbury | cheltenham
   TTL: 90 days   |  Path: /  (works across Veneer and Consolidated) */
var LGRArea = (function () {
  var KEY = 'lgr_area';
  var TTL = 90; // days

  function set(value) {
    var expires = new Date();
    expires.setDate(expires.getDate() + TTL);
    document.cookie = KEY + '=' + encodeURIComponent(value) +
      '; expires=' + expires.toUTCString() +
      '; path=/; SameSite=Lax';
  }

  function get() {
    var match = document.cookie.match('(?:^|; )' + KEY + '=([^;]*)');
    return match ? decodeURIComponent(match[1]) : null;
  }

  function clear() {
    document.cookie = KEY + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
  }

  return { set: set, get: get, clear: clear };
}());
