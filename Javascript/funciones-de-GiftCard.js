import { getUsuarioActivo, logoutUsuario} from "./auth.js";

document.addEventListener("DOMContentLoaded", function () {

  // -------------------------------
  // CAPTURA DE ELEMENTOS DEL FORM

  const inputDestinatario = document.getElementById("destinatario");
  const inputMonto = document.getElementById("monto");

  // Radio buttons (color, tamaño, fondo)
  const radiosColor = document.querySelectorAll("input[name='color_fuente']");
  const radiosTamano = document.querySelectorAll("input[name='tamano_fuente']");
  const radiosFondo = document.querySelectorAll("input[name='fondo']");

  // -------------------------------
  // CAPTURA DE LA VISTA PREVIA


  const previewNombre = document.querySelector(".preview-nombre");
  const previewPrecio = document.querySelector(".preview-precio");
  const previewGiftcard = document.querySelector(".giftcard-preview");

  // -------------------------------
  // 1) ACTUALIZAR NOMBRE


  inputDestinatario.addEventListener("input", function () {
    let nombre = inputDestinatario.value.trim();
    previewNombre.textContent = nombre !== "" ? nombre : "Destinatario";
  });

  // -------------------------------
  // 2) ACTUALIZAR MONTO


  inputMonto.addEventListener("input", function () {
    let valor = inputMonto.value.trim();
    previewPrecio.textContent = valor !== "" ? `$${valor}.-` : "$0000.-";
  });

  // -------------------------------
  // 3) ACTUALIZAR COLOR DEL NOMBRE


  radiosColor.forEach(radio => {
    radio.addEventListener("change", function () {
      previewNombre.style.color = radio.value;
    });
  });

  // -------------------------------
  // 4) ACTUALIZAR TAMAÑO DEL NOMBRE


  radiosTamano.forEach(radio => {
    radio.addEventListener("change", function () {
      let tamano = radio.value; // viene en "20", "28", "32", "48", "60"
      previewNombre.style.fontSize = tamano + "px";
    });
  });

  // -------------------------------
  // 5) CAMBIAR FONDO DE LA TARJETA

  radiosFondo.forEach(radio => {
    radio.addEventListener("change", function () {

      // Cambia la imagen de fondo de la preview según el radio seleccionado
      if (radio.value === "f1") {
        previewGiftcard.style.backgroundImage = "url('../Images/fondo1.jpg')";
      }
      else if (radio.value === "f2") {
        previewGiftcard.style.backgroundImage = "url('../Images/fondo3.jpg')";
      }
      else if (radio.value === "f3") {
        previewGiftcard.style.backgroundImage = "url('../Images/fondo4.jpg')";
      }

      previewGiftcard.style.backgroundSize = "cover";
      previewGiftcard.style.backgroundPosition = "center";
    });
  });

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
