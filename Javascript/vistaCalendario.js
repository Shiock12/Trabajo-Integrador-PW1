
import { getCourses, getCourseById, addCourseToCart, isCourseInCart } from './../Javascript/cart.js';


const ModalController = (() => {
    let modalOverlay = null;
    let modalContent = null;
    let audioPlayer = null; 

    function createModal() {
        if (modalOverlay) return; 

        modalOverlay = document.createElement('div');
        modalOverlay.className = 'day-modal-overlay';
        document.body.appendChild(modalOverlay);

        modalContent = document.createElement('div');
        modalContent.className = 'day-modal-content';
        document.body.appendChild(modalContent);
        
        audioPlayer = new Audio(); 

        const style = document.createElement('style');
        style.textContent = `
            .day-modal-overlay {
                position: fixed; top: 0; left: 0; width: 100%; height: 100%;
                background: rgba(0, 0, 0, 0.6); z-index: 100;
                display: none; opacity: 0; transition: opacity 0.3s ease;
            }
            .day-modal-content {
                position: fixed; top: 40%; left: 50%;
                transform: translate(-50%, -50%) scale(0.9);
                background: #fff; border-radius: 0.5em; box-shadow: 0 5px 15px rgba(0,0,0,0.3);
                z-index: 101; width: 90%; max-width: 500px;
                display: none; opacity: 0; transition: all 0.3s ease;
            }
            .day-modal-overlay.visible, .day-modal-content.visible {
                display: block; opacity: 1;
            }
            .day-modal-content.visible {
                top: 50%;
                transform: translate(-50%, -50%) scale(1);
            }
            .day-modal-close-btn {
                position: absolute; top: 0.5em; right: 0.75em;
                font-size: 2em; color: #aaa; cursor: pointer; line-height: 1;
            }
            .day-modal-close-btn:hover { color: #000; }
            .day-modal-body { padding: 1.5em 2em; }
            .day-modal-body h2 { color: #2C3E50; margin-bottom: 0.5em; }
            .day-modal-body p { margin-bottom: 1em; line-height: 1.6; }
            .day-modal-footer {
                display: flex; justify-content: flex-end; gap: 0.75em;
                padding: 1em 2em; border-top: 1px solid #eee;
                background-color: #f9f9f9;
            }
            .day-modal-btn {
                border: none; padding: 0.75em 1.25em; border-radius: 0.3em;
                font-size: 0.9em; font-weight: bold; cursor: pointer;
                transition: all 0.3s ease;
                
                
                text-decoration: none; 
                display: inline-block;
            }
            .day-modal-btn.enroll { background: #007bff; color: white; }
            .day-modal-btn.enroll:hover { background: #0056b3; }
            .day-modal-btn.detail { background: #6c757d; color: white; }
            .day-modal-btn.detail:hover { background: #5a6268; }
            .day-modal-btn.added {
                background: #28a745; color: white; cursor: not-allowed;
            }
        `;
        document.head.appendChild(style);

        modalOverlay.addEventListener('click', close);
    }

    function close() {
        if (!modalOverlay) return;
        
        if (audioPlayer) {
            audioPlayer.pause();
            audioPlayer.src = '';
        }

        modalOverlay.classList.remove('visible');
        modalContent.classList.remove('visible');
        setTimeout(() => {
            modalContent.innerHTML = '';
        }, 300);
    }

    function open(course) {
        createModal(); 

        const { id, title, dateText, description } = course;
        
        const detailPageURL = `./../Pages/detalleCursos.html?id=${id}`;

        const isInCart = isCourseInCart(id);
        const enrollButtonText = isInCart ? '¡Agregado!' : 'Inscribirse';
        const enrollButtonClass = isInCart ? 'added' : 'enroll';
        const enrollButtonDisabled = isInCart ? 'disabled' : '';

        modalContent.innerHTML = `
            <span class="day-modal-close-btn">&times;</span>
            <div class="day-modal-body">
                <h2>${title}</h2>
                <p><strong>Inicio: </strong> ${dateText}</p>
                <p>${description}</p>
            </div>
            <div class="day-modal-footer">
                <a href="${detailPageURL}" class="day-modal-btn detail">Ver Detalle</a>
                <button class="day-modal-btn ${enrollButtonClass}" ${enrollButtonDisabled}>
                    ${enrollButtonText}
                </button>
            </div>
        `;

        modalOverlay.classList.add('visible');
        modalContent.classList.add('visible');

        modalContent.querySelector('.day-modal-close-btn').onclick = close;

        const enrollButton = modalContent.querySelector('.day-modal-btn.enroll');
        if (enrollButton) {
            enrollButton.addEventListener('click', () => {
                addCourseToCart(course);
                
                enrollButton.textContent = '¡Agregado!';
                enrollButton.classList.add('added');
                enrollButton.disabled = true;

                setTimeout(close, 1500);
            });
        }
    }

    return {
        open
    };
})();


const CalendarGenerator = (() => {
    let currentMonth = new Date().getMonth();
    let currentYear = new Date().getFullYear();


    let calendarGrid;
    let calendarTitle;
    let prevMonthBtn;
    let nextMonthBtn;
    let courses = []; 


    function render() {

        calendarGrid.innerHTML = ''; 
        
        const monthName = new Date(currentYear, currentMonth).toLocaleString('es-ES', { month: 'long' });
        calendarTitle.textContent = `Calendario - ${monthName.charAt(0).toUpperCase() + monthName.slice(1)} ${currentYear}`;

        const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        
        let totalCellsGenerated = 0;

        for (let i = 0; i < firstDayOfMonth; i++) {
            calendarGrid.appendChild(createEmptyDayCell());
            totalCellsGenerated++;
        }

        for (let day = 1; day <= daysInMonth; day++) {
            calendarGrid.appendChild(createDayCell(day));
            totalCellsGenerated++;
        }
        
        while (totalCellsGenerated < 42) {
            calendarGrid.appendChild(createEmptyDayCell());
            totalCellsGenerated++;
        }
    }

    function createEmptyDayCell() {
        const dayCell = document.createElement('div');
        dayCell.className = 'day';
        return dayCell;
    }

    function createDayCell(day) {
        const dayCell = document.createElement('div');
        dayCell.className = 'day';
        
        const timeEl = document.createElement('time');
        timeEl.setAttribute('datetime', `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`);
        timeEl.textContent = day;
        dayCell.appendChild(timeEl);

        const course = findCourseForDay(day);
        if (course) {
            dayCell.classList.add('course');
            dayCell.addEventListener('click', () => {
                handleCourseClick(course);
            });
        }

        return dayCell;
    }

    function findCourseForDay(day) {
        const dateString = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

        return courses.find(course => course.dateString === dateString);
    }

    function handleCourseClick(course) {
        ModalController.open(course);
    }

    function nextMonth() {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        render();
    }

    function prevMonth() {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        render();
    }

    return {
        init: () => {

            calendarGrid = document.getElementById('calendar-grid');
            calendarTitle = document.getElementById('calendar-title');
            prevMonthBtn = document.getElementById('prev-month-btn');
            nextMonthBtn = document.getElementById('next-month-btn');

            if (!calendarGrid || !calendarTitle || !prevMonthBtn || !nextMonthBtn) {
                console.error("Faltan elementos del DOM para inicializar el calendario.");
                return;
            }
            

            courses = getCourses(); 
            
            render();
            
            prevMonthBtn.addEventListener('click', prevMonth);
            nextMonthBtn.addEventListener('click', nextMonth);
        }
    };
})();

const CalendarApp = (() => {
    return {
        init: () => {
            CalendarGenerator.init();
        }
    };
})();


export const initCalendar = CalendarApp.init;