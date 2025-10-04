document.addEventListener('DOMContentLoaded', function() {
    const formulario = document.getElementById('formularioContacto');
    const mensajeExito = document.getElementById('mensajeExito');
    const botonCerrar = document.getElementById('btnCerrar');

    //Mostrar mensaje al enviar el formulario
    formulario.addEventListener('submit', function(event) {
        event.preventDefault();
        mensajeExito.style.display = 'block';
        formulario.reset();
    });
    //Cerrar mensaje con el boton
    botonCerrar.addEventListener('click', function() {
        mensajeExito.style.display = 'none';
    });
});