

import { getCourses, getCourseById, addCourseToCart, isCourseInCart } from './cart.js';


function updateSearchSuggestions(query) {
    const datalist = document.getElementById('lista-cursos');
    if (!datalist) return;

    const courses = getCourses(); 
    const filteredCourses = courses.filter(course =>
        course.title.toLowerCase().includes(query.toLowerCase())
    );

 
    datalist.innerHTML = '';

 
    filteredCourses.forEach(course => {
        const option = document.createElement('option');
        option.value = course.title;
        option.dataset.courseId = course.id; 
        datalist.appendChild(option);
    });
}


function initSearch() {
    const searchInput = document.getElementById('buscar');
    if (!searchInput) return;

    searchInput.addEventListener('input', (event) => {
        const query = event.target.value; 
        updateSearchSuggestions(query); 
    });

 
    searchInput.addEventListener('change', (event) => {
        const selectedCourseTitle = event.target.value; 


        const courses = getCourses();
        const selectedCourse = courses.find(course => course.title.toLowerCase() === selectedCourseTitle.toLowerCase());

        if (selectedCourse) {

            window.location.href = `./detalleCursos.html?id=${selectedCourse.id}`;
        }
    });
}


function renderCourseContents(contentsData) {
    const container = document.querySelector('.contenidos');
    if (!container || !contentsData || contentsData.length === 0) return;

    container.innerHTML = '<h2>CONTENIDOS POR CLASE</h2>';

    let fullHTML = '';
    contentsData.forEach((module, moduleIndex) => {
        let listItems = '';
        module.items.forEach((item, itemIndex) => {
            const radioId = `lesson-${moduleIndex}-${itemIndex}`; 
            listItems += `
                <li>
                    <span class="icono"><i class='bx ${item.icon || 'bx-book'}'></i></span>
                    <div class="info">
                        <span class="titulo">${item.title}</span>
                        <span class="duracion">${item.duration}</span>
                    </div>
                    <input type="radio" name="clase-actual" id="${radioId}">
                    <label for="${radioId}"></label>
                </li>
            `;
        });

        fullHTML += `
            <details>
                <summary>${module.title}</summary>
                <ul>${listItems}</ul>
            </details>
        `;
    });

    container.innerHTML += fullHTML;
    setupModalAndAccordion();
}

// Función para crear las tarjetas de cursos relacionados
function createRelatedCourseCard(course) {
    const valorFormateado = `$${course.valor.toLocaleString('es-AR')}`;
    const detailPageURL = `./detalleCursos.html?id=${course.id}`;

    return `
        <div class="curso-card">
            <div class="imagen">
                <img src="${course.imageURL || './../Images/default_course.jpg'}" alt="Imagen curso ${course.title}">
                <p class="valor"><strong>${valorFormateado}</strong></p>
            </div>
            <p><strong>${course.dedicacion || 'N/A'}</strong></p>
            <p>${course.title}</p>
            <a href="${detailPageURL}">Ver detalles</a>
            <button class="add-to-cart-related" data-course-id="${course.id}">Comprar</button>
        </div>
    `;
}

// Función para renderizar los cursos relacionados
function renderRelatedCourses(currentCourseId) {
    const allCourses = getCourses();
    const filteredCourses = allCourses.filter(course => course.id !== currentCourseId);

    const numToSelect = Math.min(4, filteredCourses.length);
    const shuffled = filteredCourses.sort(() => 0.5 - Math.random());
    const relatedCourses = shuffled.slice(0, numToSelect);

    const container = document.getElementById('cursos-relacionados-container');
    if (!container) return;

    container.innerHTML = '<h2>Otros Cursos Destacados</h2>';
    const cardsWrapper = document.createElement('div');
    cardsWrapper.className = 'cards-wrapper';

    relatedCourses.forEach(course => {
        cardsWrapper.innerHTML += createRelatedCourseCard(course);
    });
    container.appendChild(cardsWrapper);

    const relatedButtons = cardsWrapper.querySelectorAll('.add-to-cart-related');
    relatedButtons.forEach(button => {
        const courseId = button.dataset.courseId;
        const courseToAdd = getCourseById(courseId);

        if (isCourseInCart(courseId)) {
            button.textContent = '¡Ya Agregado!';
            button.disabled = true;
        }

        button.addEventListener('click', (event) => {
            if (courseToAdd && !isCourseInCart(courseId)) {
                addCourseToCart(courseToAdd);
                showConfirmationModal(courseToAdd);
                event.target.textContent = '¡Agregado!';
                event.target.disabled = true;
            }
        });
    });
}

// Función para mostrar el modal de confirmación
export function showConfirmationModal(cursoData) {
    const modal = document.getElementById('miModal');
    if (!modal) return;

    const modalidad = cursoData.modalidad.toLowerCase();
    const mensaje = (modalidad.includes('online') || modalidad === 'online')
        ? "Tu compra fue procesada con éxito. ¡Ya puedes acceder al contenido!"
        : "Tu inscripción fue procesada con éxito. ¡Revisa tu correo para confirmar los detalles!";

    document.getElementById('modal-titulo').textContent = '¡Inscripción completada! 🎉';
    document.getElementById('modal-mensaje').textContent = mensaje;
    document.getElementById('resumen-curso-nombre').textContent = cursoData.title;
    document.getElementById('resumen-curso-valor').textContent =
        `$${(cursoData.valor * (cursoData.cantidad || 1)).toLocaleString('es-AR')}`;
    document.getElementById('resumen-curso-tipo').textContent = cursoData.modalidad;

    modal.style.display = 'block';
}

// Función para configurar la inscripción al curso
function setupEnrollment(cursoData) {
    const btnInscripcion = document.getElementById('btn-inscripcion');
    if (!btnInscripcion) return;

    if (isCourseInCart(cursoData.id)) {
        btnInscripcion.textContent = '¡Ya Agregado!';
        btnInscripcion.disabled = true;
        return;
    }

    btnInscripcion.addEventListener('click', () => {
        addCourseToCart(cursoData);
        btnInscripcion.textContent = '¡Ya Agregado!';
        btnInscripcion.disabled = true;
        showConfirmationModal(cursoData);
    });
}

// Función para configurar el modal y el acordeón
function setupModalAndAccordion() {
    const modal = document.getElementById('miModal');
    const cerrarModalSpan = document.querySelector('.cerrar-modal');
    const btnCerrarModal = document.getElementById('btn-cerrar-modal');

    const cerrarModal = () => { if(modal) modal.style.display = "none"; };
    if (cerrarModalSpan) cerrarModalSpan.addEventListener('click', cerrarModal);
    if (btnCerrarModal) btnCerrarModal.addEventListener('click', cerrarModal);
    window.addEventListener('click', (event) => { if (event.target === modal) cerrarModal(); });

    const detailsElements = document.querySelectorAll('.contenidos details');
    detailsElements.forEach((detail) => {
        detail.addEventListener('toggle', () => {
            if (detail.open) {
                detailsElements.forEach((otherDetail) => { if (otherDetail !== detail && otherDetail.open) otherDetail.open = false; });
            }
        });
    });
}

// Función principal para inicializar el curso
export function initDetalleCurso() {
    const urlParams = new URLSearchParams(window.location.search);
    const cursoId = urlParams.get('id');
    const cursoData = getCourseById(cursoId);

    if (!cursoData) {
        const mainElement = document.querySelector('main');
        if (mainElement) {
            mainElement.innerHTML = '<h1>❌ Curso no encontrado.</h1><p>Verifique el enlace o regrese al calendario.</p>';
        }
        return null;
    }

    const courseImageElement = document.getElementById('course-image');
    if (courseImageElement && cursoData.imageURL) {
        courseImageElement.src = cursoData.imageURL;
        courseImageElement.alt = `Imagen para ${cursoData.title}`;
    }

    document.querySelector('.curso-detalles h1').textContent = cursoData.title;

    const valorFormateado = `$${cursoData.valor.toLocaleString('es-AR')}`;
    document.querySelector('.curso-detalles p:nth-child(2)').innerHTML = `<strong>Valor:</strong> ${valorFormateado}`;
    document.querySelector('.curso-detalles p:nth-child(3)').innerHTML = `<strong>Tiempo de dedicación necesario:</strong> ${cursoData.dedicacion || 'No especificado'}`;
    document.querySelector('.curso-detalles p:nth-child(4)').innerHTML = `<strong>Descripción:</strong> ${cursoData.description}`;
    document.querySelector('.curso-detalles p:nth-child(5)').innerHTML = `<strong>Requisitos Previos:</strong> ${cursoData.requisitos || 'No especificados'}`;

    renderCourseContents(cursoData.contents);
    renderRelatedCourses(cursoData.id);
    setupEnrollment(cursoData);
    setupModalAndAccordion();

    return cursoData;
}

// Inicializa la búsqueda de cursos cuando el DOM se carga
document.addEventListener('DOMContentLoaded', () => {
    initSearch(); // Inicializa la lógica de la barra de búsqueda
});



