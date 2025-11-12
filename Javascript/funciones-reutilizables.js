function validarCampoNoVacio(valor) {
    return valor.trim() !== '';
}

function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function validarTelefono(telefono) {
    if (telefono.trim() === '') {
        return true;
    }
    let telefonoLimpio = telefono.replace(/[\s-]/g, '');
    const regex = /^\d{8}$/;
    return regex.test(telefonoLimpio);
}

function formatearTelefono(telefono) {
    if (telefono.trim() === '') {
        return '';
    }
    let telefonoLimpio = telefono.replace(/[\s-]/g, '');
    return telefonoLimpio.substring(0, 4) + '-' + telefonoLimpio.substring(4);
}

function validarLongitudMaxima(texto, maxCaracteres) {
    return texto.length <= maxCaracteres;
}

// MANEJO DE ERRORES
function mostrarError(input, mensaje) {
    const errorPrevio = input.parentNode.querySelector('.mensaje-error');
    if (errorPrevio) {
        errorPrevio.parentNode.removeChild(errorPrevio);
    }
    
    const mensajeError = document.createElement('span');
    mensajeError.className = 'mensaje-error';
    mensajeError.innerHTML = mensaje;
    input.parentNode.appendChild(mensajeError);
    input.classList.add('input-error');
}

function limpiarError(input) {
    const errorPrevio = input.parentNode.querySelector('.mensaje-error');
    if (errorPrevio) {
        errorPrevio.parentNode.removeChild(errorPrevio);
    }
    input.classList.remove('input-error');
}

function limpiarTodosLosErrores(formulario) {
    const inputs = formulario.querySelectorAll('input, textarea');
    inputs.forEach(function(input) {
        limpiarError(input);
    });
}

// CONTADOR DE CARACTERES
function crearContadorCaracteres(textarea, maxCaracteres) {
    const contadorDiv = document.createElement('div');
    contadorDiv.className = 'contador-caracteres';
    contadorDiv.innerHTML = '<span class="contador-actual">0</span> / ' + maxCaracteres + ' caracteres';
    textarea.parentNode.appendChild(contadorDiv);
    return contadorDiv;
}

function actualizarContador(textarea, contadorDiv, maxCaracteres) {
    const contadorActual = contadorDiv.querySelector('.contador-actual');
    const longitudActual = textarea.value.length;
    contadorActual.innerHTML = longitudActual;
    
    if (longitudActual > maxCaracteres) {
        textarea.value = textarea.value.substring(0, maxCaracteres);
        contadorActual.innerHTML = maxCaracteres;
    }
    
    if (longitudActual >= maxCaracteres * 0.9) {
        contadorDiv.style.color = '#d9534f';
    } else if (longitudActual >= maxCaracteres * 0.7) {
        contadorDiv.style.color = '#f0ad4e';
    } else {
        contadorDiv.style.color = '#666';
    }
}