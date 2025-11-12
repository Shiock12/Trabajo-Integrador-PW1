// main.js
import { initEmpresaForm } from './inscripcion-empresa.js';

document.addEventListener('DOMContentLoaded', () => {
  // SLIDER (solo corre si existe)
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

    const dotsWrap = document.createElement('div');
    dotsWrap.className = 'slider-dots';
    slider.appendChild(dotsWrap);

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

    prevBtn.addEventListener('click', () => show(index - 1));
    nextBtn.addEventListener('click', () => show(index + 1));
    setInterval(() => show(index + 1), 4000);
    show(0);
  }

  // FORM EMPRESAS
  initEmpresaForm();
});
