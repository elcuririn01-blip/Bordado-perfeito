/* ==========================================================================
   BORDADO PERFECTO - SCRIPT INTERACTIVO EN ESPAÑOL
   Alta Conversión, Temporizador, Verificador de Máquinas, FAQ & Notificaciones
   ========================================================================== */

(function () {
  'use strict';

  // 1. TEMPORIZADOR DE CUENTA REGRESIVA (15 MINUTOS PERSISTENTE)
  function initCountdown() {
    var timerEl = document.getElementById('countdownTimer');
    if (!timerEl) return;

    var STORAGE_KEY = 'ke_countdown_end';
    var DURATION_MS = 15 * 60 * 1000; // 15 minutos

    var endTime = localStorage.getItem(STORAGE_KEY);
    var now = Date.now();

    if (!endTime || now > parseInt(endTime, 10)) {
      endTime = now + DURATION_MS;
      localStorage.setItem(STORAGE_KEY, endTime);
    } else {
      endTime = parseInt(endTime, 10);
    }

    function update() {
      var remaining = Math.max(0, endTime - Date.now());
      var minutes = Math.floor(remaining / 60000);
      var seconds = Math.floor((remaining % 60000) / 1000);

      var formatted = (minutes < 10 ? '0' : '') + minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
      timerEl.textContent = formatted;

      var secondaryTimer = document.getElementById('offerTimer');
      if (secondaryTimer) {
        secondaryTimer.textContent = formatted;
      }

      if (remaining <= 0) {
        // Reinicia un nuevo ciclo suave
        endTime = Date.now() + DURATION_MS;
        localStorage.setItem(STORAGE_KEY, endTime);
      }
    }

    update();
    setInterval(update, 1000);
  }

  // 2. VERIFICADOR INTERACTIVO DE COMPATIBILIDAD DE MÁQUINAS
  function initMachineChecker() {
    var btns = document.querySelectorAll('.machine-btn');
    var resultText = document.getElementById('machineResultText');
    if (!btns.length || !resultText) return;

    var MACHINES = {
      brother: {
        title: 'Brother & Babylock',
        format: '.PES',
        desc: 'Tus matrices ya vienen en formato <strong>.PES</strong> original. ¡Solo cópialas a tu memoria USB y borda en bastidores 10x10, 13x18 o más grandes!'
      },
      janome: {
        title: 'Janome & Elna',
        format: '.JEF',
        desc: 'Compatibilidad perfecta con formato <strong>.JEF</strong> nativo. Tu Janome las reconoce al instante en pantalla sin necesidad de convertir archivos.'
      },
      singer: {
        title: 'Singer (Superb, Quantum, EM)',
        format: '.XXX',
        desc: '100% listas en formato <strong>.XXX</strong>. Sin errores de lectura ni hilos fruncidos, directo a tu bastidor.'
      },
      bernina: {
        title: 'Bernina & Bernette',
        format: '.EXP',
        desc: 'Matrices listas en formato <strong>.EXP</strong> con puntadas calculadas para la alta precisión de Bernina.'
      },
      industrial: {
        title: 'Máquinas Industriales (Tajima, Barudan, Feiya, etc.)',
        format: '.DST',
        desc: 'Archivos en formato <strong>.DST</strong> estándar universal industrial, con la secuencia perfecta de cambio de hilos.'
      }
    };

    btns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        btns.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');

        var brand = btn.getAttribute('data-brand');
        var data = MACHINES[brand];
        if (data) {
          resultText.innerHTML = '<h4>' + data.title + ' — Formato ' + data.format + '</h4>' +
                                 '<p>' + data.desc + '</p>';
        }
      });
    });
  }

  // 3. PESTAÑAS DE PRUEBA SOCIAL (WHATSAPP Y FACEBOOK)
  function initProofTabs() {
    var tabs = document.querySelectorAll('.proof-tab-btn');
    var grids = document.querySelectorAll('.proof-grid-wrapper');
    if (!tabs.length) return;

    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        tabs.forEach(function (t) { t.classList.remove('active'); });
        tab.classList.add('active');

        var target = tab.getAttribute('data-target');
        grids.forEach(function (grid) {
          if (grid.id === target) {
            grid.style.display = 'grid';
          } else {
            grid.style.display = 'none';
          }
        });
      });
    });
  }

  // 4. ACORDEÓN DE PREGUNTAS FRECUENTES (FAQ)
  function initFaq() {
    var items = document.querySelectorAll('.faq-item');
    if (!items.length) return;

    items.forEach(function (item) {
      var questionBtn = item.querySelector('.faq-question');
      if (!questionBtn) return;

      questionBtn.addEventListener('click', function () {
        var isOpen = item.classList.contains('active');

        // Cierra los demás
        items.forEach(function (other) {
          other.classList.remove('active');
          var btn = other.querySelector('.faq-question');
          if (btn) btn.setAttribute('aria-expanded', 'false');
        });

        // Alterna el actual
        if (!isOpen) {
          item.classList.add('active');
          questionBtn.setAttribute('aria-expanded', 'true');
        }
      });
    });
  }

  // 5. NOTIFICACIONES DINÁMICAS DE VENTAS RECIENTES (HISPANOHABLANTES)
  function initSalePopups() {
    var popup = document.getElementById('liveSaleNotification');
    if (!popup) return;

    var nameEl = document.getElementById('saleName');
    var locEl = document.getElementById('saleLocation');
    var timeEl = document.getElementById('saleTime');
    var avEl = document.getElementById('saleAv');
    var closeBtn = document.getElementById('saleCloseBtn');

    var SALES = [
      { name: 'María L.', city: 'Bogotá, Colombia' },
      { name: 'Carmen Silva', city: 'Ciudad de México, México' },
      { name: 'Rosa González', city: 'Buenos Aires, Argentina' },
      { name: 'Sofía Morales', city: 'Santiago, Chile' },
      { name: 'Lucía Peña', city: 'Lima, Perú' },
      { name: 'Claudia M.', city: 'Medellín, Colombia' },
      { name: 'Rosángela P.', city: 'Guadalajara, México' },
      { name: 'Luciana D.', city: 'Córdoba, Argentina' },
      { name: 'Fernanda B.', city: 'Quito, Ecuador' },
      { name: 'Elena Castro', city: 'Madrid, España' }
    ];

    var isPaused = false;

    if (closeBtn) {
      closeBtn.addEventListener('click', function () {
        popup.classList.remove('show');
        isPaused = true;
      });
    }

    function showNotification() {
      if (isPaused) return;

      var item = SALES[Math.floor(Math.random() * SALES.length)];
      var minutes = 1 + Math.floor(Math.random() * 14);

      var initials = item.name.split(' ').map(function (n) { return n[0]; }).join('').toUpperCase();

      nameEl.textContent = item.name;
      locEl.textContent = item.city;
      timeEl.textContent = 'hace ' + minutes + ' min';
      avEl.textContent = initials;

      popup.classList.add('show');

      setTimeout(function () {
        popup.classList.remove('show');
        // Siguiente notificación entre 20 y 40 segundos
        var nextDelay = 20000 + Math.random() * 20000;
        setTimeout(showNotification, nextDelay);
      }, 5500);
    }

    // Primera notificación tras 8 segundos
    setTimeout(showNotification, 8000);
  }

  // 6. BARRA FIJA INFERIOR (STICKY BAR)
  function initStickyBar() {
    var bar = document.getElementById('stickyBottomCta');
    var hero = document.getElementById('hero');
    var offer = document.getElementById('oferta');
    if (!bar || !hero) return;

    function checkScroll() {
      var heroRect = hero.getBoundingClientRect();
      var offerRect = offer ? offer.getBoundingClientRect() : null;

      // Muestra al pasar la sección hero
      var pastHero = heroRect.bottom < 0;

      // Oculta si la caja de oferta principal está visible
      var inOffer = offerRect ? (offerRect.top < window.innerHeight && offerRect.bottom > 0) : false;

      if (pastHero && !inOffer) {
        bar.classList.add('visible');
      } else {
        bar.classList.remove('visible');
      }
    }

    window.addEventListener('scroll', checkScroll, { passive: true });
    checkScroll();
  }

  // 7. DUPLICACIÓN AUTOMÁTICA DE MARQUEES PARA LOOP PERFECTO
  function initMarquees() {
    var tracks = document.querySelectorAll('.gallery-track, .marquee-track');
    tracks.forEach(function (track) {
      var clones = track.cloneNode(true);
      while (clones.firstChild) {
        track.appendChild(clones.firstChild);
      }
    });
  }

  // INICIALIZACIÓN GENERAL
  function init() {
    initCountdown();
    initMachineChecker();
    initProofTabs();
    initFaq();
    initSalePopups();
    initStickyBar();
    initMarquees();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
