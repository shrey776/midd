// Initialize AOS Animation Library
AOS.init({
    duration: 1000,
    once: true
});

// Navigation and Scroll Progress
const navbar = document.querySelector('.navbar');
const progressBar = document.querySelector('.progress-bar');
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

// Mobile Navigation Toggle
navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Scroll Progress and Navigation Style
window.addEventListener('scroll', () => {
    // Update progress bar
    const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (window.pageYOffset / totalScroll) * 100;
    progressBar.style.width = `${progress}%`;

    // Update navbar style
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Statistics Counter Animation
const stats = document.querySelectorAll('.stat-number');
const observerOptions = {
    threshold: 0.5
};

const startCounting = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = parseInt(entry.target.getAttribute('data-target'));
            const duration = 2000; // 2 seconds
            let current = 0;
            const increment = target / (duration / 16);
            
            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    entry.target.textContent = Math.round(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    entry.target.textContent = target;
                }
            };
            
            requestAnimationFrame(updateCounter);
            observer.unobserve(entry.target);
        }
    });
};

const observer = new IntersectionObserver(startCounting, observerOptions);
stats.forEach(stat => observer.observe(stat));

// Project Filter System
const projectData = [
    { id: 1, category: 'web', image: '/api/placeholder/400/300', title: 'E-commerce Platform' },
    { id: 2, category: 'mobile', image: '/api/placeholder/400/300', title: 'Fitness App' },
    { id: 3, category: 'cloud', image: '/api/placeholder/400/300', title: 'Cloud Storage Solution' },
    // Add more projects as needed
];

const projectGrid = document.querySelector('.project-grid');
const filterButtons = document.querySelectorAll('.filter-btn');

// Initialize projects
function displayProjects(category = 'all') {
    projectGrid.innerHTML = '';
    
    projectData.forEach(project => {
        if (category === 'all' || project.category === category) {
            const projectElement = document.createElement('div');
            projectElement.className = 'project-item';
            projectElement.innerHTML = `
                <img src="${project.image}" alt="${project.title}">
                <div class="project-overlay">
                    <h3>${project.title}</h3>
                    <a href="#" class="btn primary">View Project</a>
                </div>
            `;
            projectGrid.appendChild(projectElement);
        }
    });
}

// Filter functionality
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        displayProjects(button.getAttribute('data-filter'));
    });
});

// Initialize projects on load
displayProjects();

// Form Validation and Submission
const contactForm = document.querySelector('.contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Simulate form submission
    const submitButton = contactForm.querySelector('button[type="submit"]');
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitButton.disabled = true;
    
    setTimeout(() => {
        // Show success message
        const successMessage = document.createElement('div');
        successMessage.className = 'alert success';
        successMessage.innerHTML = `
            <i class="fas fa-check-circle"></i>
            Message sent successfully!
        `;
        contactForm.insertBefore(successMessage, contactForm.firstChild);
        
        // Reset form
        contactForm.reset();
        submitButton.innerHTML = 'Send Message <i class="fas fa-paper-plane"></i>';
        submitButton.disabled = false;
        
        // Remove success message after 3 seconds
        setTimeout(() => successMessage.remove(), 3000);
    }, 1500);
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});