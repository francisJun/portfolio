/* ==========================================================================
   MYDEV PORTFOLIO - SAMPAH FRANCIS
   Client-Side Logic & Interactivity
   ========================================================================== */

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
      
      localStorage.setItem('kinetic_theme', nextTheme);
      updateThemeUI(nextTheme);
    });
  }

  // React to system color scheme changes if no manual preference is saved
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('kinetic_theme')) {
      updateThemeUI(e.matches ? 'dark' : 'light');
    }
  });

  // ------------------------------------------------------------------------
  // 2. RESPONSIVE MOBILE NAVIGATION DRAWER
  // ------------------------------------------------------------------------
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  function closeMobileDrawer() {
    if (mobileDrawer) {
      mobileDrawer.classList.remove('open');
      if (mobileMenuBtn) {
        const icon = mobileMenuBtn.querySelector('.material-symbols-outlined');
        if (icon) icon.textContent = 'menu';
      }
    }
  }

  if (mobileMenuBtn && mobileDrawer) {
    mobileMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      mobileDrawer.classList.toggle('open');
      const icon = mobileMenuBtn.querySelector('.material-symbols-outlined');
      if (icon) {
        icon.textContent = mobileDrawer.classList.contains('open') ? 'close' : 'menu';
      }
    });

    mobileNavLinks.forEach(link => {
      link.addEventListener('click', closeMobileDrawer);
    });

    // Close drawer when clicking outside
    document.addEventListener('click', (e) => {
      if (mobileDrawer.classList.contains('open') && !mobileDrawer.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        closeMobileDrawer();
      }
    });
  }

  // ------------------------------------------------------------------------
  // 3. PROJECT DETAILS MODAL DATA (EXACT RESUME CLIENT ENGAGEMENTS)
  // ------------------------------------------------------------------------
  const projectsData = [
    {
      title: "Enterprise Resource Planning (ERP) System",
      tags: ["Laravel", "MySQL", "TypeScript", "ERP", "Workflow Automation"],
      description: "Designed and delivered an Enterprise Resource Planning (ERP) platform that centralized core business operations, improved process visibility, and reduced manual workflows by 45% across 6 corporate departments.",
      features: [
        "Multi-department operational data centralization",
        "Automated workflow routing and approval processes",
        "Real-time resource utilization & reporting analytics",
        "Significant reduction in manual paper-based processes"
      ],
      githubUrl: "https://github.com/francisjun",
      liveUrl: null
    },
    {
      title: "Laboratory Information Management System (LIMS)",
      tags: ["TypeScript", "Node.js", "PostgreSQL", "LIMS", "Healthcare"],
      description: "Delivered a Laboratory Information Management System (LIMS) that digitized laboratory tracking workflows, improved operational tracking, and reduced processing time by 60% across 3 active laboratories.",
      features: [
        "End-to-end sample lifecycle tracking from intake to reporting",
        "Strict clinical data integrity and validation pipelines",
        "Operational bottleneck tracking for lab technicians",
        "Centralized reporting system accessible by clinical teams"
      ],
      githubUrl: "https://github.com/francisjun",
      liveUrl: null
    },
    {
      title: "Medkart – Online Generic Medicine Store",
      tags: ["React", "Node.js", "Maps API", "E-Commerce", "India"],
      description: "Contributed to one of India's leading online generic medicine platforms serving thousands of daily customers. Implemented key customer-facing features including a store locator and enhanced mobile responsiveness.",
      features: [
        "Interactive store locator for physical pharmacy branches",
        "Mobile-first responsive interface for high accessibility",
        "High-scale product browsing and medicine lookup workflow",
        "Optimized client-side rendering performance"
      ],
      githubUrl: "https://github.com/francisjun",
      liveUrl: "https://www.medkart.in/"
    },
    {
      title: "Unific – E-Commerce & Marketing Data Sync",
      tags: ["Node.js", "TypeScript", "REST APIs", "Webhooks", "Integration"],
      description: "Contributed to the development of a platform that synchronizes data between e-commerce and marketing platforms, helping over 200 businesses maintain consistent customer and operational data across integrated systems.",
      features: [
        "Real-time bi-directional data synchronization pipeline",
        "Integration with major e-commerce and marketing APIs",
        "Reliable webhook listener and retry queue processing",
        "Enhanced operational visibility for 200+ integrated businesses"
      ],
      githubUrl: "https://github.com/francisjun",
      liveUrl: "https://www.unific.com/"
    },
    {
      title: "Hotel Booking Management System",
      tags: ["Laravel", "MySQL", "JavaScript", "Hospitality"],
      description: "Independently delivered a complete hotel booking platform from design through deployment, replacing manual reservation processes, boosting operational efficiency by 80%, and supporting daily operations for 400+ daily customers.",
      features: [
        "Full reservation & room allocation workflows",
        "Centralized administrative reporting dashboard",
        "Automated booking confirmation and guest tracking",
        "Independent end-to-end delivery from requirements to cloud deployment"
      ],
      githubUrl: "https://github.com/francisjun",
      liveUrl: null
    },
    {
      title: "Ride-Hailing Platform",
      tags: ["Mobile Apps", "Node.js", "WebSockets", "Logistics"],
      description: "Led development of key platform features across customer, driver, and administrative applications, delivering enhancements that improved platform stability and user experience for approximately 1,000 drivers.",
      features: [
        "Real-time location tracking & dispatch workflows",
        "Cross-platform rider, driver, and admin app features",
        "Improved platform stability under peak traffic loads",
        "Enhanced driver earnings and trip history modules"
      ],
      githubUrl: "https://github.com/francisjun",
      liveUrl: null
    },
    {
      title: "InvClick – Spatial & Statistical Platform",
      tags: ["WordPress", "PHP", "MySQL", "Custom Plugins"],
      description: "Developed a custom WordPress-powered business platform replacing fragmented manual workflows with centralized operational processes for a spatial and statistical consultancy, reducing administrative effort by 30% for 250+ users.",
      features: [
        "Bespoke WordPress theme and plugin development",
        "Custom workflow management tailored for statistical consulting",
        "Improved reporting accuracy and operational visibility",
        "Streamlined user onboarding and access permissions"
      ],
      githubUrl: "https://github.com/francisjun",
      liveUrl: null
    },
    {
      title: "Ghana Sweden Chamber of Commerce",
      tags: ["Web Design", "Responsive", "Custom Themes", "International"],
      description: "Designed and developed a responsive WordPress website with custom functionality strengthening engagement between institutions in Ghana and Sweden, boosting online visibility and user engagement by 85%.",
      features: [
        "Custom theme development tailored for bilateral trade organization",
        "Modern high-performance web experience optimized for international traffic",
        "Integrated institution directory and event announcements",
        "85% increase in online visibility and user interaction"
      ],
      githubUrl: "https://github.com/francisjun",
      liveUrl: "https://ghanaswedenchamber.com/"
    }
  ];

  const projectModal = document.getElementById('projectModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalTags = document.getElementById('modalTags');
  const modalBody = document.getElementById('modalBody');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const openModalBtns = document.querySelectorAll('.open-modal-btn');

  function openProjectModal(index) {
    const data = projectsData[index];
    if (!data) return;

    modalTitle.textContent = data.title;
    
    // Render Tags
    modalTags.innerHTML = data.tags.map(tag => 
      `<span class="project-tag">${tag}</span>`
    ).join('');

    // Generate Action Link Buttons
    let actionButtonsHTML = '';
    if (data.liveUrl) {
      actionButtonsHTML += `
        <a href="${data.liveUrl}" target="_blank" rel="noopener" class="btn-primary" style="text-decoration:none;">
          <span>Visit Live Platform</span>
          <span class="material-symbols-outlined" style="font-size: 1rem;">open_in_new</span>
        </a>
      `;
    }
    if (data.githubUrl) {
      actionButtonsHTML += `
        <a href="${data.githubUrl}" target="_blank" rel="noopener" class="btn-outline" style="text-decoration:none;">
          <span>GitHub Code</span>
          <span class="material-symbols-outlined" style="font-size: 1rem;">code</span>
        </a>
      `;
    }

    // Render Body & Highlights
    modalBody.innerHTML = `
      <p>${data.description}</p>
      <h4 style="font-family: var(--font-headline); color: var(--text-primary); margin-top: 1rem;">Key Engagement Highlights</h4>
      <ul style="padding-left: 1.25rem; display: flex; flex-direction: column; gap: 0.5rem;">
        ${data.features.map(feat => `<li>${feat}</li>`).join('')}
      </ul>
      <div style="margin-top: 1.75rem; display: flex; flex-wrap: wrap; gap: 1rem; align-items: center;">
        ${actionButtonsHTML}
      </div>
    `;

    projectModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeProjectModal() {
    if (projectModal) {
      projectModal.classList.remove('open');
      document.body.style.overflow = 'auto';
    }
  }

  openModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const idx = e.currentTarget.getAttribute('data-project');
      openProjectModal(parseInt(idx, 10));
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeProjectModal);
  }

  if (projectModal) {
    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal) {
        closeProjectModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && projectModal && projectModal.classList.contains('open')) {
      closeProjectModal();
    }
  });

  // ------------------------------------------------------------------------
  // 4. ACTIVE NAVIGATION SCROLL HIGHLIGHTING
  // ------------------------------------------------------------------------
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let currentSection = '';
    const scrollPos = window.scrollY + 200;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  });
});
