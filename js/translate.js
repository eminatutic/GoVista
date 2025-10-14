function googleTranslateElementInit() {
  new google.translate.TranslateElement(
    {
      pageLanguage: 'en',
      includedLanguages: 'en,sr-Latn',
      layout: google.translate.TranslateElement.InlineLayout.SIMPLE
    },
    'google_translate_element'
  );
}

// Učitaj Google Translate skriptu
(function loadGoogle() {
  const script = document.createElement('script');
  script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
  script.async = true;
  document.body.appendChild(script);
})();

// Sakrij top bar i druge vizuelne elemente
function hideGoogleBar() {
  const iframe = document.querySelector('iframe.goog-te-banner-frame');
  if (!iframe) return;
  iframe.style.display = 'none';
}

// Promena jezika preko našeg dropdowna
document.addEventListener('DOMContentLoaded', () => {
  const select = document.getElementById('languageSelect');

  select.addEventListener('change', () => {
    const iframe = document.querySelector('iframe.goog-te-menu-frame');
    if (iframe) {
      const innerDoc = iframe.contentDocument || iframe.contentWindow.document;
      const langLinks = innerDoc.querySelectorAll('.goog-te-menu2-item span.text');
      langLinks.forEach(link => {
        if (link.innerText.toLowerCase().includes(select.value === 'sr' ? 'serbian' : 'english')) {
          link.click();
        }
      });
    }
  });

  // Pokušaj da sakrije bar svakih pola sekunde dok se ne pojavi
  const interval = setInterval(() => {
    const topBar = document.querySelector('.goog-te-banner-frame');
    if (topBar) {
      topBar.style.display = 'none';
      clearInterval(interval);
    }
  }, 500);
});
