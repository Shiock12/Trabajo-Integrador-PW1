// funciones-de-GiftCard.js

document.addEventListener("DOMContentLoaded", function () {


  const inputDestinatario = document.getElementById("destinatario");
  const inputMonto        = document.getElementById("monto");

  const radiosColor  = document.querySelectorAll('input[name="color_fuente"]');
  const radiosTamano = document.querySelectorAll('input[name="tamano_fuente"]');
  const radiosFondo  = document.querySelectorAll('input[name="fondo"]');


  const previewNombre   = document.querySelector(".preview-nombre");
  const previewPrecio   = document.querySelector(".preview-precio");
  const previewGiftcard = document.querySelector(".giftcard-preview");


  if (inputDestinatario && previewNombre) {
    inputDestinatario.addEventListener("input", function () {
      const nombre = inputDestinatario.value.trim();
      previewNombre.textContent = nombre !== "" ? nombre : "Destinatario";
    });
  }

  // 4) Actualizar monto
  if (inputMonto && previewPrecio) {
    inputMonto.addEventListener("input", function () {
      const valor = inputMonto.value.trim();
      previewPrecio.textContent = valor !== "" ? `$${valor}.-` : "$0000.-";
    });
  }

  
  radiosColor.forEach(function (radio) {
    radio.addEventListener("change", function () {
      if (previewNombre) {
        previewNombre.style.color = radio.value;
      }
    });
  });


  radiosTamano.forEach(function (radio) {
    radio.addEventListener("change", function () {
      if (previewNombre) {
        const tamano = radio.value; 
        previewNombre.style.fontSize = tamano + "px";
      }
    });
  });


  radiosFondo.forEach(function (radio) {
    radio.addEventListener("change", function () {
      if (!previewGiftcard) return;

      let url = "";

      if (radio.value === "f1") {
        url = "../Images/fondo1.jpg";
      } else if (radio.value === "f2") {
        url = "../Images/fondo3.jpg";
      } else if (radio.value === "f3") {
        url = "../Images/fondo4.jpg";
      }

      previewGiftcard.style.backgroundImage = url ? `url('${url}')` : "none";
      previewGiftcard.style.backgroundSize = "cover";
      previewGiftcard.style.backgroundPosition = "center";
    });
  });


  const form = document.getElementById("giftcardForm");

  if (form) {
    form.addEventListener("submit", function (e) {
      const usuarioActivoStr = localStorage.getItem("usuarioActivo");

      if (!usuarioActivoStr) {
        // Frenamos el envío del formulario
        e.preventDefault();

        // Aviso al usuario
        alert("Tenés que iniciar sesión para confirmar tu Gift Card.");

        // Opcional: redirigir al login
        window.location.href = "./VistaLogin.html"; // misma carpeta /Pages/
      }
      alert("Compra generada correctamente, te enviaremos un mail con la informacion a seguir");
      // Si sí hay usuarioActivo, el submit sigue normalmente
    });
  }

});
