/* ==========================================================================
   MYDEV PORTFOLIO - FRANCIS AMARTEY SAMPAH
   Client-Side Progressive Enhancement
   ========================================================================== */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
  // ------------------------------------------------------------------------
  // 1. DUAL LIGHT & DARK MODE THEME SWITCHER
  // ------------------------------------------------------------------------
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themeIcon = document.getElementById('themeIcon');
  const htmlElement = document.documentElement;

  function updateThemeUI(theme) {
    htmlElement.setAttribute('data-theme', theme);
    if (themeIcon) {
      themeIcon.textContent = theme === 'dark' ? 'light_mode' : 'dark_mode';
    }
  }

  // Set initial icon state based on active attribute
  const currentTheme = htmlElement.getAttribute('data-theme') || 'dark';
  updateThemeUI(currentTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const activeTheme = htmlElement.getAttribute('data-theme');
      const nextTheme = activeTheme === 'dark' ? 'light' : 'dark';

      try {
        localStorage.setItem('kinetic_theme', nextTheme);
      } catch (e) {
        // Handle private browsing or quota limits
      }
      updateThemeUI(nextTheme);
    });
  }

  // React to system color scheme changes if no manual preference is saved
  try {
    const colorSchemeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    colorSchemeQuery.addEventListener('change', (e) => {
      if (!localStorage.getItem('kinetic_theme')) {
        updateThemeUI(e.matches ? 'dark' : 'light');
      }
    });
  } catch (e) {
    // Media query listener fallback
  }

  // ------------------------------------------------------------------------
  // 2. RESPONSIVE MOBILE NAVIGATION DRAWER PROGRESSIVE ENHANCEMENT
  // ------------------------------------------------------------------------
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  function closeMobileDrawer() {
    if (mobileDrawer) {
      mobileDrawer.classList.remove('open');
      if (window.location.hash === '#mobileDrawer') {
        history.replaceState(null, '', window.location.pathname + window.location.search);
      }
      if (mobileMenuBtn) {
        const icon = mobileMenuBtn.querySelector('.material-symbols-outlined');
        if (icon) icon.textContent = 'menu';
      }
    }
  }

  if (mobileMenuBtn && mobileDrawer) {
    mobileMenuBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const isOpen = mobileDrawer.classList.toggle('open');
      const icon = mobileMenuBtn.querySelector('.material-symbols-outlined');
      if (icon) {
        icon.textContent = isOpen ? 'close' : 'menu';
      }
    });

    mobileNavLinks.forEach((link) => {
      link.addEventListener('click', closeMobileDrawer);
    });

    document.addEventListener('click', (e) => {
      if (
        mobileDrawer.classList.contains('open') &&
        !mobileDrawer.contains(e.target) &&
        !mobileMenuBtn.contains(e.target)
      ) {
        closeMobileDrawer();
      }
    });
  }

  // ------------------------------------------------------------------------
  // 3. NATIVE DIALOG PROGRESSIVE ENHANCEMENT
  // ------------------------------------------------------------------------
  const dialogs = document.querySelectorAll('dialog.project-modal');

  dialogs.forEach((dialog) => {
    // Backdrop click closes dialog
    dialog.addEventListener('click', (e) => {
      if (e.target === dialog) {
        if (typeof dialog.close === 'function' && dialog.open) {
          dialog.close();
        }
        if (window.location.hash === '#' + dialog.id) {
          history.replaceState(null, '', window.location.pathname + window.location.search + '#projects');
        }
      }
    });

    // Close buttons inside dialog
    const closeBtns = dialog.querySelectorAll('.modal-close-btn');
    closeBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        if (typeof dialog.close === 'function' && dialog.open) {
          e.preventDefault();
          dialog.close();
          if (window.location.hash === '#' + dialog.id) {
            history.replaceState(null, '', window.location.pathname + window.location.search + '#projects');
          }
        }
      });
    });
  });

  // Progressively enhance View Details links with showModal() if supported
  const openModalLinks = document.querySelectorAll('.open-modal-link');
  openModalLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId && targetId.startsWith('#')) {
        const dialog = document.querySelector(targetId);
        if (dialog && typeof dialog.showModal === 'function') {
          e.preventDefault();
          dialog.showModal();
          history.replaceState(null, '', window.location.pathname + window.location.search + targetId);
        }
      }
    });
  });

  // ------------------------------------------------------------------------
  // 4. ACTIVE NAVIGATION SCROLL HIGHLIGHTING
  // ------------------------------------------------------------------------
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach((link) => {
              if (link.getAttribute('href') === '#' + id) {
                link.classList.add('active');
              } else {
                link.classList.remove('active');
              }
            });
          }
        });
      },
      { rootMargin: '-20% 0px -60% 0px' }
    );

    sections.forEach((section) => observer.observe(section));
  }

  // ------------------------------------------------------------------------
  // 5. FOOTER DYNAMIC YEAR UPDATE
  // ------------------------------------------------------------------------
  const currentYearSpan = document.getElementById('currentYear');
  if (currentYearSpan) {
    currentYearSpan.textContent = String(new Date().getFullYear());
  }
});
