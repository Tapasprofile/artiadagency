/**
 * Portfolio interactions for mobile nav and audit form redirect.
 */
document.addEventListener('DOMContentLoaded', () => {
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');
  const body = document.body;

  if (mobileToggle && navLinks) {
    const toggleMenu = () => {
      const isOpen = navLinks.classList.toggle('active');
      mobileToggle.classList.toggle('open', isOpen);
      body.style.overflow = isOpen ? 'hidden' : '';
    };

    mobileToggle.addEventListener('click', toggleMenu);

    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileToggle.classList.remove('open');
        body.style.overflow = '';
      });
    });
  }

  const sections = document.querySelectorAll('section[id]');
  const setActiveNav = () => {
    const scrollY = window.pageYOffset;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      const target = document.querySelector(`.nav-links a[href*='${sectionId}']`);

      if (!target) return;

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        target.classList.add('active');
      } else {
        target.classList.remove('active');
      }
    });
  };

  window.addEventListener('scroll', setActiveNav, { passive: true });
  setActiveNav();
});

function handleFormSubmit(event) {
  event.preventDefault();

  const name = document.getElementById('clientName')?.value.trim() || '';
  const email = document.getElementById('clientEmail')?.value.trim() || '';
  const country = document.getElementById('clientCountry')?.value || '';
  const budget = document.getElementById('adBudget')?.value || '';
  const goal = document.getElementById('adGoal')?.value.trim() || 'Looking to improve Facebook Ads performance and ROAS.';

  const text = `Hi Tapas, I want to discuss hiring you to handle our Facebook Ads.%0A%0A• Name: ${encodeURIComponent(name)}%0A• Email: ${encodeURIComponent(email)}%0A• Target Country: ${encodeURIComponent(country)}%0A• Monthly Spend: ${encodeURIComponent(budget)}%0A• Goals & Challenges: ${encodeURIComponent(goal)}`;
  const whatsappUrl = `https://wa.me/919800087065?text=${text}`;

  const submitBtn = event.target.querySelector('button[type="submit"]');
  if (submitBtn) {
    submitBtn.innerHTML = '<i class="fa-solid fa-circle-check"></i> Redirecting...';
  }

  setTimeout(() => {
    window.open(whatsappUrl, '_blank');
    event.target.reset();
    if (submitBtn) {
      submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Submit Audit Request';
    }
  }, 500);
}
