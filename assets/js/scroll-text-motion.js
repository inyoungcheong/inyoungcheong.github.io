/**
 * ScrollTextMotion — On-scroll kinetic typography
 * Adapted from Codrops ScrollTextMotion for Inyoung Cheong
 */
(function () {
  'use strict';

  // Bail if GSAP plugins are missing
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined' || typeof Flip === 'undefined') {
    return;
  }

  // Register plugins
  var plugins = [ScrollTrigger, Flip];
  if (typeof ScrambleTextPlugin !== 'undefined') plugins.push(ScrambleTextPlugin);
  gsap.registerPlugin.apply(gsap, plugins);

  // DOM references
  var textElements = document.querySelectorAll('.scroll-motion-wrap .el');
  var logoEl = document.querySelector('.logo.fixed');
  var logoNameEl = document.querySelector('.logo-name');
  var logoTitleEl = document.querySelector('.logo-title');
  var landingNav = document.querySelector('.landing-nav');
  var landingCards = landingNav ? landingNav.querySelectorAll('.landing-card') : [];

  if (textElements.length === 0) return;

  // Cache original text
  textElements.forEach(function (el) {
    el.dataset.text = el.textContent;
  });
  if (logoNameEl) logoNameEl.dataset.text = logoNameEl.textContent;
  if (logoTitleEl) logoTitleEl.dataset.text = logoTitleEl.textContent;

  // -------------------------------------------------------
  // RESET
  // -------------------------------------------------------
  function resetTextElements() {
    textElements.forEach(function (el) {
      gsap.set(el, { clearProps: 'transform,opacity,filter' });
    });
  }

  // -------------------------------------------------------
  // FLIP ANIMATION (position class swapping on scroll)
  // -------------------------------------------------------
  function initFlips() {
    resetTextElements();

    textElements.forEach(function (el) {
      var originalClass = Array.from(el.classList).find(function (c) {
        return c.indexOf('pos-') === 0;
      });
      var targetClass = el.dataset.altPos;
      if (!targetClass) return;

      var flipEase = el.dataset.flipEase || 'expo.inOut';

      // Capture end state
      el.classList.add(targetClass);
      el.classList.remove(originalClass);
      var flipState = Flip.getState(el, { props: 'opacity, filter, width' });
      el.classList.add(originalClass);
      el.classList.remove(targetClass);

      // Animate TO target on scroll in
      Flip.to(flipState, {
        ease: flipEase,
        scrollTrigger: {
          trigger: el,
          start: 'clamp(bottom bottom-=10%)',
          end: 'clamp(center center)',
          scrub: true,
        },
      });

      // Animate FROM target on scroll out
      Flip.from(flipState, {
        ease: flipEase,
        scrollTrigger: {
          trigger: el,
          start: 'clamp(center center)',
          end: 'clamp(top top)',
          scrub: true,
        },
      });
    });
  }

  // -------------------------------------------------------
  // SCRAMBLE TEXT
  // -------------------------------------------------------
  function scramble(el, opts) {
    if (typeof ScrambleTextPlugin === 'undefined') return;
    opts = opts || {};
    var text = el.dataset.text || el.textContent;
    var duration = opts.duration != null
      ? opts.duration
      : (el.dataset.scrambleDuration ? parseFloat(el.dataset.scrambleDuration) : 1);
    var revealDelay = opts.revealDelay || 0;

    gsap.killTweensOf(el);
    gsap.fromTo(
      el,
      { scrambleText: { text: '', chars: '' } },
      {
        scrambleText: { text: text, chars: 'upperAndLowerCase', revealDelay: revealDelay },
        duration: duration,
      }
    );
  }

  function killScrambleTriggers() {
    ScrollTrigger.getAll().forEach(function (st) {
      if (st.vars.id === 'scramble') st.kill();
    });
  }

  function initScramble() {
    killScrambleTriggers();

    textElements.forEach(function (el) {
      ScrollTrigger.create({
        id: 'scramble',
        trigger: el,
        start: 'top bottom',
        end: 'bottom top',
        onEnter: function () { scramble(el); },
        onEnterBack: function () { scramble(el); },
      });
    });

    // Scramble logo on init
    if (logoNameEl) scramble(logoNameEl, { revealDelay: 0.5, duration: 1.5 });
    if (logoTitleEl) scramble(logoTitleEl, { revealDelay: 0.3, duration: 1 });
  }

  // -------------------------------------------------------
  // LOGO FADE ON SCROLL
  // -------------------------------------------------------
  function initLogoFade() {
    if (!logoEl) return;

    gsap.to(logoEl, {
      opacity: 0,
      scrollTrigger: {
        trigger: '.scroll-motion-wrap .content',
        start: 'top top',
        end: '15% top',
        scrub: true,
      },
    });
  }

  // -------------------------------------------------------
  // LANDING NAV ANIMATION (like Codrops "related" section)
  // -------------------------------------------------------
  function initLandingNav() {
    if (!landingNav || landingCards.length === 0) return;

    gsap.set(landingCards, { yPercent: 50, scale: 0.9, opacity: 0 });

    ScrollTrigger.create({
      trigger: landingNav,
      start: 'top center+=25%',
      onEnter: function () {
        gsap.to(landingCards, {
          duration: 0.7,
          ease: 'expo',
          stagger: 0.12,
          yPercent: 0,
          scale: 1,
          opacity: 1,
        });
      },
      onLeaveBack: function () {
        gsap.to(landingCards, {
          duration: 0.4,
          ease: 'power3.in',
          scale: 0.9,
          opacity: 0,
          yPercent: 50,
          stagger: 0.05,
        });
      },
    });
  }

  // -------------------------------------------------------
  // RESIZE
  // -------------------------------------------------------
  window.addEventListener('resize', function () {
    ScrollTrigger.refresh(true);
    initFlips();
    initScramble();
  });

  // -------------------------------------------------------
  // INIT
  // -------------------------------------------------------
  initFlips();
  initScramble();
  initLogoFade();
  initLandingNav();
})();
