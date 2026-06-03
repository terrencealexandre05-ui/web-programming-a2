
// ===========================
// NAVBAR SCROLL BEHAVIOR
// ===========================
const navbar = document.querySelector('.navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

// ===========================
// MOBILE NAV TOGGLE
// ===========================
const hamburger = document.querySelector('.hamburger');
const mobileNav = document.querySelector('.mobile-nav');

if (hamburger && mobileNav) {
  hamburger.addEventListener('click', () => {
    mobileNav.classList.toggle('open');
    document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
    // Animate hamburger
    const spans = hamburger.querySelectorAll('span');
    if (mobileNav.classList.contains('open')) {
      spans[0].style.transform = 'translateY(7px) rotate(45deg)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
    } else {
      spans.forEach(s => {
        s.style.transform = '';
        s.style.opacity = '';
      });
    }
  });

  // Close on nav link click
  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
      hamburger.querySelectorAll('span').forEach(s => {
        s.style.transform = '';
        s.style.opacity = '';
      });
    });
  });
}

// ===========================
// SCROLL FADE-IN ANIMATIONS
// ===========================
const fadeEls = document.querySelectorAll('.fade-up');
if (fadeEls.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  fadeEls.forEach(el => observer.observe(el));
}




// ===========================
// NEWSLETTER FORM
// ===========================
const newsletterForms = document.querySelectorAll('.newsletter-form');
newsletterForms.forEach(form => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = form.querySelector('.newsletter-input');
    if (input && input.value.includes('@')) {
      showToast('Welcome to the Colourette fam! 💕', '🌸');
      input.value = '';
    } else {
      showToast('Please enter a valid email address', '⚠️');
    }
  });
});


// ===========================
// SMOOTH ACTIVE NAV LINK
// ===========================
(function setActiveNav() {
  const path = window.location.pathname;
  const file = path.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar-links a, .mobile-nav a').forEach(a => {
    const href = a.getAttribute('href');
    if (href && (href === file || href.endsWith(file))) {
      a.classList.add('active');
    }
  });
})();

// ===========================
// PARALLAX HERO BLOBS
// ===========================
const blobs = document.querySelectorAll('.hero-bg-blob');
if (blobs.length) {
  window.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 30;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    blobs.forEach((blob, i) => {
      const dir = i % 2 === 0 ? 1 : -1;
      blob.style.transform = `translate(${x * dir * 0.5}px, ${y * dir * 0.4}px)`;
    });
  });
}

// ===========================
// IMAGE LAZY LOADING
// ===========================
const lazyImages = document.querySelectorAll('img[data-src]');
if (lazyImages.length) {
  const imgObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        imgObserver.unobserve(img);
      }
    });
  });
  lazyImages.forEach(img => imgObserver.observe(img));
}
