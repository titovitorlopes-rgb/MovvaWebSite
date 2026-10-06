/* Movva - animações da Home (JS puro, sem biblioteca) */
(function () {
  var EASE = "cubic-bezier(.22,1,.36,1)";
  var SPRING = "cubic-bezier(.34,1.56,.64,1)";

  function init() {
    console.log("[mv] init rodou");

    /* ---------- CSS de hover / click ---------- */
    var css = document.createElement("style");
    css.textContent =
      ".mv-nav{display:inline-block;position:relative;transition:transform .2s ease,color .2s ease}" +
      ".mv-nav:hover{transform:scale(1.05)}" +
      ".mv-nav:active{transform:scale(.95)}" +
      ".active-indicator, .nav-link::after, .mv-nav::after{display:none !important}" +
      ".mv-btn{transition:transform .25s cubic-bezier(.22,1,.36,1),box-shadow .25s ease,filter .25s ease}" +
      ".mv-btn:hover{transform:translateY(-2px) scale(1.06);box-shadow:0 12px 30px -6px rgba(0,0,0,.4);filter:brightness(1.1)}" +
      ".mv-btn:active{transform:scale(.94);box-shadow:none}" +
      ".mv-icon{display:inline-block;transition:transform .3s cubic-bezier(.34,1.56,.64,1)}" +
      ".mv-icon:hover{transform:translateY(-6px) rotate(-6deg)}" +
      ".mv-icon:active{transform:scale(.9)}" +
      ".mv-word{display:inline-block;cursor:default;transition:transform .35s cubic-bezier(.34,1.56,.64,1),color .25s ease,text-shadow .3s ease;will-change:transform}" +
      ".mv-word:hover{transform:translateY(-6px) scale(1.08);color:#ffffff;text-shadow:0 4px 20px rgba(56,189,248,.6);filter:brightness(1.15)}" +
      ".mv-about-word{display:inline-block;cursor:default;transition:transform .35s cubic-bezier(.34,1.56,.64,1),color .25s ease,text-shadow .3s ease;will-change:transform}" +
      ".mv-about-word:hover{transform:translateY(-4px) scale(1.06);color:#0047b3;text-shadow:0 4px 14px rgba(22,96,218,.25)}" +
      ".about-kicker{cursor:default;transition:transform .35s cubic-bezier(.34,1.56,.64,1),letter-spacing .35s ease,color .3s ease}" +
      ".about-kicker:hover{transform:translateY(-2px);letter-spacing:0.35em;color:#0047b3}" +
      ".about-brand-logo{cursor:pointer;transition:transform .35s cubic-bezier(.34,1.56,.64,1),filter .3s ease}" +
      ".about-brand-logo:hover{transform:translateY(-3px) scale(1.06);filter:drop-shadow(0 8px 16px rgba(22,96,218,.3))}" +
      ".feature-item{cursor:pointer;transition:transform .35s cubic-bezier(.22,1,.36,1),filter .25s ease !important;will-change:transform}" +
      ".feature-item:hover{transform:translateY(-4px) scale(1.03) !important}" +
      ".feature-item:active{transform:scale(.96) !important}" +
      ".feature-item:hover .feature-icon-wrapper{transform:scale(1.18) rotate(6deg);color:#0052cc}" +
      ".feature-item:hover .feat-label{color:#063dd4}" +
      ".stat-col{cursor:pointer;transition:transform .3s cubic-bezier(.22,1,.36,1);will-change:transform}" +
      ".stat-col:hover{transform:translateY(-3px)}" +
      ".stat-svg{display:block;transform-origin:center center;will-change:transform}" +
      ".stat-val{display:inline-block;transform-origin:center center;will-change:transform;cursor:pointer}" +
      ".btn-services-cta, .btn-talk, .btn-detail-cta, .btn-cta{cursor:pointer;transition:transform .35s cubic-bezier(.22,1,.36,1),box-shadow .35s ease,filter .3s ease !important;will-change:transform}" +
      ".btn-services-cta:hover, .btn-talk:hover, .btn-detail-cta:hover, .btn-cta:hover{transform:translateY(-2px) scale(1.06) !important;box-shadow:0 10px 28px rgba(0,40,140,.3) !important}" +
      ".btn-services-cta:active, .btn-talk:active, .btn-detail-cta:active, .btn-cta:active{transform:scale(.96) !important}" +
      ".service-feature-card{cursor:pointer;transition:transform .35s cubic-bezier(.22,1,.36,1),box-shadow .35s ease;will-change:transform}" +
      ".service-feature-card:hover{transform:translateY(-4px);box-shadow:0 12px 28px rgba(0,40,140,.12)}" +
      ".service-pill-icon{display:inline-flex;align-items:center;justify-content:center;transition:transform .35s cubic-bezier(.34,1.56,.64,1);will-change:transform}" +
      ".service-feature-card:hover .service-pill-icon{transform:scale(1.15) rotate(8deg)}" +
      ".bottom-metric-item{cursor:pointer;transition:transform .3s cubic-bezier(.22,1,.36,1);will-change:transform}" +
      ".bottom-metric-item:hover{transform:translateY(-3px)}" +
      ".bottom-metric-item:hover .metric-svg{transform:scale(1.18) rotate(6deg);color:#77c7fd}" +
      ".bottom-metric-item:hover .metric-value{color:#77c7fd}" +
      ".features-bar{opacity:0;will-change:opacity,transform}" +
      ".pricing-card-col{cursor:pointer;transition:transform .35s cubic-bezier(.22,1,.36,1) !important;will-change:transform;backface-visibility:hidden;-webkit-backface-visibility:hidden}" +
      ".pricing-card-col:hover{transform:translateY(-8px) scale(1.025) !important;filter:none !important}" +
      ".pricing-card-col:hover .pricing-card-box{box-shadow:0 25px 48px rgba(0,25,80,.35) !important}" +
      ".pricing-card-col:active{transform:scale(.98) !important}";
    document.head.appendChild(css);

    /* ---------- 1) NAVBAR ---------- */
    var navLinks = Array.prototype.filter.call(
      document.querySelectorAll("nav a, header a"),
      function (a) {
        return /^(home|servi[cç]os|services|sobre|about|pre[cç]os|pricing)$/i.test(a.textContent.trim());
      }
    );
    console.log("[mv] navbar links:", navLinks.length);
    navLinks.forEach(function (a, i) {
      a.classList.add("mv-nav");
      a.animate(
        [
          { opacity: 0, transform: "translateY(-20px)" },
          { opacity: 1, transform: "translateY(0)" }
        ],
        { duration: 600, delay: i * 80, easing: EASE, fill: "backwards" }
      );
    });

    /* ---------- 2) HERO ---------- */
    var h1 = document.querySelector("h1");
    console.log("[mv] h1:", !!h1);
    var heroEnd = 0;

    if (h1) {
      var words = splitWords(h1);
      words.forEach(function (w, i) {
        w.classList.add("mv-word");
        w.animate(
          [
            { opacity: 0, transform: "translateY(30px)", filter: "blur(8px)" },
            { opacity: 1, transform: "translateY(0)", filter: "blur(0)" }
          ],
          { duration: 700, delay: 200 + i * 70, easing: EASE, fill: "backwards" }
        );
      });
      heroEnd = 200 + words.length * 70 + 300;

      var sub =
        (h1.nextElementSibling && h1.nextElementSibling.tagName === "P" && h1.nextElementSibling) ||
        (h1.parentElement && h1.parentElement.querySelector("p"));
      if (sub) {
        sub.animate(
          [
            { opacity: 0, transform: "translateY(20px)" },
            { opacity: 1, transform: "translateY(0)" }
          ],
          { duration: 700, delay: heroEnd - 200, easing: EASE, fill: "backwards" }
        );
      }
    }

    var btns = Array.prototype.filter.call(
      document.querySelectorAll("a, button"),
      function (b) {
        return /(solicitar\s+or[cç]amento|request\s+a\s+quote|get\s+a\s+quote)/i.test(b.textContent);
      }
    );
    var heroBtn =
      btns.filter(function (b) { return !b.closest("nav, header"); })[0] || btns[0];
    console.log("[mv] botão:", !!heroBtn);
    btns.forEach(function (b) { b.classList.add("mv-btn"); });
    if (heroBtn) {
      heroBtn.animate(
        [
          { opacity: 0, transform: "scale(.9)" },
          { opacity: 1, transform: "scale(1)" }
        ],
        { duration: 600, delay: heroEnd + 200, easing: SPRING, fill: "backwards" }
      );
    }

    /* Wave: ondulação suave e contínua (sem deixar bordas vazias) */
    var wave = document.querySelector('[class*="wave" i], [id*="wave" i]');
    console.log("[mv] wave:", !!wave);
    if (wave) {
      var paths = (wave.tagName.toLowerCase() === "path"
        ? [wave]
        : Array.prototype.slice.call(wave.querySelectorAll("path")))
        .filter(function (p) { return getComputedStyle(p).display !== "none"; });
      paths.forEach(function (p, i) {
        var len = p.getTotalLength();
        var cs = getComputedStyle(p);
        var color = cs.stroke && cs.stroke !== "none" ? cs.stroke : cs.fill;
        p.style.stroke = color;
        p.style.strokeWidth = cs.strokeWidth && cs.strokeWidth !== "0px" ? cs.strokeWidth : "2";
        p.style.strokeDasharray = len;
        p.animate(
          [{ strokeDashoffset: len }, { strokeDashoffset: 0 }],
          { duration: 2400, delay: i * 200, easing: "cubic-bezier(.65,0,.35,1)", fill: "both" }
        );
        p.animate(
          [{ fillOpacity: 0 }, { fillOpacity: 1 }],
          { duration: 900, delay: 1800 + i * 200, easing: "ease-out", fill: "both" }
        );
      });
    }

    var featBar = document.querySelector(".features-bar");
    if (featBar) {
      featBar.style.opacity = "0";
      featBar.style.pointerEvents = "none";
      setTimeout(function () {
        featBar.style.pointerEvents = "auto";
        featBar.animate(
          [
            { opacity: 0, transform: "translateY(22px) scale(.95)" },
            { opacity: 1, transform: "translateY(0) scale(1)" }
          ],
          { duration: 750, easing: EASE, fill: "both" }
        );
        featBar.style.opacity = "1";
      }, 2450);
    }

    var featItems = document.querySelectorAll(".features-bar .feature-item");
    featItems.forEach(function (item, i) {
      item.style.opacity = "0";
      setTimeout(function () {
        item.style.opacity = "1";
        item.animate(
          [
            { opacity: 0, transform: "translateY(16px) scale(.94)" },
            { opacity: 1, transform: "translateY(0) scale(1)" }
          ],
          { duration: 650, delay: i * 140, easing: EASE, fill: "both" }
        );
      }, 2500);
    });

    /* ---------- 3) NÚMEROS + ÍCONES ---------- */
    var numRe = /^[+\-]?\s*\d[\d.,]*\s*[%a-zA-Zçã]{0,5}\s*\+?$/;
    var nums = Array.prototype.filter.call(document.querySelectorAll("body *"), function (el) {
      if (el.childElementCount !== 0) return false;
      if (el.closest("nav, header, footer, script, style, h1, #aboutContent")) return false;
      var t = el.textContent.trim();
      return t.length > 0 && t.length <= 12 && numRe.test(t);
    });
    console.log("[mv] números:", nums.length);

    var cards = [];
    nums.forEach(function (n) {
      var card = n;
      for (var i = 0; i < 3; i++) {
        var p = card.parentElement;
        if (!p || p === document.body) break;
        var count = nums.filter(function (x) { return p.contains(x); }).length;
        if (count > 1) break;
        card = p;
      }
      cards.push({ card: card, num: n });
    });

    cards.forEach(function (item, idx) {
      var icon = item.card.querySelector('svg, img, i, [class*="icon" i]');
      if (icon) icon.classList.add("mv-icon");

      var run = function () {
        var delay = (idx % 6) * 120;
        item.card.animate(
          [
            { opacity: 0, transform: "translateY(40px) scale(.95)" },
            { opacity: 1, transform: "translateY(0) scale(1)" }
          ],
          { duration: 700, delay: delay, easing: EASE, fill: "backwards" }
        );
        if (icon) {
          icon.animate(
            [
              { opacity: 0, transform: "scale(.4) rotate(-15deg)" },
              { opacity: 1, transform: "scale(1) rotate(0)" }
            ],
            { duration: 700, delay: delay + 200, easing: SPRING, fill: "backwards" }
          );
        }
        countUp(item.num, delay);

        var numPulsing = false;
        item.num.style.display = "inline-block";
        item.num.style.willChange = "transform";
        item.num.addEventListener("mouseenter", function () {
          if (numPulsing) return;
          numPulsing = true;
          var a = item.num.animate(
            [
              { transform: "scale(1)" },
              { transform: "scale(1.24)", color: "#0052cc", offset: 0.38 },
              { transform: "scale(0.96)", offset: 0.72 },
              { transform: "scale(1)", offset: 1.0 }
            ],
            { duration: 650, easing: "cubic-bezier(.22,1,.36,1)" }
          );
          a.onfinish = function () {
            numPulsing = false;
          };
        });
      };

      if ("IntersectionObserver" in window) {
        var io = new IntersectionObserver(
          function (entries) {
            entries.forEach(function (e) {
              if (e.isIntersecting) {
                run();
                io.unobserve(e.target);
              }
            });
          },
          { threshold: 0.3 }
        );
        io.observe(item.card);
      } else {
        run();
      }
    });

    /* ---------- 4) SOBRE NÓS (após o término do vídeo) ---------- */
    var aboutContent = document.getElementById("aboutContent");
    if (aboutContent) {
      var aboutAnimated = false;
      var triggerAbout = function () {
        if (aboutAnimated) return;
        aboutAnimated = true;

        var kicker = aboutContent.querySelector(".about-kicker");
        var logo = aboutContent.querySelector(".about-brand-logo");
        var tagline = aboutContent.querySelector(".about-tagline");
        var statCols = aboutContent.querySelectorAll(".stat-col");
        var dividers = aboutContent.querySelectorAll(".stat-divider");

        if (kicker) {
          kicker.animate(
            [
              { opacity: 0, transform: "translateY(16px)" },
              { opacity: 1, transform: "translateY(0)" }
            ],
            { duration: 600, delay: 100, easing: EASE, fill: "both" }
          );
        }

        if (logo) {
          logo.animate(
            [
              { opacity: 0, transform: "translateY(20px) scale(0.9)" },
              { opacity: 1, transform: "translateY(0) scale(1)" }
            ],
            { duration: 700, delay: 250, easing: SPRING, fill: "both" }
          );
        }

        if (tagline) {
          var tagWords = splitWords(tagline);
          tagWords.forEach(function (tw) {
            tw.classList.add("mv-about-word");
          });
          tagline.animate(
            [
              { opacity: 0, transform: "translateY(22px)", filter: "blur(6px)" },
              { opacity: 1, transform: "translateY(0)", filter: "blur(0)" }
            ],
            { duration: 800, delay: 400, easing: EASE, fill: "both" }
          );
        }

        dividers.forEach(function (d, i) {
          d.animate(
            [
              { opacity: 0, transform: "scaleY(0)" },
              { opacity: 1, transform: "scaleY(1)" }
            ],
            { duration: 500, delay: 600 + i * 120, easing: EASE, fill: "both" }
          );
        });

        statCols.forEach(function (col, i) {
          var delay = 550 + i * 150;
          col.animate(
            [
              { opacity: 0, transform: "translateY(25px) scale(0.95)" },
              { opacity: 1, transform: "translateY(0) scale(1)" }
            ],
            { duration: 700, delay: delay, easing: EASE, fill: "both" }
          );

          var svg = col.querySelector(".stat-svg");
          if (svg) {
            svg.animate(
              [
                { opacity: 0, transform: "scale(0.3) rotate(-15deg)" },
                { opacity: 1, transform: "scale(1) rotate(0)" }
              ],
              { duration: 700, delay: delay + 100, easing: SPRING, fill: "both" }
            );

            var vectorPaths = svg.querySelectorAll("path, polygon, circle, polyline");
            vectorPaths.forEach(function (p) {
              if (typeof p.getTotalLength === "function") {
                try {
                  var len = p.getTotalLength();
                  if (len > 0) {
                    p.style.strokeDasharray = len;
                    p.animate(
                      [{ strokeDashoffset: len }, { strokeDashoffset: 0 }],
                      { duration: 1000, delay: delay + 120, easing: "cubic-bezier(.65,0,.35,1)", fill: "both" }
                    );
                  }
                } catch (err) {}
              }
            });

            /* Interações ao passar o cursor */
            if (i === 0) {
              /* 1) FOGUETE: voa em trajetória elíptica e pousa de volta */
              var isRocketFlying = false;
              var launchRocket = function () {
                if (isRocketFlying) return;
                isRocketFlying = true;
                var flyAnim = svg.animate(
                  [
                    { transform: "translate(0, 0) rotate(0deg) scale(1)", opacity: 1 },
                    { transform: "translate(26px, -38px) rotate(16deg) scale(1.18)", opacity: 0, offset: 0.36 },
                    { transform: "translate(-22px, 32px) rotate(-10deg) scale(0.82)", opacity: 0, offset: 0.40 },
                    { transform: "translate(0, 0) rotate(0deg) scale(1.08)", opacity: 1, offset: 0.82 },
                    { transform: "translate(0, 0) rotate(0deg) scale(1)", opacity: 1, offset: 1.0 }
                  ],
                  { duration: 950, easing: "cubic-bezier(.22,1,.36,1)" }
                );
                flyAnim.onfinish = function () {
                  isRocketFlying = false;
                };
              };
              svg.addEventListener("mouseenter", launchRocket);
              col.addEventListener("mouseenter", launchRocket);
            } else if (i === 1) {
              /* 2) ESTRELA: gira 360 graus com leve pop e amortecimento elástico */
              var isStarSpinning = false;
              var spinStar = function () {
                if (isStarSpinning) return;
                isStarSpinning = true;
                var starAnim = svg.animate(
                  [
                    { transform: "rotate(0deg) scale(1)" },
                    { transform: "rotate(180deg) scale(1.3)", offset: 0.45 },
                    { transform: "rotate(360deg) scale(1)", offset: 1.0 }
                  ],
                  { duration: 750, easing: "cubic-bezier(.34,1.56,.64,1)" }
                );
                starAnim.onfinish = function () {
                  isStarSpinning = false;
                };
              };
              svg.addEventListener("mouseenter", spinStar);
              col.addEventListener("mouseenter", spinStar);
            } else if (i === 2) {
              /* 3) RELÓGIO: o ponteiro (polyline) gira 360 graus em torno do eixo central (12px, 12px) */
              var clockHands = svg.querySelector("polyline");
              if (clockHands) {
                clockHands.style.transformOrigin = "12px 12px";
                clockHands.style.transformBox = "view-box";
              }
              var isClockSpinning = false;
              var spinClock = function () {
                if (isClockSpinning || !clockHands) return;
                isClockSpinning = true;
                var clockAnim = clockHands.animate(
                  [
                    { transform: "rotate(0deg)" },
                    { transform: "rotate(360deg)" }
                  ],
                  { duration: 800, easing: "cubic-bezier(.34,1.56,.64,1)" }
                );
                clockAnim.onfinish = function () {
                  isClockSpinning = false;
                };
              };
              svg.addEventListener("mouseenter", spinClock);
              col.addEventListener("mouseenter", spinClock);
            }
          }

          /* 4) NÚMEROS: aumenta com curva suave e volta ao normal sem quebra de frames */
          var num = col.querySelector(".stat-val");
          if (num) {
            countUp(num, delay + 120);

            var isNumPulsing = false;
            var pulseNumber = function () {
              if (isNumPulsing) return;
              isNumPulsing = true;
              var numAnim = num.animate(
                [
                  { transform: "scale(1)" },
                  { transform: "scale(1.24)", color: "#0052cc", offset: 0.38 },
                  { transform: "scale(0.96)", offset: 0.72 },
                  { transform: "scale(1)", offset: 1.0 }
                ],
                { duration: 650, easing: "cubic-bezier(.22,1,.36,1)" }
              );
              numAnim.onfinish = function () {
                isNumPulsing = false;
              };
            };
            num.addEventListener("mouseenter", pulseNumber);
          }
        });
      };

      if (aboutContent.classList.contains("visible")) {
        triggerAbout();
      } else {
        var obs = new MutationObserver(function () {
          if (aboutContent.classList.contains("visible")) {
            triggerAbout();
            obs.disconnect();
          }
        });
        obs.observe(aboutContent, { attributes: true, attributeFilter: ["class"] });

        var vid = document.getElementById("crystalVideo");
        if (vid) {
          vid.addEventListener("ended", function () {
            setTimeout(triggerAbout, 100);
          });
        }
      }
    }

    /* ---------- 5) SERVIÇOS (Página de Serviços) ---------- */
    var servicesWrapper = document.querySelector(".services-wrapper");
    if (servicesWrapper) {
      // 1) HERO SERVIÇOS: Textos e Botão "Conheça Nossos Serviços"
      var sKicker = document.querySelector(".services-kicker");
      var sTitle = document.querySelector(".services-hero-title");
      var sSub = document.querySelector(".services-hero-subtitle");
      var sHeroBtn = document.querySelector(".btn-services-cta");

      if (sKicker) {
        sKicker.animate(
          [
            { opacity: 0, transform: "translateY(16px)" },
            { opacity: 1, transform: "translateY(0)" }
          ],
          { duration: 600, delay: 100, easing: EASE, fill: "backwards" }
        );
      }

      if (sTitle) {
        var sWords = splitWords(sTitle);
        sWords.forEach(function (w, idx) {
          w.classList.add("mv-word");
          w.animate(
            [
              { opacity: 0, transform: "translateY(30px)", filter: "blur(8px)" },
              { opacity: 1, transform: "translateY(0)", filter: "blur(0)" }
            ],
            { duration: 700, delay: 200 + idx * 60, easing: EASE, fill: "backwards" }
          );
        });
      }

      if (sSub) {
        sSub.animate(
          [
            { opacity: 0, transform: "translateY(20px)" },
            { opacity: 1, transform: "translateY(0)" }
          ],
          { duration: 700, delay: 450, easing: EASE, fill: "backwards" }
        );
      }

      if (sHeroBtn) {
        animateButtonEntrance(sHeroBtn, 700);
      }

      // 2) SEÇÃO DE DETALHES (#servicos-detalhes)
      var detailsSec = document.getElementById("servicos-detalhes");
      if (detailsSec) {
        var dKicker = detailsSec.querySelector(".services-detail-kicker");
        var dTitle = detailsSec.querySelector(".services-detail-title");
        var dSub = detailsSec.querySelector(".services-detail-subtitle");
        var dCta = detailsSec.querySelector(".btn-detail-cta");
        var featureCards = detailsSec.querySelectorAll(".service-feature-card");

        var detailsAnimated = false;
        var triggerDetails = function () {
          if (detailsAnimated) return;
          detailsAnimated = true;

          if (dKicker) {
            dKicker.animate(
              [
                { opacity: 0, transform: "translateY(18px)" },
                { opacity: 1, transform: "translateY(0)" }
              ],
              { duration: 600, delay: 80, easing: EASE, fill: "both" }
            );
          }
          if (dTitle) {
            dTitle.animate(
              [
                { opacity: 0, transform: "translateY(24px)", filter: "blur(6px)" },
                { opacity: 1, transform: "translateY(0)", filter: "blur(0)" }
              ],
              { duration: 750, delay: 200, easing: EASE, fill: "both" }
            );
          }
          if (dSub) {
            dSub.animate(
              [
                { opacity: 0, transform: "translateY(20px)" },
                { opacity: 1, transform: "translateY(0)" }
              ],
              { duration: 700, delay: 350, easing: EASE, fill: "both" }
            );
          }
          if (dCta) {
            animateButtonEntrance(dCta, 500);
          }

          featureCards.forEach(function (card, idx) {
            var delay = 350 + idx * 140;
            card.animate(
              [
                { opacity: 0, transform: "translateY(28px) scale(0.96)" },
                { opacity: 1, transform: "translateY(0) scale(1)" }
              ],
              { duration: 700, delay: delay, easing: EASE, fill: "both" }
            );

            var pillIcon = card.querySelector(".service-pill-icon");
            if (pillIcon) {
              pillIcon.animate(
                [
                  { opacity: 0, transform: "scale(0.3) rotate(-15deg)" },
                  { opacity: 1, transform: "scale(1) rotate(0)" }
                ],
                { duration: 700, delay: delay + 100, easing: SPRING, fill: "both" }
              );

              // No Card 1 (Desenvolvimento de Sites): ícone de código é DESENHADO
              if (idx === 0) {
                var codePaths = pillIcon.querySelectorAll("polyline, line");
                codePaths.forEach(function (p, pi) {
                  if (typeof p.getTotalLength === "function") {
                    try {
                      var len = p.getTotalLength();
                      p.style.strokeDasharray = len;
                      p.animate(
                        [{ strokeDashoffset: len }, { strokeDashoffset: 0 }],
                        { duration: 900, delay: delay + 150 + pi * 100, easing: "cubic-bezier(.65,0,.35,1)", fill: "both" }
                      );
                    } catch (e) {}
                  }
                });

                card.addEventListener("mouseenter", function () {
                  codePaths.forEach(function (p) {
                    if (typeof p.getTotalLength === "function") {
                      try {
                        var len = p.getTotalLength();
                        p.style.strokeDasharray = len;
                        p.animate(
                          [{ strokeDashoffset: len }, { strokeDashoffset: 0 }],
                          { duration: 650, easing: "cubic-bezier(.65,0,.35,1)" }
                        );
                      } catch (e) {}
                    }
                  });
                });
              }
            }
          });
        };

        if ("IntersectionObserver" in window) {
          var obsDet = new IntersectionObserver(function (entries) {
            entries.forEach(function (e) {
              if (e.isIntersecting) {
                triggerDetails();
                obsDet.unobserve(e.target);
              }
            });
          }, { threshold: 0.15 });
          obsDet.observe(detailsSec);
        } else {
          triggerDetails();
        }
      }

      // 3) MOCKUP 3D: Computador com nuvem atrás
      var cloudPcWrapper = document.querySelector(".cloud-pc-container");
      var cloudImg = document.querySelector(".mockup-cloud-img");
      var pcImg = document.querySelector(".mockup-pc-img");

      if (cloudPcWrapper && cloudImg && pcImg) {
        var cloudPcAnimated = false;
        var triggerCloudPc = function () {
          if (cloudPcAnimated) return;
          cloudPcAnimated = true;

          cloudImg.animate(
            [
              { opacity: 0, transform: "scale(0.8) translateY(35px)" },
              { opacity: 1, transform: "scale(1) translateY(0)" }
            ],
            { duration: 1000, easing: EASE, fill: "backwards" }
          );

          pcImg.animate(
            [
              { opacity: 0, transform: "perspective(1200px) rotateY(-18deg) rotateX(12deg) translateZ(-70px) translateY(45px) scale(0.9)" },
              { opacity: 1, transform: "perspective(1200px) rotateY(0deg) rotateX(0deg) translateZ(0) translateY(0) scale(1)" }
            ],
            { duration: 1100, delay: 180, easing: SPRING, fill: "backwards" }
          );
        };

        if ("IntersectionObserver" in window) {
          var obsMock = new IntersectionObserver(function (entries) {
            entries.forEach(function (e) {
              if (e.isIntersecting) {
                triggerCloudPc();
                obsMock.unobserve(e.target);
              }
            });
          }, { threshold: 0.15 });
          obsMock.observe(cloudPcWrapper);
        } else {
          triggerCloudPc();
        }

        // Interação 3D com o cursor
        var targetPcRotY = 0, targetPcRotX = 0, targetPcTransX = 0, targetPcTransY = 0;
        var targetCloudRotY = 0, targetCloudRotX = 0, targetCloudTransX = 0, targetCloudTransY = 0;
        var curPcRotY = 0, curPcRotX = 0, curPcTransX = 0, curPcTransY = 0;
        var curCloudRotY = 0, curCloudRotX = 0, curCloudTransX = 0, curCloudTransY = 0;
        var isMouseOverMockup = false;
        var rafMockup = null;

        function render3D() {
          var k = 0.12;
          curPcRotY += (targetPcRotY - curPcRotY) * k;
          curPcRotX += (targetPcRotX - curPcRotX) * k;
          curPcTransX += (targetPcTransX - curPcTransX) * k;
          curPcTransY += (targetPcTransY - curPcTransY) * k;

          curCloudRotY += (targetCloudRotY - curCloudRotY) * k;
          curCloudRotX += (targetCloudRotX - curCloudRotX) * k;
          curCloudTransX += (targetCloudTransX - curCloudTransX) * k;
          curCloudTransY += (targetCloudTransY - curCloudTransY) * k;

          pcImg.style.transform = "perspective(1200px) rotateY(" + curPcRotY.toFixed(2) + "deg) rotateX(" + curPcRotX.toFixed(2) + "deg) translateX(" + curPcTransX.toFixed(2) + "px) translateY(" + curPcTransY.toFixed(2) + "px) translateZ(36px)";
          cloudImg.style.transform = "perspective(1200px) rotateY(" + curCloudRotY.toFixed(2) + "deg) rotateX(" + curCloudRotX.toFixed(2) + "deg) translateX(" + curCloudTransX.toFixed(2) + "px) translateY(" + curCloudTransY.toFixed(2) + "px) translateZ(-24px)";

          var d = Math.abs(targetPcRotY - curPcRotY) + Math.abs(targetPcRotX - curPcRotX) + Math.abs(targetPcTransX - curPcTransX);
          if (isMouseOverMockup || d > 0.05) {
            rafMockup = requestAnimationFrame(render3D);
          } else {
            rafMockup = null;
          }
        }

        var mockupArea = cloudPcWrapper.closest(".services-cloud-mockup") || cloudPcWrapper;
        window.addEventListener("mousemove", function (e) {
          var rect = mockupArea.getBoundingClientRect();
          if (
            e.clientX >= rect.left - 120 &&
            e.clientX <= rect.right + 120 &&
            e.clientY >= rect.top - 120 &&
            e.clientY <= rect.bottom + 120
          ) {
            var midX = rect.left + rect.width / 2;
            var midY = rect.top + rect.height / 2;
            var nx = Math.max(-1.2, Math.min(1.2, (e.clientX - midX) / (rect.width / 2)));
            var ny = Math.max(-1.2, Math.min(1.2, (e.clientY - midY) / (rect.height / 2)));

            targetPcRotY = nx * 18;
            targetPcRotX = -ny * 14;
            targetPcTransX = nx * 22;
            targetPcTransY = ny * 16;

            targetCloudRotY = nx * 8;
            targetCloudRotX = -ny * 7;
            targetCloudTransX = -nx * 16;
            targetCloudTransY = -ny * 12;

            if (!isMouseOverMockup) {
              isMouseOverMockup = true;
              if (!rafMockup) rafMockup = requestAnimationFrame(render3D);
            }
          } else if (isMouseOverMockup) {
            isMouseOverMockup = false;
            targetPcRotY = 0; targetPcRotX = 0; targetPcTransX = 0; targetPcTransY = 0;
            targetCloudRotY = 0; targetCloudRotX = 0; targetCloudTransX = 0; targetCloudTransY = 0;
            if (!rafMockup) rafMockup = requestAnimationFrame(render3D);
          }
        });
      }

      // 4) SEÇÃO INFERIOR: Resultados e Testemunho com desenho do card
      var bottomSec = document.querySelector(".services-bottom-section");
      if (bottomSec) {
        var bKicker = bottomSec.querySelector(".bottom-kicker");
        var bTitle = bottomSec.querySelector(".bottom-title");
        var bSub = bottomSec.querySelector(".bottom-subtitle");
        var bMetrics = bottomSec.querySelectorAll(".bottom-metric-item");
        var testCard = bottomSec.querySelector(".testimonial-card");
        var testKicker = bottomSec.querySelector(".testimonial-kicker");

        var bottomAnimated = false;
        var triggerBottom = function () {
          if (bottomAnimated) return;
          bottomAnimated = true;

          if (bKicker) bKicker.animate([{ opacity: 0, transform: "translateY(16px)" }, { opacity: 1, transform: "translateY(0)" }], { duration: 600, delay: 100, easing: EASE, fill: "both" });
          if (bTitle) bTitle.animate([{ opacity: 0, transform: "translateY(22px)" }, { opacity: 1, transform: "translateY(0)" }], { duration: 750, delay: 200, easing: EASE, fill: "both" });
          if (bSub) bSub.animate([{ opacity: 0, transform: "translateY(18px)" }, { opacity: 1, transform: "translateY(0)" }], { duration: 700, delay: 350, easing: EASE, fill: "both" });

          bMetrics.forEach(function (m, idx) {
            var delay = 350 + idx * 130;
            m.animate([{ opacity: 0, transform: "translateY(24px) scale(0.95)" }, { opacity: 1, transform: "translateY(0) scale(1)" }], { duration: 700, delay: delay, easing: EASE, fill: "both" });
            var mSvg = m.querySelector(".metric-svg");
            if (mSvg) mSvg.animate([{ opacity: 0, transform: "scale(0.3) rotate(-15deg)" }, { opacity: 1, transform: "scale(1) rotate(0)" }], { duration: 650, delay: delay + 80, easing: SPRING, fill: "both" });
            var mVal = m.querySelector(".metric-value");
            if (mVal) countUp(mVal, delay + 100);
          });

          if (testKicker) testKicker.animate([{ opacity: 0, transform: "translateY(14px)" }, { opacity: 1, transform: "translateY(0)" }], { duration: 600, delay: 300, easing: EASE, fill: "both" });

          if (testCard) {
            testCard.animate([{ opacity: 0, transform: "translateY(30px) scale(0.96)" }, { opacity: 1, transform: "translateY(0) scale(1)" }], { duration: 800, delay: 400, easing: EASE, fill: "both" });

            // Desenha o quadrado (contorno)
            var cardRect = testCard.querySelector(".testimonial-border-rect");
            if (cardRect) {
              var len = cardRect.getTotalLength() || 400;
              cardRect.style.strokeDasharray = len;
              cardRect.animate([{ strokeDashoffset: len }, { strokeDashoffset: 0 }], { duration: 850, delay: 450, easing: "cubic-bezier(.65,0,.35,1)", fill: "both" });
            }

            // Escreve o texto inicial
            var quoteEl = testCard.querySelector(".testimonial-quote");
            if (quoteEl) {
              var originalQuote = quoteEl.textContent.trim();
              setTimeout(function () {
                var qLen = originalQuote.length;
                var interval = Math.max(12, Math.floor(650 / qLen));
                var qi = 0;
                quoteEl.textContent = "";
                var qTimer = setInterval(function () {
                  if (qi < qLen) {
                    quoteEl.textContent = originalQuote.slice(0, qi + 1);
                    qi++;
                  } else {
                    clearInterval(qTimer);
                  }
                }, interval);
              }, 480);
            }
          }
        };

        if ("IntersectionObserver" in window) {
          var obsBot = new IntersectionObserver(function (entries) {
            entries.forEach(function (e) {
              if (e.isIntersecting) {
                triggerBottom();
                obsBot.unobserve(e.target);
              }
            });
          }, { threshold: 0.15 });
          obsBot.observe(bottomSec);
        } else {
          triggerBottom();
        }
      }
    }

    /* ---------- 6) PREÇOS (#precos) ---------- */
    var pricingSection = document.getElementById("precos");
    if (pricingSection) {
      console.log("[mv] precos detectado");
      var pKicker = pricingSection.querySelector(".pricing-kicker");
      var pTitleSpans = pricingSection.querySelectorAll(".pricing-title span");
      var pSub = pricingSection.querySelector(".pricing-subtitle");
      var pricingCards = pricingSection.querySelectorAll(".pricing-card-col");

      if (pKicker) {
        pKicker.animate(
          [
            { opacity: 0, transform: "translateY(18px)" },
            { opacity: 1, transform: "translateY(0)" }
          ],
          { duration: 600, delay: 120, easing: EASE, fill: "both" }
        );
      }

      if (pTitleSpans.length > 0) {
        pTitleSpans.forEach(function (sp, i) {
          sp.animate(
            [
              { opacity: 0, transform: "translateY(28px)", filter: "blur(6px)" },
              { opacity: 1, transform: "translateY(0)", filter: "blur(0)" }
            ],
            { duration: 750, delay: 240 + i * 110, easing: EASE, fill: "both" }
          );
        });
      }

      if (pSub) {
        pSub.animate(
          [
            { opacity: 0, transform: "translateY(22px)" },
            { opacity: 1, transform: "translateY(0)" }
          ],
          { duration: 700, delay: 480, easing: EASE, fill: "both" }
        );
      }

      // Animação de entrada dos quadrados (cards de preços)
      pricingCards.forEach(function (card, idx) {
        var delay = 620 + idx * 160;
        card.animate(
          [
            { opacity: 0, transform: "translateY(36px) scale(0.95)" },
            { opacity: 1, transform: "translateY(0) scale(1)" }
          ],
          { duration: 750, delay: delay, easing: "cubic-bezier(.22, 1, .36, 1)", fill: "backwards" }
        );
      });

      // Sistema 3D interativo nos quadrados de planos (exatamente como PC + Nuvem, LERP 60/120fps sem frames cortados)
      pricingCards.forEach(function (card) {
        card.classList.add("has-3d-tilt");

        var targetRotY = 0, targetRotX = 0, targetTransY = 0, targetScale = 1;
        var curRotY = 0, curRotX = 0, curTransY = 0, curScale = 1;
        var isHovered = false;
        var rafCard = null;

        function renderCard3D() {
          var k = 0.12;
          curRotY += (targetRotY - curRotY) * k;
          curRotX += (targetRotX - curRotX) * k;
          curTransY += (targetTransY - curTransY) * k;
          curScale += (targetScale - curScale) * k;

          var shadowX = (-curRotY * 1.5).toFixed(1);
          var shadowY = (18 - curTransY * 0.8).toFixed(1);
          var shadowBlur = (26 + Math.abs(curTransY) * 0.6).toFixed(1);

          card.style.transform =
            "perspective(1000px) rotateX(" +
            curRotX.toFixed(2) +
            "deg) rotateY(" +
            curRotY.toFixed(2) +
            "deg) translateY(" +
            curTransY.toFixed(2) +
            "px) scale3d(" +
            curScale.toFixed(3) +
            "," +
            curScale.toFixed(3) +
            ",1)";

          var box = card.querySelector(".pricing-card-box");
          if (box) {
            box.style.boxShadow =
              shadowX +
              "px " +
              shadowY +
              "px " +
              shadowBlur +
              "px rgba(0, 25, 80, 0.35)";
          }
          card.style.filter = "none";

          var delta =
            Math.abs(targetRotY - curRotY) +
            Math.abs(targetRotX - curRotX) +
            Math.abs(targetTransY - curTransY) +
            Math.abs(targetScale - curScale);

          if (isHovered || delta > 0.02) {
            rafCard = requestAnimationFrame(renderCard3D);
          } else {
            card.style.transform = "";
            card.style.filter = "";
            if (box) {
              box.style.boxShadow = "";
            }
            rafCard = null;
          }
        }

        card.addEventListener("mousemove", function (e) {
          var rect = card.getBoundingClientRect();
          var midX = rect.left + rect.width / 2;
          var midY = rect.top + rect.height / 2;
          var nx = Math.max(-1, Math.min(1, (e.clientX - midX) / (rect.width / 2)));
          var ny = Math.max(-1, Math.min(1, (e.clientY - midY) / (rect.height / 2)));

          targetRotY = nx * 14;
          targetRotX = -ny * 12;
          targetTransY = -10;
          targetScale = 1.04;
          isHovered = true;

          if (!rafCard) {
            rafCard = requestAnimationFrame(renderCard3D);
          }
        });

        card.addEventListener("mouseleave", function () {
          targetRotY = 0;
          targetRotX = 0;
          targetTransY = 0;
          targetScale = 1;
          isHovered = false;

          if (!rafCard) {
            rafCard = requestAnimationFrame(renderCard3D);
          }
        });
      });
    }

    // Botão global na navbar ("Vamos Conversar")
    var globalNavBtn = document.querySelector(".navbar .btn-talk");
    if (globalNavBtn) {
      animateButtonEntrance(globalNavBtn, 300);
    }
  }

  /* ---------- Helpers ---------- */
  function splitWords(el) {
    var words = [];
    (function walk(node) {
      Array.prototype.slice.call(node.childNodes).forEach(function (n) {
        if (n.nodeType === 3) {
          var frag = document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach(function (p) {
            if (!p) return;
            if (/^\s+$/.test(p)) {
              frag.appendChild(document.createTextNode(" "));
            } else {
              var s = document.createElement("span");
              s.textContent = p;
              s.style.display = "inline-block";
              frag.appendChild(s);
              words.push(s);
            }
          });
          n.replaceWith(frag);
        } else if (n.nodeType === 1 && n.tagName !== "BR") {
          walk(n);
        }
      });
    })(el);
    return words;
  }

  function countUp(el, delay) {
    var original = el.textContent.trim();
    var m = original.match(/^(\D*?)(\d[\d.,]*)(.*)$/);
    if (!m) return;
    var prefix = m[1], raw = m[2], suffix = m[3];
    var thousands = /^\d{1,3}([.,]\d{3})+$/.test(raw);
    var useComma = !thousands && raw.indexOf(",") > -1;
    var clean = thousands ? raw.replace(/[.,]/g, "") : raw.replace(",", ".");
    var target = parseFloat(clean);
    if (isNaN(target)) return;
    var decimals = thousands ? 0 : (clean.split(".")[1] || "").length;

    function fmt(v) {
      if (thousands) return Math.round(v).toLocaleString("pt-BR");
      var s = v.toFixed(decimals);
      return useComma ? s.replace(".", ",") : s;
    }

    el.textContent = prefix + fmt(0) + suffix;
    var dur = 1500;
    setTimeout(function () {
      var start = performance.now();
      (function tick(now) {
        var t = Math.min((now - start) / dur, 1);
        var eased = 1 - Math.pow(1 - t, 3);
        el.textContent = prefix + fmt(target * eased) + suffix;
        if (t < 1) requestAnimationFrame(tick);
        else el.textContent = original;
      })(start);
    }, delay);
  }

  function animateButtonEntrance(btn, delay) {
    if (!btn) return;
    var oldSvg = btn.querySelector(".btn-border-svg");
    if (oldSvg) oldSvg.remove();
    btn.style.position = "";
    btn.style.overflow = "";
    btn.style.backgroundColor = "";
    btn.style.borderColor = "";

    var span = btn.querySelector("span");
    if (span) {
      span.style.clipPath = "";
      span.style.opacity = "";
    }
    var arrow = btn.querySelector(".arrow-svg");
    if (arrow) {
      arrow.style.opacity = "";
    }

    btn.animate(
      [
        { opacity: 0, transform: "translateY(16px) scale(0.96)" },
        { opacity: 1, transform: "translateY(0) scale(1)" }
      ],
      { duration: 650, delay: delay, easing: EASE, fill: "both" }
    );
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
