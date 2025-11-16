import { getUsuarioActivo, logoutUsuario} from "./auth.js";
// Simulación de datos de otros docentes
const otrosDocentes = [
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
    }

];

export function renderDocentesRelacionados() {

    const wrapper = document.querySelector('.docentes-cards-wrapper');
    

    if (!wrapper) return;


    otrosDocentes.forEach(docente => {

        const card = document.createElement('div');
        card.classList.add('docente-card');

        const estrellas = '⭐'.repeat(Math.round(docente.rating));


        card.innerHTML = `
            <div class="docente-foto-peque">
                <img src="${docente.imagen}" alt="Foto de ${docente.nombre}">
            </div>
            <h4>${docente.nombre}</h4>
            <p class="docente-titulo">${docente.titulo}</p>
            <p class="docente-rating-peque">${estrellas} (${docente.rating})</p>
                        <a href="perfil_docente.html?id=${docente.id}">
                <button>Ver Perfil</button>
            </a>
            
        `;

        
        wrapper.appendChild(card);
    });
}


document.addEventListener('DOMContentLoaded', renderDocentesRelacionados);

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
