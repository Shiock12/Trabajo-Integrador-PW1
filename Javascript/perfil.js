// perfil.js - Manejo del usuario activo, logout y eliminación de cuenta

document.addEventListener("DOMContentLoaded", function () {

  // 1) Capturamos los elementos del DOM
  const perfilUsuario = document.getElementById("perfilUsuario");
  const perfilEmail = document.getElementById("perfilEmail");
  const perfilMetodoTexto = document.getElementById("perfilMetodoTexto");

  const btnLogout = document.getElementById("btnLogout");
  const btnDelete = document.getElementById("btnDeleteAccount");

  // 2) Leemos el usuario activo desde localStorage
  const usuarioActivoJSON = localStorage.getItem("usuarioActivo");

  if (!usuarioActivoJSON) {
    // Si no hay usuario logueado, lo mandamos al login
    window.location.href = "VistaLogin.html";
    return;
  }

  const usuarioActivo = JSON.parse(usuarioActivoJSON);

  // 3) MOSTRAR DATOS EN PANTALLA
  perfilUsuario.textContent = usuarioActivo.usuario;
  perfilEmail.textContent = usuarioActivo.email;
  perfilMetodoTexto.textContent = usuarioActivo.metodo;

  // 4) CERRAR SESIÓN
  btnLogout.addEventListener("click", function () {
    localStorage.removeItem("usuarioActivo");
    window.location.href = "../index.html"; // Cambiá si querés otro destino
  });

  // 5) ELIMINAR CUENTA
  btnDelete.addEventListener("click", function () {

    const confirmar = confirm("¿Seguro que querés eliminar tu cuenta?");

    if (!confirmar) return;

    // Traemos la lista de todos los usuarios
    let listaUsuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Filtramos para eliminar al usuario activo
    const nuevaLista = listaUsuarios.filter(function (u) {
      return u.usuario !== usuarioActivo.usuario;
    });

    // Guardamos la nueva lista
    localStorage.setItem("usuarios", JSON.stringify(nuevaLista));

    // Quitamos usuario activo
    localStorage.removeItem("usuarioActivo");

    alert("Tu cuenta fue eliminada correctamente.");
    window.location.href = "../index.html";
  });

  // 6) MOSTRAR CURSOS INSCRIPTOS (si los hay)
  // Lugar donde vamos a insertar la lista de cursos
  const cursosTitulo = document.createElement("h2");
  cursosTitulo.textContent = "Cursos inscriptos";
  cursosTitulo.style.marginTop = "30px";

  const listaCursos = document.createElement("ul");
  listaCursos.style.marginTop = "10px";

  document.querySelector(".card").appendChild(cursosTitulo);
  document.querySelector(".card").appendChild(listaCursos);

  // Si tiene cursos, los mostramos
  if (Array.isArray(usuarioActivo.cursos) && usuarioActivo.cursos.length > 0) {
    usuarioActivo.cursos.forEach(function (curso) {
      const li = document.createElement("li");
      li.textContent = curso;
      listaCursos.appendChild(li);
    });
  } else {
    const li = document.createElement("li");
    li.textContent = "Todavía no estás inscripto en ningún curso.";
    listaCursos.appendChild(li);
  }

});
