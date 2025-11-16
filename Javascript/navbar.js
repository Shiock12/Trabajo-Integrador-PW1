// navbar.js - controla qué muestra el menú según el usuario activo

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

function initNavbar() {
  const usuario = getUsuarioActivo();

  // Secciones del nav
  const cajaInvitado = document.querySelector("[data-seccion-invitado]");  // Login/Registro
  const cajaLogueado = document.querySelector("[data-seccion-logueado]");  // Perfil/Logout
  const linkPerfil   = document.querySelector("[data-usuario-nombre]");
  const btnLogout    = document.querySelector("[data-btn-logout]");

  if (usuario) {
    // ✅ Usuario logueado
    if (cajaInvitado) cajaInvitado.style.display = "none";
    if (cajaLogueado) cajaLogueado.style.display = "flex";

    if (linkPerfil) {
      linkPerfil.textContent = usuario.usuario || "Perfil";
    }
  } else {
    // 🚫 Nadie logueado
    if (cajaInvitado) cajaInvitado.style.display = "flex";
    if (cajaLogueado) cajaLogueado.style.display = "none";
  }

  if (btnLogout) {
    btnLogout.addEventListener("click", () => {
      logoutUsuario();
      // Podés cambiar la página de destino si querés que vaya a otra
      window.location.href = "Inicio.html";
    });
  }
}

document.addEventListener("DOMContentLoaded", initNavbar);
