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


// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize prayer times
    initializePrayerTimes();
    
    // Initialize copy buttons
    initializeCopyButtons();
    
    // Initialize mobile menu
    initializeMobileMenu();
    
    // Add animation to cards on scroll
    initializeScrollAnimations();
});

// Prayer Times Functionality
function initializePrayerTimes() {
    const prayerTimeElement = document.getElementById('currentPrayerTime');
    
    // Simulate fetching prayer times (in a real app, this would be an API call)
    const prayerTimes = {
        fajr: '5:15 AM',
        dhuhr: '12:30 PM',
        asr: '4:00 PM',
        maghrib: '6:15 PM',
        isha: '7:30 PM'
    };
    
    // Get current time
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();
    
    // Determine current prayer
    let currentPrayer = '';
    let nextPrayer = '';
    
    // Convert prayer times to minutes since midnight
    const prayerMinutes = {
        fajr: timeToMinutes(prayerTimes.fajr),
        dhuhr: timeToMinutes(prayerTimes.dhuhr),
        asr: timeToMinutes(prayerTimes.asr),
        maghrib: timeToMinutes(prayerTimes.maghrib),
        isha: timeToMinutes(prayerTimes.isha)
    };
    
    // Find current and next prayer
    const prayers = ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'];
    
    for (let i = 0; i < prayers.length; i++) {
        if (currentTime < prayerMinutes[prayers[i]]) {
            nextPrayer = prayers[i];
            currentPrayer = i === 0 ? 'isha' : prayers[i-1];
            break;
        }
    }
    
    // If no next prayer found, it's after Isha, so next is Fajr
    if (!nextPrayer) {
        nextPrayer = 'fajr';
        currentPrayer = 'isha';
    }
    
    // Format prayer names for display
    const prayerNames = {
        fajr: 'Fajr',
        dhuhr: 'Dhuhr',
        asr: 'Asr',
        maghrib: 'Maghrib',
        isha: 'Isha'
    };
    
    // Update display
    prayerTimeElement.textContent = `Next: ${prayerNames[nextPrayer]} at ${prayerTimes[nextPrayer]}`;
    
    // Update every minute
    setInterval(initializePrayerTimes, 60000);
}

// Helper function to convert time string to minutes since midnight
function timeToMinutes(timeStr) {
    const [time, modifier] = timeStr.split(' ');
    let [hours, minutes] = time.split(':').map(Number);
    
    if (modifier === 'PM' && hours !== 12) {
        hours += 12;
    }
    if (modifier === 'AM' && hours === 12) {
        hours = 0;
    }
    
    return hours * 60 + minutes;
}

// Copy to Clipboard Functionality
function initializeCopyButtons() {
    const copyButtons = document.querySelectorAll('.copy-btn');
    
    copyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const textToCopy = this.getAttribute('data-text');
            
            // Use the Clipboard API if available
            if (navigator.clipboard) {
                navigator.clipboard.writeText(textToCopy)
                    .then(() => {
                        showCopyFeedback(this, 'Copied!');
                    })
                    .catch(err => {
                        console.error('Failed to copy: ', err);
                        fallbackCopyText(textToCopy, this);
                    });
            } else {
                // Fallback for older browsers
                fallbackCopyText(textToCopy, this);
            }
        });
    });
}

// Fallback copy method for older browsers
function fallbackCopyText(text, button) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        const successful = document.execCommand('copy');
        if (successful) {
            showCopyFeedback(button, 'Copied!');
        } else {
            showCopyFeedback(button, 'Failed to copy');
        }
    } catch (err) {
        console.error('Fallback copy failed: ', err);
        showCopyFeedback(button, 'Failed to copy');
    }
    
    document.body.removeChild(textArea);
}

// Show feedback when text is copied
function showCopyFeedback(button, message) {
    const originalHTML = button.innerHTML;
    button.innerHTML = `<i class="fas fa-check"></i> ${message}`;
    button.style.color = 'var(--success-color)';
    
    setTimeout(() => {
        button.innerHTML = originalHTML;
        button.style.color = '';
    }, 2000);
}

// Mobile Menu Functionality
function initializeMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const authButtons = document.querySelector('.auth-buttons');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
            authButtons.classList.toggle('active');
            
            // Animate hamburger icon
            const spans = this.querySelectorAll('span');
            if (this.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            authButtons.classList.remove('active');
            
            const spans = hamburger.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });
}

// Scroll Animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe bank cards and info cards
    const cards = document.querySelectorAll('.bank-card, .info-card');
    cards.forEach(card => {
        observer.observe(card);
    });
}

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    .bank-card, .info-card {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .bank-card.animate-in, .info-card.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .nav-menu.active, .auth-buttons.active {
        display: flex !important;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        background: white;
        box-shadow: 0 5px 10px rgba(0,0,0,0.1);
        z-index: 100;
    }
    
    .nav-menu.active {
        padding: 20px 0;
    }
    
    .auth-buttons.active {
        padding: 15px 0;
        gap: 10px;
        align-items: center;
    }
    
    .nav-menu.active li {
        width: 100%;
    }
    
    .nav-menu.active a {
        padding: 12px 20px;
        border-bottom: 1px solid #eee;
    }
    
    .dropdown-menu {
        position: static;
        box-shadow: none;
        opacity: 1;
        visibility: visible;
        transform: none;
        display: none;
    }
    
    .dropdown.active .dropdown-menu {
        display: block;
    }
`;

document.head.appendChild(style);

// Handle dropdowns on mobile
document.addEventListener('DOMContentLoaded', function() {
    const dropdowns = document.querySelectorAll('.dropdown > a');
    
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                const parent = this.parentElement;
                parent.classList.toggle('active');
            }
        });
    });
});



// bitulmahal page edits//

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize prayer times
    initializePrayerTimes();
    
    // Initialize copy buttons
    initializeCopyButtons();
    
    // Initialize mobile menu
    initializeMobileMenu();
    
    // Initialize FAQ functionality
    initializeFAQ();
    
    // Initialize stats counter
    initializeStatsCounter();
    
    // Add animation to elements on scroll
    initializeScrollAnimations();
});

// Prayer Times Functionality
function initializePrayerTimes() {
    const prayerTimeElement = document.getElementById('currentPrayerTime');
    
    // Simulate fetching prayer times (in a real app, this would be an API call)
    const prayerTimes = {
        fajr: '5:15 AM',
        dhuhr: '12:30 PM',
        asr: '4:00 PM',
        maghrib: '6:15 PM',
        isha: '7:30 PM'
    };
    
    // Get current time
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();
    
    // Determine current prayer
    let currentPrayer = '';
    let nextPrayer = '';
    
    // Convert prayer times to minutes since midnight
    const prayerMinutes = {
        fajr: timeToMinutes(prayerTimes.fajr),
        dhuhr: timeToMinutes(prayerTimes.dhuhr),
        asr: timeToMinutes(prayerTimes.asr),
        maghrib: timeToMinutes(prayerTimes.maghrib),
        isha: timeToMinutes(prayerTimes.isha)
    };
    
    // Find current and next prayer
    const prayers = ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'];
    
    for (let i = 0; i < prayers.length; i++) {
        if (currentTime < prayerMinutes[prayers[i]]) {
            nextPrayer = prayers[i];
            currentPrayer = i === 0 ? 'isha' : prayers[i-1];
            break;
        }
    }
    
    // If no next prayer found, it's after Isha, so next is Fajr
    if (!nextPrayer) {
        nextPrayer = 'fajr';
        currentPrayer = 'isha';
    }
    
    // Format prayer names for display
    const prayerNames = {
        fajr: 'Fajr',
        dhuhr: 'Dhuhr',
        asr: 'Asr',
        maghrib: 'Maghrib',
        isha: 'Isha'
    };
    
    // Update display
    prayerTimeElement.textContent = `Next: ${prayerNames[nextPrayer]} at ${prayerTimes[nextPrayer]}`;
    
    // Update every minute
    setInterval(initializePrayerTimes, 60000);
}

// Helper function to convert time string to minutes since midnight
function timeToMinutes(timeStr) {
    const [time, modifier] = timeStr.split(' ');
    let [hours, minutes] = time.split(':').map(Number);
    
    if (modifier === 'PM' && hours !== 12) {
        hours += 12;
    }
    if (modifier === 'AM' && hours === 12) {
        hours = 0;
    }
    
    return hours * 60 + minutes;
}

// Copy to Clipboard Functionality
function initializeCopyButtons() {
    const copyButtons = document.querySelectorAll('.copy-btn');
    
    copyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const textToCopy = this.getAttribute('data-text');
            
            // Use the Clipboard API if available
            if (navigator.clipboard) {
                navigator.clipboard.writeText(textToCopy)
                    .then(() => {
                        showCopyFeedback(this, 'Copied!');
                    })
                    .catch(err => {
                        console.error('Failed to copy: ', err);
                        fallbackCopyText(textToCopy, this);
                    });
            } else {
                // Fallback for older browsers
                fallbackCopyText(textToCopy, this);
            }
        });
    });
}

// Fallback copy method for older browsers
function fallbackCopyText(text, button) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        const successful = document.execCommand('copy');
        if (successful) {
            showCopyFeedback(button, 'Copied!');
        } else {
            showCopyFeedback(button, 'Failed to copy');
        }
    } catch (err) {
        console.error('Fallback copy failed: ', err);
        showCopyFeedback(button, 'Failed to copy');
    }
    
    document.body.removeChild(textArea);
}

// Show feedback when text is copied
function showCopyFeedback(button, message) {
    const originalHTML = button.innerHTML;
    button.innerHTML = `<i class="fas fa-check"></i> ${message}`;
    button.style.color = 'var(--success-color)';
    
    setTimeout(() => {
        button.innerHTML = originalHTML;
        button.style.color = '';
    }, 2000);
}

// Mobile Menu Functionality
function initializeMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const authButtons = document.querySelector('.auth-buttons');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
            authButtons.classList.toggle('active');
            
            // Animate hamburger icon
            const spans = this.querySelectorAll('span');
            if (this.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            authButtons.classList.remove('active');
            
            const spans = hamburger.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });
}

// FAQ Functionality
function initializeFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
}

// Stats Counter Animation
function initializeStatsCounter() {
    const stats = [
        { element: document.getElementById('familiesHelped'), target: 150, duration: 2000 },
        { element: document.getElementById('projectsCompleted'), target: 85, duration: 2000 },
        { element: document.getElementById('activeApplications'), target: 12, duration: 2000 }
    ];
    
    let animated = false;
    
    function animateStats() {
        if (animated) return;
        
        stats.forEach(stat => {
            if (stat.element && isElementInViewport(stat.element)) {
                animateValue(stat.element, 0, stat.target, stat.duration);
                animated = true;
            }
        });
    }
    
    // Check if stats are in viewport on scroll
    window.addEventListener('scroll', animateStats);
    
    // Initial check
    animateStats();
}

// Animate value from start to end
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value + (end > 100 ? '+' : '');
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Check if element is in viewport
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Scroll Animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements to animate
    const elementsToAnimate = document.querySelectorAll('.feature, .step, .story-card, .bank-card');
    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });
}

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    .feature, .step, .story-card, .bank-card {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .feature.animate-in, .step.animate-in, .story-card.animate-in, .bank-card.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .nav-menu.active, .auth-buttons.active {
        display: flex !important;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        background: white;
        box-shadow: 0 5px 10px rgba(0,0,0,0.1);
        z-index: 100;
    }
    
    .nav-menu.active {
        padding: 20px 0;
    }
    
    .auth-buttons.active {
        padding: 15px 0;
        gap: 10px;
        align-items: center;
    }
    
    .nav-menu.active li {
        width: 100%;
    }
    
    .nav-menu.active a {
        padding: 12px 20px;
        border-bottom: 1px solid #eee;
    }
    
    .dropdown-menu {
        position: static;
        box-shadow: none;
        opacity: 1;
        visibility: visible;
        transform: none;
        display: none;
    }
    
    .dropdown.active .dropdown-menu {
        display: block;
    }
`;

document.head.appendChild(style);

// Handle dropdowns on mobile
document.addEventListener('DOMContentLoaded', function() {
    const dropdowns = document.querySelectorAll('.dropdown > a');
    
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                const parent = this.parentElement;
                parent.classList.toggle('active');
            }
        });
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    });
});


// ANUAL REPORT PAGE JS//

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize prayer times
    initializePrayerTimes();
    
    // Initialize mobile menu
    initializeMobileMenu();
    
    // Initialize budget charts
    initializeBudgetCharts();
    
    // Initialize budget tabs
    initializeBudgetTabs();
    
    // Initialize animations
    initializeAnimations();
});

// Prayer Times Functionality
function initializePrayerTimes() {
    const prayerTimeElement = document.getElementById('currentPrayerTime');
    
    // Simulate fetching prayer times
    const prayerTimes = {
        fajr: '5:15 AM',
        dhuhr: '12:30 PM',
        asr: '4:00 PM',
        maghrib: '6:15 PM',
        isha: '7:30 PM'
    };
    
    // Get current time
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();
    
    // Determine current prayer
    let nextPrayer = '';
    
    // Convert prayer times to minutes since midnight
    const prayerMinutes = {
        fajr: timeToMinutes(prayerTimes.fajr),
        dhuhr: timeToMinutes(prayerTimes.dhuhr),
        asr: timeToMinutes(prayerTimes.asr),
        maghrib: timeToMinutes(prayerTimes.maghrib),
        isha: timeToMinutes(prayerTimes.isha)
    };
    
    // Find next prayer
    const prayers = ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'];
    
    for (let i = 0; i < prayers.length; i++) {
        if (currentTime < prayerMinutes[prayers[i]]) {
            nextPrayer = prayers[i];
            break;
        }
    }
    
    // If no next prayer found, it's after Isha, so next is Fajr
    if (!nextPrayer) {
        nextPrayer = 'fajr';
    }
    
    // Format prayer names for display
    const prayerNames = {
        fajr: 'Fajr',
        dhuhr: 'Dhuhr',
        asr: 'Asr',
        maghrib: 'Maghrib',
        isha: 'Isha'
    };
    
    // Update display
    prayerTimeElement.textContent = `Next: ${prayerNames[nextPrayer]} at ${prayerTimes[nextPrayer]}`;
    
    // Update every minute
    setInterval(initializePrayerTimes, 60000);
}

// Helper function to convert time string to minutes since midnight
function timeToMinutes(timeStr) {
    const [time, modifier] = timeStr.split(' ');
    let [hours, minutes] = time.split(':').map(Number);
    
    if (modifier === 'PM' && hours !== 12) {
        hours += 12;
    }
    if (modifier === 'AM' && hours === 12) {
        hours = 0;
    }
    
    return hours * 60 + minutes;
}

// Mobile Menu Functionality
function initializeMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const authButtons = document.querySelector('.auth-buttons');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
            authButtons.classList.toggle('active');
            
            // Animate hamburger icon
            const spans = this.querySelectorAll('span');
            if (this.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            authButtons.classList.remove('active');
            
            const spans = hamburger.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });
}

// Budget Charts
function initializeBudgetCharts() {
    // Income Pie Chart
    const incomeCtx = document.getElementById('incomePieChart').getContext('2d');
    const incomeChart = new Chart(incomeCtx, {
        type: 'pie',
        data: {
            labels: ['Monthly Donations', 'Zakath Collections', 'Bitulmahal Fund', 'Event Fundraising', 'Other Sources'],
            datasets: [{
                data: [45, 23, 12, 10, 10],
                backgroundColor: [
                    '#1a5f7a',
                    '#159895',
                    '#57c5b6',
                    '#88d3ce',
                    '#b8e0d8'
                ],
                borderWidth: 2,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.raw || 0;
                            return `${label}: ${value}% (LKR ${formatCurrency(value * 7800000 / 100)})`;
                        }
                    }
                }
            }
        }
    });

    // Expense Pie Chart
    const expenseCtx = document.getElementById('expensePieChart').getContext('2d');
    const expenseChart = new Chart(expenseCtx, {
        type: 'pie',
        data: {
            labels: ['Masjid Maintenance', 'Utilities & Bills', 'Community Services', 'Educational Programs', 'Bitulmahal Projects', 'Administrative Costs'],
            datasets: [{
                data: [29, 15, 19, 14, 12, 11],
                backgroundColor: [
                    '#1a5f7a',
                    '#159895',
                    '#57c5b6',
                    '#88d3ce',
                    '#b8e0d8',
                    '#d4f1f4'
                ],
                borderWidth: 2,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.raw || 0;
                            return `${label}: ${value}% (LKR ${formatCurrency(value * 6200000 / 100)})`;
                        }
                    }
                }
            }
        }
    });

    // Create legends
    createChartLegend('incomeLegend', incomeChart);
    createChartLegend('expenseLegend', expenseChart);

    // Budget Comparison Chart
    const comparisonCtx = document.getElementById('budgetComparisonChart').getContext('2d');
    const comparisonChart = new Chart(comparisonCtx, {
        type: 'bar',
        data: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June'],
            datasets: [
                {
                    label: 'Budgeted',
                    data: [650000, 650000, 650000, 650000, 650000, 650000],
                    backgroundColor: '#1a5f7a',
                    borderColor: '#1a5f7a',
                    borderWidth: 1
                },
                {
                    label: 'Actual',
                    data: [620000, 580000, 670000, 710000, 590000, 630000],
                    backgroundColor: '#57c5b6',
                    borderColor: '#57c5b6',
                    borderWidth: 1
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return 'LKR ' + (value / 1000) + 'K';
                        }
                    },
                    title: {
                        display: true,
                        text: 'Amount (LKR)'
                    }
                }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': LKR ' + formatCurrency(context.raw);
                        }
                    }
                }
            }
        }
    });
}

// Create chart legends
function createChartLegend(containerId, chart) {
    const container = document.getElementById(containerId);
    const data = chart.data;
    
    data.labels.forEach((label, index) => {
        const legendItem = document.createElement('div');
        legendItem.className = 'legend-item';
        
        const colorBox = document.createElement('div');
        colorBox.className = 'legend-color';
        colorBox.style.backgroundColor = data.datasets[0].backgroundColor[index];
        
        const text = document.createElement('span');
        text.textContent = `${label} (${data.datasets[0].data[index]}%)`;
        
        legendItem.appendChild(colorBox);
        legendItem.appendChild(text);
        container.appendChild(legendItem);
    });
}

// Format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-LK').format(Math.round(amount));
}

// Budget Tabs
function initializeBudgetTabs() {
    const tabHeaders = document.querySelectorAll('.tab-header');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all headers and panes
            tabHeaders.forEach(h => h.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));
            
            // Add active class to clicked header and corresponding pane
            this.classList.add('active');
            document.getElementById(`${targetTab}-tab`).classList.add('active');
        });
    });
}

// Animations
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements to animate
    const elementsToAnimate = document.querySelectorAll('.summary-card, .chart-card, .project-card, .report-card');
    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });
}

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    .summary-card, .chart-card, .project-card, .report-card {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .summary-card.animate-in, .chart-card.animate-in, .project-card.animate-in, .report-card.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .nav-menu.active, .auth-buttons.active {
        display: flex !important;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        background: white;
        box-shadow: 0 5px 10px rgba(0,0,0,0.1);
        z-index: 100;
    }
    
    .nav-menu.active {
        padding: 20px 0;
    }
    
    .auth-buttons.active {
        padding: 15px 0;
        gap: 10px;
        align-items: center;
    }
    
    .nav-menu.active li {
        width: 100%;
    }
    
    .nav-menu.active a {
        padding: 12px 20px;
        border-bottom: 1px solid #eee;
    }
    
    .dropdown-menu {
        position: static;
        box-shadow: none;
        opacity: 1;
        visibility: visible;
        transform: none;
        display: none;
    }
    
    .dropdown.active .dropdown-menu {
        display: block;
    }
`;

document.head.appendChild(style);

// Handle dropdowns on mobile
document.addEventListener('DOMContentLoaded', function() {
    const dropdowns = document.querySelectorAll('.dropdown > a');
    
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                const parent = this.parentElement;
                parent.classList.toggle('active');
            }
        });
    });
});



// ===== HERO SLIDER =====
let slideIndex = 0;
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");

function showSlide(n) {
    slides.forEach((slide, i) => {
        slide.classList.toggle("active", i === n);
        dots[i].classList.toggle("active", i === n);
    });
}

document.getElementById("nextSlide").onclick = () => {
    slideIndex = (slideIndex + 1) % slides.length;
    showSlide(slideIndex);
};

document.getElementById("prevSlide").onclick = () => {
    slideIndex = (slideIndex - 1 + slides.length) % slides.length;
    showSlide(slideIndex);
};

dots.forEach((dot, i) => {
    dot.onclick = () => {
        slideIndex = i;
        showSlide(i);
    };
});

setInterval(() => {
    slideIndex = (slideIndex + 1) % slides.length;
    showSlide(slideIndex);
}, 5000);

function copyText(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert("Copied to clipboard: " + text);
    });
}