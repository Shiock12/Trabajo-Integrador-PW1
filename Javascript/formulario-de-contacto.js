document.addEventListener('DOMContentLoaded', function() {
    const formulario = document.getElementById('formularioContacto');
    const mensajeExito = document.getElementById('mensajeExito');
    const botonCerrar = document.getElementById('btnCerrar');
    const consultaTextarea = document.getElementById('consulta');
    const MAX_CARACTERES = 1000;
    
    // Crear contador de caracteres
    const contadorDiv = crearContadorCaracteres(consultaTextarea, MAX_CARACTERES);
    
    // Actualizar contador en tiempo real
    consultaTextarea.addEventListener('input', function() {
        actualizarContador(consultaTextarea, contadorDiv, MAX_CARACTERES);
    });
    
    // Validar formulario al enviar
    formulario.addEventListener('submit', function(event) {
        event.preventDefault();
        limpiarTodosLosErrores(formulario);
        
        let formularioValido = true;
        const nombre = document.getElementById('nombre');
        const apellido = document.getElementById('apellido');
        const email = document.getElementById('email');
        const telefono = document.getElementById('telefono');
        const consulta = document.getElementById('consulta');
        
        // Validar nombre
        if (!validarCampoNoVacio(nombre.value)) {
            mostrarError(nombre, 'El nombre no puede estar vacío');
            formularioValido = false;
        }
        
        // Validar apellido
        if (!validarCampoNoVacio(apellido.value)) {
            mostrarError(apellido, 'El apellido no puede estar vacío');
            formularioValido = false;
        }
        
        // Validar email
        if (!validarEmail(email.value)) {
            mostrarError(email, 'Ingrese un email válido (ejemplo@dominio.com)');
            formularioValido = false;
        }
        
        // Validar teléfono
        if (!validarTelefono(telefono.value)) {
            mostrarError(telefono, 'El teléfono debe tener 8 dígitos (ejemplo: 1234-5678)');
            formularioValido = false;
        } else if (telefono.value.trim() !== '') {
            telefono.value = formatearTelefono(telefono.value);
        }
        
        // Validar consulta
        if (!validarCampoNoVacio(consulta.value)) {
            mostrarError(consulta, 'La consulta no puede estar vacía');
            formularioValido = false;
        } else if (!validarLongitudMaxima(consulta.value, MAX_CARACTERES)) {
            mostrarError(consulta, 'La consulta no puede exceder los ' + MAX_CARACTERES + ' caracteres');
            formularioValido = false;
        }
        
        // Si todo es válido, mostrar mensaje
        if (formularioValido) {
            mensajeExito.style.display = 'block';
            formulario.reset();
            const contadorActual = contadorDiv.querySelector('.contador-actual');
            contadorActual.innerHTML = '0';
            contadorDiv.style.color = '#666';
        }
    });
    
    // Cerrar mensaje y redirigir
    botonCerrar.addEventListener('click', function() {
        mensajeExito.style.display = 'none';
        window.location.href = 'Inicio.html';
    });
});