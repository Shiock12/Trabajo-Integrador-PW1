// inscripcion-empresa.js

document.addEventListener("DOMContentLoaded", function () {

  // 1) Capturamos elementos del DOM
  const selectCurso    = document.getElementById("curso");
  const tituloCurso    = document.getElementById("tituloCurso");
  const descripcion    = document.getElementById("descripcion");
  const precioTotal    = document.getElementById("precioTotal");

  const contenedor     = document.getElementById("contenedorInputs");
  const btnAgregar     = document.getElementById("agregar");
  const btnInscribirse = document.getElementById("btnInscribirse");

  const resumen        = document.getElementById("resumenInscripcion");
  const resumenCurso   = document.getElementById("resumenCurso");
  const resumenPrecio  = document.getElementById("resumenPrecio");
  const listaPersonas  = document.getElementById("listaPersonas");

  if (!selectCurso || !tituloCurso || !descripcion || !precioTotal || !contenedor) {
    console.error("Faltan elementos en el HTML de FormularioEmpresas.");
    return;
  }

  // 2) Config
  const COSTO_PERSONA = 20; // $20 por persona

  // 3) Funciones helpers

  // Precio base según el curso elegido
  function obtenerPrecioBase() {
    const opcion = selectCurso.options[selectCurso.selectedIndex];
    const precio = opcion?.dataset.precio || 0;
    return Number(precio);
  }

  // Cantidad de filas de personas
  function contarPersonas() {
    const filas = contenedor.querySelectorAll(".fila");
    return filas.length;
  }

  // Formato $0000.-
  function formatoMoneda(numero) {
    return `$${numero}.-`;
  }

  // Total = precio base + (cantidad personas * COSTO_PERSONA)
  function actualizarTotal() {
    const base = obtenerPrecioBase();
    const personas = contarPersonas();
    const total = base + (COSTO_PERSONA * personas);
    precioTotal.textContent = formatoMoneda(total);
  }

  // Cambia título/desc al cambiar el curso
  function aplicarCursoDesdeSelect() {
    const opcion = selectCurso.options[selectCurso.selectedIndex];
    const titulo = opcion?.dataset.titulo || "Curso";
    const desc   = opcion?.dataset.desc   || "";

    tituloCurso.textContent = titulo;
    descripcion.textContent = desc;

    actualizarTotal();
  }

  // 4) Manejo de filas (personas)

  function crearFila() {
    const fila = document.createElement("div");
    fila.className = "fila";

    const inpNombre = document.createElement("input");
    inpNombre.className = "item";
    inpNombre.type = "text";
    inpNombre.placeholder = "Nombre y Apellido";
    inpNombre.required = true;

    const inpDni = document.createElement("input");
    inpDni.className = "item";
    inpDni.type = "number";
    inpDni.placeholder = "DNI";
    inpDni.required = true;

    const inpTel = document.createElement("input");
    inpTel.className = "item";
    inpTel.type = "number";
    inpTel.placeholder = "Teléfono";
    inpTel.required = true;

    const btnEliminar = document.createElement("img");
    btnEliminar.src = "../Images/icons8-cancel-48.png";
    btnEliminar.alt = "Eliminar";
    btnEliminar.className = "btn-eliminar";

    btnEliminar.addEventListener("click", function () {
      fila.remove();
      actualizarTotal();
    });

    fila.appendChild(inpNombre);
    fila.appendChild(inpDni);
    fila.appendChild(inpTel);
    fila.appendChild(btnEliminar);

    contenedor.appendChild(fila);

    inpNombre.focus();
    actualizarTotal();
  }

  // 5) Resumen de inscripción con validación

  function mostrarResumenInscripcion() {
    if (!resumen || !listaPersonas || !resumenCurso || !resumenPrecio) return;

    const filas = contenedor.querySelectorAll(".fila");
    const personasValidas = [];

    filas.forEach(function (fila) {
      const inputs = fila.querySelectorAll("input");
      const nombre = inputs[0]?.value.trim();
      const dni    = inputs[1]?.value.trim();
      const tel    = inputs[2]?.value.trim();

      // Consideramos "persona válida" si completó los 3 campos
      if (nombre && dni && tel) {
        personasValidas.push({ nombre, dni, tel });
      }
    });

    // ✅ Si NO hay ninguna persona válida → mostramos cartel y NO mostramos resumen
    if (personasValidas.length === 0) {
      alert("No hay personas inscriptas. Agregá al menos una persona con todos los datos antes de inscribirte.");
      return;
    }

    // Si hay personas válidas, llenamos el resumen
    listaPersonas.innerHTML = "";

    personasValidas.forEach(function (persona, index) {
      const li = document.createElement("li");
      li.textContent = `${index + 1}. ${persona.nombre} — DNI: ${persona.dni} — Tel: ${persona.tel}`;
      listaPersonas.appendChild(li);
    });

    resumenCurso.textContent  = tituloCurso.textContent;
    resumenPrecio.textContent = precioTotal.textContent;

    resumen.style.display = "block";
    resumen.scrollIntoView({ behavior: "smooth" });
  }

  // 6) Eventos

  selectCurso.addEventListener("change", aplicarCursoDesdeSelect);

  if (btnAgregar) {
    btnAgregar.addEventListener("click", crearFila);
  }

  if (btnInscribirse) {
    btnInscribirse.addEventListener("click", mostrarResumenInscripcion);
  }

  // 7) Estado inicial
  aplicarCursoDesdeSelect();
  actualizarTotal();
});
