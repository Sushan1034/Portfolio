// Modern Portfolio Pro — script.js
document.addEventListener('DOMContentLoaded', () => {
  // Header scroll state
  const header = document.querySelector('.site-header');
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 30);
  };
  window.addEventListener('scroll', onScroll);
  onScroll();

  // Mobile menu toggling
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navList = document.querySelector('.nav-list');

  mobileToggle && mobileToggle.addEventListener('click', () => {
    navList && navList.classList.toggle('open');
    mobileToggle.innerHTML = navList.classList.contains('open') ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
  });

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#' || href === '') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // close mobile nav when link clicked
      if (navList && navList.classList.contains('open')) {
        navList.classList.remove('open');
        mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
      }
    });
  });

  // Intersection observer for reveal animations with stagger
  const revealTargets = document.querySelectorAll('.project, .cert, .small-card, .about-text, .hero-left, .card');
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.style.transform = 'translateY(0)';
        entry.target.style.transition = 'opacity .6s ease, transform .6s cubic-bezier(.2,.9,.3,1)';
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealTargets.forEach((t, i) => {
    t.style.opacity = 0;
    t.style.transform = 'translateY(12px)';
    io.observe(t);
  });

  // Simple contact form handling (client-side)
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      // Light validation already enforced by required attributes
      const name = contactForm.name.value.trim();
      const email = contactForm.email.value.trim();
      const message = contactForm.message.value.trim();
      if (!name || !email || !message) {
        alert('Please fill all fields.');
        return;
      }
      // Replace with real backend or form service later
      alert('Thanks, ' + name + '! Your message was sent — I will reply soon.');
      contactForm.reset();
    });
  }
});
