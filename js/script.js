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

const sectionsObj = ['каталог жби', 'о заводе', 'доставка', 'сертификаты', 'контакты'];
let activeSection = '';

window.addEventListener('scroll', () => {
  const header = document.getElementById('header');
  if (window.scrollY > 20) {
    header.classList.add('bg-white', 'shadow-md', 'py-4');
    header.classList.remove('bg-white/95', 'backdrop-blur', 'py-5', 'border-b', 'border-gray-200');
  } else {
    header.classList.remove('bg-white', 'shadow-md', 'py-4');
    header.classList.add('bg-white/95', 'backdrop-blur', 'py-5', 'border-b', 'border-gray-200');
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
    document.querySelectorAll('.nav-link').forEach(link => {
      const hrefAttr = link.getAttribute('href') || link.getAttribute('data-href');
      if (!hrefAttr) return;
      const hrefId = decodeURIComponent(hrefAttr.substring(1));
      if (hrefId === current) {
        link.classList.add('text-industrial');
        link.classList.remove('text-graphite/70', 'text-graphite/80');
      } else {
        link.classList.remove('text-industrial');
        if (link.classList.contains('mobile-nav-link')) {
          link.classList.add('text-graphite/80');
        } else {
          link.classList.add('text-graphite/70');
        }
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
  } else {
    menu.style.display = 'none';
    menuIcon.classList.remove('hidden');
    xIcon.classList.add('hidden');
  }
}

function closeMenu() {
  if (state.isMenuOpen) toggleMenu();
}

function scrollToTop(e) {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function openModal(id) {
  closeMenu();
  const backdrop = document.getElementById(id + '-modal');
  if (!backdrop) return;
  const content = backdrop.querySelector('.modal-content');

  backdrop.classList.remove('hidden');
  backdrop.classList.add('flex');

  backdrop.style.opacity = '0';
  backdrop.style.visibility = 'visible';

  if (content) {
    content.style.transform = 'scale(0.9)';
    content.style.opacity = '0';
  }

  requestAnimationFrame(() => {
    backdrop.style.opacity = '1';
    backdrop.style.transition = 'opacity 0.3s ease';
    if (content) {
      content.style.transform = 'scale(1)';
      content.style.opacity = '1';
      content.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
    }
  });
}

function closeModal(id) {
  const backdrop = document.getElementById(id + '-modal');
  if (!backdrop) return;
  const content = backdrop.querySelector('.modal-content');

  backdrop.style.opacity = '0';
  if (content) {
    content.style.transform = 'scale(0.9)';
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
      const isActive = index === data.currentIndex;
      btn.className = `w-2.5 h-2.5 rounded-full transition-all border-none p-0 cursor-pointer ${isActive ? 'bg-industrial scale-125' : 'bg-white/50 hover:bg-white'}`;
      btn.onclick = () => setSlide(index);
      dotsContainer.appendChild(btn);
    });
    document.getElementById('gallery-nav-buttons').classList.remove('hidden');
  } else {
    document.getElementById('gallery-nav-buttons').classList.add('hidden');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

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
      submitBtn.innerHTML = '<span class="inline-flex items-center gap-2"><svg class="animate-spin w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>Отправка...</span>';

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
          form.innerHTML = '<div class="text-center py-8"><div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"><svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg></div><h4 class="text-xl text-graphite mb-2">Заявка отправлена!</h4><p class="text-gray-500">Мы перезвоним вам в ближайшее время.</p></div>';
          setTimeout(() => closeModal('form'), 2500);
        } else {
          throw new Error('Server error');
        }
      } catch (error) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        alert('Произошла ошибка. Пожалуйста, позвоните нам по телефону.');
      }
    });
  }
});