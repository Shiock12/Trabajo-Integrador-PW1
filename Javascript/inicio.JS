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

/* ---------------- NAVBAR ---------------- */

// Helpers sencillos para manejar el usuario activo
function getUsuarioActivo() {
  const data = localStorage.getItem("usuarioActivo");
  if (!data) return null;

  try {
    return JSON.parse(data);
  } catch (e) {
    console.error("Error al parsear usuarioActivo:", e);
    return null;
  }
}

function logoutUsuario() {
  localStorage.removeItem("usuarioActivo");
}

// Inicializa el estado de la navbar según si hay usuario logueado o no
function initNavbar() {
  const usuario = getUsuarioActivo(); 

  // Elementos del DOM (acordate de tener estas secciones en el HTML)
  const linkPerfil   = document.querySelector("[data-usuario-nombre]");
  const cajaInvitado = document.querySelector("[data-seccion-invitado]");  // Iniciar sesión / Registrarse
  const cajaLogueado = document.querySelector("[data-seccion-logueado]");  // Perfil / Cerrar sesión
  const btnLogout    = document.querySelector("[data-btn-logout]");

  // Opcional: saber si existen usuarios guardados (pero no es obligatorio)
  const hayUsuariosGuardados = !!localStorage.getItem("usuarios");

  if (usuario) {
    // ✅ Caso A: HAY usuario logueado (usuarioActivo existe)
    if (cajaInvitado) cajaInvitado.style.display = "none";
    if (cajaLogueado) cajaLogueado.style.display = "flex";

    if (linkPerfil) {
      // Mostramos el nombre de usuario; si por alguna razón no tiene, mostramos "Perfil"
      linkPerfil.textContent = usuario.usuario || "Perfil";
    }
  } else {
    // 🚫 Caso B/C: NO hay usuario logueado (usuarioActivo no existe)
    // Da igual que haya usuarios guardados o no: mostramos la parte de invitado
    if (cajaInvitado) cajaInvitado.style.display = "flex";
    if (cajaLogueado) cajaLogueado.style.display = "none";
  }

  // Evento de cerrar sesión
  if (btnLogout) {
    btnLogout.addEventListener("click", () => {
      logoutUsuario();
      window.location.href = "Inicio.html";
    });
  }
}

/* ---------------- INIT GENERAL ---------------- */

document.addEventListener("DOMContentLoaded", () => {
  initSlider();
  initNavbar();
});
