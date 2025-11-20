// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize prayer times
    initializePrayerTimes();
    
    // Initialize mobile menu
    initializeMobileMenu();
    
    // Initialize projects
    initializeProjects();
    
    // Initialize filter functionality
    initializeProjectFilter();
    
    // Initialize search functionality
    initializeProjectSearch();
    
    // Initialize load more button
    initializeLoadMore();
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

// Projects Data
const projectsData = [
    {
        id: 1,
        title: "New Masjid Construction",
        category: "construction",
        description: "Construction of a new masjid in Negombo East to serve the growing Muslim community in the area.",
        budget: "LKR 2,500,000",
        progress: 65,
        startDate: "Jan 2024",
        endDate: "Dec 2024",
        image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        volunteers: 45
    },
    {
        id: 2,
        title: "Main Masjid Renovation",
        category: "renovation",
        description: "Complete renovation of the main prayer hall, including new flooring, lighting, and sound system.",
        budget: "LKR 1,200,000",
        progress: 90,
        startDate: "Mar 2024",
        endDate: "Aug 2024",
        image: "https://images.unsplash.com/photo-15916073883493-de7115625113?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        volunteers: 25
    },
    {
        id: 3,
        title: "Islamic Education Center",
        category: "education",
        description: "Establishment of a dedicated center for Islamic studies for children and adults.",
        budget: "LKR 800,000",
        progress: 30,
        startDate: "Jun 2024",
        endDate: "Dec 2024",
        image: "https://images.unsplash.com/photo-1588072432836-e10032774350?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        volunteers: 35
    },
    {
        id: 4,
        title: "Community Library",
        category: "community",
        description: "Creation of a community library with Islamic literature and learning resources.",
        budget: "LKR 500,000",
        progress: 15,
        startDate: "Aug 2024",
        endDate: "Nov 2024",
        image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        volunteers: 20
    },
    {
        id: 5,
        title: "Youth Activity Center",
        category: "community",
        description: "Development of a dedicated space for youth activities and programs.",
        budget: "LKR 1,500,000",
        progress: 10,
        startDate: "Sep 2024",
        endDate: "Mar 2025",
        image: "https://images.unsplash.com/photo-1532635242-8e2ee93e8c14?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        volunteers: 30
    },
    {
        id: 6,
        title: "Elderly Care Facility",
        category: "community",
        description: "Construction of a facility to provide care and activities for elderly community members.",
        budget: "LKR 2,000,000",
        progress: 5,
        startDate: "Oct 2024",
        endDate: "Jun 2025",
        image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        volunteers: 40
    }
];

// Initialize Projects
function initializeProjects() {
    const container = document.getElementById('projectsContainer');
    container.innerHTML = '';
    
    projectsData.forEach(project => {
        const projectCard = createProjectCard(project);
        container.appendChild(projectCard);
    });
}

// Create Project Card
function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = `project-card ${project.category}`;
    card.setAttribute('data-category', project.category);
    
    card.innerHTML = `
        <div class="project-image">
            <img src="${project.image}" alt="${project.title}">
            <span class="project-badge badge-${project.category}">${project.category.charAt(0).toUpperCase() + project.category.slice(1)}</span>
        </div>
        <div class="project-content">
            <div class="project-header">
                <h3>${project.title}</h3>
                <span class="project-budget">${project.budget}</span>
            </div>
            <p class="project-description">${project.description}</p>
            <div class="project-meta">
                <span><i class="fas fa-calendar"></i> ${project.startDate} - ${project.endDate}</span>
                <span><i class="fas fa-users"></i> ${project.volunteers} volunteers</span>
            </div>
            <div class="project-progress">
                <div class="progress-info">
                    <span>Progress</span>
                    <span class="progress-percent">${project.progress}%</span>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${project.progress}%"></div>
                </div>
            </div>
            <div class="project-actions">
                <a href="project-details.html?id=${project.id}" class="btn btn-primary">View Details</a>
                <a href="volunteer-application.html?project=${project.id}" class="btn btn-outline">Volunteer</a>
            </div>
        </div>
    `;
    
    return card;
}

// Project Filter Functionality
function initializeProjectFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Project Search Functionality
function initializeProjectSearch() {
    const searchInput = document.getElementById('projectSearch');
    const projectCards = document.querySelectorAll('.project-card');
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        
        projectCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('.project-description').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || description.includes(searchTerm)) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 100);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
}

// Load More Functionality
function initializeLoadMore() {
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    let displayedProjects = 6; // Initial number of projects displayed
    
    // Initially hide the button if we have fewer projects
    if (projectsData.length <= 6) {
        loadMoreBtn.style.display = 'none';
    }
    
    loadMoreBtn.addEventListener('click', function() {
        // In a real application, this would load more projects from an API
        // For this demo, we'll just show an alert
        alert('Loading more projects... In a real application, this would fetch additional projects from the server.');
        
        // You could implement actual loading logic here
        // For now, we'll just hide the button after clicking
        this.style.display = 'none';
    });
}

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
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