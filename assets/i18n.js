/* Ryzup legal pages — language selection.
   Order of preference: ?lang= → #hash → saved choice → browser languages → English. */
(function () {
  var SUPPORTED = ['en', 'ru', 'es', 'de', 'fr', 'pt', 'ja'];
  var FALLBACK = 'en';
  var STORAGE_KEY = 'ryzup-legal-lang';

  function normalise(tag) {
    if (!tag) return null;
    var base = String(tag).toLowerCase().replace('_', '-').split('-')[0];
    return SUPPORTED.indexOf(base) === -1 ? null : base;
  }

  function stored() {
    try { return localStorage.getItem(STORAGE_KEY); } catch (e) { return null; }
  }

  function remember(lang) {
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* private mode */ }
  }

  function detect() {
    var query = null;
    try { query = new URLSearchParams(location.search).get('lang'); } catch (e) { /* old browser */ }
    var candidates = [query, location.hash.replace(/^#/, ''), stored()]
      .concat(navigator.languages || [navigator.language || navigator.userLanguage]);
    for (var i = 0; i < candidates.length; i++) {
      var match = normalise(candidates[i]);
      if (match) return match;
    }
    return FALLBACK;
  }

  var sections = [].slice.call(document.querySelectorAll('.i18n'));
  var picker = document.getElementById('langpick');

  function apply(lang, pushUrl) {
    var active = null;
    sections.forEach(function (section) {
      var on = section.getAttribute('lang') === lang;
      section.classList.toggle('is-active', on);
      section.hidden = !on;
      if (on) active = section;
    });
    if (!active) return;

    document.documentElement.setAttribute('lang', lang);
    var title = active.getAttribute('data-title');
    if (title) document.title = title;
    if (picker) picker.value = lang;

    // Keep the chosen language when moving between pages.
    [].slice.call(document.querySelectorAll('a[href]')).forEach(function (link) {
      var href = link.getAttribute('href');
      if (!href || !/^[^:#?]+\.html/.test(href)) return;
      link.setAttribute('href', href.split('?')[0] + '?lang=' + lang);
    });

    if (pushUrl && window.history && history.replaceState) {
      history.replaceState(null, '', location.pathname + '?lang=' + lang);
    }
  }

  apply(detect(), false);

  if (picker) {
    picker.addEventListener('change', function () {
      remember(picker.value);
      apply(picker.value, true);
    });
  }
})();
