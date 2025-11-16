// =======================================================================
//  inscripcion-empresa.js — versión JUNIOR FRIENDLY
// =======================================================================

document.addEventListener("DOMContentLoaded", function () {

  // -------------------------------------------------------------------
  // VARIABLES PRINCIPALES (traemos los elementos del HTML)
  // -------------------------------------------------------------------

  const curso = document.getElementById("curso");
  const tituloCurso = document.getElementById("tituloCurso");
  const descripcion = document.getElementById("descripcion");
  const precioTotal = document.getElementById("precioTotal");

  const contenedor = document.getElementById("contenedorInputs");
  const botonAgregar = document.getElementById("agregar");

  const btnInscribirse = document.getElementById("btnInscribirse");

  // Modal
  const modal = document.getElementById("modalResumen");
  const modalContenido = document.getElementById("modalContenido");
  const btnConfirmar = document.getElementById("btnConfirmar");

  // Tarjeta de resumen
  const resumen = document.getElementById("resumenInscripcion");
  const listaPersonas = document.getElementById("listaPersonas");
  const resumenCurso = document.getElementById("resumenCurso");
  const resumenPrecio = document.getElementById("resumenPrecio");

  // Costo adicional por persona
  const costoPersona = 20;


  // -------------------------------------------------------------------
  // FUNCIONES DE PRECIO
  // -------------------------------------------------------------------

  // Obtiene el precio base según el curso seleccionado
  function obtenerPrecioBase() {
    const opcion = curso.options[curso.selectedIndex];
    return Number(opcion.dataset.precio);
  }

  // Cuenta cuántas filas de personas hay
  function contarPersonas() {
    const filas = contenedor.querySelectorAll(".fila");
    return filas.length;
  }

  // Formatea el precio con el formato $0000.-
  function formatearPrecio(n) {
    return `$${n}.-`;
  }

  // Calcula el total del precio
  function actualizarTotal() {
    const precioBase = obtenerPrecioBase();
    const totalPersonas = contarPersonas();
    const total = precioBase + totalPersonas * costoPersona;

    precioTotal.textContent = formatearPrecio(total);
  }


  // -------------------------------------------------------------------
  // MOSTRAR TITULO Y DESCRIPCIÓN SEGÚN CURSO SELECCIONADO
  // -------------------------------------------------------------------

  function aplicarCursoDesdeSelect() {
    const opcion = curso.options[curso.selectedIndex];
    tituloCurso.textContent = opcion.dataset.titulo;
    descripcion.textContent = opcion.dataset.desc;
    actualizarTotal();
  }


  // -------------------------------------------------------------------
  // AGREGAR FILA DE PERSONA
  // -------------------------------------------------------------------

  function agregarFila() {
    const fila = document.createElement("div");
    fila.className = "fila";

    fila.innerHTML = `
      <input class="item" type="text" placeholder="Nombre y Apellido">
      <input class="item" type="number" placeholder="DNI">
      <input class="item" type="number" placeholder="Teléfono">
      <img src="../Images/icons8-cancel-48.png" class="btn-eliminar" alt="Eliminar">
    `;

    // agregamos al contenedor
    contenedor.appendChild(fila);

    const botonEliminar = fila.querySelector(".btn-eliminar");
    agregarFuncionEliminar(botonEliminar);

    actualizarTotal();
  }


  // -------------------------------------------------------------------
  // ELIMINAR FILA DE PERSONA
  // -------------------------------------------------------------------

  function agregarFuncionEliminar(boton) {
    boton.addEventListener("click", function () {
      const fila = boton.closest(".fila");
      fila.remove();
      actualizarTotal();
    });
  }


  // -------------------------------------------------------------------
  // MODAL (ABRIR Y CERRAR)
  // -------------------------------------------------------------------

  function abrirModal() {
    modal.classList.add("show");
    modal.setAttribute("aria-hidden", "false");
  }

  function cerrarModal() {
    modal.classList.remove("show");
    modal.setAttribute("aria-hidden", "true");
  }

  // Cerrar cuando se hace click en algo con data-close
  modal.addEventListener("click", function (e) {
    if (e.target.dataset.close !== undefined) {
      cerrarModal();
    }
  });


  // -------------------------------------------------------------------
  // ABRIR RESUMEN (VALIDA Y ABRE EL MODAL)
  // -------------------------------------------------------------------

  function abrirResumenInscripcion() {

    const filas = contenedor.querySelectorAll(".fila");
    const personas = [];

    let hayError = false;
    let mensajeError = "";

    filas.forEach((fila) => {
      const inputs = fila.querySelectorAll("input");

      // Tomamos valores
      let nombre = inputs[0].value.trim();
      let dni = inputs[1].value.trim();
      let tel = inputs[2].value.trim();

      // Si la fila está vacía, la ignoramos
      if (nombre === "" && dni === "" && tel === "") {
        return;
      }

      // Validación obligatoria
      if (nombre === "" || dni === "") {
        hayError = true;
        mensajeError = "Debes completar NOMBRE y DNI en todas las personas.";
      }

      personas.push({ nombre, dni, tel });
    });

    // Si hay error → mostrar modal solo con error
    if (hayError) {
      modalContenido.innerHTML = `<p style="color:red;">${mensajeError}</p>`;
      abrirModal();
      return false;
    }

    // Si no hay personas cargadas
    if (personas.length === 0) {
      modalContenido.innerHTML = "<p>No hay personas inscritas todavía.</p>";
      abrirModal();
      return false;
    }

    // Si todo está bien → armar lista
    let items = "";

    personas.forEach((p, i) => {
      items += `
        <li><strong>${i + 1}.</strong> 
        ${p.nombre} — DNI: ${p.dni} — Tel: ${p.tel || "-"}</li>
      `;
    });

    modalContenido.innerHTML = `
      <p><strong>Curso:</strong> ${tituloCurso.textContent}</p>
      <p><strong>Total:</strong> ${precioTotal.textContent}</p>
      <hr>
      <p><strong>Personas (${personas.length}):</strong></p>
      <ol>${items}</ol>
    `;

    abrirModal();
    return true;
  }


  // -------------------------------------------------------------------
  // TARJETA DE RESUMEN FIJA (ABAJO DEL FORMULARIO)
  // -------------------------------------------------------------------

  function actualizarTarjetaResumen() {

    listaPersonas.innerHTML = "";

    const filas = contenedor.querySelectorAll(".fila");

    filas.forEach((fila, i) => {
      const inputs = fila.querySelectorAll("input");

      let nombre = inputs[0].value.trim() || "—";
      let dni = inputs[1].value.trim() || "—";
      let tel = inputs[2].value.trim() || "—";

      // Si la fila está completamente vacía, no la muestro
      if (nombre === "—" && dni === "—" && tel === "—") return;

      const li = document.createElement("li");
      li.textContent = `${i + 1}. ${nombre} — DNI: ${dni} — Tel: ${tel}`;
      listaPersonas.appendChild(li);
    });

    resumenCurso.textContent = tituloCurso.textContent;
    resumenPrecio.textContent = precioTotal.textContent;

    resumen.style.display = "block";
  }


  // -------------------------------------------------------------------
  // EVENTOS
  // -------------------------------------------------------------------

  curso.addEventListener("change", aplicarCursoDesdeSelect);
  botonAgregar.addEventListener("click", agregarFila);

  btnInscribirse.addEventListener("click", function () {
    const estaTodoBien = abrirResumenInscripcion();

    if (estaTodoBien) {
      actualizarTarjetaResumen();
    }
  });

  btnConfirmar.addEventListener("click", cerrarModal);


  // -------------------------------------------------------------------
  // ESTADO INICIAL AL CARGAR LA PÁGINA
  // -------------------------------------------------------------------

  aplicarCursoDesdeSelect();
  actualizarTotal();

});
