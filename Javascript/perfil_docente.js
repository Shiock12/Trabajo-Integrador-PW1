import { getUsuarioActivo, logoutUsuario} from "./auth.js";

// Simulación de los datos de los docentes
const docentes = [
    {
        id: 1,
        nombre: "Ana Rodríguez",
        titulo: "Experta en Marketing Digital",
        imagen: "./../Images/myAvatar_PerfilF.png", 
        rating: 4.8
    },
    {
        id: 2,
        nombre: "Carlos Gutiérrez",
        titulo: "Desarrollador Web Avanzado",
        imagen: "./../Images/myAvatar_Perfil.png",
        rating: 5.0
    },
    {
        id: 3,
        nombre: "Sofía Vargas",
        titulo: "Especialista en UX/UI",
        imagen: "./../Images/myAvatar_PerfilF.png",
        rating: 4.7
    },
    {
        id: 4,
        nombre: "Luis Gómez",
        titulo: "Analista de Datos",
        imagen: "./../Images/myAvatar_Perfil.png",
        rating: 4.9
    },

        {
        id: 5,
        nombre: "Martín Herrera",
        titulo: "Especialista en Ciberseguridad",
        imagen: "./../Images/myAvatar_Perfil.png", 
        rating: 4.9
    },

        {
        id: 6,
        nombre: "Laura Fernández",
        titulo: "Manager de Proyectos Ágiles",
        imagen: "./../Images/myAvatar_PerfilF.png",
        rating: 4.8
    },

        {
        id: 7,
        nombre: "Javier Torres",
        titulo: "Arquitecto Cloud (AWS)",
        imagen: "./../Images/myAvatar_Perfil.png",
        rating: 4.6
    },

        {
        id: 8,
        nombre: "Valentina Díaz",
        titulo: "Diseñadora Gráfica Senior",
        imagen: "./../Images/myAvatar_PerfilF.png",
        rating: 5.0
    }


];


function mostrarPerfilDocente() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = parseInt(urlParams.get('id'));

   
    const docente = docentes.find(docentes => docentes.id === id);

    if (docente) {
        document.getElementById('perfil-img').src = docente.imagen;
        document.getElementById('nombre-docente').textContent = docente.nombre;
        document.getElementById('titulo-docente').textContent = docente.titulo;
        document.getElementById('rating-docente').textContent = `Rating: ${'⭐'.repeat(Math.round(docente.rating))} (${docente.rating})`;
    } else {
        alert('Docente no encontrado');
    }
}


function volverAtras() {
    window.history.back();
}


document.addEventListener('DOMContentLoaded', () => {
    mostrarPerfilDocente();

    
    const btnVolver = document.getElementById('btn-volver');
    if (btnVolver) {
        btnVolver.addEventListener('click', volverAtras);
    }
});

/* ---------------- NAVBAR ---------------- */
document.addEventListener("DOMContentLoaded", () => {
  const usuario = getUsuarioActivo(); 
  const linkPerfil = document.querySelector("[data-usuario-nombre]");

  const cajaInvitado = document.querySelector("[data-seccion-invitado]");
  const cajaLogueado = document.querySelector("[data-seccion-logueado]");
  const btnLogout    = document.querySelector("[data-btn-logout]");

  if (usuario) {
    // ✅ Usuario logueado
    if (cajaInvitado) cajaInvitado.style.display = "none";
    if (cajaLogueado) cajaLogueado.style.display = "flex";
    if (linkPerfil)   linkPerfil.textContent = "Perfil" || "Usuario";
  } else {
    // 🚫 Nadie logueado
    if (cajaInvitado) cajaInvitado.style.display = "flex";
    if (cajaLogueado) cajaLogueado.style.display = "none";
  }

  if (btnLogout) {
    btnLogout.addEventListener("click", () => {
      logoutUsuario();
      window.location.href = "Inicio.html"; 
    });
  }
});
