// Simulación de datos de otros docentes
const otrosDocentes = [
    {
        nombre: "Ana Rodríguez",
        titulo: "Experta en Marketing Digital",
        imagen: "./../Images/myAvatar_PerfilF.png", // Asegúrate de tener estas imágenes
        rating: 4.8
    },
    {
        nombre: "Carlos Gutiérrez",
        titulo: "Desarrollador Web Avanzado",
        imagen: "./../Images/myAvatar_Perfil.png",
        rating: 5.0
    },
    {
        nombre: "Sofía Vargas",
        titulo: "Especialista en UX/UI",
        imagen: "./../Images/myAvatar_PerfilF.png",
        rating: 4.7
    },
    {
        nombre: "Luis Gómez",
        titulo: "Analista de Datos",
        imagen: "./../Images/myAvatar_Perfil.png",
        rating: 4.9
    }
    // Añade más datos aquí si lo deseas
];

export function renderDocentesRelacionados() {
    // 1. Obtener el contenedor donde inyectaremos las tarjetas
    const wrapper = document.querySelector('.docentes-cards-wrapper');
    
    // Si el contenedor no existe, detenemos la función
    if (!wrapper) return;

    // 2. Iterar sobre la lista de docentes
    otrosDocentes.forEach(docente => {
        // Crear el elemento tarjeta
        const card = document.createElement('div');
        card.classList.add('docente-card');

        // Función para renderizar las estrellas
        const estrellas = '⭐'.repeat(Math.round(docente.rating));

        // Insertar el HTML de la tarjeta
        card.innerHTML = `
            <div class="docente-foto-peque">
                <img src="${docente.imagen}" alt="Foto de ${docente.nombre}">
            </div>
            <h4>${docente.nombre}</h4>
            <p class="docente-titulo">${docente.titulo}</p>
            <p class="docente-rating-peque">${estrellas} (${docente.rating})</p>
            <button>Ver Perfil</button>
        `;

        // 3. Agregar la tarjeta al wrapper
        wrapper.appendChild(card);
    });
}

// Ejecutar la función cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', renderDocentesRelacionados);