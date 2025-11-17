// perfil.js - usa localStorage.usuarioActivo y getCourseById

import { getCourseById } from './cart.js';

document.addEventListener("DOMContentLoaded", () => {

  // 1) Obtener usuario activo desde localStorage
  const usuarioActivoStr = localStorage.getItem("usuarioActivo");

  if (!usuarioActivoStr) {
    // Si no hay usuario logueado, mandamos al login (o donde quieras)
    window.location.href = "VistaLogin.html";
    return;
  }

  let user;
  try {
    user = JSON.parse(usuarioActivoStr);
  } catch (e) {
    console.error("Error al parsear usuarioActivo:", e);
    window.location.href = "VistaLogin.html";
    return;
  }

  // 2) Mostrar nombre y mail en el perfil
  const perfilUsuario = document.getElementById("perfilUsuario");
  const perfilEmail   = document.getElementById("perfilEmail");
  const perfilMetodo  = document.getElementById("perfilMetodoTexto");

  if (perfilUsuario) {
    // Probar distintas propiedades por si el objeto viene con otro nombre
    perfilUsuario.textContent = user.usuario || user.name || "Usuario";
  }

  if (perfilEmail) {
    perfilEmail.textContent = user.email || "usuario@mail.com";
  }

  if (perfilMetodo) {
    // Si en el usuario guardaste el método de pago/registro
    perfilMetodo.textContent = user.metodo || "Método de registro";
  }

  // 3) Cursos inscriptos (comprados)
  const inscriptosContainer = document.getElementById("cursosInscriptos");
  if (inscriptosContainer) {
    inscriptosContainer.innerHTML = "";

    const purchased = Array.isArray(user.purchasedCourses)
      ? user.purchasedCourses
      : (Array.isArray(user.cursos) ? user.cursos : []); // fallback

    if (purchased.length === 0) {
      inscriptosContainer.innerHTML = "<p>No has comprado ningún curso aún.</p>";
    } else {
      purchased.forEach((id) => {
        const course = getCourseById(id);
        if (!course) return;

        inscriptosContainer.innerHTML += `
          <article class="curso-item">
            <img src="${course.imageURL}" alt="${course.title}">
            <div>
              <div class="title">${course.title}</div>
              <div class="meta">${course.dedicacion || ""}</div>
            </div>
            <a href="detalleCursos.html?id=${course.id}" class="btn">Ir al curso</a>
          </article>
        `;
      });
    }
  }

  // 4) Cursos que me gustaron (segunda card.listado)
  const segundaCard = document.querySelector(".perfil-grid .card.listado:nth-of-type(2)");
  let likedContainer = null;

  if (segundaCard) {
    likedContainer = document.createElement("div");
    likedContainer.id = "cursosGustados";
    segundaCard.appendChild(likedContainer);
  }

  if (likedContainer) {
    likedContainer.innerHTML = "";

    const liked = Array.isArray(user.likedCourses) ? user.likedCourses : [];

    if (liked.length === 0) {
      likedContainer.innerHTML = "<p>No tienes cursos en favoritos.</p>";
    } else {
      liked.forEach((id) => {
        const course = getCourseById(id);
        if (!course) return;

        likedContainer.innerHTML += `
          <article class="curso-item">
            <img src="${course.imageURL}" alt="${course.title}">
            <div>
              <div class="title">${course.title}</div>
              <div class="meta">${course.dedicacion || ""}</div>
            </div>
            <a href="detalleCursos.html?id=${course.id}" class="btn">Ver detalle</a>
          </article>
        `;
      });
    }
  }

  // 5) Eliminar cuenta
  const btnDeleteAccount = document.getElementById("btnDeleteAccount");

  if (btnDeleteAccount) {
    btnDeleteAccount.addEventListener("click", () => {

      const confirmar = confirm("¿Seguro que querés eliminar tu cuenta? Esta acción no se puede deshacer.");

      if (!confirmar) return;

      // a) Eliminar de la lista "usuarios" (si la usás)
      try {
        const usuariosStr = localStorage.getItem("usuarios");
        if (usuariosStr) {
          const lista = JSON.parse(usuariosStr);
          const nuevaLista = Array.isArray(lista)
            ? lista.filter((u) => {
                const mismoEmail   = u.email === user.email;
                const mismoUsuario = u.usuario === (user.usuario || user.name);
                return !(mismoEmail || mismoUsuario);
              })
            : [];
          localStorage.setItem("usuarios", JSON.stringify(nuevaLista));
        }
      } catch (err) {
        console.error("Error al actualizar 'usuarios' en localStorage:", err);
      }

      // b) Eliminar usuarioActivo
      localStorage.removeItem("usuarioActivo");

      alert("Tu cuenta fue eliminada correctamente.");
      window.location.href = "Inicio.html";
    });
  }
});
