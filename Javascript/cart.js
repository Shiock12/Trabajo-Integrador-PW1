
export const CourseService = (() => {
    // Definición de los cursos (DATOS CENTRALIZADOS)
    const COURSES_DATA = [
        {
            id: 'html-basico',
            title: 'Curso de HTML Básico',
            valor: 10000,
            modalidad: 'Online Sincrónico',
            dateString: '2025-10-03',
            dateText: '3 de Octubre',
            description: 'Aprende los fundamentos del marcado de HTML para construir la estructura de páginas web.',
            imageURL: './../Images/Html_5.png',
            dedicacion: '70 horas',
            contents: [
                {
                    title: 'MÓDULO 1: Fundamentos del Marcado',
                    items: [
                        { title: 'Estructura básica de un documento HTML', duration: '20 min', icon: 'bx-volume-full' },
                        { title: 'Etiquetas de texto (h1, p, a)', duration: '15 min', icon: 'bxs-file-import' },
                        { title: 'Listas ordenadas y no ordenadas', duration: '10 min', icon: 'bx-list-ul' }
                    ]
                },
                {
                    title: 'MÓDULO 2: Multimedia y Formularios',
                    items: [
                        { title: 'Integración de imágenes y videos', duration: '20 min', icon: 'bx-image-add' },
                        { title: 'Estructura de formularios (input, textarea)', duration: '25 min', icon: 'bx-pencil' }
                    ]
                }
            ]

        },
        {
            id: 'css-intermedio',
            title: 'Curso CSS Intermedio',
            valor: 12000,
            modalidad: 'Online Asincrónico',
            dateString: '2025-10-15',
            dateText: '15 de Octubre',
            description: 'Explora propiedades modernas de CSS y aprende diseño responsivo con Flexbox y Grid Layouts.',
            imageURL: './../Images/css 3.png',
            dedicacion: '70 horas',
            contents: [
                {
                    title: 'MÓDULO 1: Posicionamiento Avanzado',
                    items: [
                        { title: 'Modelo de Cajas y Especificidad', duration: '25 min', icon: 'bx-search' },
                        { title: 'Introducción a Flexbox', duration: '30 min', icon: 'bx-layout' }
                    ]
                },
                {
                    title: 'MÓDULO 2: CSS Grid y Responsive Design',
                    items: [
                        { title: 'Dominando el CSS Grid Layout', duration: '40 min', icon: 'bx-grid-alt' },
                        { title: 'Media Queries y flujo de trabajo Mobile First', duration: '35 min', icon: 'bx-devices' }
                    ]
                }
            ]

        },
        {
            id: 'js-basico',
            title: 'Curso de JavaScript Básico',
            valor: 14000,
            modalidad: 'Online Sincrónico',
            dateString: '2025-10-17',
            dateText: '17 de Octubre',
            description: 'Aprende JavaScript para agregar interactividad a tus páginas y crear proyectos dinámicos.',
            imageURL: './../Images/JavaScript-.png',
            dedicacion: '70 horas',
            contents: [
                {
                    title: 'MÓDULO 1 - Introducción a JS',
                    items: [
                        { title: 'Qué es JavaScript y dónde se usa', duration: '15 min', icon: 'bx-volume-full' },
                        { title: 'Variables y tipos de datos', duration: '20 min', icon: 'bxs-file-import' },
                        { title: 'El DOM: el mapa de la web', duration: '10 min', icon: 'bx-paint-roll' }
                    ]
                },
                {
                    title: 'MÓDULO 2 - Estructuras de Control',
                    items: [
                        { title: 'Condicionales (if/else)', duration: '18 min', icon: 'bx-search' },
                        { title: 'Bucles (for, while)', duration: '25 min', icon: 'bx-group' }
                    ]
                },
                {
                    title: 'MÓDULO 3 - Funciones y Arrays',
                    items: [
                        { title: 'Creación y uso de funciones', duration: '30 min', icon: 'bx-code' },
                        { title: 'Manipulación de Arrays y objetos', duration: '40 min', icon: 'bx-data' }
                    ]
                }
            ]
        },
        {
            id: 'data-science',
            title: 'Introducción a Data Science',
            valor: 7650,
            modalidad: 'Presencial',
            dateString: '2025-10-22',
            dateText: '22 de Octubre',
            description: 'Descubre cómo analizar datos con Python, estadísticas y técnicas básicas de aprendizaje automático.',
            imageURL: './../Images/DataScience-.png',
            dedicacion: '100 horas',
            contents: [
                {
                    title: 'UNIDAD 1: Fundamentos y Python',
                    items: [
                        { title: 'Introducción al rol de Data Scientist', duration: '20 min', icon: 'bx-volume-full' },
                        { title: 'Preparación de entorno y Python básico (Pandas)', duration: '50 min', icon: 'bx-code-alt' }
                    ]
                },
                {
                    title: 'UNIDAD 2: Análisis Exploratorio de Datos (EDA)',
                    items: [
                        { title: 'Estadística descriptiva y visualización (Matplotlib)', duration: '45 min', icon: 'bx-line-chart' },
                        { title: 'Limpieza y preprocesamiento de datos', duration: '40 min', icon: 'bx-table' }
                    ]
                }
            ]

        },
        {
            id: 'ingles-profesional',
            title: 'Inglés para Profesionales',
            valor: 100000,
            modalidad: 'Online Sincrónico',
            dateString: '2025-10-26',
            dateText: '26 de Octubre',
            description: 'Mejora tu inglés para negocios, reuniones y presentaciones profesionales en entornos laborales.',
            imageURL: './../Images/english.jpg',
            dedicacion: '100 horas',
            contents: [
                {
                    title: 'MÓDULO 1: Comunicación Empresarial',
                    items: [
                        { title: 'Vocabulario de negocios y jerga de oficina', duration: '35 min', icon: 'bx-briefcase' },
                        { title: 'Redacción de emails formales e informales', duration: '30 min', icon: 'bx-envelope' }
                    ]
                },
                {
                    title: 'MÓDULO 2: Presentaciones y Reuniones',
                    items: [
                        { title: 'Estructura para presentaciones efectivas', duration: '45 min', icon: 'bx-chalkboard' },
                        { title: 'Frases clave para debatir y negociar en reuniones', duration: '40 min', icon: 'bx-group' }
                    ]
                }
            ]
        },
        {
            id: 'ciberseguridad',
            title: 'Ciberseguridad & Hacking Ético',
            valor: 100000,
            modalidad: 'Presencial',
            dateString: '2025-10-27',
            dateText: '27 de Octubre',
            description: 'Aprende a proteger sistemas, detectar vulnerabilidades y aplicar buenas prácticas de seguridad online.',
            imageURL: './../Images/Ciberseguridad-y-hacking-etico.png',
            dedicacion: '90 horas',
            contents: [
                {
                    title: 'UNIDAD 1: Fundamentos de Seguridad',
                    items: [
                        { title: 'Conceptos de confidencialidad, integridad y disponibilidad', duration: '25 min', icon: 'bx-shield-quarter' },
                        { title: 'Riesgos comunes y vectores de ataque', duration: '30 min', icon: 'bx-bug' }
                    ]
                },
                {
                    title: 'UNIDAD 2: Hacking Ético y Pruebas de Penetración',
                    items: [
                        { title: 'Introducción a herramientas de escaneo (Nmap)', duration: '45 min', icon: 'bx-laptop' },
                        { title: 'Análisis de vulnerabilidades web (OWASP Top 10)', duration: '55 min', icon: 'bx-globe' }
                    ]
                }
            ]
        },
        {
            id: 'finanzas-personales',
            title: 'Finanzas Personales e Inversiones',
            valor: 5000,
            modalidad: 'Online Asincrónico',
            dateString: '2025-11-05',
            dateText: '5 de Noviembre',
            description: 'Domina tus finanzas, aprende a presupuestar y descubre estrategias de inversión para tu futuro.',
            imageURL: './../Images/finanzas.jpg',
            dedicacion: '75 horas',
            contents: [
                {
                    title: 'MÓDULO 1: Presupuesto y Ahorro',
                    items: [
                        { title: 'Creación de presupuesto y control de gastos', duration: '30 min', icon: 'bx-calculator' },
                        { title: 'Eliminación de deudas y fondo de emergencia', duration: '25 min', icon: 'bx-save' }
                    ]
                },
                {
                    title: 'MÓDULO 2: Principios de Inversión',
                    items: [
                        { title: 'Conceptos básicos: interés compuesto y riesgo', duration: '35 min', icon: 'bx-line-chart' },
                        { title: 'Tipos de activos: acciones, bonos y ETFs', duration: '40 min', icon: 'bx-wallet' }
                    ]
                }
            ]
        },
        {
            id: 'marketing-digital',
            title: 'Marketing Digital y Redes Sociales',
            valor: 10000,
            modalidad: 'Online Sincrónico',
            dateString: '2025-11-12',
            dateText: '12 de Noviembre',
            description: 'Crea campañas efectivas, entiende el SEO y maneja redes sociales como un profesional.',
            imageURL: './../Images/marketing.jpg',
            dedicacion: '80 horas',
            contents: [
                {
                    title: 'UNIDAD 1: Estrategia Digital',
                    items: [
                        { title: 'El Customer Journey y Buyer Persona', duration: '30 min', icon: 'bx-map' },
                        { title: 'Introducción al SEO y SEM', duration: '40 min', icon: 'bx-search-alt' }
                    ]
                },
                {
                    title: 'UNIDAD 2: Redes Sociales y Contenido',
                    items: [
                        { title: 'Estrategias en Instagram y TikTok', duration: '45 min', icon: 'bx-camera' },
                        { title: 'Métricas clave y análisis de resultados', duration: '35 min', icon: 'bx-bar-chart-alt' }
                    ]
                }
            ]
        },
        {
            id: 'diseno-ux-ui',
            title: 'Diseño UX/UI para Principiantes',
            valor: 17000,
            modalidad: 'Presencial',
            dateString: '2025-11-19',
            dateText: '19 de Noviembre',
            description: 'Aprende los fundamentos del diseño de experiencia de usuario e interfaces para crear productos digitales.',
            imageURL: './../Images/uxui.jpg',
            dedicacion: '60 horas',
            contents: [
                {
                    title: 'MÓDULO 1: Fundamentos de UX',
                    items: [
                        { title: 'Qué es UX y la Investigación de Usuario', duration: '30 min', icon: 'bx-user-voice' },
                        { title: 'Personas, User Journeys y Mapas de Empatía', duration: '40 min', icon: 'bx-group' }
                    ]
                },
                {
                    title: 'MÓDULO 2: Diseño de Interfaz (UI)',
                    items: [
                        { title: 'Wireframes, Prototipado y Figma Básico', duration: '50 min', icon: 'bx-pencil' },
                        { title: 'Principios de color, tipografía y accesibilidad', duration: '40 min', icon: 'bx-palette' }
                    ]
                }
            ]
        },
        {
            id: 'inversion-cryptomonedas',
            title: 'Inversión en Cryptomonedas',
            valor: 90000,
            modalidad: 'Presencial',
            dateString: '2025-11-24',
            dateText: '24 de Noviembre',
            description: 'Aprende a gestionar tu dinero, invertir en criptomonedas de forma segura.',
            imageURL: './../Images/crypto.jpg',
            dedicacion: '75 horas',
            contents: [
                {
                    title: 'UNIDAD 1: Blockchain y Fundamentos',
                    items: [
                        { title: '¿Qué es Blockchain? Conceptos básicos y descentralización', duration: '35 min', icon: 'bx-link-alt' },
                        { title: 'Tipos de criptomonedas y sus usos (Bitcoin, Ethereum)', duration: '40 min', icon: 'bx-dollar-circle' }
                    ]
                },
                {
                    title: 'UNIDAD 2: Billeteras y Seguridad',
                    items: [
                        { title: 'Wallets (frases semilla) y Cold/Hot Storage', duration: '30 min', icon: 'bx-lock-alt' },
                        { title: 'Cómo evitar estafas y gestión de riesgos', duration: '35 min', icon: 'bx-error-alt' }
                    ]
                }
            ]
        },
        {
            id: 'fotografia-profesional',
            title: 'Fotografía Profesional',
            valor: 33000,
            modalidad: 'Online Sincrónico',
            dateString: '2025-11-29',
            dateText: '29 de Noviembre',
            description: 'Domina el uso de cámaras, iluminación, edición digital y crea tu portafolio.',
            imageURL: './../Images/foto.jpg',
            dedicacion: '50 horas',
            contents: [
                {
                    title: 'MÓDULO 1: Conceptos Básicos de Cámara',
                    items: [
                        { title: 'El triángulo de exposición (ISO, Velocidad, Apertura)', duration: '40 min', icon: 'bx-camera-movie' },
                        { title: 'Tipos de lentes y enfoque', duration: '30 min', icon: 'bx-lens' }
                    ]
                },
                {
                    title: 'MÓDULO 2: Iluminación y Composición',
                    items: [
                        { title: 'Luz natural vs. Luz artificial', duration: '35 min', icon: 'bx-bulb' },
                        { title: 'Regla de tercios y composición avanzada', duration: '30 min', icon: 'bx-grid-alt' }
                    ]
                }
            ]
        },
        {
            id: 'desarrollo-mobile',
            title: 'Desarrollo Mobile',
            valor: 33000,
            modalidad: 'Online',
            dateString: '2025-11-30',
            dateText: '30 de Noviembre',
            description: 'Aprende a crear aplicaciones nativas y multiplataforma con frameworks modernos.',
            imageURL: './../Images/DesarrolloMóvil.jpg',
            dedicacion: '50 horas',
            contents: [
                {
                    title: 'UNIDAD 1: Introducción y Entornos',
                    items: [
                        { title: 'Diferencias entre Desarrollo Nativo y Híbrido', duration: '25 min', icon: 'bx-mobile' },
                        { title: 'Configuración de entorno de React Native/Flutter', duration: '45 min', icon: 'bx-code-alt' }
                    ]
                },
                {
                    title: 'UNIDAD 2: Componentes y Navegación',
                    items: [
                        { title: 'Creación de componentes de interfaz (UI)', duration: '40 min', icon: 'bx-layout' },
                        { title: 'Manejo de rutas y navegación entre pantallas', duration: '30 min', icon: 'bx-navigation' }
                    ]
                }
            ]
        },
        {
            id: 'desarrollo-web',
            title: 'Desarrollo Web',
            valor: 33000,
            modalidad: 'Online Sincrónico',
            dateString: '2025-12-11',
            dateText: '11 de Diciembre',
            description: 'Domina las herramientas completas para construir sitios web funcionales y atractivos (Frontend y Backend).',
            imageURL: './../Images/DesarrolloWeb.jpg',
            dedicacion: '50 horas',
            contents: [
                {
                    title: 'MÓDULO 1: Frontend Esencial',
                    items: [
                        { title: 'HTML Semántico y CSS Avanzado (SASS/LESS)', duration: '45 min', icon: 'bx-brush' },
                        { title: 'Frameworks de CSS (Bootstrap/Tailwind)', duration: '35 min', icon: 'bx-layer' }
                    ]
                },
                {
                    title: 'MÓDULO 2: Backend e Infraestructura',
                    items: [
                        { title: 'Introducción a Node.js y Express (API REST)', duration: '50 min', icon: 'bx-server' },
                        { title: 'Conexión a Bases de Datos (MongoDB/SQL)', duration: '45 min', icon: 'bx-data' }
                    ]
                }
            ]
        },
        {
            id: 'clouds-devops',
            title: 'Cloud & DevOps',
            valor: 33000,
            modalidad: 'Online Sincrónico',
            dateString: '2025-12-09',
            dateText: '9 de Diciembre',
            description: 'Aprende las prácticas de integración y despliegue continuo (CI/CD) usando servicios en la nube (AWS/Azure).',
            imageURL: './../Images/Clouds & DevOps Course Illustration.png',
            dedicacion: '50 horas',
            contents: [
                {
                    title: 'UNIDAD 1: Fundamentos de Cloud e Infraestructura',
                    items: [
                        { title: 'Introducción a la Nube (IaaS, PaaS, SaaS)', duration: '30 min', icon: 'bx-cloud-drizzle' },
                        { title: 'Uso básico de servicios de AWS/Azure', duration: '40 min', icon: 'bx-server' }
                    ]
                },
                {
                    title: 'UNIDAD 2: Automatización y CI/CD',
                    items: [
                        { title: 'Introducción a Docker y Contenedores', duration: '45 min', icon: 'bx-cube-alt' },
                        { title: 'Pipelines de Integración Continua (Jenkins/GitHub Actions)', duration: '50 min', icon: 'bx-loader' }
                    ]
                }
            ]
        }
    ];

    function getCourses() {
        return COURSES_DATA;
    }

   
    function getCourseById(id) {
        return COURSES_DATA.find(course => course.id === id);
    }

    return {
        getCourses,
        getCourseById
    };
})();


const CartService = (() => {
    const CART_KEY = 'cartItems';
    let cartCountElement = null;

    function getCartItems() {
        const items = sessionStorage.getItem(CART_KEY);
        if (!items) return [];

        try {
            const parsedItems = JSON.parse(items);
            if (Array.isArray(parsedItems)) {
                return parsedItems; // Devuelve array de IDs
            } else {
                console.warn("Dato de carrito inválido encontrado. Limpiando sessionStorage.");
                sessionStorage.removeItem(CART_KEY);
                return [];
            }
        } catch (event) {
            console.error("Error al leer el carrito. Limpiando sessionStorage.", event);
            sessionStorage.removeItem(CART_KEY);
            return [];
        }
    }

    function saveCartItems(cartIds) {
        sessionStorage.setItem(CART_KEY, JSON.stringify(cartIds));
        updateCartUI();
    }

    function updateCartUI() {
        if (!cartCountElement) {
            cartCountElement = document.querySelector('.cart-count');
        }
        const count = getCartItems().length;
        if (cartCountElement) {
            cartCountElement.textContent = count;
        }
    }

    function addCourseToCart(course) {
        let cartIds = getCartItems();
        
        if (!cartIds.includes(course.id)) {
            cartIds.push(course.id);
            saveCartItems(cartIds);
        }
    }

    /**
     * @returns {number}
     */
    function getCartTotal() {
        const cartIds = getCartItems();

        
        const cartCourses = cartIds
            .map(id => CourseService.getCourseById(id))
            .filter(course => course && typeof course.valor === 'number'); 

   
        const total = cartCourses.reduce((sum, course) => {
            return sum + course.valor;
        }, 0);

        return total;
    }

    function removeCourseFromCart(courseId) {
        let cartIds = getCartItems();
        cartIds = cartIds.filter(id => id !== courseId);
        saveCartItems(cartIds);
    }

    function isCourseInCart(courseId) {
        return getCartItems().includes(courseId);
    }

    return {
        addCourseToCart,
        removeCourseFromCart,
        getCartItems,
        isCourseInCart,
        updateCartUI,
   
        getCartTotal
    };
})();


const CartModalController = (() => {
    let modalOverlay = null;
    let modalContent = null;

    function createModal() {
        if (modalOverlay) return;

        modalOverlay = document.createElement('div');
        modalOverlay.className = 'cart-modal-overlay';
        document.body.appendChild(modalOverlay);

        modalContent = document.createElement('div');
        modalContent.className = 'cart-modal-content';
        document.body.appendChild(modalContent);

        
        const style = document.createElement('style');
        style.textContent = `
            .cart-modal-overlay {
                position: fixed; top: 0; left: 0; width: 100%; height: 100%;
                background: rgba(0, 0, 0, 0.6); z-index: 199;
                display: none; opacity: 0; transition: opacity 0.3s ease;
            }
            .cart-modal-content {
                position: fixed; top: 40%; left: 50%;
                transform: translate(-50%, -50%) scale(0.9);
                background: #fff; border-radius: 0.5em; box-shadow: 0 5px 15px rgba(0,0,0,0.3);
                z-index: 200; width: 90%; max-width: 600px;
                display: none; opacity: 0; transition: all 0.3s ease;
                max-height: 70vh; overflow-y: auto;
            }
            .cart-modal-overlay.visible, .cart-modal-content.visible {
                display: block; opacity: 1;
            }
            .cart-modal-content.visible {
                top: 50%;
                transform: translate(-50%, -50%) scale(1);
            }
            .cart-modal-header {
                display: flex; justify-content: space-between; align-items: center;
                padding: 1em 1.5em; border-bottom: 1px solid #eee;
            }
            .cart-modal-header h2 { margin: 0; color: #2C3E50; }
            .cart-modal-close-btn {
                font-size: 2em; color: #aaa; cursor: pointer; line-height: 1;
            }
            .cart-modal-body { padding: 1.5em; }
            .cart-item {
                display: flex; justify-content: space-between; align-items: center;
                padding: 1em 0; border-bottom: 1px solid #f0f0f0;
            }
            .cart-item:last-child { border-bottom: none; }
            .cart-item-details h3 { margin: 0 0 0.25em 0; font-size: 1.1em; color: #333; }
            .cart-item-details p { margin: 0; font-size: 0.9em; color: #777; }
            .cart-item-price {
              font-weight: bold;
              color: #2980b9;
              font-size: 1em;
              margin-left: auto; 
              text-align: right; 
            }
            .cart-item-remove-btn {
                background: #e74c3c; color: white; border: none;
                border-radius: 50%; width: 30px; height: 30px;
                font-size: 1.2em; font-weight: bold; cursor: pointer;
                line-height: 30px; text-align: center;
                transition: background 0.3s ease;
            }
            .cart-item-remove-btn:hover { background: #c0392b; }
            .cart-empty-message {
                text-align: center; color: #777; padding: 2em 0;
            }
            /* Estilo para el Total */
            .cart-total-display {
                margin-top: 1.5em; 
                padding-top: 1em; 
                border-top: 2px solid #3498db; /* Línea de separación */
                font-size: 1.3em;
                font-weight: bold;
                text-align: right;
                color: #2C3E50;
            }
        `;
        document.head.appendChild(style);

        modalOverlay.addEventListener('click', close);
    }

    function close() {
        if (!modalOverlay) return;
        modalOverlay.classList.remove('visible');
        modalContent.classList.remove('visible');
    }

    function renderItems() {
        const cartIds = CartService.getCartItems();
        const total = CartService.getCartTotal(); // <-- OBTENEMOS EL TOTAL
        const formattedTotal = `$${total.toLocaleString('es-AR')}`;

        let itemsHtml = '';

        if (cartIds.length === 0) {
            itemsHtml = '<p class="cart-empty-message">Tu carrito de cursos está vacío.</p>';
        } else {
            itemsHtml = cartIds.map(id => {
                const course = CourseService.getCourseById(id);
                if (!course) return '';

                const valorItem = `$${course.valor.toLocaleString('es-AR')}`; // Valor de cada item

                return `
                    <div class="cart-item">
                        <div class="cart-item-details">
                            <h3>${course.title}</h3>
                            <p>Inicia: ${course.dateText}</p>
                        </div>
                        <p class="cart-item-price">${valorItem}</p>
                        <button class="cart-item-remove-btn" data-course-id="${id}" title="Eliminar curso">&times;</button>
                    </div>
                `;
            }).join('');

            // Agregamos el total después de los items
            itemsHtml += `<p class="cart-total-display">TOTAL: ${formattedTotal}</p>`;
        }

        modalContent.innerHTML = `
            <div class="cart-modal-header">
                <h2>Mis Cursos Inscriptos (${cartIds.length})</h2>
                <span class="cart-modal-close-btn">&times;</span>
            </div>
            <div class="cart-modal-body">
                ${itemsHtml}
            </div>
        `;

        modalContent.querySelector('.cart-modal-close-btn').addEventListener('click', close);

        modalContent.querySelectorAll('.cart-item-remove-btn').forEach(btn => {
            btn.addEventListener('click', (event) => {
                const courseId = event.currentTarget.dataset.courseId;
                handleRemoveClick(courseId);
            });
        });
    }

    function handleRemoveClick(courseId) {
        CartService.removeCourseFromCart(courseId);
        renderItems(); // Vuelve a renderizar para actualizar la lista Y EL TOTAL
    }

    function open() {
        createModal();
        renderItems();
        modalOverlay.classList.add('visible');
        modalContent.classList.add('visible');
    }

    return {
        init: () => {
            const cartIcon = document.querySelector('header .cart');
            if (cartIcon) {
                cartIcon.addEventListener('click', open);
            }
            CartService.updateCartUI();
        }
    };
})();




export const initCart = CartModalController.init;


export const getCourses = CourseService.getCourses;
export const getCourseById = CourseService.getCourseById;
export const addCourseToCart = CartService.addCourseToCart;
export const isCourseInCart = CartService.isCourseInCart;

export const getCartTotal = CartService.getCartTotal;