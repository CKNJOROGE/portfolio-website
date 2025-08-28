document.addEventListener('DOMContentLoaded', () => {
    // Initialize EmailJS with your Public Key (User ID)
    emailjs.init("zjlhJ1ouO7IjDU2P2");

    // Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const isDarkMode = localStorage.getItem('darkMode') === 'true'; // Removed prefers-color-scheme check for manual control
    if (isDarkMode) {
        document.documentElement.classList.add('dark-mode');
        themeToggle.textContent = 'Light Theme';
    } else {
        themeToggle.textContent = 'Dark Theme';
    }
    themeToggle.addEventListener('click', () => {
        document.documentElement.classList.toggle('dark-mode');
        const darkModeEnabled = document.documentElement.classList.contains('dark-mode');
        localStorage.setItem('darkMode', darkModeEnabled);
        themeToggle.textContent = darkModeEnabled ? 'Light Theme' : 'Dark Theme';
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Neumorphic button press effect
    const neumorphicBtns = document.querySelectorAll('.neumorphic-btn, .neumorphic-btn-small');
    neumorphicBtns.forEach(btn => {
        btn.addEventListener('mousedown', () => {
            btn.style.boxShadow = 'inset 5px 5px 10px var(--neumorphic-shadow-dark), inset -5px -5px 10px var(--neumorphic-shadow-light)';
        });

        btn.addEventListener('mouseup', () => {
            btn.style.boxShadow = '8px 8px 16px var(--neumorphic-shadow-dark), -8px -8px 16px var(--neumorphic-shadow-light)';
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.boxShadow = '8px 8px 16px var(--neumorphic-shadow-dark), -8px -8px 16px var(--neumorphic-shadow-light)';
        });
    });

    // Contact form submission with validation
    const contactForm = document.getElementById('contact-form');
    const formError = document.getElementById('form-error');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            const submitButton = this.querySelector('button[type="submit"]');

            // Validation
            let errorMessage = '';
            if (!name) errorMessage = 'Name is required.';
            else if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errorMessage = 'A valid email is required.';
            else if (!message) errorMessage = 'Message is required.';

            if (errorMessage) {
                formError.textContent = errorMessage;
                formError.classList.add('show');
                submitButton.classList.remove('loading');
                submitButton.disabled = false;
                return;
            }

            formError.classList.remove('show');
            submitButton.classList.add('loading');
            submitButton.disabled = true;

            // Send email via EmailJS
            emailjs.send("service_u3l7lal", "template_k94cb23", {
                from_name: name,
                from_email: email,
                message: message
            })
            .then(response => {
                alert('Message sent successfully!');
                this.reset(); // Clear form
                submitButton.classList.remove('loading');
                submitButton.disabled = false;
            })
            .catch(error => {
                alert('Failed to send message. Please try again.');
                console.error('EmailJS error:', error);
                submitButton.classList.remove('loading');
                submitButton.disabled = false;
            });
        });
    }
});