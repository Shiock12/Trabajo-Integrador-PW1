
/* ---------------- SLIDER ---------------- */
function initSlider() {
  const slider = document.querySelector(".slider");
  if (!slider) return;

  const imgEl = slider.querySelector("img");
  const prevBtn = slider.querySelector(".prev");
  const nextBtn = slider.querySelector(".next");

  const images = [
    "../Images/banner.jpg",
    "../Images/imagen3.jpg",
    "../Images/imagen4.jpg",
  ];

  const dotsWrap = document.createElement("div");
  dotsWrap.className = "slider-dots";
  slider.appendChild(dotsWrap);

  const dots = images.map((_, idx) => {
    const dot = document.createElement("button");
    dot.className = "dot";
    dot.addEventListener("click", () => show(idx));
    dotsWrap.appendChild(dot);
    return dot;
  });

  let index = 0;
  function show(i) {
    index = (i + images.length) % images.length;
    imgEl.src = images[index];
    dots.forEach((d, di) => d.classList.toggle("active", di === index));
  }

  prevBtn?.addEventListener("click", () => show(index - 1));
  nextBtn?.addEventListener("click", () => show(index + 1));
  setInterval(() => show(index + 1), 4000);
  show(0);
}

document.addEventListener("DOMContentLoaded", () => {
  initSlider();       
});

/* ---------------- NAVBAR ---------------- */
document.addEventListener("DOMContentLoaded", () => {
  const usuario = getUsuarioActivo(); 
  const linkPerfil = document.querySelector("[data-usuario-nombre]");

  const cajaInvitado = document.querySelector("[data-seccion-invitado]");
  const cajaLogueado = document.querySelector("[data-seccion-logueado]");
  const btnLogout    = document.querySelector("[data-btn-logout]");

  if (usuario) {
    // ✅ Usuario logueado
    if (cajaInvitado) cajaInvitado.style.display = "none";
    if (cajaLogueado) cajaLogueado.style.display = "flex";
    if (linkPerfil)   linkPerfil.textContent = "Perfil" || "Usuario";
  } else {
    // 🚫 Nadie logueado
    if (cajaInvitado) cajaInvitado.style.display = "flex";
    if (cajaLogueado) cajaLogueado.style.display = "none";
  }
  if(usuarios === null){
    cajaLogueado.style.display = "none";
    btnLogout.style.display = "none";
  }

  if (btnLogout) {
    btnLogout.addEventListener("click", () => {
      logoutUsuario();
      window.location.href = "Inicio.html"; 
    });
  }
});
