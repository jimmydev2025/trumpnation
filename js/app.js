document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  const { hash } = new URL(anchor.href);
  if (!hash) return;
  const element = document.querySelector(hash);
  if (!element) return;

  anchor.addEventListener('click', (e) => {
    e.preventDefault();
    element.scrollIntoView({ behavior: 'smooth', inline: 'start' });
  });
});

document.querySelectorAll('.contract').forEach((root) => {
  const contract = root.querySelector('.contract__value')?.textContent.trim();
  const copy = root.querySelector('.contract__copy');
  if (!contract || !copy) return;

  copy.addEventListener('click', (e) => {
    e.preventDefault();

    window.navigator.clipboard
      .writeText(contract)
      .then(() => {
        root.classList.add('contract_copied');
        setTimeout(() => {
          root.classList.remove('contract_copied');
        }, 2000);
      })
      .catch((err) => {
        console.error(err);
        alert('Error!1!');
      });
  });
});

document.querySelector('.buy__video').addEventListener('click', (e) => {
  if (
    document.querySelector('.buy__video').classList.contains('buy__video_play')
  ) {
  } else {
    document.querySelector('.buy__video').classList.add('buy__video_play');
    document.querySelector('.buy__video video').play();
    document
      .querySelector('.buy__video video')
      .setAttribute('controls', 'controls');
  }
});

document.querySelector('.buy__video video').addEventListener('pause', (e) => {
  document.querySelector('.buy__video').classList.remove('buy__video_play');
  document.querySelector('.buy__video video').removeAttribute('controls');
});

window.onload = () => {
  document.querySelectorAll('.accordion').forEach((accordion) => {
    const header = accordion.querySelector('.accordion__header');
    const body = accordion.querySelector('.accordion__body');

    if (!header || !body) return;

    const bodyHeight = body.scrollHeight;
    accordion.style.setProperty('--body-height', bodyHeight + 'px');

    header.addEventListener('click', (e) => {
      accordion.classList.toggle('accordion_open');
    });
  });
};
window.onresize = () => {
  document.querySelectorAll('.accordion').forEach((accordion) => {
    const body = accordion.querySelector('.accordion__body');
    if (!body) return;

    const bodyHeight = body.scrollHeight;
    accordion.style.setProperty('--body-height', bodyHeight + 'px');
  });
};

document.addEventListener('DOMContentLoaded', () => {
  gsap.registerPlugin(ScrollTrigger);

  const heroTl = gsap.timeline({ scrollTrigger: '.hero__container' });
  heroTl
    .from('.hero-logo__person', {
      scale: 0.5,
      opacity: 0,
      stagger: 0.25,
      duration: 0.5,
    })
    .fromTo(
      '.hero-logo__text_left',
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0 }
    )
    .fromTo(
      '.hero-logo__text_right',
      { opacity: 0, x: 50 },
      { opacity: 1, x: 0 }
    );

  const buyTl = gsap.timeline({ scrollTrigger: '.buy__container' });
  buyTl
    .from('.buy__stars', { y: -100, opacity: 0 })
    .from('.buy__title', { opacity: 0, y: -25 })
    .from('.buy__text', { opacity: 0, y: -25 })
    .from('.buy__item', { opacity: 0, y: 50, stagger: 0.25 })
    .from('.buy__video', { opacity: 0, y: 50 });
});
