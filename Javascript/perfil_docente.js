
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
