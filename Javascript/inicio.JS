document.addEventListener("DOMContentLoaded", function() {
/*SLIDER*/

const slider = document.querySelector('.slider');
if (slider) {
  const imgEl = slider.querySelector('img');
  const prevBtn = slider.querySelector('.prev');
  const nextBtn = slider.querySelector('.next');

  const images = [
    '../Images/banner.jpg',
    '../Images/banner2.jpg',
    '../Images/banner3.jpg'
  ];

  // Crear contenedor de dots
  const dotsWrap = document.createElement('div');
  dotsWrap.className = 'slider-dots';
  slider.appendChild(dotsWrap);

  // Crear cada dot
  const dots = images.map((_, idx) => {
    const dot = document.createElement('button');
    dot.className = 'dot';
    dot.addEventListener('click', () => show(idx));
    dotsWrap.appendChild(dot);
    return dot;
  });

  let index = 0;
  function show(i) {
    index = (i + images.length) % images.length;
    imgEl.src = images[index];
    dots.forEach((d, di) => d.classList.toggle('active', di === index));
  }

  // Botones prev/next
  prevBtn.addEventListener('click', () => show(index - 1));
  nextBtn.addEventListener('click', () => show(index + 1));

  // Cambio automático
  setInterval(() => show(index + 1), 4000);

  // Iniciar
  show(0);
}

});