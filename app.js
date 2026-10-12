/**
 * ============================================================================
 * DANI OLMOS TATTOO — JAPANESE IREZUMI INTERACTIVE ENGINE
 * ============================================================================
 */

(function () {
  'use strict';

  // --- DATABASE DE OBRAS ORIGINALES DE DANI OLMOS ---
  const GALLERY_PIECES = {
    1: {
      title: 'Dragón Celestial & Olas de Kanagawa',
      kanji: '龍 • RYŪ NO IREZUMI',
      category: 'espalda',
      badge: 'Espalda Completa',
      image: './assets/img/dragon-ryu.jpg',
      sessions: '4 - 5 sesiones (24h aprox.)',
      style: 'Irezumi Tradicional & Wabori',
      desc: 'Pieza de autor que abarca toda la espalda, trapecios y nacimiento de brazos. El Dragón Celestial (Ryū) desciende con fiereza entre nubes de tormenta y olas estilizadas. El trabajo utiliza tintas Sumi formuladas para un negro imperecedero, combinadas con toques de bermellón y pétalos de flor de cerezo (Sakura) que simbolizan la belleza efímera.',
      defaultZone: 'Espalda Completa',
      defaultMotif: 'Dragón (Ryū)'
    },
    2: {
      title: 'Máscara Hannya & Crisantemo Imperial',
      kanji: '般若 • HANNYA TO KIKU',
      category: 'manga',
      badge: 'Manga Entera',
      image: './assets/img/hannya-mask.jpg',
      sessions: '3 - 4 sesiones (18h aprox.)',
      style: 'Neo-Japonés de Autor',
      desc: 'Composición dinámica para brazo completo. La máscara Hannya representa la pasión humana transmutada en sabiduría y protección. Está rodeada de crisantemos dorados (Kiku), símbolo de longevidad y nobleza, enmarcados por espirales de viento y agua negra que contornean el bíceps y antebrazo.',
      defaultZone: 'Manga Completa (Brazo)',
      defaultMotif: 'Máscara Hannya o Demonio Oni'
    },
    3: {
      title: 'Carpa Nishikigoi a Contracorriente',
      kanji: '鯉 • KOI NO TAKINOBORI',
      category: 'pierna',
      badge: 'Pierna Completa',
      image: './assets/img/koi-fish.jpg',
      sessions: '3 sesiones (16h aprox.)',
      style: 'Wabori Clásico',
      desc: 'Inspirado en el antiguo proverbio del pez que asciende el río Amarillo para convertirse en dragón. Tonos dorados y anaranjados que contrastan con los remolinos de agua turbulentos y la flor de loto sagrada, emblema de la pureza que florece en aguas pantanosas.',
      defaultZone: 'Pierna / Gemelo',
      defaultMotif: 'Carpa Koi (Nishikigoi)'
    },
    4: {
      title: 'Tigre Feroz & Hojas de Arce Momiji',
      kanji: '虎 • TORA TO MOMIJI',
      category: 'pecho',
      badge: 'Pecho & Torso (Munewari)',
      image: './assets/img/tiger-tora.jpg',
      sessions: '3 - 4 sesiones (18h aprox.)',
      style: 'Irezumi Avanzado',
      desc: 'Tatuaje asimétrico estilo Munewari en pecho y costado. El tigre (Tora), soberano de la tierra y defensor contra los espíritus malignos, avanza entre corrientes de aire otoñal cargadas de hojas de arce rojo (Momiji), transmitiendo fuerza, valentía y aplomo.',
      defaultZone: 'Pecho / Costillas',
      defaultMotif: 'Tigre (Tora)'
    }
  };

  // --- CONTROLADOR PRINCIPAL ---
  class DaniOlmosApp {
    constructor() {
      // Elementos de Navegación
      this.header = document.getElementById('header');
      this.menuToggle = document.getElementById('menu-toggle');
      this.mainNav = document.getElementById('main-nav');
      this.navLinks = document.querySelectorAll('.nav-link');

      // Galería y Filtros
      this.filterButtons = document.querySelectorAll('.filter-btn');
      this.galleryCards = document.querySelectorAll('.gallery-card');

      // Modales
      this.pieceModal = document.getElementById('piece-modal');
      this.modalCloseBtn = document.getElementById('modal-close-btn');
      this.confirmModal = document.getElementById('confirm-modal');
      this.btnCloseConfirm = document.getElementById('btn-close-confirm');

      // Elementos del Modal de Pieza
      this.modalImg = document.getElementById('modal-img');
      this.modalBadge = document.getElementById('modal-badge');
      this.modalTitle = document.getElementById('modal-title');
      this.modalKanji = document.getElementById('modal-kanji');
      this.modalDesc = document.getElementById('modal-desc');
      this.modalSessions = document.getElementById('modal-sessions');
      this.modalStyle = document.getElementById('modal-style');
      this.btnModalReserve = document.getElementById('btn-modal-reserve');

      // Calculadora
      this.zoneButtons = document.querySelectorAll('#opt-zone .opt-btn');
      this.motifButtons = document.querySelectorAll('#opt-motif .opt-btn');
      this.resTitle = document.getElementById('res-title');
      this.resSessions = document.getElementById('res-sessions');
      this.resHours = document.getElementById('res-hours');
      this.btnApplyCalc = document.getElementById('btn-apply-calc');

      // Formulario
      this.bookingForm = document.getElementById('booking-form');
      this.clientZone = document.getElementById('client-zone');
      this.clientMotif = document.getElementById('client-motif');
      this.btnDirectWhatsApp = document.getElementById('btn-direct-whatsapp');

      this.currentPieceId = 1;

      this.init();
    }

    init() {
      this.bindScrollEffects();
      this.bindNavigation();
      this.bindGalleryFilters();
      this.bindModalEvents();
      this.bindCalculator();
      this.bindBookingForm();
      this.bindDirectWhatsApp();
    }

    // Efecto de encabezado al scrollear
    bindScrollEffects() {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
          this.header.classList.add('scrolled');
        } else {
          this.header.classList.remove('scrolled');
        }
      });
    }

    // Navegación y Menú móvil
    bindNavigation() {
      if (this.menuToggle && this.mainNav) {
        this.menuToggle.addEventListener('click', () => {
          const isOpen = this.mainNav.classList.toggle('open');
          this.menuToggle.setAttribute('aria-expanded', isOpen);
        });
      }

      this.navLinks.forEach((link) => {
        link.addEventListener('click', () => {
          if (this.mainNav) this.mainNav.classList.remove('open');
          this.navLinks.forEach((l) => l.classList.remove('active'));
          link.classList.add('active');
        });
      });
    }

    // Filtrado de la galería
    bindGalleryFilters() {
      this.filterButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
          this.filterButtons.forEach((b) => b.classList.remove('active'));
          btn.classList.add('active');

          const filter = btn.getAttribute('data-filter');

          this.galleryCards.forEach((card) => {
            const cat = card.getAttribute('data-category');
            const extra = card.getAttribute('data-category-extra');

            if (filter === 'all' || cat === filter || extra === filter) {
              card.style.display = 'flex';
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            } else {
              card.style.display = 'none';
            }
          });
        });
      });

      // Abrir modal desde botones de la tarjeta
      document.querySelectorAll('.view-details-btn').forEach((btn) => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const id = btn.getAttribute('data-id');
          this.openPieceModal(id);
        });
      });

      // Abrir modal haciendo clic en la tarjeta
      this.galleryCards.forEach((card, index) => {
        card.addEventListener('click', () => {
          this.openPieceModal(index + 1);
        });

        // Enlace directo a reservar de cada tarjeta
        const actionLink = card.querySelector('.card-action-link');
        if (actionLink) {
          actionLink.addEventListener('click', (e) => {
            e.stopPropagation();
            const piece = GALLERY_PIECES[index + 1];
            if (piece) {
              this.populateBookingFields(piece.defaultZone, piece.defaultMotif);
            }
          });
        }
      });
    }

    // Modales de detalles y confirmación
    bindModalEvents() {
      if (this.modalCloseBtn) {
        this.modalCloseBtn.addEventListener('click', () => this.closePieceModal());
      }

      if (this.pieceModal) {
        this.pieceModal.addEventListener('click', (e) => {
          if (e.target === this.pieceModal) this.closePieceModal();
        });
      }

      if (this.btnCloseConfirm) {
        this.btnCloseConfirm.addEventListener('click', () => {
          this.confirmModal.classList.add('hidden');
        });
      }

      if (this.confirmModal) {
        this.confirmModal.addEventListener('click', (e) => {
          if (e.target === this.confirmModal) this.confirmModal.classList.add('hidden');
        });
      }

      if (this.btnModalReserve) {
        this.btnModalReserve.addEventListener('click', () => {
          const piece = GALLERY_PIECES[this.currentPieceId];
          if (piece) {
            this.populateBookingFields(piece.defaultZone, piece.defaultMotif);
          }
          this.closePieceModal();
        });
      }

      // Tecla Escape para cerrar modales
      window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          this.closePieceModal();
          if (this.confirmModal) this.confirmModal.classList.add('hidden');
        }
      });
    }

    openPieceModal(id) {
      const piece = GALLERY_PIECES[id];
      if (!piece) return;

      this.currentPieceId = id;
      this.modalImg.src = piece.image;
      this.modalImg.alt = piece.title;
      this.modalBadge.textContent = piece.badge;
      this.modalTitle.textContent = piece.title;
      this.modalKanji.textContent = piece.kanji;
      this.modalDesc.textContent = piece.desc;
      this.modalSessions.textContent = piece.sessions;
      this.modalStyle.textContent = piece.style;

      this.pieceModal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    }

    closePieceModal() {
      if (this.pieceModal) {
        this.pieceModal.classList.add('hidden');
        document.body.style.overflow = '';
      }
    }

    // Calculadora / Asesor de Tatuaje
    bindCalculator() {
      let activeZoneName = 'Manga Completa';
      let activeSessions = '3 - 4 sesiones';
      let activeHours = '18 - 24 horas';
      let activeMotifName = 'Dragón (Ryū)';

      this.zoneButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
          this.zoneButtons.forEach((b) => b.classList.remove('active'));
          btn.classList.add('active');

          activeZoneName = btn.querySelector('.opt-name').textContent;
          activeSessions = `${btn.getAttribute('data-sessions')} sesiones`;
          activeHours = `${btn.getAttribute('data-hours')} horas`;

          this.updateCalcResult(activeZoneName, activeMotifName, activeSessions, activeHours);
        });
      });

      this.motifButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
          this.motifButtons.forEach((b) => b.classList.remove('active'));
          btn.classList.add('active');

          activeMotifName = btn.getAttribute('data-motif');
          this.updateCalcResult(activeZoneName, activeMotifName, activeSessions, activeHours);
        });
      });

      if (this.btnApplyCalc) {
        this.btnApplyCalc.addEventListener('click', () => {
          // Mapear selección a opciones del formulario
          let formZoneVal = 'Manga Completa (Brazo)';
          if (activeZoneName.includes('Media Manga')) formZoneVal = 'Media Manga (Brazo)';
          else if (activeZoneName.includes('Espalda')) formZoneVal = 'Espalda Completa';
          else if (activeZoneName.includes('Pierna')) formZoneVal = 'Pierna / Gemelo';
          else if (activeZoneName.includes('Pecho')) formZoneVal = 'Pecho / Costillas';

          let formMotifVal = 'Dragón (Ryū)';
          if (activeMotifName.includes('Hannya')) formMotifVal = 'Máscara Hannya o Demonio Oni';
          else if (activeMotifName.includes('Koi')) formMotifVal = 'Carpa Koi (Nishikigoi)';
          else if (activeMotifName.includes('Tigre')) formMotifVal = 'Tigre (Tora)';
          else if (activeMotifName.includes('Floral')) formMotifVal = 'Flores y Olas (Sakura, Crisantemo, Loto)';

          this.populateBookingFields(formZoneVal, formMotifVal);

          // Scroll suave hasta el formulario de reserva
          const bookingSec = document.getElementById('reserva');
          if (bookingSec) {
            bookingSec.scrollIntoView({ behavior: 'smooth' });
          }
        });
      }
    }

    updateCalcResult(zone, motif, sessions, hours) {
      if (this.resTitle) this.resTitle.textContent = `${zone} con ${motif}`;
      if (this.resSessions) this.resSessions.textContent = sessions;
      if (this.resHours) this.resHours.textContent = hours;
    }

    populateBookingFields(zoneValue, motifValue) {
      if (this.clientZone) {
        for (let i = 0; i < this.clientZone.options.length; i++) {
          if (this.clientZone.options[i].value.includes(zoneValue) || zoneValue.includes(this.clientZone.options[i].value)) {
            this.clientZone.selectedIndex = i;
            break;
          }
        }
      }

      if (this.clientMotif) {
        for (let j = 0; j < this.clientMotif.options.length; j++) {
          if (this.clientMotif.options[j].value.includes(motifValue) || motifValue.includes(this.clientMotif.options[j].value)) {
            this.clientMotif.selectedIndex = j;
            break;
          }
        }
      }
    }

    // Validación y Envío de Formulario
    bindBookingForm() {
      if (!this.bookingForm) return;

      this.bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const nameInput = document.getElementById('client-name');
        const phoneInput = document.getElementById('client-phone');
        const emailInput = document.getElementById('client-email');
        const zoneInput = document.getElementById('client-zone');
        const descInput = document.getElementById('client-desc');

        let isValid = true;

        // Validar Nombre
        if (!nameInput.value.trim()) {
          this.setFieldInvalid(nameInput, true);
          isValid = false;
        } else {
          this.setFieldInvalid(nameInput, false);
        }

        // Validar Teléfono
        if (!phoneInput.value.trim() || phoneInput.value.trim().length < 8) {
          this.setFieldInvalid(phoneInput, true);
          isValid = false;
        } else {
          this.setFieldInvalid(phoneInput, false);
        }

        // Validar Email
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailInput.value.trim())) {
          this.setFieldInvalid(emailInput, true);
          isValid = false;
        } else {
          this.setFieldInvalid(emailInput, false);
        }

        // Validar Zona
        if (!zoneInput.value) {
          this.setFieldInvalid(zoneInput, true);
          isValid = false;
        } else {
          this.setFieldInvalid(zoneInput, false);
        }

        // Validar Descripción
        if (!descInput.value.trim()) {
          this.setFieldInvalid(descInput, true);
          isValid = false;
        } else {
          this.setFieldInvalid(descInput, false);
        }

        if (isValid) {
          // Generar código aleatorio de reserva
          const randomNum = Math.floor(100 + Math.random() * 900);
          const bookingCode = `DOT-2026-${randomNum}`;

          document.getElementById('confirm-code').textContent = bookingCode;
          document.getElementById('confirm-msg').innerHTML = 
            `Hola <strong>${this.escapeHTML(nameInput.value)}</strong>, tu solicitud para un proyecto en <strong>${this.escapeHTML(zoneInput.value)}</strong> ha sido recibida con éxito. Dani Olmos revisará tu propuesta y te escribirá a tu WhatsApp o correo en un plazo máximo de 24 a 48 horas.`;

          this.confirmModal.classList.remove('hidden');

          // Resetear formulario
          this.bookingForm.reset();
        }
      });
    }

    setFieldInvalid(inputElement, isInvalid) {
      const fieldWrap = inputElement.closest('.form-field');
      if (fieldWrap) {
        if (isInvalid) {
          fieldWrap.classList.add('invalid');
        } else {
          fieldWrap.classList.remove('invalid');
        }
      }
    }

    // Botón directo de WhatsApp
    bindDirectWhatsApp() {
      if (!this.btnDirectWhatsApp) return;

      this.btnDirectWhatsApp.addEventListener('click', () => {
        const nameVal = document.getElementById('client-name')?.value.trim() || 'un cliente';
        const zoneVal = document.getElementById('client-zone')?.value || 'una pieza japonesa';
        const motifVal = document.getElementById('client-motif')?.value || 'diseño original';

        const textMessage = `Hola Dani! Me gustaría consultar disponibilidad para un proyecto de tatuaje japonés contigo en ${zoneVal}. Mi idea principal es sobre ${motifVal}. Mi nombre es ${nameVal}.`;
        const encoded = encodeURIComponent(textMessage);
        const waUrl = `https://wa.me/34600123456?text=${encoded}`;

        window.open(waUrl, '_blank');
      });
    }

    escapeHTML(str) {
      return str.replace(/[&<>'"]/g, 
        tag => ({
          '&': '&amp;',
          '<': '&lt;',
          '>': '&gt;',
          "'": '&#39;',
          '"': '&quot;'
        }[tag] || tag)
      );
    }
  }

  // Inicializar al cargar el DOM
  document.addEventListener('DOMContentLoaded', () => {
    new DaniOlmosApp();
  });
})();
