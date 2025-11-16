import { getUsuarioActivo, logoutUsuario } from "./auth.js";

document.addEventListener("DOMContentLoaded", () => {
  const usuarioActivo = getUsuarioActivo();

  // Si no hay sesión, mandamos al inicio (o login)
  if (!usuarioActivo) {
    window.location.href = "../index.html"; // ajustá si tu inicio está en otra ruta
    return;
  }

  // Capturamos los elementos del DOM
  const perfilUsuario     = document.getElementById("perfilUsuario");
  const perfilEmail       = document.getElementById("perfilEmail");
  const perfilMetodoImg   = document.getElementById("perfilMetodoImg");
  const perfilMetodoTexto = document.getElementById("perfilMetodoTexto");

  // Rellenamos con los datos del usuario
  if (perfilUsuario) perfilUsuario.textContent = usuarioActivo.usuario || "Sin usuario";
  if (perfilEmail)   perfilEmail.textContent   = usuarioActivo.email   || "Sin email";

  // 👇 AQUÍ ESTABA EL ERROR: usar usuarioActivo, no usuario
  const metodo = usuarioActivo.metodo || "Sin método";

  if (perfilMetodoTexto) {
    perfilMetodoTexto.textContent = metodo; // e.g. "Mercado Pago"
  }

  if (perfilMetodoImg) {
    let src = "";
    switch (metodo) {
      case "Mercado Pago":
        src = "../Images/mercadopago.png";
        break;
      case "Tarjeta de crédito":
        src = "../Images/credit-card.png";
        break;
      case "PayPal":
        src = "../Images/paypal.png";
        break;
      case "Transferencia":
        src = "../Images/bank-transfer.png";
        break;
      default:
        src = "../Images/no-payment.png";
    }
    perfilMetodoImg.src = src;
    perfilMetodoImg.alt = metodo;
  }
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

  if (btnLogout) {
    btnLogout.addEventListener("click", () => {
      logoutUsuario();
      window.location.href = "Inicio.html"; 
    });
  }
});
