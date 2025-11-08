
const CourseService = (() => {
    let courses = []; 

    function loadCourses() {
        if (courses.length > 0) return; 

        document.querySelectorAll('article.detalles[id^="curso"]').forEach(article => {
            try {
                const id = article.id;
                const title = article.querySelector('h2').textContent;
                const dateString = article.querySelector('time').getAttribute('datetime');
                const dateText = article.querySelector('time').textContent;
                const description = article.querySelectorAll('p')[1].textContent.trim();
                
                courses.push({ id, title, dateString, dateText, description });
            } catch (e) {
                console.error("Error al parsear el curso:", article.id, e);
            }
        });
    }

    function getCourses() {
        loadCourses();
        return courses;
    }

    function getCourseById(id) {
        loadCourses();
        return courses.find(course => course.id === id);
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
        return items ? JSON.parse(items) : [];
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
        updateCartUI
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
        
        let bodyHtml;

        if (cartIds.length === 0) {
            bodyHtml = '<p class="cart-empty-message">Tu carrito de cursos está vacío.</p>';
        } else {
            bodyHtml = cartIds.map(id => {
                const course = CourseService.getCourseById(id);
                if (!course) return ''; 
                
                return `
                    <div class="cart-item">
                        <div class="cart-item-details">
                            <h3>${course.title}</h3>
                            <p>Inicia: ${course.dateText}</p>
                        </div>
                        <button class="cart-item-remove-btn" data-course-id="${id}" title="Eliminar curso">&times;</button>
                    </div>
                `;
            }).join('');
        }

        modalContent.innerHTML = `
            <div class="cart-modal-header">
                <h2>Mis Cursos Inscriptos</h2>
                <span class="cart-modal-close-btn">&times;</span>
            </div>
            <div class="cart-modal-body">
                ${bodyHtml}
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
        renderItems(); 
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