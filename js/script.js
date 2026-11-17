const galleryData = {
  'arychnye': {
    title: 'Лотки арычные',
    images: [
      "img/lotkiarychnye/lotki_1.jpg",
      "img/lotkiarychnye/lotki_2.jpg",
      "img/lotkiarychnye/lotki_3.jpg",
      "img/lotkiarychnye/lotki_4.jpg"
    ],
    products: ["ЛА-1 (1000х850х700)", "ЛА-2 (1000х570х500)", "ЛА-3 (1000х420x300)", "ЛА-4 (1000х1160х800)", "ЛА-5 (1000х1260х1000)"]
  },
  'plity': {
    title: 'ЖБ КРЫШКИ ЛОТКОВ',
    images: [
      "img/zhbkryshkilotkov/zhbkr_1.jpg",
      "img/zhbkryshkilotkov/zhbkr_2.jpg",
      "img/zhbkryshkilotkov/zhbkr_3.jpg",
      "img/zhbkryshkilotkov/zhbkr_4.png",
      "img/zhbkryshkilotkov/zhbkr_5.png",
      "img/zhbkryshkilotkov/zhbkr_6.png",
      "img/zhbkryshkilotkov/zhbkr_7.png"
    ],
    products: [
      "П8-8 (1000х800х100)",
      "П11-8 (1000х1100х100)",
      "П15-8 (1000х1500х120)",
      "П22-8 (1000х2200х160)",
      "П5-8 (1000х500х70)"
    ]
  },
  'teplotrass': {
    title: 'Лотки теплотрасс',
    images: [
      "img/lotkiteplotrass/lotkiteplo_1.png",
      "img/lotkiteplotrass/lotkiteplo_2.png",
      "img/lotkiteplotrass/lotkiteplo_3.png",
      "img/lotkiteplotrass/lotkiteplo_4.png",
      "img/lotkiteplotrass/lotkiteplo_5.png",
      "img/lotkiteplotrass/lotkiteplo_6.png",
      "img/lotkiteplotrass/lotkiteplo_7.png",
      "img/lotkiteplotrass/lotkiteplo_8.png",
      "img/lotkiteplotrass/lotkiteplo_9.png"
    ]
  },
  'telescop': {
    title: 'Лотки телескопические',
    images: [
      "img/lotkitelescop/lotkitelescop_1.png.png",
      "img/lotkitelescop/lotkitelescop_2.png",
      "img/lotkitelescop/lotkitelescop_3.png"
    ]
  },
  'bordur': {
    title: 'Бордюры и тротуарная плитка',
    images: [
      "img/bordur/bplitki_1.jpg",
      "img/bordur/bplitki_2.jpg.jpg",
      "img/bordur/bplitki_4.jpg",
      "img/bordur/bplitki_5.jpg",
      "img/bordur/bplitki_6.jpg",
      "img/bordur/bplitki_7.jpg",
      "img/bordur/bplitki_8.jpg",
      "img/bordur/bplitki_9.jpg",
      "img/bordur/bplitki_10.jpg",
      "img/bordur/bplitki_11.png"
    ]
  },
  'bruski': {
    title: 'Бруски бетонные',
    images: [
      "img/bruski/brus_1.png",
      "img/bruski/brus_2.png"
    ]
  }
};

const state = {
  isMenuOpen: false,
  gallery: {
    images: [],
    products: [],
    currentIndex: 0,
    isAnimating: false,
    startX: 0,
    currentX: 0
  }
};

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const sectionsObj = ['catalog', 'about', 'advantages', 'delivery', 'certificates', 'contacts'];
let activeSection = '';
let userClickedId = '';

document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    const href = link.getAttribute('href') || '';
    userClickedId = href.replace('#', '');
    document.querySelectorAll('.mobile-link').forEach(l => l.classList.remove('active'));
    link.classList.add('active');
  });
});

function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, { threshold: 0.1, rootMargin: '-50px' });

  document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));
}

function animateCounter(el) {
  if (el.dataset.animated) return;
  el.dataset.animated = '1';
  const target = parseInt(el.getAttribute('data-target'), 10);
  const suffix = el.getAttribute('data-suffix') || '';
  if (reduceMotion) {
    el.textContent = target + suffix;
    return;
  }
  const duration = 1800;
  const start = performance.now();

  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  function animate(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const value = Math.round(easeOutCubic(progress) * target);
    el.textContent = value + suffix;
    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  }

  requestAnimationFrame(animate);
}

function initCounters() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.counter').forEach(el => observer.observe(el));
}

function initParallax() {
  const compImg = document.getElementById('compMain');
  if (!compImg || reduceMotion) return;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (scrollY <= 1000) {
      compImg.style.transform = `translateY(${scrollY * 0.06}px)`;
    }
  }, { passive: true });
}

window.addEventListener('load', () => {
  setTimeout(() => {
    const preloader = document.getElementById('preloader');
    if (preloader) preloader.classList.add('hidden');
    document.querySelectorAll('.counter').forEach(el => animateCounter(el));
  }, 600);
});

window.addEventListener('scroll', () => {
  const header = document.getElementById('header');
  if (header) {
    if (window.scrollY > 24) {
      header.classList.add('header-scrolled');
    } else {
      header.classList.remove('header-scrolled');
    }
  }

  let current = '';
  for (const id of sectionsObj) {
    const element = document.getElementById(id);
    if (element) {
      const rect = element.getBoundingClientRect();
      if (rect.top <= 250 && rect.bottom >= 250) {
        current = id;
        break;
      }
    }
  }

  if (current !== activeSection) {
    activeSection = current;
    document.querySelectorAll('.mobile-link').forEach(link => {
      const hrefAttr = link.getAttribute('href') || link.getAttribute('data-href');
      if (!hrefAttr) return;
      const hrefId = decodeURIComponent(hrefAttr.substring(1));
      if (hrefId === current) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }
});

function toggleMenu() {
  const menu = document.getElementById('mobile-menu');
  const menuIcon = document.getElementById('menu-icon');
  const xIcon = document.getElementById('x-icon');

  state.isMenuOpen = !state.isMenuOpen;
  if (state.isMenuOpen) {
    menu.style.display = 'flex';
    menuIcon.classList.add('hidden');
    xIcon.classList.remove('hidden');
    document.body.classList.add('menu-open');
    document.body.style.overflow = 'hidden';
  } else {
    menu.style.display = 'none';
    menuIcon.classList.remove('hidden');
    xIcon.classList.add('hidden');
    document.body.classList.remove('menu-open');
    document.body.style.overflow = '';
  }
}

function closeMenu() {
  if (state.isMenuOpen) toggleMenu();
}

function scrollToTop(e) {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
}

function openModal(id) {
  closeMenu();
  const backdrop = document.getElementById(id + '-modal');
  if (!backdrop) return;
  const content = backdrop.querySelector('.modal-content');

  backdrop.classList.remove('hidden');
  backdrop.classList.add('flex');
  document.body.style.overflow = 'hidden';

  backdrop.style.opacity = '0';
  backdrop.style.visibility = 'visible';

  if (content) {
    content.style.transform = 'scale(0.94) translateY(10px)';
    content.style.opacity = '0';
  }

  requestAnimationFrame(() => {
    backdrop.style.opacity = '1';
    backdrop.style.transition = 'opacity 0.3s ease';
    if (content) {
      content.style.transform = 'scale(1) translateY(0)';
      content.style.opacity = '1';
      content.style.transition = 'transform 0.35s cubic-bezier(0.22,1,0.36,1), opacity 0.3s ease';
    }
  });
}

function closeModal(id) {
  const backdrop = document.getElementById(id + '-modal');
  if (!backdrop) return;
  const content = backdrop.querySelector('.modal-content');

  backdrop.style.opacity = '0';
  if (content) {
    content.style.transform = 'scale(0.94) translateY(10px)';
    content.style.opacity = '0';
  }

  setTimeout(() => {
    backdrop.classList.add('hidden');
    backdrop.classList.remove('flex');
    backdrop.style.opacity = '';
    backdrop.style.transition = '';
    if (content) {
      content.style.transform = '';
      content.style.opacity = '';
      content.style.transition = '';
    }
    document.body.style.overflow = '';
  }, 300);
}

document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) {
      const id = backdrop.id.replace('-modal', '');
      closeModal(id);
    }
  });
});

function openGallery(key) {
  const data = galleryData[key];
  if (data) {
    state.gallery.images = data.images;
    state.gallery.products = data.products;
    state.gallery.currentIndex = 0;

    document.getElementById('gallery-modal-title').innerText = data.title;
    updateGalleryUI();
    openModal('gallery');
  }
}

function viewCertificate(src, title) {
  state.gallery.images = [src];
  state.gallery.products = [];
  state.gallery.currentIndex = 0;
  document.getElementById('gallery-modal-title').innerText = title;
  updateGalleryUI();
  openModal('gallery');
}

function nextSlide() {
  state.gallery.currentIndex = (state.gallery.currentIndex + 1) % state.gallery.images.length;
  updateGalleryUI();
}

function prevSlide() {
  state.gallery.currentIndex = (state.gallery.currentIndex - 1 + state.gallery.images.length) % state.gallery.images.length;
  updateGalleryUI();
}

function setSlide(index) {
  state.gallery.currentIndex = index;
  updateGalleryUI();
}

function updateGalleryUI() {
  const data = state.gallery;
  const galleryImage = document.getElementById('gallery-image');
  galleryImage.src = data.images[data.currentIndex];

  const dotsContainer = document.getElementById('gallery-dots');
  dotsContainer.innerHTML = '';

  if (data.images.length > 1) {
    data.images.forEach((img, index) => {
      const btn = document.createElement('button');
      btn.className = 'g-dot' + (index === data.currentIndex ? ' active' : '');
      btn.setAttribute('aria-label', 'Фото ' + (index + 1));
      btn.onclick = () => setSlide(index);
      dotsContainer.appendChild(btn);
    });
    document.getElementById('gallery-nav-buttons').classList.remove('hidden');
  } else {
    document.getElementById('gallery-nav-buttons').classList.add('hidden');
  }
}

function setCatalogPreview(row) {
  const img = document.getElementById('catalog-preview-img');
  const tag = document.getElementById('catalog-preview-tag');
  if (!img || !tag) return;
  const src = row.dataset.img;
  const tagText = row.dataset.tag;
  if (img.dataset.current === src) return;
  img.dataset.current = src;
  img.style.opacity = '0';
  setTimeout(() => {
    img.src = src;
    tag.textContent = tagText;
    img.style.opacity = '1';
  }, 180);
}

document.addEventListener('DOMContentLoaded', () => {
  initScrollReveal();
  initCounters();
  initParallax();

  const galleryModal = document.getElementById('gallery-modal');
  if (galleryModal) {
    const sliderContainer = galleryModal.querySelector('.modal-content');

    sliderContainer.addEventListener('touchstart', (e) => {
      state.gallery.startX = e.touches[0].clientX;
      state.gallery.isAnimating = true;
    }, { passive: true });

    sliderContainer.addEventListener('touchend', (e) => {
      if (!state.gallery.isAnimating) return;
      state.gallery.currentX = e.changedTouches[0].clientX;
      const diff = state.gallery.startX - state.gallery.currentX;

      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          nextSlide();
        } else {
          prevSlide();
        }
      }
      state.gallery.isAnimating = false;
    }, { passive: true });
  }

  const form = document.getElementById('callback-form');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const phoneInput = document.getElementById('callback-phone');
      const phone = phoneInput.value.trim();

      if (!phone || phone.length < 10) {
        phoneInput.style.borderColor = '#ef4444';
        phoneInput.focus();
        return;
      }

      phoneInput.style.borderColor = '';
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.style.opacity = '0.7';
      submitBtn.innerHTML = '<span class="inline-flex items-center gap-2">Отправка…</span>';

      try {
        const response = await fetch('https://formsubmit.co/ajax/betontradecompany@gmail.com', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            phone: phone,
            _subject: 'Новая заявка с сайта BetonTrade Company!'
          })
        });

        if (response.ok) {
          form.innerHTML = '<div class="text-center py-8"><div class="w-16 h-16 bg-ivory border border-[rgba(0,33,71,0.08)] rounded-full flex items-center justify-center mx-auto mb-4"><svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7 text-oxford" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg></div><h4 class="text-[20px] font-semibold text-oxford tracking-tight mb-2">Заявка отправлена!</h4><p class="text-slate text-sm font-medium">Мы перезвоним вам в ближайшее время.</p></div>';
          setTimeout(() => closeModal('form'), 2500);
        } else {
          throw new Error('Server error');
        }
      } catch (error) {
        submitBtn.disabled = false;
        submitBtn.style.opacity = '';
        submitBtn.innerHTML = originalText;
        alert('Произошла ошибка. Пожалуйста, позвоните нам по телефону.');
      }
    });
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const galleryModal = document.getElementById('gallery-modal');
    if (galleryModal && !galleryModal.classList.contains('hidden')) {
      closeModal('gallery');
    }
    const formModal = document.getElementById('form-modal');
    if (formModal && !formModal.classList.contains('hidden')) {
      closeModal('form');
    }
    const privacyModal = document.getElementById('privacy-modal');
    if (privacyModal && !privacyModal.classList.contains('hidden')) {
      closeModal('privacy');
    }
    const offerModal = document.getElementById('offer-modal');
    if (offerModal && !offerModal.classList.contains('hidden')) {
      closeModal('offer');
    }
  }
  if (e.key === 'ArrowRight') {
    const galleryModal = document.getElementById('gallery-modal');
    if (galleryModal && !galleryModal.classList.contains('hidden')) {
      nextSlide();
    }
  }
  if (e.key === 'ArrowLeft') {
    const galleryModal = document.getElementById('gallery-modal');
    if (galleryModal && !galleryModal.classList.contains('hidden')) {
      prevSlide();
    }
  }
});
