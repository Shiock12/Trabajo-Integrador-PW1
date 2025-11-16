// registrarse.js - guardar usuario en localStorage con validación

document.addEventListener("DOMContentLoaded", function () {

  const formRegistro = document.getElementById("formRegistro");

  if (!formRegistro) {
    console.error("No se encontró el formulario de registro");
    return;
  }

  formRegistro.addEventListener("submit", function (evento) {
    evento.preventDefault(); // evita recargar la página

    // Capturar datos del formulario
    const usuario = document.getElementById("registroUsuario").value.trim();
    const email = document.getElementById("registroEmail").value.trim();
    const password = document.getElementById("registroPassword").value;
    const password2 = document.getElementById("registroPassword2").value;
    const metodo = document.getElementById("metodo").value;

    // Validación: passwords iguales
    if (password !== password2) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    // Leer usuarios guardados en localStorage
    let listaUsuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Validar usuario repetido
    const existeUsuario = listaUsuarios.some(u => u.usuario === usuario);
    if (existeUsuario) {
      alert("El nombre de usuario ya está en uso.");
      return;
    }

    // Validar email repetido
    const existeEmail = listaUsuarios.some(u => u.email === email);
    if (existeEmail) {
      alert("El email ya está registrado.");
      return;
    }

    // Crear objeto usuario
    const nuevoUsuario = {
      usuario: usuario,
      email: email,
      password: password,
      metodo: metodo,
      cursos: [] // futuro: guardar cursos aquí
    };

    // Agregar a la lista
    listaUsuarios.push(nuevoUsuario);

    // Guardar nuevamente en localStorage
    localStorage.setItem("usuarios", JSON.stringify(listaUsuarios));

    // Avisar y limpiar
    alert("Cuenta creada correctamente ✅");
    formRegistro.reset();
    window.location.href = "../index.html";
  });

});
