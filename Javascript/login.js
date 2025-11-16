// login.js - Validación simple contra usuarios del localStorage

document.addEventListener("DOMContentLoaded", function () {

  const formLogin = document.getElementById("formLogin");

  if (!formLogin) {
    console.error("No se encontró el formulario (id=formLogin).");
    return;
  }

  formLogin.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const usuarioIngresado = document.getElementById("loginUsuario").value.trim();
    const passwordIngresado = document.getElementById("loginPassword").value;

    if (usuarioIngresado === "" || passwordIngresado === "") {
      alert("Completá usuario y contraseña.");
      return;
    }

    let listaUsuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const usuarioEncontrado = listaUsuarios.find(function (u) {
      return u.usuario === usuarioIngresado && u.password === passwordIngresado;
    });

    if (!usuarioEncontrado) {
      alert("Usuario o contraseña incorrectos.");
      return;
    }

    localStorage.setItem("usuarioActivo", JSON.stringify(usuarioEncontrado));

    window.location.href = "Inicio.html";
  });

});
