
import { getCourseById, ProfileService } from "./cart.js";

document.addEventListener("DOMContentLoaded", () => {

  const usuarioActivoStr = localStorage.getItem("usuarioActivo");

  if (!usuarioActivoStr) {
    // Si no hay usuario logueado, mandamos al login
    window.location.href = "VistaLogin.html";
    return;
  }

  let userLogin;
  try {
    userLogin = JSON.parse(usuarioActivoStr);
  } catch (e) {
    console.error("Error al parsear usuarioActivo:", e);
    window.location.href = "VistaLogin.html";
    return;
  }

  // Rellenar datos básicos del perfil
  const perfilUsuario = document.getElementById("perfilUsuario");
  const perfilEmail   = document.getElementById("perfilEmail");
  const perfilMetodo  = document.getElementById("perfilMetodoTexto");

  if (perfilUsuario) {
    perfilUsuario.textContent = userLogin.usuario || userLogin.name || "Usuario";
  }

  if (perfilEmail) {
    perfilEmail.textContent = userLogin.email || "usuario@mail.com";
  }

  if (perfilMetodo) {
    perfilMetodo.textContent = userLogin.metodo || "Método de registro";
  }


  const profileData = ProfileService.getUser();
  const purchased   = Array.isArray(profileData.purchasedCourses)
    ? profileData.purchasedCourses
    : [];
  const liked       = Array.isArray(profileData.likedCourses)
    ? profileData.likedCourses
    : [];


  const inscriptosContainer = document.getElementById("cursosInscriptos");

  if (inscriptosContainer) {
    inscriptosContainer.innerHTML = "";

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

  const likedContainer = document.getElementById("cursosGustados");

  if (likedContainer) {
    likedContainer.innerHTML = "";

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

  const btnDeleteAccount = document.getElementById("btnDeleteAccount");

  if (btnDeleteAccount) {
    btnDeleteAccount.addEventListener("click", () => {
      const confirmar = confirm(
        "¿Seguro que querés eliminar tu cuenta? Esta acción no se puede deshacer."
      );

      if (!confirmar) return;


      try {
        const usuariosStr = localStorage.getItem("usuarios");
        if (usuariosStr) {
          const lista = JSON.parse(usuariosStr);
          const nuevaLista = Array.isArray(lista)
            ? lista.filter((u) => {
                const mismoEmail   = u.email === userLogin.email;
                const mismoUsuario = u.usuario === (userLogin.usuario || userLogin.name);
                return !(mismoEmail || mismoUsuario);
              })
            : [];
          localStorage.setItem("usuarios", JSON.stringify(nuevaLista));
        }
      } catch (err) {
        console.error("Error al actualizar 'usuarios' en localStorage:", err);
      }


      localStorage.removeItem("likedCourses");
      localStorage.removeItem("purchasedCourses");

      localStorage.removeItem("usuarioActivo");

      alert("Tu cuenta fue eliminada correctamente.");
      window.location.href = "Inicio.html";
    });
  }
});
