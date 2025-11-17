// funciones-de-GiftCard.js

document.addEventListener("DOMContentLoaded", function () {

  // 1) Capturamos elementos del formulario
  const inputDestinatario = document.getElementById("destinatario");
  const inputMonto        = document.getElementById("monto");

  const radiosColor  = document.querySelectorAll('input[name="color_fuente"]');
  const radiosTamano = document.querySelectorAll('input[name="tamano_fuente"]');
  const radiosFondo  = document.querySelectorAll('input[name="fondo"]');

  // 2) Capturamos elementos de la vista previa
  const previewNombre   = document.querySelector(".preview-nombre");
  const previewPrecio   = document.querySelector(".preview-precio");
  const previewGiftcard = document.querySelector(".giftcard-preview");

  // 3) Actualizar nombre
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

  // 5) Actualizar color del nombre
  radiosColor.forEach(function (radio) {
    radio.addEventListener("change", function () {
      if (previewNombre) {
        previewNombre.style.color = radio.value;
      }
    });
  });

  // 6) Actualizar tamaño del nombre (en px)
  radiosTamano.forEach(function (radio) {
    radio.addEventListener("change", function () {
      if (previewNombre) {
        const tamano = radio.value; // por ejemplo "20", "28", etc.
        previewNombre.style.fontSize = tamano + "px";
      }
    });
  });

  // 7) Cambiar fondo de la giftcard según el radio seleccionado
  radiosFondo.forEach(function (radio) {
    radio.addEventListener("change", function () {
      if (!previewGiftcard) return;

      // Suponemos que los value son "f1", "f2", "f3"
      // y las imágenes son fondo1.jpg, fondo2.jpg, fondo3.jpg
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

});
