/**
 * TAPAS KUMAR - MOBILE-FIRST HIGH-CONVERTING INTERACTION LOGIC
 * Lightweight, touch-optimized, no dependencies
 */

document.addEventListener('DOMContentLoaded', () => {
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');
  const body = document.body;

  // 1. Mobile Menu Drawer Toggle & Body Scroll Lock
  if (mobileToggle && navLinks) {
    const toggleMenu = () => {
      const isOpen = navLinks.classList.toggle('active');
      mobileToggle.classList.toggle('open', isOpen);
      body.style.overflow = isOpen ? 'hidden' : '';
    };

    mobileToggle.addEventListener('click', toggleMenu);

    // Close mobile drawer when any link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileToggle.classList.remove('open');
        body.style.overflow = '';
      });
    });
  }

  // 2. Active Navigation Highlight on Scroll (Desktop & Tablet)
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const targetNav = document.querySelector(`.nav-links a[href*='${sectionId}']`);

      if (targetNav) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          targetNav.classList.add('active');
        } else {
          targetNav.classList.remove('active');
        }
      }
    });
  }, { passive: true });

  // 3. Smooth Scrolling for Internal Hash Anchors
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
});

/**
 * Handle Audit Form Submission:
 * Directs the lead directly to WhatsApp pre-filled with their answers
 */
function handleFormSubmit(event) {
  event.preventDefault();

  const name = document.getElementById('clientName').value.trim();
  const email = document.getElementById('clientEmail').value.trim();
  const country = document.getElementById('clientCountry').value;
  const budget = document.getElementById('adBudget').value;
  const goal = document.getElementById('adGoal').value.trim();

  const message = `Hi Tapas, I want to discuss hiring you to manage our Facebook Ads:%0A%0A` +
    `• Name: ${encodeURIComponent(name)}%0A` +
    `• Email: ${encodeURIComponent(email)}%0A` +
    `• Target Market: ${encodeURIComponent(country)}%0A` +
    `• Monthly Ad Spend: ${encodeURIComponent(budget)}%0A` +
    `• Goals & Challenges: ${encodeURIComponent(goal || 'Looking to scale Facebook campaigns and improve ROAS')}`;

  const waUrl = `https://wa.me/919800087065?text=${message}`;

  const submitBtn = event.target.querySelector('button[type="submit"]');
  const originalText = submitBtn.innerHTML;

  submitBtn.innerHTML = '<i class="fa-solid fa-circle-check"></i> Redirecting to WhatsApp...';
  submitBtn.style.background = '#10B981';

  setTimeout(() => {
    window.open(waUrl, '_blank');
    submitBtn.innerHTML = originalText;
    submitBtn.style.background = '';
    event.target.reset();
  }, 800);
}
