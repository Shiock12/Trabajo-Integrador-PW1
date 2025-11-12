document.addEventListener("DOMContentLoaded", function () {

  //CAPTURAR ELEMENTOS DEL FORMULARIO
  const inputDestinatario = document.getElementById("destinatario");
  const inputMonto = document.getElementById("monto");
  const inputColor = document.getElementById("color_fuente");
  const selectTamano = document.getElementById("tamano_fuente");
  const selectFondo = document.getElementById("fondo");

  //CAPTURAR ELEMENTOS DE LA VISTA PREVIA
  const previewNombre = document.querySelector(".preview-nombre");
  const previewPrecio = document.querySelector(".preview-precio");
  const previewGiftcard = document.querySelector(".giftcard-preview");

  //ACTUALIZAR NOMBRE
  inputDestinatario.addEventListener("input", () => {
    const nombre = inputDestinatario.value.trim();
    previewNombre.textContent = nombre !== "" ? nombre : "Destinatario";
  });

  //ACTUALIZAR MONTO
  inputMonto.addEventListener("input", () => {
    const valor = inputMonto.value;
    previewPrecio.textContent = valor ? `$${valor}.-` : "$0000.-";
  });

  //ACTUALIZAR COLOR DE FUENTE
  inputColor.addEventListener("input", () => {
    previewNombre.style.color = inputColor.value;
  });

  //ACTUALIZAR TAMAÑO DE FUENTE
  selectTamano.addEventListener("change", () => {
    switch (selectTamano.value) {
      case "small":
        previewNombre.style.fontSize = "0.9em";
        break;
      case "medium":
        previewNombre.style.fontSize = "1.2em";
        break;
      case "large":
        previewNombre.style.fontSize = "1.5em";
        break;
    }
  });

  //CAMBIAR FONDO DE LA GIFT CARD
  selectFondo.addEventListener("change", () => {
    switch (selectFondo.value) {
      case "fondo1":
        previewGiftcard.style.backgroundColor = "#FF0000"; // Rojoojo
        break;
      case "fondo2":
        previewGiftcard.style.backgroundColor = "#00FF00"; // Verde
        break;
      case "fondo3":
        previewGiftcard.style.backgroundColor = "#8B00FF"; // Morado
        break;
      default:
        previewGiftcard.style.backgroundColor = "#6A9CF4";
    }
  });

});
