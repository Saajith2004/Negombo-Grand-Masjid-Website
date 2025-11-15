// Prayer Times Calculation for Colombo
class PrayerTimes {
    constructor() {
        this.latitude = 6.9271; // Colombo
        this.longitude = 79.8612;
        this.timezone = 5.5; // UTC+5:30
        this.method = 'Karachi'; // University of Islamic Sciences, Karachi
    }

    calculateTimes(date = new Date()) {
        // Simplified calculation - in production use proper library
        const times = {
            fajr: this.calculateTime(5, 15, date),
            sunrise: this.calculateTime(6, 0, date),
            dhuhr: this.calculateTime(12, 15, date),
            asr: this.calculateTime(15, 30, date),
            maghrib: this.calculateTime(18, 15, date),
            isha: this.calculateTime(19, 30, date)
        };
        return times;
    }

    calculateTime(baseHour, baseMinute, date) {
        const dayOfYear = this.getDayOfYear(date);
        const adjustment = Math.sin((dayOfYear - 80) * 2 * Math.PI / 365) * 15;
        
        const totalMinutes = baseHour * 60 + baseMinute + adjustment;
        const hour = Math.floor(totalMinutes / 60) % 24;
        const minute = Math.floor(totalMinutes % 60);
        
        return { hour, minute };
    }

    getDayOfYear(date) {
        const start = new Date(date.getFullYear(), 0, 0);
        const diff = date - start;
        const oneDay = 1000 * 60 * 60 * 24;
        return Math.floor(diff / oneDay);
    }

    formatTime(time) {
        const period = time.hour >= 12 ? 'PM' : 'AM';
        let hour = time.hour % 12;
        if (hour === 0) hour = 12;
        return `${hour}:${time.minute.toString().padStart(2, '0')} ${period}`;
    }

    generateMonthlyCalendar() {
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        
        let calendarHTML = `
            <table class="calendar-table">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Fajr</th>
                        <th>Dhuhr</th>
                        <th>Asr</th>
                        <th>Maghrib</th>
                        <th>Isha</th>
                    </tr>
                </thead>
                <tbody>
        `;

        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(year, month, day);
            const times = this.calculateTimes(date);
            
            calendarHTML += `
                <tr>
                    <td>${day}/${month + 1}</td>
                    <td>${this.formatTime(times.fajr)}</td>
                    <td>${this.formatTime(times.dhuhr)}</td>
                    <td>${this.formatTime(times.asr)}</td>
                    <td>${this.formatTime(times.maghrib)}</td>
                    <td>${this.formatTime(times.isha)}</td>
                </tr>
            `;
        }

        calendarHTML += '</tbody></table>';
        return calendarHTML;
    }
}

// Slider functionality
class HeroSlider {
    constructor() {
        this.currentSlide = 0;
        this.slides = document.querySelectorAll('.slide');
        this.dotsContainer = document.querySelector('.slider-dots');
        this.init();
    }

    init() {
        this.createDots();
        this.startAutoSlide();
        this.addEventListeners();
    }

    createDots() {
        this.slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => this.goToSlide(index));
            this.dotsContainer.appendChild(dot);
        });
    }

    goToSlide(index) {
        this.slides[this.currentSlide].classList.remove('active');
        this.dotsContainer.children[this.currentSlide].classList.remove('active');
        
        this.currentSlide = index;
        
        this.slides[this.currentSlide].classList.add('active');
        this.dotsContainer.children[this.currentSlide].classList.add('active');
    }

    nextSlide() {
        const next = (this.currentSlide + 1) % this.slides.length;
        this.goToSlide(next);
    }

    prevSlide() {
        const prev = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.goToSlide(prev);
    }

    startAutoSlide() {
        setInterval(() => this.nextSlide(), 5000);
    }

    addEventListeners() {
        document.querySelector('.next-btn').addEventListener('click', () => this.nextSlide());
        document.querySelector('.prev-btn').addEventListener('click', () => this.prevSlide());
    }
}

// Form Handling
class FormHandler {
    constructor() {
        this.forms = document.querySelectorAll('form');
        this.init();
    }

    init() {
        this.forms.forEach(form => {
            form.addEventListener('submit', (e) => this.handleSubmit(e, form));
        });
    }

    handleSubmit(e, form) {
        e.preventDefault();
        
        // Basic validation
        if (!this.validateForm(form)) {
            this.showMessage('Please fill all required fields correctly.', 'error');
            return;
        }

        // Simulate form submission
        this.showMessage('Form submitted successfully! We will contact you soon.', 'success');
        form.reset();
        
        // In production, send data to server here
        this.sendToServer(form);
    }

    validateForm(form) {
        const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
        let isValid = true;

        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.style.borderColor = 'red';
            } else {
                input.style.borderColor = '#ddd';
            }
        });

        return isValid;
    }

    showMessage(message, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `form-message ${type}`;
        messageDiv.textContent = message;
        messageDiv.style.cssText = `
            padding: 15px;
            margin: 20px 0;
            border-radius: 4px;
            background: ${type === 'success' ? '#d4edda' : '#f8d7da'};
            color: ${type === 'success' ? '#155724' : '#721c24'};
            border: 1px solid ${type === 'success' ? '#c3e6cb' : '#f5c6cb'};
        `;

        const forms = document.querySelector('.form-container') || document.querySelector('form');
        forms.parentNode.insertBefore(messageDiv, forms);

        setTimeout(() => messageDiv.remove(), 5000);
    }

    sendToServer(form) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Simulate API call
        console.log('Form data to be sent:', data);
        
        // In production:
        // fetch('/api/submit-form', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(data)
        // })
    }
}

// Application Form Generator
class ApplicationForm {
    static generateForm(type) {
        const forms = {
            member: this.getMemberForm(),
            family: this.getFamilyForm(),
            zakath: this.getZakathForm(),
            marriage: this.getMarriageForm(),
            janaza: this.getJanazaForm()
        };
        return forms[type] || '';
    }

    static getMemberForm() {
        return `
            <div class="form-group">
                <label>Full Name *</label>
                <input type="text" name="full_name" required>
            </div>
            <div class="form-group">
                <label>Email *</label>
                <input type="email" name="email" required>
            </div>
            <div class="form-group">
                <label>Phone *</label>
                <input type="tel" name="phone" required>
            </div>
            <div class="form-group">
                <label>Address</label>
                <textarea name="address" rows="3"></textarea>
            </div>
            <button type="submit" class="btn-primary">Submit Application</button>
        `;
    }

    // Add other form templates similarly...
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize prayer times
    const prayerTimes = new PrayerTimes();
    
    // Update current prayer display
    function updateCurrentPrayer() {
        const times = prayerTimes.calculateTimes();
        const display = document.getElementById('currentPrayerTime');
        if (display) {
            display.innerHTML = `
                Fajr: ${prayerTimes.formatTime(times.fajr)} | 
                Dhuhr: ${prayerTimes.formatTime(times.dhuhr)} | 
                Asr: ${prayerTimes.formatTime(times.asr)}
            `;
        }
    }

    // Generate monthly calendar
    const calendarContainer = document.getElementById('prayerCalendar');
    if (calendarContainer) {
        calendarContainer.innerHTML = prayerTimes.generateMonthlyCalendar();
    }

    updateCurrentPrayer();
    setInterval(updateCurrentPrayer, 60000);

    // Initialize slider if exists
    const slider = document.querySelector('.hero-slider');
    if (slider) {
        new HeroSlider();
    }

    // Initialize form handling
    new FormHandler();

    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { PrayerTimes, HeroSlider, FormHandler };
}