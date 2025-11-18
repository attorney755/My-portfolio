// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const navToggle = document.getElementById('nav-toggle');
    const navClose = document.getElementById('nav-close');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.add('active');
        });
    }
    
    if (navClose) {
        navClose.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    }
    
    // Close mobile menu when clicking on a nav link
    const navLinks = document.querySelectorAll('.nav__link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
    
    // Header scroll effect
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = 'white';
            header.style.backdropFilter = 'none';
        }
    });
    
    // Animate skill bars when they come into view
    const skillBars = document.querySelectorAll('.skill__progress');
    
    const animateSkillBars = () => {
        skillBars.forEach(bar => {
            const percentage = bar.getAttribute('data-percentage');
            if (isElementInViewport(bar)) {
                bar.style.width = percentage + '%';
            }
        });
    };
    
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
    
    // Initial check and add scroll listener
    animateSkillBars();
    window.addEventListener('scroll', animateSkillBars);
    
    // Project Modal
    const projectButtons = document.querySelectorAll('.project__button');
    const modal = document.getElementById('project-modal');
    const modalClose = document.querySelector('.modal__close');
    const modalBody = document.querySelector('.modal__body');
    
    // Project data
    const projects = {
        1: {
            title: "Stock Management System",
            description: "A comprehensive inventory management solution for Amasumo C, LTD that streamlines stock tracking, order processing, and reporting.",
            longDescription: "This system was developed to address the specific inventory management needs of Amasumo C, LTD. It provides real-time tracking of stock levels, automated reordering, sales analytics, and comprehensive reporting features. The system has improved inventory accuracy by 95% and reduced stockouts by 80%.",
            technologies: ["PHP", "MySQL", "JAVASCRIPT", "CODEIGNITER", "JQUERY", "HTML5", "CSS3"],
            features: [
                "Real-time inventory tracking",
                "Automated reorder points",
                "Sales analytics and reporting",
                "Multi-user access with role-based permissions",
                "Barcode scanning integration"
            ],
            images: [
                "../static/images/am2.png",
                "../static/images/am3.png",
                "../static/images/am4.png"
            ],
            demoLink: "https://amasumo-co-ltd.netlify.app/",
            githubLink: "https://github.com/attorney755/Stock_management_system"
        },
        2: {
            title: "Think Tank Website",
            description: "A professional website for a research organization featuring publications, events, and team information.",
            longDescription: "A professional website for our final think-tank project, where you can find our mission, problem statement and solution, and E-lab challenges.",
            technologies: ["HTML5", "CSS3", "JAVASCRIPT"],
            features: [
                "Responsive design for all devices",
                "Mission & Vision",
                "Problem statement & Solution",
                " E-lab Challenges",
                "Team member profiles with expertise areas"
            ],
            images: [
               "../static/images/peaky2.png",
               "../static/images/peaky3.png",
                "../static/images/peaky4.png"
            ],
            demoLink: "https://alupeakyblinders.netlify.app/",
            githubLink: "https://github.com/attorney755" 
        },
        3: {
            title: "Urban Mobility Data Explorer",
            description: "Interactive dashboard for analyzing taxi trip data with visualizations and filtering options.",
            longDescription: "This data visualization platform was developed to help urban planners and transportation analysts understand taxi trip patterns in major cities. The dashboard processes millions of data points to provide insights into travel patterns, peak hours, popular routes, and fare analysis.",
            technologies: ["PYTHON3", "JAVASCRIPT", "FLASK 2.3.2", "MYSQL DB", "HTML5", "CSS3"],
            features: [
                "Interactive map visualization of taxi trips",
                "Time-based filtering and analysis",
                "Revenue and fare analysis tools",
                "Peak hour identification",
                "Export functionality for reports"
            ],
            images: [
                "../static/images/urb2.png",
                "../static/images/urb3.png",
                "../static/images/urb4.png"
            ],
            demoLink: "https://github.com/attorney755/Urban-Mobility-Data-Explorer",
            githubLink: "https://github.com/attorney755/Urban-Mobility-Data-Explorer"
        },
        4: {
            title: "Country Information App",
            description: "Fetches and displays country data using the RestCountries API with charts and detailed information.",
            longDescription: "This educational application provides comprehensive information about countries worldwide. Users can search for any country and view detailed information including population statistics, geographic data, economic indicators, and cultural facts. The app features interactive charts and maps for better data visualization.",
            technologies: ["DOCKER", "REST API", "CSS3", "HTML5", "JAVASCRIPT", ""],
            features: [
                "Search and filter countries by various criteria",
                "Detailed country profiles with multiple data points",
                "Interactive population, area, and other metrics",
                "Responsive design for mobile and desktop",
                "Integration with RestCountries API for real-time data"
            ],
            images: [
                "../static/images/cou2.png",
                "../static/images/cou3.png",
                "../static/images/cou4.png"
            ],
            demoLink: "https://github.com/attorney755/Urban-Mobility-Data-Explorer",
            githubLink: "https://github.com/attorney755/Urban-Mobility-Data-Explorer"
        },
        5: {
            title: "Hills Market Rwanda",
            description: "A direct buyer-seller marketplace platform for  products in Rwanda.",
            longDescription: "Hills Market Rwanda is an e-commerce platform designed to connect farmers directly with buyers, eliminating middlemen and ensuring fair prices. The platform includes features for product listing. It has helped hundreds of sellers increase their income by 30% on average.",
            technologies: ["FLASK", "PYTHON3", "CLOUD STORAGE", "HTML5", "CSS3", "JAVASCRIPT"],
            features: [
                "User authentication and profile management",
                "Product listing and search functionality",
                "Connects buyers directly with sellers",               
                "Mobile-responsive design"
            ],
            images: [
                "../static/images/hill2.png",
                "../static/images/hill3.png",
                "../static/images/hill4.png"
            ],
            demoLink: "https://hills-market-rwanda.duckdns.org/",
            githubLink: "https://github.com/attorney755/Hills-Market"
        }
    };
    
    // Open modal when project button is clicked
    projectButtons.forEach(button => {
        button.addEventListener('click', function() {
            const projectId = this.getAttribute('data-project');
            const project = projects[projectId];
            
            if (project) {
                modalBody.innerHTML = `
                    <div class="modal__header">
                        <h2 class="modal__title">${project.title}</h2>
                    </div>
                    
                    <div class="project-gallery">
                        <div class="main-image-container">
                            <img src="${project.images[0]}" alt="${project.title}" class="main-image" id="main-project-image">
                            <button class="nav-button prev">
                                <i class="fas fa-chevron-left"></i>
                            </button>
                            <button class="nav-button next">
                                <i class="fas fa-chevron-right"></i>
                            </button>
                            <div class="image-counter">
                                <span id="current-image">1</span> / <span id="total-images">${project.images.length}</span>
                            </div>
                        </div>
                        
                        <div class="thumbnail-gallery">
                            ${project.images.map((image, index) => 
                                `<div class="thumbnail-card ${index === 0 ? 'active' : ''}" data-image="${image}">
                                    <img src="${image}" alt="${project.title} - View ${index + 1}">
                                </div>`
                            ).join('')}
                        </div>
                    </div>
                    
                    <div class="modal__description">
                        <h3>Project Description</h3>
                        <p>${project.longDescription}</p>
                    </div>
                    
                    <div class="modal__technologies">
                        <h3>Technologies Used</h3>
                        <div class="modal__tech-list">
                            ${project.technologies.map(tech => `<span class="tech__tag">${tech}</span>`).join('')}
                        </div>
                    </div>
                    
                    <div class="modal__features">
                        <h3>Key Features</h3>
                        <ul>
                            ${project.features.map(feature => `<li>${feature}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="modal__links">
                        <a href="${project.demoLink}" class="button button--primary" target="_blank">Live Demo</a>
                        <a href="${project.githubLink}" class="button button--secondary" target="_blank">GitHub</a>
                    </div>
                `;
                
                // Initialize image navigation
                let currentImageIndex = 0;
                const mainImage = modalBody.querySelector('#main-project-image');
                const prevButton = modalBody.querySelector('.nav-button.prev');
                const nextButton = modalBody.querySelector('.nav-button.next');
                const currentImageSpan = modalBody.querySelector('#current-image');
                const totalImagesSpan = modalBody.querySelector('#total-images');
                const thumbnailCards = modalBody.querySelectorAll('.thumbnail-card');

                // Update image function
                function updateImage() {
                    mainImage.src = project.images[currentImageIndex];
                    currentImageSpan.textContent = currentImageIndex + 1;
                    totalImagesSpan.textContent = project.images.length;
                    
                    // Update active thumbnail
                    thumbnailCards.forEach((card, index) => {
                        if (index === currentImageIndex) {
                            card.classList.add('active');
                        } else {
                            card.classList.remove('active');
                        }
                    });
                }

                // Previous button event
                prevButton.addEventListener('click', function() {
                    currentImageIndex = (currentImageIndex - 1 + project.images.length) % project.images.length;
                    updateImage();
                });

                // Next button event
                nextButton.addEventListener('click', function() {
                    currentImageIndex = (currentImageIndex + 1) % project.images.length;
                    updateImage();
                });

                // Thumbnail click events
                thumbnailCards.forEach((card, index) => {
                    card.addEventListener('click', function() {
                        currentImageIndex = index;
                        updateImage();
                    });
                });
                
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    // Close modal
    modalClose.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Contact form validation and submission
   const contactForm = document.querySelector('.contact__form');

if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const name = this.querySelector('input[type="text"]').value.trim();
        const email = this.querySelector('input[type="email"]').value.trim();
        const message = this.querySelector('textarea').value.trim();
        
        // Simple validation
        if (!name || !email || !message) {
            showAlert('Please fill in all fields.', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showAlert('Please enter a valid email address.', 'error');
            return;
        }
        
        if (message.length < 10) {
            showAlert('Message must be at least 10 characters long.', 'error');
            return;
        }
        
        // Show loading state
        const submitButton = this.querySelector('.form__button');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        try {
            // USE EMAILJS INSTEAD OF FETCH
            const templateParams = {
                from_name: name,
                from_email: email,
                message: message,
                reply_to: email
            };
            
            // REPLACE THESE WITH YOUR ACTUAL IDs:
            const serviceID = 'service_mz7io2y';           // Your service name in EmailJS
            const templateID = 'template_vn1m5c2';   // Your template ID from EmailJS
            
            console.log('Sending email...', { serviceID, templateID, templateParams });
            
            const response = await emailjs.send(serviceID, templateID, templateParams);
            
            console.log('Email sent successfully:', response);
            
            if (response.status === 200) {
                showAlert('Thank you for your message! I will get back to you soon.', 'success');
                this.reset();
            } else {
                showAlert('Failed to send message. Please try again later.', 'error');
            }
            
        } catch (error) {
            console.error('EmailJS error details:', error);
            showAlert('Failed to send message. Please try again later.', 'error');
        } finally {
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }
    });
}

    // Alert function
    function showAlert(message, type) {
        // Remove existing alerts
        const existingAlert = document.querySelector('.form-alert');
        if (existingAlert) {
            existingAlert.remove();
        }
        
        // Create alert element
        const alert = document.createElement('div');
        alert.className = `form-alert form-alert--${type}`;
        alert.textContent = message;
        
        // Add styles
        alert.style.cssText = `
            padding: 12px 16px;
            margin: 15px 0;
            border-radius: 5px;
            font-weight: 500;
            text-align: center;
            ${type === 'success' ? 
                'background: #d4edda; color: #155724; border: 1px solid #c3e6cb;' : 
                'background: #f8d7da; color: #721c24; border: 1px solid #f5c6cb;'
            }
        `;
        
        // Insert after the form
        const contactForm = document.querySelector('.contact__form');
        contactForm.parentNode.insertBefore(alert, contactForm.nextSibling);
        
        // Remove alert after 5 seconds
        setTimeout(() => {
            if (alert.parentNode) {
                alert.parentNode.removeChild(alert);
            }
        }, 5000);
    }
    
    // Add animation on scroll for sections
    const sections = document.querySelectorAll('.section');
    
    const checkSectionInView = () => {
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight * 0.85) {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Initialize sections with hidden state
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Initial check and add scroll listener
    checkSectionInView();
    window.addEventListener('scroll', checkSectionInView);
    
    // Scroll to top functionality
    const scrollTopBtn = document.getElementById('scroll-top');
    
    // Show/hide scroll to top button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('active');
        } else {
            scrollTopBtn.classList.remove('active');
        }
    });
    
    // Scroll to top when button is clicked
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});
