// main.js — NopalCactusIndia

document.addEventListener('DOMContentLoaded', function () {

  // ══════════════════════════════════════════════
  // Sticky Navbar Shadow on Scroll
  // ══════════════════════════════════════════════
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('shadow-xl', window.scrollY > 10);
    });
  }

  // ══════════════════════════════════════════════
  // Mobile Menu Toggle
  // ══════════════════════════════════════════════
  const menuBtn = document.getElementById('menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!menuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
        mobileMenu.classList.add('hidden');
      }
    });
  }

  // ══════════════════════════════════════════════
  // Hero Carousel
  // ══════════════════════════════════════════════
  const slides = document.querySelectorAll('.hero-slide');
  const dots   = document.querySelectorAll('.carousel-dot');
  if (slides.length > 0) {
    let current = 0;
    let timer   = null;

    function goTo(idx) {
      slides[current].classList.remove('opacity-100');
      slides[current].classList.add('opacity-0');
      dots[current]?.classList.replace('bg-white', 'bg-white/40');

      current = (idx + slides.length) % slides.length;

      slides[current].classList.remove('opacity-0');
      slides[current].classList.add('opacity-100');
      dots[current]?.classList.replace('bg-white/40', 'bg-white');
    }

    function autoPlay() {
      timer = setInterval(() => goTo(current + 1), 4000);
    }

    function resetTimer() {
      clearInterval(timer);
      autoPlay();
    }

    goTo(0);
    autoPlay();

    document.getElementById('prev-slide')?.addEventListener('click', () => { goTo(current - 1); resetTimer(); });
    document.getElementById('next-slide')?.addEventListener('click', () => { goTo(current + 1); resetTimer(); });
    dots.forEach((dot, i) => dot.addEventListener('click', () => { goTo(i); resetTimer(); }));
  }

  // ══════════════════════════════════════════════
  // Active Nav Link Highlight
  // ══════════════════════════════════════════════
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = (link.getAttribute('href') || '').split('/').pop();
    if (href === page || (page === '' && href === 'index.html')) {
      link.classList.add('bg-white/20', 'font-semibold');
    }
  });

  // ══════════════════════════════════════════════
  // Back to Top Button
  // ══════════════════════════════════════════════
  const btt = document.getElementById('back-to-top');
  if (btt) {
    window.addEventListener('scroll', () => {
      btt.classList.toggle('opacity-0', window.scrollY < 400);
      btt.classList.toggle('pointer-events-none', window.scrollY < 400);
    });
    btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  // ══════════════════════════════════════════════
  // Gallery Lightbox
  // ══════════════════════════════════════════════
  const lightbox   = document.getElementById('lightbox');
  const lbImg      = document.getElementById('lb-img');
  const lbClose    = document.getElementById('lb-close');
  const galleryImgs = document.querySelectorAll('.gallery-img');

  if (lightbox && lbImg) {
    galleryImgs.forEach(img => {
      img.addEventListener('click', () => {
        lbImg.src = img.src;
        lightbox.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
      });
    });
    function closeLB() {
      lightbox.classList.add('hidden');
      document.body.style.overflow = '';
    }
    lbClose?.addEventListener('click', closeLB);
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLB(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLB(); });
  }

  // ══════════════════════════════════════════════
  // Smooth Scroll for anchor links
  // ══════════════════════════════════════════════
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ══════════════════════════════════════════════
  // Contact Form → mailto
  // ══════════════════════════════════════════════
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const name    = document.getElementById('f-name')?.value    || '';
      const email   = document.getElementById('f-email')?.value   || '';
      const phone   = document.getElementById('f-phone')?.value   || '';
      const message = document.getElementById('f-message')?.value || '';
      const subject = encodeURIComponent('Enquiry from ' + name);
      const body    = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`
      );
      window.location.href = `mailto:info@nopalcactus.in?subject=${subject}&body=${body}`;
    });
  }

});
