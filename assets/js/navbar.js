document.addEventListener("DOMContentLoaded", function() {

  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const mobileMenu = document.getElementById("mobileMenu");

  if (mobileMenuBtn && mobileMenu) {
    const hamburgerIcon = `<svg class="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
    </svg>`;

    const closeIcon = `<svg class="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
    </svg>`;

    let isMenuOpen = false;

    mobileMenuBtn.addEventListener("click", function(e) {
      e.preventDefault();
      e.stopPropagation();

      isMenuOpen = !isMenuOpen;

      if (isMenuOpen) {
        mobileMenu.classList.remove("hidden");
        mobileMenuBtn.innerHTML = closeIcon;
        console.log("Menu opened");
      } else {
        mobileMenu.classList.add("hidden");
        mobileMenuBtn.innerHTML = hamburgerIcon;
        console.log("Menu closed");
      }
    });

    const mobileMenuLinks = mobileMenu.querySelectorAll("a, button");
    mobileMenuLinks.forEach(function(link) {
      link.addEventListener("click", function() {
        isMenuOpen = false;
        mobileMenu.classList.add("hidden");
        mobileMenuBtn.innerHTML = hamburgerIcon;
        console.log("Menu closed by link click");
      });
    });

    document.addEventListener("click", function(e) {
      if (isMenuOpen &&
          !mobileMenu.contains(e.target) &&
          !mobileMenuBtn.contains(e.target)) {
        isMenuOpen = false;
        mobileMenu.classList.add("hidden");
        mobileMenuBtn.innerHTML = hamburgerIcon;
        console.log("Menu closed by outside click");
      }
    });
  } else {
    console.error("Mobile menu elements not found!");
  }

  const header = document.getElementById("header");
  if (header) {
    window.addEventListener("scroll", function() {
      if (window.scrollY > 50) {
        header.classList.add("shadow-xl");
      } else {
        header.classList.remove("shadow-xl");
      }
    });
  }

  function animateCounter(id, target, suffix) {
    suffix = suffix || "";
    const element = document.getElementById(id);
    if (!element) return;

    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const timer = setInterval(function() {
      current += increment;
      if (current >= target) {
        element.textContent = target.toLocaleString("id-ID") + suffix;
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(current).toLocaleString("id-ID") + suffix;
      }
    }, 16);
  }

  const stat1Element = document.getElementById("stat1");
  if (stat1Element) {
    const statsObserver = new IntersectionObserver(
      function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            animateCounter("stat1", 15337);
            animateCounter("stat2", 80, "%");
            animateCounter("stat3", 38);
            statsObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    const statsSection = stat1Element.closest("section");
    if (statsSection) {
      statsObserver.observe(statsSection);
    }
  }

  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener("click", function(e) {
      const href = this.getAttribute("href");
      if (href === "#" || href === "") return;

      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });
  });

  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
      offset: 100,
    });
  }
});
