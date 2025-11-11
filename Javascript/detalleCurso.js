
import { getCourses, getCourseById, addCourseToCart, isCourseInCart } from './cart.js';





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
                <ul>
                    ${listItems}
                </ul>
            </details>
        `;
    });

    container.innerHTML += fullHTML;

    setupModalAndAccordion();
}


/**
 * Genera el HTML de una tarjeta de curso relacionado
 * @param {Object} course 
 */
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

/**
 * @param {string} currentCourseId
 */
function renderRelatedCourses(currentCourseId) {
    const allCourses = getCourses();
    const filteredCourses = allCourses.filter(course => course.id !== currentCourseId);


    let relatedCourses = [];
    const numToSelect = Math.min(4, filteredCourses.length);
    const shuffled = filteredCourses.sort(() => 0.5 - Math.random());
    relatedCourses = shuffled.slice(0, numToSelect);

    const container = document.getElementById('cursos-relacionados-container');
    if (container) {
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
}





/**
 
 * @param {Object} cursoData 
 */
function showConfirmationModal(cursoData) {
    const modal = document.getElementById('miModal');
    if (!modal) return;

    const nombreCurso = cursoData.title;

    const valorFormateado = `$${cursoData.valor.toLocaleString('es-AR')}`;
    const modalidad = cursoData.modalidad.toLowerCase();


    const mensaje = (modalidad.includes('online') || modalidad === 'online')
        ? "Tu **compra** fue procesada con éxito. ¡Ya puedes acceder al contenido!"
        : "Tu **inscripción** fue procesada con éxito. ¡Revisa tu correo para confirmar los detalles!";


    document.getElementById('modal-titulo').innerHTML = `¡Felicidades! 🎉`;
    document.getElementById('modal-mensaje').innerHTML = mensaje;
    document.getElementById('resumen-curso-nombre').textContent = nombreCurso;
    document.getElementById('resumen-curso-tipo').textContent = modalidad.charAt(0).toUpperCase() + modalidad.slice(1);
    document.getElementById('resumen-curso-valor').textContent = valorFormateado;


    modal.style.display = "block";
}



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


function setupModalAndAccordion() {
    const modal = document.getElementById('miModal');
    const cerrarModalSpan = document.querySelector('.cerrar-modal');
    const btnCerrarModal = document.getElementById('btn-cerrar-modal');


    const cerrarModal = () => { if (modal) modal.style.display = "none"; };
    if (cerrarModalSpan) cerrarModalSpan.addEventListener('click', cerrarModal);
    if (btnCerrarModal) btnCerrarModal.addEventListener('click', cerrarModal);
    window.addEventListener('click', (event) => {
        if (event.target === modal) cerrarModal();
    });


    const detailsElements = document.querySelectorAll('.contenidos details');

    detailsElements.forEach((detail) => {
        detail.addEventListener('toggle', () => {

            if (detail.open) {

                detailsElements.forEach((otherDetail) => {

                    if (otherDetail !== detail && otherDetail.open) {
                        otherDetail.open = false;
                    }
                });
            }
        });
    });
}





export function initDetalleCurso() {
    const urlParams = new URLSearchParams(window.location.search);
    const cursoId = urlParams.get('id');
    const cursoData = getCourseById(cursoId);

    if (cursoData) {
        // Rellenado de la imagen
        const courseImageElement = document.getElementById('course-image');
        if (courseImageElement && cursoData.imageURL) {
            courseImageElement.src = cursoData.imageURL;
            courseImageElement.alt = `Imagen para ${cursoData.title}`;
        }

        // Rellenar elementos del HTML con la data
        document.querySelector('.curso-detalles h1').textContent = cursoData.title;

        const valorFormateado = `$${cursoData.valor.toLocaleString('es-AR')}`;

        // Rellenado de datos (Asegúrate que el orden de los p:nth-child sea correcto en tu HTML)
        document.querySelector('.curso-detalles p:nth-child(2)').innerHTML = `<strong>Valor:</strong> ${valorFormateado}`;
        document.querySelector('.curso-detalles p:nth-child(3)').innerHTML = `<strong>Tiempo de dedicación necesario:</strong> ${cursoData.dedicacion || 'No especificado'}`;
        document.querySelector('.curso-detalles p:nth-child(4)').innerHTML = `<strong>Descripción:</strong> ${cursoData.description}`;
        document.querySelector('.curso-detalles p:nth-child(5)').innerHTML = `<strong>Requisitos Previos:</strong> ${cursoData.requisitos || 'No especificados'}`;


        const inputNombre = document.getElementById('curso-nombre');
        const inputValor = document.getElementById('curso-valor');
        const inputModalidad = document.getElementById('curso-modalidad');
        const btnInscripcion = document.getElementById('btn-inscripcion');

        if (inputNombre) inputNombre.value = cursoData.title;
        if (inputValor) inputValor.value = valorFormateado;
        if (inputModalidad) inputModalidad.value = cursoData.modalidad;

        // Configurar el texto del botón (COMPRAR/INSCRIBIRSE)
        if (btnInscripcion) {
            const modalidad = cursoData.modalidad.toLowerCase();
            btnInscripcion.textContent = (modalidad === 'online') ? 'COMPRAR' : 'INSCRIBIRSE';
        }


        renderCourseContents(cursoData.contents);


        renderRelatedCourses(cursoData.id);


        setupEnrollment(cursoData);

        // 4. Inicializar el Modal (cierre) y Acordeón
        setupModalAndAccordion();

    } else {
        // Manejamos ID no válido
        const mainElement = document.querySelector('main');
        if (mainElement) {
            mainElement.innerHTML = '<h1>❌ Curso no encontrado.</h1><p>Verifique el enlace o regrese a la vista del calendario.</p>';
        }
    }
}