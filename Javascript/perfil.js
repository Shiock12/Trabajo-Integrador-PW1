import { getCourseById, ProfileService } from './cart.js';


const user = ProfileService.getUser();


const inscriptosContainer = document.querySelector('.card.listado:nth-of-type(1)');
inscriptosContainer.innerHTML = '';  
if (user.purchasedCourses.length === 0) {
    inscriptosContainer.innerHTML = '<p>No has comprado ningún curso aún.</p>';
} else {
    user.purchasedCourses.forEach(id => {
        const course = getCourseById(id);
        if (course) {
            inscriptosContainer.innerHTML += `
            <article class="curso-item">
                <img src="${course.imageURL}" alt="${course.title}">
                <div>
                    <div class="title">${course.title}</div>
                    <div class="meta">${course.dedicacion}</div>
                </div>
                <a href="detalleCursos.html?id=${course.id}" class="btn">Ir al curso</a>
            </article>`;
        }
    });
}


const likedContainer = document.querySelector('.card.listado:nth-of-type(2)');
likedContainer.innerHTML = '';  
if (user.likedCourses.length === 0) {
    likedContainer.innerHTML = '<p>No tienes cursos en favoritos.</p>';
} else {
    user.likedCourses.forEach(id => {
        const course = getCourseById(id);
        if (course) {
            likedContainer.innerHTML += `
            <article class="curso-item">
                <img src="${course.imageURL}" alt="${course.title}">
                <div>
                    <div class="title">${course.title}</div>
                    <div class="meta">${course.dedicacion}</div>
                </div>
                <a href="detalleCursos.html?id=${course.id}" class="btn">Ver detalle</a>
            </article>`;
        }
    });
}


