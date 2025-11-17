import {
    getCourses,
    getCourseById,
    addCourseToCart,
    isCourseInCart,
    isCoursePurchased,
    isCourseLiked,
    likeCourse,
    unlikeCourse,
    showConfirmationModal
} from './cart.js';

import { renderDocentesRelacionados } from './otrosDocentes.js';




let paginaCursoData = null;

/* --------------------------- BUSCADOR DE CURSOS --------------------------- */
function updateSearchSuggestions(query) {
    const datalist = document.getElementById('lista-cursos');
    if (!datalist) return;

    const filteredCourses = getCourses().filter(course =>
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

    searchInput.addEventListener('input', e => updateSearchSuggestions(e.target.value));

    searchInput.addEventListener('change', e => {
        const selectedCourse = getCourses().find(course =>
            course.title.toLowerCase() === e.target.value.toLowerCase()
        );
        if (selectedCourse) {
            window.location.href = `./detalleCursos.html?id=${selectedCourse.id}`;
        }
    });
}

/* --------------------------- CONTENIDOS DEL CURSO -------------------------- */
function renderCourseContents(contents) {
    const container = document.querySelector('.contenidos');
    if (!container || !contents?.length) return;

    container.innerHTML = '<h2>CONTENIDOS POR CLASE</h2>';
    contents.forEach((module, mIdx) => {
        const itemsHTML = module.items.map((item, iIdx) => {
            const radioId = `lesson-${mIdx}-${iIdx}`;
            return `
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
        }).join('');

        container.innerHTML += `
            <details>
                <summary>${module.title}</summary>
                <ul>${itemsHTML}</ul>
            </details>
        `;
    });

    setupModalAndAccordion();
}

/* --------------------------- CURSOS RELACIONADOS -------------------------- */
function createRelatedCourseCard(course) {
    const valor = `$${course.valor.toLocaleString('es-AR')}`;
    const isPurchased = isCoursePurchased(course.id);
    const isInCart = isCourseInCart(course.id);
    const expired = isCourseExpired(course); // verificar si el curso expiró

    let buttonHTML;
    if (expired) {
        // Botón estilizado para cursos expirados
        buttonHTML = `
            <button class="add-to-cart-related" disabled
                style="
                    background: #f8d7da;
                    color: #721c24;
                    border: 1px solid #f5c6cb;
                    cursor: not-allowed;
                    font-weight: 600;
                    padding: 0.5em 1em;
                    border-radius: 6px;
                    transition: all 0.2s;
                "
                title="Este curso ha expirado"
            >Curso Expirado</button>
        `;
    } else if (isPurchased) {
        buttonHTML = `
            <button class="add-to-cart-related" disabled
                style="
                    background: #dbeafe;
                    color: #2563eb;
                    border: 1px solid #dbeafe;
                    cursor: not-allowed;
                    font-weight: 600;
                    padding: 0.5em 1em;
                    border-radius: 6px;
                "
            >¡Ya Comprado!</button>
        `;
    } else if (isInCart) {
        buttonHTML = `
            <button class="add-to-cart-related" disabled
                style="
                    background: #dbeafe;
                    color: #2563eb;
                    border: 1px solid #bfdbfe;
                    cursor: not-allowed;
                    font-weight: 600;
                    padding: 0.5em 1em;
                    border-radius: 6px;
                "
            >¡En el Carrito!</button>
        `;
    } else {
        buttonHTML = `<button class="add-to-cart-related" data-course-id="${course.id}">Comprar</button>`;
    }

    return `
        <div class="curso-card">
            <div class="imagen">
                <img src="${course.imageURL || './../Images/default_course.jpg'}" alt="Imagen curso ${course.title}">
                <p class="valor"><strong>${valor}</strong></p>
            </div>
            <p><strong>${course.dedicacion || 'N/A'}</strong></p>
            <p>${course.title}</p>
            <a href="./detalleCursos.html?id=${course.id}">Ver detalles</a>
            ${buttonHTML}
        </div>
    `;
}

function renderRelatedCourses(currentCourseId) {
    const allCourses = getCourses().filter(c => c.id !== currentCourseId);
    const relatedCourses = allCourses.sort(() => 0.5 - Math.random()).slice(0, 4);

    const container = document.getElementById('cursos-relacionados-container');
    if (!container) return;

    container.innerHTML = '<h2>Otros Cursos Destacados</h2>';
    const wrapper = document.createElement('div');
    wrapper.className = 'cards-wrapper';
    wrapper.innerHTML = relatedCourses.map(createRelatedCourseCard).join('');
    container.appendChild(wrapper);

    wrapper.querySelectorAll('.add-to-cart-related[data-course-id]').forEach(button => {
        button.addEventListener('click', e => {
            const courseId = e.currentTarget.dataset.courseId;
            const course = getCourseById(courseId);

            if (!course || isCourseInCart(courseId) || isCoursePurchased(courseId) || isCourseExpired(course)) {
                if (isCourseExpired(course)) {
                    alert("Este curso ya ha expirado y no se puede comprar.");
                }
                return;
            }

            addCourseToCart(course);
            showConfirmationModal({ modalidad: course.modalidad, title: course.title, valor: course.valor });
            e.currentTarget.textContent = '¡Agregado!';
            e.currentTarget.disabled = true;

            if (paginaCursoData) renderRelatedCourses(paginaCursoData.id);
        });
    });
}

function isCourseExpired(course) {
    const currentDate = new Date();
    const courseDate = new Date(course.dateString); 
    return currentDate > courseDate;
}


/* --------------------------- BOTON DE INSCRIPCION -------------------------- */
function setupEnrollment(cursoData) {
    const btn = document.getElementById('btn-inscripcion');
    if (!btn) return;

    const states = {
        expired: { text: 'Este curso ha expirado', bg: '#f8d7da', color: '#721c24', border: '#f5c6cb' },
        purchased: { text: '¡Ya Comprado!', bg: '#dbeafe', color: '#2563eb', border: '#dbeafe' },
        inCart: { text: '¡En el Carrito!', bg: '#dbeafe', color: '#2563eb', border: '#bfdbfe' },
        default: { text: 'INSCRIBIRSE', bg: '', color: '', border: '' }
    };

    const updateButton = () => {
        if (isCourseExpired(cursoData)) {
            // Si el curso ya ha expirado
            Object.assign(btn, { 
                textContent: states.expired.text, 
                disabled: true, 
                style: `background:${states.expired.bg}; color:${states.expired.color}; border-color:${states.expired.border}` 
            });
        } else if (isCoursePurchased(cursoData.id)) {
            // Si ya está comprado
            Object.assign(btn, { 
                textContent: states.purchased.text, 
                disabled: false, 
                style: `background:${states.purchased.bg}; color:${states.purchased.color}; border-color:${states.purchased.border}` 
            });
        } else if (isCourseInCart(cursoData.id)) {
            // Si está en el carrito
            Object.assign(btn, { 
                textContent: states.inCart.text, 
                disabled: false, 
                style: `background:${states.inCart.bg}; color:${states.inCart.color}; border-color:${states.inCart.border}` 
            });
        } else {
            // Si no está ni comprado ni en el carrito
            Object.assign(btn, { 
                textContent: states.default.text, 
                disabled: false, 
                style: '' 
            });
        }
    };

    updateButton();

    if (btn.dataset.listenerAttached !== 'true') {
        btn.addEventListener('click', () => {
            if (isCourseExpired(cursoData)) {
                showConfirmationModal({
                    modalTitle: "Curso Expirado",
                    courseTitle: cursoData.title,
                    message: "Este curso ya ha expirado y no puedes inscribirte."
                });
            } else if (isCoursePurchased(cursoData.id)) {
                showConfirmationModal({
                    modalTitle: "Curso Adquirido",
                    courseTitle: cursoData.title,
                    message: "Este curso ya forma parte de tu perfil."
                });
            } else if (isCourseInCart(cursoData.id)) {
                showConfirmationModal({
                    modalTitle: "En el Carrito",
                    courseTitle: cursoData.title,
                    message: "Este curso ya está en tu carrito."
                });
            } else {
                addCourseToCart(cursoData);
                showConfirmationModal({
                    modalTitle: "¡Agregado al Carrito!",
                    courseTitle: cursoData.title,
                    message: "El curso se agregó a tu carrito."
                });
            }

            updateButton();
        });
        btn.dataset.listenerAttached = 'true';
    }
}


/* --------------------------- BOTON DE "ME GUSTA" -------------------------- */
function setupLikeButton(cursoData) {
    const btnInscripcion = document.getElementById('btn-inscripcion');
    if (!btnInscripcion) return;

    const likeButton = document.createElement('button');
    likeButton.className = 'like-button';
    likeButton.style.cssText = `
        margin-left:9px;padding:6px 15px;font-size:0.85em;cursor:pointer;
        border:1px solid #ddd;background:#fff;color:#333;border-radius:6px;font-weight:540;transition:all 0.2s ease-out;
    `;

    let isLiked = isCourseLiked(cursoData.id);

    const updateButtonState = () => {
        if (isLiked) { likeButton.innerHTML = '❤️ Guardado'; likeButton.style.backgroundColor = '#e6f7ea'; likeButton.style.color = '#1e6633'; likeButton.style.borderColor = '#b7e4c7'; likeButton.title = 'Quitar de favoritos'; }
        else { likeButton.innerHTML = '🤍 Guardar'; likeButton.style.backgroundColor = '#fff'; likeButton.style.color = '#333'; likeButton.style.borderColor = '#ddd'; likeButton.title = 'Añadir a favoritos'; }
    };

    likeButton.addEventListener('click', () => { isLiked = !isLiked; isLiked ? likeCourse(cursoData.id) : unlikeCourse(cursoData.id); updateButtonState(); });
    likeButton.addEventListener('mouseenter', () => { likeButton.style.transform = 'translateY(-1px)'; likeButton.style.boxShadow = '0 4px 8px rgba(0,0,0,0.05)'; });
    likeButton.addEventListener('mouseleave', updateButtonState);

    const container = document.createElement('div');
    container.className = 'curso-acciones-row';
    container.style.display = 'flex'; container.style.alignItems = 'center'; container.style.marginTop = '20px';
    btnInscripcion.parentElement.insertBefore(container, btnInscripcion);
    container.appendChild(btnInscripcion); container.appendChild(likeButton);

    updateButtonState();
}

/* --------------------------- MODAL Y ACORDEON -------------------------- */
function setupModalAndAccordion() {
    const modal = document.getElementById('miModal');
    const cerrarModal = () => { if (modal) modal.style.display = "none"; };
    document.querySelectorAll('.cerrar-modal, #btn-cerrar-modal').forEach(btn => btn.addEventListener('click', cerrarModal));
    window.addEventListener('click', e => { if (e.target === modal) cerrarModal(); });

    document.querySelectorAll('.contenidos details').forEach(detail => {
        detail.addEventListener('toggle', () => {
            if (detail.open) document.querySelectorAll('.contenidos details').forEach(d => { if (d !== detail) d.open = false; });
        });
    });
}

/* --------------------------- DETALLE CURSO -------------------------- */
function initDetalleCurso() {
    const cursoId = new URLSearchParams(window.location.search).get('id');
    const cursoData = getCourseById(cursoId);

    if (!cursoData) {
        document.querySelector('main').innerHTML = '<h1 style="text-align:center;color:#d32f2f;margin:2em;">❌ Curso no encontrado.</h1><p style="text-align:center;">Verifique el enlace.</p>';
        return null;
    }

    paginaCursoData = cursoData;

    const img = document.getElementById('course-image'); if (img && cursoData.imageURL) { img.src = cursoData.imageURL; img.alt = `Imagen para ${cursoData.title}`; }
    const h1 = document.querySelector('.curso-detalles h1'); if (h1) h1.textContent = cursoData.title;

    document.querySelector('.curso-detalles p:nth-child(2)').innerHTML = `<strong>Valor:</strong> $${cursoData.valor.toLocaleString('es-AR')}`;
    document.querySelector('.curso-detalles p:nth-child(3)').innerHTML = `<strong>Tiempo de dedicación:</strong> ${cursoData.dedicacion || 'No especificado'}`;
    document.querySelector('.curso-detalles p:nth-child(4)').innerHTML = `<strong>Descripción:</strong> ${cursoData.description}`;
    document.querySelector('.curso-detalles p:nth-child(5)').innerHTML = `<strong>Requisitos Previos:</strong> ${cursoData.requisitos || 'No especificados'}`;

    renderCourseContents(cursoData.contents);
    renderRelatedCourses(cursoData.id);
    setupEnrollment(cursoData);
    setupLikeButton(cursoData);

    return cursoData;
}

/* --------------------------- CARRUSEL DOCENTES -------------------------- */
function initCarruselHover() {
    const wrapper = document.querySelector('.docentes-cards-wrapper');
    if (!wrapper) return;

    let scrollInterval;
    const scrollSpeed = 1, scrollDelay = 15;
    const startScroll = () => scrollInterval = setInterval(() => { wrapper.scrollLeft += scrollSpeed; if (wrapper.scrollLeft >= wrapper.scrollWidth - wrapper.clientWidth) wrapper.scrollLeft = 0; }, scrollDelay);
    const stopScroll = () => clearInterval(scrollInterval);
    wrapper.addEventListener('mouseenter', startScroll);
    wrapper.addEventListener('mouseleave', stopScroll);
}

/* --------------------------- DOMContentLoaded -------------------------- */
document.addEventListener('DOMContentLoaded', () => {
    initSearch();
    if (document.querySelector('.curso-detalles')) {
        const cursoData = initDetalleCurso();
        if (cursoData) {
            renderDocentesRelacionados();
            initCarruselHover();
        }
    }
});




