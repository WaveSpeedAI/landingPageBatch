// Mobile menu functionality
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', function () {
        mobileMenu.classList.toggle('hidden');
    });
}

// Navbar scroll effect
window.addEventListener('scroll', function () {
    const navbar = document.getElementById('navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
            navbar.classList.remove('bg-primary/95');
        } else {
            navbar.classList.remove('navbar-scrolled');
            navbar.classList.add('bg-primary/95');
        }
    }
});

// Upload area functionality
const fileInput = document.getElementById('fileInput');
const processButton = document.getElementById('processButton');

// File validation function
function validateFile(file) {
    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (!validTypes.includes(file.type)) {
        alert('Please upload a valid image file (JPG, PNG, or WebP).');
        return false;
    }

    if (file.size > maxSize) {
        alert('File size exceeds 10MB limit. Please choose a smaller image.');
        return false;
    }

    return true;
}

// File input change
if (fileInput) {
    fileInput.addEventListener('change', function () {
        if (fileInput.files.length > 0) {
            const file = fileInput.files[0];
            if (validateFile(file)) {
                console.log('File selected:', file.name);
            }
        }
    });
}

// Process button click
if (processButton) {
    processButton.addEventListener('click', function () {
        if (!fileInput || fileInput.files.length === 0) {
            alert('Please select an image first.');
            return;
        }

        const file = fileInput.files[0];
        if (validateFile(file)) {
            processButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Processing...';
            processButton.disabled = true;

            setTimeout(function () {
                alert('Image processed successfully! In a real implementation, this would show the result.');
                processButton.innerHTML = '<i class="fas fa-magic mr-2"></i> Remove Objects Now';
                processButton.disabled = false;
            }, 2000);
        }
    });
}

// FAQ toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', function () {
            const faqItem = this.parentElement;
            faqItem.classList.toggle('active');
        });

        // Keyboard accessibility for FAQ
        question.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const faqItem = this.parentElement;
                faqItem.classList.toggle('active');
            }
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
});
