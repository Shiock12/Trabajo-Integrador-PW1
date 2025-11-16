// login.js - Validación simple contra usuarios del localStorage

document.addEventListener("DOMContentLoaded", function () {

  // 1) Capturamos el formulario
  const formLogin = document.getElementById("formLogin");

  if (!formLogin) {
    console.error("No se encontró el formulario (id=formLogin).");
    return;
  }

  // 2) Escuchar el click en "Iniciar sesión"
  formLogin.addEventListener("submit", function (evento) {
    evento.preventDefault(); // evita recargar la página

    // 3) Capturamos los valores escritos por el usuario
    const usuarioIngresado = document.getElementById("loginUsuario").value.trim();
    const passwordIngresado = document.getElementById("loginPassword").value;

    if (usuarioIngresado === "" || passwordIngresado === "") {
      alert("Completá usuario y contraseña.");
      return;
    }

    // 4) Leemos la lista de usuarios guardados
    let listaUsuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // 5) Buscamos un usuario que coincida con lo ingresado
    const usuarioEncontrado = listaUsuarios.find(function (u) {
      return u.usuario === usuarioIngresado && u.password === passwordIngresado;
    });

    // 6) Si no existe → error
    if (!usuarioEncontrado) {
      alert("Usuario o contraseña incorrectos.");
      return;
    }

    // 7) Si coincide → guardamos el usuario activo
    localStorage.setItem("usuarioActivo", JSON.stringify(usuarioEncontrado));

    // 8) Redirigimos a la página principal
    window.location.href = "Inicio.html";  // Cambiá si querés ir a otra página
  });

});
