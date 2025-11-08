
import { initCart } from './../Javascript/cart.js';
import { initCalendar } from './../Javascript/vistaCalendario.js';


document.addEventListener('DOMContentLoaded', () => {
    
    initCart();
    const calendarGrid = document.getElementById('calendar-grid');
    
    if (calendarGrid) {

        initCalendar();
    }

});