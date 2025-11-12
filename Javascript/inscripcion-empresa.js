// inscripcion-empresa.js
export function initEmpresaForm() {

  // --- Elementos de la página de Empresas ---
  const selectCurso = document.getElementById('curso');
  const tituloEl= document.getElementById('tituloCurso');
  const descEl= document.getElementById('descCurso');
  const precioEl= document.getElementById('precioTotal');

  const contenedor  = document.getElementById('contenedorInputs');
  const btnAgregar  = document.getElementById('agregar');

  // Modal
  const btnInscribirse = document.getElementById('btnInscribirse');
  const modal          = document.getElementById('modalResumen');
  const modalContenido = document.getElementById('modalContenido');
  const btnConfirmar   = document.getElementById('btnConfirmar');

  if (!selectCurso || !tituloEl || !descEl || !precioEl || !contenedor) return;

  // --- Config ---
  const PER_PERSON_FEE = 20; // $20 por persona

  // Helpers
  const getBasePrice = () => Number(selectCurso.options[selectCurso.selectedIndex]?.dataset.precio || 0);
  const countPersons = () => contenedor.querySelectorAll('.fila').length;
  const formatMoney = n => `$${n}.-`;

  // Total = base + (personas * fee)
  function renderTotal() {
    const base = getBasePrice();
    const personas = countPersons();
    const total = base + (PER_PERSON_FEE * personas);
    precioEl.textContent = formatMoney(total);
  }

  // Set título/desc desde el select y recalcular total
  function aplicarCursoDesdeSelect() {
    const opt = selectCurso.options[selectCurso.selectedIndex];
    const titulo = opt?.dataset.titulo || 'Curso';
    const desc   = opt?.dataset.desc   || '';
    tituloEl.textContent = titulo;
    descEl.textContent   = desc;
    renderTotal();
  }

  // Eliminar fila
  function wireEliminar(imgEl) {
    imgEl.addEventListener('click', () => {
      const fila = imgEl.closest('.fila');
      if (fila) {
        fila.remove();
        renderTotal();
      }
    });
  }

  // Conectar X de filas iniciales (si hay)
  contenedor.querySelectorAll('.btn-eliminar').forEach(wireEliminar);

  // Agregar fila
  function crearFila() {
    const fila = document.createElement('div');
    fila.className = 'fila';

    const inpNombre = document.createElement('input');
    inpNombre.className = 'item';
    inpNombre.type = 'text';
    inpNombre.placeholder = 'Nombre y Apellido';

    const inpDni = document.createElement('input');
    inpDni.className = 'item';
    inpDni.type = 'number';
    inpDni.placeholder = 'DNI';

    const inpTel = document.createElement('input');
    inpTel.className = 'item';
    inpTel.type = 'number';
    inpTel.placeholder = 'Telefono';

    const btnEliminar = document.createElement('img');
    btnEliminar.src = '../Images/icons8-cancel-48.png';
    btnEliminar.alt = 'Eliminar';
    btnEliminar.className = 'btn-eliminar';

    fila.append(inpNombre, inpDni, inpTel, btnEliminar);
    contenedor.appendChild(fila);

    wireEliminar(btnEliminar);
    inpNombre.focus();

    renderTotal();
  }

  // ---------- Modal ----------
  function abrirModal() {
    modal?.classList.add('show');
    modal?.setAttribute('aria-hidden', 'false');
  }
  function cerrarModal() {
    modal?.classList.remove('show');
    modal?.setAttribute('aria-hidden', 'true');
  }
  // Cerrar por backdrop / botón con data-close
  modal?.addEventListener('click', (e) => {
    if (e.target?.dataset?.close !== undefined) cerrarModal();
  });

  // Arma el resumen a partir de las filas actuales
  function abrirResumenInscripcion() {
    const filas = contenedor.querySelectorAll('.fila');
    const personas = [];
    filas.forEach((f) => {
      const inputs = f.querySelectorAll('input');
      const nombre = inputs[0]?.value.trim();
      const dni    = inputs[1]?.value.trim();
      const tel    = inputs[2]?.value.trim();
      // Incluimos si hay al menos un dato cargado (o exigí nombre/dni si querés)
      if (nombre || dni || tel) {
        personas.push({ nombre, dni, tel });
      }
    });

    if (personas.length === 0) {
      modalContenido.innerHTML = `<p>No hay personas inscritas todavía.</p>`;
    } else {
      const items = personas.map((p, i) =>
        `<li><strong>${i + 1}.</strong> ${p.nombre || '(sin nombre)'} — DNI: ${p.dni || '-'} — Tel: ${p.tel || '-'}</li>`
      ).join('');

      modalContenido.innerHTML = `
        <p><strong>Curso:</strong> ${tituloEl.textContent}</p>
        <p><strong>Total:</strong> ${precioEl.textContent}</p>
        <hr>
        <p><strong>Personas (${personas.length}):</strong></p>
        <ol class="modal-lista">${items}</ol>
      `;
    }
    abrirModal();
  }

  // Eventos
  selectCurso.addEventListener('change', aplicarCursoDesdeSelect);
  btnAgregar?.addEventListener('click', crearFila);
  btnInscribirse?.addEventListener('click', abrirResumenInscripcion);
  btnConfirmar?.addEventListener('click', () => {
    // Futuro: acá podrías enviar al server / limpiar / redirigir
    cerrarModal();
  });

  // Estado inicial
  aplicarCursoDesdeSelect();
  renderTotal();

  // --- Mostrar tarjeta de resumen ---
const boton = document.getElementById('btnInscribirse');
const resumen = document.getElementById('resumenInscripcion');
const lista = document.getElementById('listaPersonas');
const resumenCurso = document.getElementById('resumenCurso');
const resumenPrecio = document.getElementById('resumenPrecio');

boton.addEventListener('click', () => {
  const filas = contenedor.querySelectorAll('.fila');
  lista.innerHTML = ''; // limpiar resumen previo

  filas.forEach((fila, i) => {
    const inputs = fila.querySelectorAll('input');
    const nombre = inputs[0]?.value.trim() || '—';
    const dni = inputs[1]?.value.trim() || '—';
    const tel = inputs[2]?.value.trim() || '—';

    const li = document.createElement('li');
    li.textContent = `${i + 1}. ${nombre} — DNI: ${dni} — Tel: ${tel}`;
    lista.appendChild(li);
  });

  resumenCurso.textContent = tituloEl.textContent;
  resumenPrecio.textContent = precioEl.textContent;

  resumen.style.display = 'block'; // mostrar tarjeta
  resumen.scrollIntoView({ behavior: 'smooth' });
});
  
}


