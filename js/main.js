/* ============================================
   Aldar Academy — Main JavaScript
   ============================================ */

(function () {
  'use strict';

  // --- Mobile Menu ---
  const menuToggle = document.getElementById('menuToggle');
  const nav = document.getElementById('nav');
  const navOverlay = document.getElementById('navOverlay');

  function openMenu() {
    menuToggle.classList.add('active');
    nav.classList.add('open');
    navOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    menuToggle.setAttribute('aria-label', 'Close menu');
  }

  function closeMenu() {
    menuToggle.classList.remove('active');
    nav.classList.remove('open');
    navOverlay.classList.remove('active');
    document.body.style.overflow = '';
    menuToggle.setAttribute('aria-label', 'Open menu');
  }

  if (menuToggle) {
    menuToggle.addEventListener('click', function () {
      if (nav.classList.contains('open')) {
        closeMenu();
      } else {
        openMenu();
      }
    });
  }

  if (navOverlay) {
    navOverlay.addEventListener('click', closeMenu);
  }

  // Close menu when a nav link is clicked (mobile)
  document.querySelectorAll('.nav__link, .nav__donate').forEach(function (link) {
    link.addEventListener('click', function () {
      if (nav.classList.contains('open')) {
        closeMenu();
      }
    });
  });

  // Close menu on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && nav.classList.contains('open')) {
      closeMenu();
    }
  });

  // --- Sticky Header Shadow ---
  const header = document.getElementById('header');

  function updateHeaderShadow() {
    if (window.scrollY > 10) {
      header.classList.add('header--scrolled');
    } else {
      header.classList.remove('header--scrolled');
    }
  }

  window.addEventListener('scroll', updateHeaderShadow, { passive: true });
  updateHeaderShadow();

  // --- Smooth Scroll for Anchor Links ---
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;

      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // --- Simple Fade-in Animation on Scroll ---
  var animateElements = document.querySelectorAll('.card, .stat, .program, .tier, .donate-amount, .testimonial');

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    animateElements.forEach(function (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      observer.observe(el);
    });
  }

  // --- Active Nav Link ---
  var currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__link').forEach(function (link) {
    var href = link.getAttribute('href');
    link.classList.remove('nav__link--active');
    if (href === currentPage) {
      link.classList.add('nav__link--active');
    }
  });

})();
