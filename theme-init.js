(function () {
  try {
    const storedTheme = localStorage.getItem('kinetic_theme');
    if (storedTheme) {
      document.documentElement.setAttribute('data-theme', storedTheme);
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
    }
  } catch (e) {
    // Graceful fallback if localStorage is disabled/restricted
  }

  // Activate preloaded fonts non-render-blockingly (Strict CSP Compliant)
  const fontSheet = document.getElementById('asyncGoogleFonts');
  if (fontSheet) {
    fontSheet.media = 'all';
  }
})();
