// registrase.js - guardar usuario en localStorage con validación

document.addEventListener("DOMContentLoaded", function () {

  const formRegistro = document.getElementById("formRegistro");

  if (!formRegistro) {
    console.error("No se encontró el formulario de registro");
    return;
  }

  formRegistro.addEventListener("submit", function (evento) {
    evento.preventDefault();

    // Capturamos los valores del formulario
    const usuario = document.getElementById("registroUsuario").value.trim();
    const email = document.getElementById("registroEmail").value.trim();
    const password = document.getElementById("registroPassword").value;
    const password2 = document.getElementById("registroPassword2").value;
    const metodo = document.getElementById("metodo").value;

    // Validación de contraseñas
    if (password !== password2) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    // Leer lista de usuarios guardados
    let listaUsuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // *** VALIDACIÓN: usuario o email ya usados ***
    const existeUsuario = listaUsuarios.some(u => u.usuario === usuario);
    const existeEmail = listaUsuarios.some(u => u.email === email);

    if (existeUsuario) {
      alert("El nombre de usuario ya está en uso. Elegí uno diferente.");
      return;
    }

    if (existeEmail) {
      alert("El email ya está registrado.");
      return;
    }

    // Creamos el nuevo usuario
    const nuevoUsuario = {
      usuario: usuario,
      email: email,
      password: password,
      metodo: metodo,
      cursos: []   // para guardar cursos más adelante
    };

    // Agregamos el usuario a la lista
    listaUsuarios.push(nuevoUsuario);

    // Guardamos en localStorage
    localStorage.setItem("usuarios", JSON.stringify(listaUsuarios));

    alert("Cuenta creada correctamente ✅");
    formRegistro.reset();
    window.location.href = "../index.html";

  });
});