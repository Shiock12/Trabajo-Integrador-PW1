// inscripcion-empresa.js
export function initEmpresaForm() {

  //variables
  const curso = document.getElementById("curso");
  const tituloCurso= document.getElementById("tituloCurso");
  const descripcion= document.getElementById("descripcion");
  const precioTotal= document.getElementById("precioTotal");

  const contenedor  = document.getElementById('contenedorInputs');
  const botonagregar  = document.getElementById('agregar'); //es la iamgen del +

  // Modal
  const btnInscribirse = document.getElementById('btnInscribirse');
  const modal          = document.getElementById('modalResumen');
  const modalContenido = document.getElementById('modalContenido');
  const btnConfirmar   = document.getElementById('btnConfirmar');



  // --- Config ---
  const costoPersona = 20; // $20 por persona

  function getPrecioBase (){
    const opcion = curso.options[curso.selectedIndex];
    const precio = opcion.dataset.precio || 0;
    return Number(precio);
  }

  function contadorPersonas (){
    const filas = contenedor.querySelectorAll('.fila'); 
    const cantidad = filas.length;
    return cantidad;
  }

  function formatoMoneda (n){
     const texto = `$${n}.-`;
     return texto;
  }

  // CalculoDeSumaPersonas+Curso
  function devolverTotal() {
    const base = getPrecioBase();
    const personas = contadorPersonas();
    const total = base + (costoPersona * personas);
    precioTotal.textContent = formatoMoneda(total);
  }

  // Set título/desc desde el select y recalcular total
  function aplicarCursoDesdeSelect() {
    const opt = curso.options[curso.selectedIndex];
    const titulo = opt?.dataset.titulo || 'Curso';
    const desc   = opt?.dataset.desc   || '';
    tituloCurso.textContent = titulo;
    descripcion.textContent   = desc;
    devolverTotal();
  }

  function eliminarFila(imagen) {
    imagen.addEventListener('click', () => {
      const fila = imagen.closest('.fila'); //Busca para arriba si hay un elemento llamado .fila
      if (fila) {
        fila.remove();
        devolverTotal();
      }
    });
  }

  // Conectar X de filas iniciales (si hay)
  contenedor.querySelectorAll('.btn-eliminar').forEach(eliminarFila);

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

    eliminarFila(btnEliminar);
    inpNombre.focus();

    devolverTotal();
  }

  function abrirModal(){
    if(!modal) return;

    modal.classList.add('show');
    modal.setAttribute('aria-hidden','false');

  }
  function cerrarModal(){
    if(!modal) return;
     modal.classList.remove('show');
     modal.setAttribute('aria-hidden', 'true');
  }

if (modal) {
  modal.addEventListener('click', function (e) {
    const elementoClickeado = e.target;
    if (elementoClickeado && elementoClickeado.dataset && elementoClickeado.dataset.close !== undefined) {
      cerrarModal();
    }
  });
}

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
        <p><strong>Curso:</strong> ${tituloCurso.textContent}</p>
        <p><strong>Total:</strong> ${precioTotal.textContent}</p>
        <hr>
        <p><strong>Personas (${personas.length}):</strong></p>
        <ol class="modal-lista">${items}</ol>
      `;
    }
    abrirModal();
  }

  curso.addEventListener('change', aplicarCursoDesdeSelect);
  botonagregar?.addEventListener('click', crearFila);
  btnInscribirse?.addEventListener('click', abrirResumenInscripcion);
  btnConfirmar?.addEventListener('click', () => {
    cerrarModal();
  });

  aplicarCursoDesdeSelect();
  devolverTotal();

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

  resumenCurso.textContent = tituloCurso.textContent;
  resumenPrecio.textContent = precioTotal.textContent;

  resumen.style.display = 'block'; // mostrar tarjeta
  resumen.scrollIntoView({ behavior: 'smooth' });
});
  
}


