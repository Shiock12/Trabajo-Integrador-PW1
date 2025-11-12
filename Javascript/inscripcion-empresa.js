// Elementos
const contenedor = document.getElementById('contenedorInputs');
const btnAgregar  = document.getElementById('agregar');

// Función simple para crear una fila nueva
function crearFila() {
  // contenedor de la fila
  const fila = document.createElement('div');
  fila.className = 'fila';

  // input 1: Nombre y Apellido
  const inpNombre = document.createElement('input');
  inpNombre.className = 'item';
  inpNombre.type = 'text';
  inpNombre.placeholder = 'Nombre y Apellido';

  // input 2: DNI
  const inpDni = document.createElement('input');
  inpDni.className = 'item';
  inpDni.type = 'number';
  inpDni.placeholder = 'DNI';

  // input 3: Teléfono
  const inpTel = document.createElement('input');
  inpTel.className = 'item';
  inpTel.type = 'number';
  inpTel.placeholder = 'Telefono';

  // botón/eliminar (imagen)
  const btnEliminar = document.createElement('img');
  btnEliminar.src = '../Images/icons8-cancel-48.png';
  btnEliminar.alt = 'Eliminar usuario';
  btnEliminar.className = 'btn-eliminar';

  // cuando hago click en la X, borro la fila
  btnEliminar.addEventListener('click', function () {
    fila.remove();
  });

  // armar la fila
  fila.appendChild(inpNombre);
  fila.appendChild(inpDni);
  fila.appendChild(inpTel);
  fila.appendChild(btnEliminar);

  // agregar al contenedor
  contenedor.appendChild(fila);

  // foco al primer input de la nueva fila (opcional)
  inpNombre.focus();
}

// Click en el + para agregar fila
btnAgregar.addEventListener('click', crearFila);

// También conectamos la X de la fila inicial
contenedor.querySelectorAll('.btn-eliminar').forEach(function (img) {
  img.addEventListener('click', function () {
    const fila = img.parentElement;
    fila.remove();
  });
});
