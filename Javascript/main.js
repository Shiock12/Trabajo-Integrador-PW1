import { initCart } from './../Javascript/cart.js';
import { initCalendar } from './../Javascript/vistaCalendario.js';
import { initDetalleCurso } from './../Javascript/detalleCurso.js';
import { renderDocentesRelacionados } from './../Javascript/otrosDocentes.js';

document.addEventListener('DOMContentLoaded', () => {
    initCart();
    const path = window.location.pathname;
    const calendarGrid = document.getElementById('calendar-grid');
    const cursoDetallesSection = document.querySelector('.curso-detalles');
    

    if (calendarGrid) {
     
        initCalendar();
    } else if (cursoDetallesSection) {
     
        const cursoData = initDetalleCurso(); 
        if (cursoData) {
            renderDocentesRelacionados(); 
            initCarruselHover();        
           
        }
    }
});

function initCarruselHover() {
    const wrapper = document.querySelector('.docentes-cards-wrapper');
    if (!wrapper) return;

    let scrollInterval;
    const scrollSpeed = 1;
    const scrollDelay = 15;

    const startScroll = () => {
        clearInterval(scrollInterval);
        scrollInterval = setInterval(() => {
            wrapper.scrollLeft += scrollSpeed;

            // Efecto loop
            if (wrapper.scrollLeft >= wrapper.scrollWidth - wrapper.clientWidth) {
                wrapper.scrollLeft = 0;
            }
        }, scrollDelay);
    };

    const stopScroll = () => {
        clearInterval(scrollInterval);
    };

    wrapper.addEventListener('mouseenter', startScroll);
    wrapper.addEventListener('mouseleave', stopScroll);
}

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
