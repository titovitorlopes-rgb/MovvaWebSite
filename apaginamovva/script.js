// ==========================================================================
// MOVVA - Interactive Behaviors & Video/Image Transition
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = navMenu.classList.toggle('open');
      mobileToggle.classList.toggle('open', isOpen);
      mobileToggle.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navLinks.forEach(l => {
          l.classList.remove('active');
          const ind = l.querySelector('.active-indicator');
          if (ind) ind.remove();
        });
        link.classList.add('active');

        if (navMenu.classList.contains('open')) {
          navMenu.classList.remove('open');
          mobileToggle.classList.remove('open');
          mobileToggle.setAttribute('aria-expanded', 'false');
          document.body.style.overflow = '';
        }
      });
    });

    document.addEventListener('click', (e) => {
      if (navMenu.classList.contains('open') && !navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
        navMenu.classList.remove('open');
        mobileToggle.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }

  // 2. Fixed Navbar Scroll Appearance
  const navbar = document.querySelector('.navbar');
  const handleScroll = () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // Instant scroll to hash if present in URL on page load
  if (window.location.hash) {
    const targetEl = document.querySelector(window.location.hash);
    if (targetEl) {
      setTimeout(() => {
        targetEl.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    }
  }

  // 3. Scrollspy: Highlight active nav link based on visible section
  const sections = document.querySelectorAll('section[id]');
  const scrollspyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          const href = link.getAttribute('href');
          if (href === `#${id}`) {
            navLinks.forEach(l => {
              l.classList.remove('active');
              const ind = l.querySelector('.active-indicator');
              if (ind) ind.remove();
            });
            link.classList.add('active');
          }
        });
      }
    });
  }, {
    threshold: 0.3
  });

  sections.forEach(section => scrollspyObserver.observe(section));

  // 4. Sobre Section Background Video Play & Transition to ImagemBgCrystal
  const aboutSection = document.getElementById('sobre');
  const crystalVideo = document.getElementById('crystalVideo');
  const sobreNavLink = document.querySelector('a[href="#sobre"]');

  if (aboutSection && crystalVideo) {
    let transitionCompleted = false;

    // Enforce required attributes for instant autoplay on modern browsers
    crystalVideo.muted = true;
    crystalVideo.defaultMuted = true;
    crystalVideo.playsInline = true;
    crystalVideo.setAttribute('playsinline', '');
    crystalVideo.setAttribute('muted', '');

    const tryPlayVideo = () => {
      if (transitionCompleted) return;
      const playPromise = crystalVideo.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // If browser prevented it, retry silently on user engagement
        });
      }
    };

    // Attempt playback immediately upon load
    tryPlayVideo();

    const aboutContent = document.getElementById('aboutContent');

    // Smooth transition from video to image when video playback finishes
    const handleVideoEnded = () => {
      if (transitionCompleted) return;
      transitionCompleted = true;
      crystalVideo.pause();
      crystalVideo.classList.add('fade-out');

      // Reveal the brand logo, text and stats with smooth entrance
      if (aboutContent) {
        aboutContent.classList.add('visible');
      }
    };

    crystalVideo.addEventListener('ended', handleVideoEnded);

    // Fallback: transition when approaching the very end
    crystalVideo.addEventListener('timeupdate', () => {
      if (crystalVideo.duration && crystalVideo.currentTime >= crystalVideo.duration - 0.12) {
        handleVideoEnded();
      }
    });

    // 1) Trigger immediately when clicking 'Sobre' in navbar
    if (sobreNavLink) {
      sobreNavLink.addEventListener('click', () => {
        tryPlayVideo();
      });
    }

    // 2) IntersectionObserver when user scrolls down to Sobre
    const videoObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !transitionCompleted) {
          tryPlayVideo();
        }
      });
    }, {
      threshold: 0.01
    });

    videoObserver.observe(aboutSection);

    // 3) Event listeners on window for scroll / wheel / touch / click
    const handleUserActivity = () => {
      if (!transitionCompleted && crystalVideo.paused) {
        tryPlayVideo();
      }
    };

    window.addEventListener('scroll', handleUserActivity, { passive: true });
    window.addEventListener('wheel', handleUserActivity, { passive: true });
    window.addEventListener('touchstart', handleUserActivity, { passive: true });
    window.addEventListener('click', handleUserActivity, { passive: true });
  }

  // 4b. Serviços Hero Background Video Autoplay
  const servicesVideo = document.getElementById('servicesVideo');
  if (servicesVideo) {
    servicesVideo.muted = true;
    servicesVideo.defaultMuted = true;
    servicesVideo.playsInline = true;
    servicesVideo.setAttribute('playsinline', '');
    servicesVideo.setAttribute('muted', '');
    const playServicesVideo = () => {
      const p = servicesVideo.play();
      if (p !== undefined) {
        p.catch(() => {});
      }
    };
    playServicesVideo();
    ['touchstart', 'click', 'scroll'].forEach(evt => {
      window.addEventListener(evt, playServicesVideo, { once: true, passive: true });
    });
  }

  // 5. Testimonial Carousel in Serviços Bottom Section
  const testimonials = [
    {
      quote: '"The result exceeded our expectations! The website looks incredible and the service was flawless."',
      name: 'Lucas Ferreira',
      role: 'CEO, Nova Web'
    },
    {
      quote: '"We increased our conversion rate in the very first month with MOVVA\'s new layout."',
      name: 'Mariana Duarte',
      role: 'Director, Studio Bloom'
    },
    {
      quote: '"Extremely agile team and very clean code. The website loads in milliseconds."',
      name: 'Gabriel Santana',
      role: 'Founder, TechPulse'
    }
  ];

  let currentTestimonialIndex = 0;
  const quoteEl = document.querySelector('.testimonial-quote');
  const nameEl = document.querySelector('.author-name');
  const roleEl = document.querySelector('.author-role');
  const dots = document.querySelectorAll('.carousel-dots .dot');
  const prevBtn = document.querySelector('.carousel-btn.prev-btn');
  const nextBtn = document.querySelector('.carousel-btn.next-btn');

  let typewriterTimer = null;

  function typewriterQuote(el, text, duration) {
    if (!el) return;
    if (typewriterTimer) clearInterval(typewriterTimer);
    el.textContent = '';
    const len = text.length;
    const interval = Math.max(12, Math.floor(duration / len));
    let i = 0;
    typewriterTimer = setInterval(() => {
      if (i < len) {
        el.textContent = text.slice(0, i + 1);
        i++;
      } else {
        clearInterval(typewriterTimer);
        typewriterTimer = null;
      }
    }, interval);
  }

  function updateTestimonial(index) {
    if (!quoteEl || !nameEl || !roleEl) return;
    currentTestimonialIndex = (index + testimonials.length) % testimonials.length;

    // 1) Animação do quadrado sendo desenhado
    const cardBorderRect = document.querySelector('.testimonial-border-rect');
    if (cardBorderRect) {
      const len = cardBorderRect.getTotalLength() || 400;
      cardBorderRect.style.strokeDasharray = len;
      cardBorderRect.animate(
        [{ strokeDashoffset: len }, { strokeDashoffset: 0 }],
        { duration: 750, easing: 'cubic-bezier(.65,0,.35,1)', fill: 'both' }
      );
    }

    // 2) Animação do texto sendo escrito (typewriter)
    const quoteText = testimonials[currentTestimonialIndex].quote;
    typewriterQuote(quoteEl, quoteText, 650);

    // 3) Autor e cargo
    nameEl.style.opacity = '0';
    roleEl.style.opacity = '0';
    nameEl.textContent = testimonials[currentTestimonialIndex].name;
    roleEl.textContent = testimonials[currentTestimonialIndex].role;

    setTimeout(() => {
      nameEl.animate(
        [{ opacity: 0, transform: 'translateY(8px)' }, { opacity: 1, transform: 'translateY(0)' }],
        { duration: 450, easing: 'cubic-bezier(.22,1,.36,1)', fill: 'both' }
      );
      roleEl.animate(
        [{ opacity: 0, transform: 'translateY(8px)' }, { opacity: 1, transform: 'translateY(0)' }],
        { duration: 450, delay: 100, easing: 'cubic-bezier(.22,1,.36,1)', fill: 'both' }
      );
    }, 250);

    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === currentTestimonialIndex);
    });
  }

  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => updateTestimonial(currentTestimonialIndex - 1));
    nextBtn.addEventListener('click', () => updateTestimonial(currentTestimonialIndex + 1));
    
    dots.forEach((dot, idx) => {
      dot.addEventListener('click', () => updateTestimonial(idx));
    });
  }

  // 5. Precos / Video Section Background Video Play & Mini-Transition to FundoLogoPosVideo
  const pricingVideo = document.getElementById('pricingVideo');
  const pricingContent = document.getElementById('pricingContent');

  if (pricingVideo) {
    let pricingTransitionCompleted = false;

    pricingVideo.muted = true;
    pricingVideo.defaultMuted = true;
    pricingVideo.playsInline = true;
    pricingVideo.setAttribute('playsinline', '');
    pricingVideo.setAttribute('webkit-playsinline', '');
    pricingVideo.setAttribute('muted', '');

    const triggerMiniTransition = () => {
      if (pricingTransitionCompleted) return;
      pricingTransitionCompleted = true;

      // Start smooth mini cross-fade while video finishes its motion
      pricingVideo.classList.add('fade-out');

      if (pricingContent) {
        pricingContent.classList.add('visible');
      }

      // Pause video after the 0.6s cross-fade completes
      setTimeout(() => {
        pricingVideo.pause();
      }, 700);
    };

    const tryPlayPricingVideo = () => {
      if (pricingTransitionCompleted) return;
      const playPromise = pricingVideo.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          const dur = (pricingVideo.duration && !isNaN(pricingVideo.duration) && pricingVideo.duration > 2)
            ? pricingVideo.duration
            : 10.0;
          setTimeout(() => {
            triggerMiniTransition();
          }, Math.max(1000, (dur - 0.6) * 1000));
        }).catch(() => {
          setTimeout(() => {
            triggerMiniTransition();
          }, 1500);
        });
      }
    };

    pricingVideo.addEventListener('timeupdate', () => {
      const dur = pricingVideo.duration;
      if (dur && !isNaN(dur) && pricingVideo.currentTime >= dur - 0.6) {
        triggerMiniTransition();
      }
    });

    pricingVideo.addEventListener('ended', triggerMiniTransition);

    tryPlayPricingVideo();

    window.addEventListener('click', () => {
      if (!pricingTransitionCompleted && pricingVideo.currentTime > 0.8) {
        triggerMiniTransition();
      }
    }, { once: true });
  }
});

