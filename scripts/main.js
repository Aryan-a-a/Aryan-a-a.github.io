/* Progressive enhancement only — the site is fully usable without this file.
 *
 * 1. Mobile nav toggle: without JS the button stays [hidden] and the nav
 *    list is always visible. With JS, below 720px the list collapses behind
 *    a button exposing state via aria-expanded / aria-controls.
 * 2. Scroll-reveal: sections/cards fade up as they enter the viewport.
 *    The hidden initial state is CSS-gated on html.js AND
 *    prefers-reduced-motion: no-preference, so content can never be stuck
 *    invisible for no-JS or reduced-motion users.
 * 3. Active-section nav highlight while scrolling.
 */
(function () {
  "use strict";

  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  if (!toggle || !nav) return;

  // Signal to CSS that enhancements are active.
  document.documentElement.classList.add("js");
  toggle.hidden = false;
  nav.setAttribute("data-collapsed", "");

  function setOpen(open) {
    toggle.setAttribute("aria-expanded", String(open));
    if (open) {
      nav.removeAttribute("data-collapsed");
    } else {
      nav.setAttribute("data-collapsed", "");
    }
  }

  toggle.addEventListener("click", function () {
    setOpen(toggle.getAttribute("aria-expanded") !== "true");
  });

  // Close the menu after choosing a section link (small screens).
  nav.addEventListener("click", function (event) {
    if (event.target.closest("a")) setOpen(false);
  });

  // Close on Escape and return focus to the button.
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
      setOpen(false);
      toggle.focus();
    }
  });

  /* ---- Scroll-reveal ------------------------------------------------- */

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  if ("IntersectionObserver" in window && !reduceMotion.matches) {
    var targets = document.querySelectorAll(".section .container, .card, .marquee");

    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px" }
    );

    targets.forEach(function (el) {
      el.classList.add("reveal");
      revealObserver.observe(el);
    });

    // If the preference flips to reduced mid-visit, show everything.
    reduceMotion.addEventListener("change", function () {
      if (reduceMotion.matches) {
        targets.forEach(function (el) {
          el.classList.add("is-visible");
        });
      }
    });
  }

  /* ---- Active-section nav highlight ----------------------------------- */

  var navLinks = Array.prototype.slice.call(
    nav.querySelectorAll('a[href^="#"]')
  );
  var sectionsById = {};

  navLinks.forEach(function (link) {
    var target = document.getElementById(link.hash.slice(1));
    if (target) sectionsById[target.id] = link;
  });

  if ("IntersectionObserver" in window) {
    var activeObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            navLinks.forEach(function (l) {
              l.classList.toggle("is-active", l === sectionsById[entry.target.id]);
            });
          }
        });
      },
      // A slim horizontal band around the top third of the viewport
      { rootMargin: "-20% 0px -70% 0px" }
    );

    Object.keys(sectionsById).forEach(function (id) {
      activeObserver.observe(document.getElementById(id));
    });
  }
})();
