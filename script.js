document.addEventListener('DOMContentLoaded', function() {
    // Variables
    const loginBtn = document.getElementById('loginBtn');
    const loginModal = document.getElementById('loginModal');
    const closeBtn = document.querySelector('.close');
    const tabs = document.querySelectorAll('.tab');
    const budgetRange = document.getElementById('budget');
    const budgetOutput = document.querySelector('output[for="budget"]');
    const searchForm = document.querySelector('.search-form');
    const contactForm = document.querySelector('.contact-form');
    const reserveBtns = document.querySelectorAll('.reserve-btn');

    // Fixed Header
    let header = document.querySelector('header');
    let headerHeight = header.offsetHeight;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > headerHeight) {
            header.style.background = 'rgba(255, 49, 49, 0.95)';
        } else {
            header.style.background = 'var(--primary-red)';
        }
    });

    // Modal Functions
    function openModal() {
        loginModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        loginModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    // Event Listeners
    loginBtn.addEventListener('click', openModal);
    closeBtn.addEventListener('click', closeModal);

    window.addEventListener('click', (e) => {
        if (e.target === loginModal) {
            closeModal();
        }
    });

    // Tab Switching
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
        });
    });

    // Budget Range
    if (budgetRange && budgetOutput) {
        budgetRange.addEventListener('input', (e) => {
            budgetOutput.textContent = e.target.value + '€';
        });
    }

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.offsetTop;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form Submissions
    if (searchForm) {
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const searchBtn = searchForm.querySelector('.search-btn');
            const loadingSpinner = document.createElement('div');
            loadingSpinner.className = 'loading-spinner';
            
            searchBtn.style.display = 'none';
            searchForm.appendChild(loadingSpinner);
            loadingSpinner.style.display = 'block';

            // Simulate search with all filters
            setTimeout(() => {
                loadingSpinner.remove();
                searchBtn.style.display = 'block';
                alert('Recherche effectuée avec les filtres sélectionnés !');
            }, 2000);
        });
    }

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Envoi en cours...';
            submitBtn.disabled = true;

            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                alert('Message envoyé ! Nous vous répondrons dans les plus brefs délais.');
                contactForm.reset();
            }, 1500);
        });
    }

    // Reservation Buttons
    reserveBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const carName = btn.closest('.car-card').querySelector('.car-name').textContent;
            const originalText = btn.textContent;
            btn.textContent = 'Réservation...';
            btn.disabled = true;

            setTimeout(() => {
                btn.textContent = originalText;
                btn.disabled = false;
                alert(`Réservation de ${carName} en cours de traitement. Vous serez redirigé vers le formulaire de réservation.`);
            }, 1000);
        });
    });

    // Animation on Scroll
    function revealOnScroll() {
        const elements = document.querySelectorAll('.car-card, .advantage-card, .step, .info-item');
        const windowHeight = window.innerHeight;

        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            if (elementTop < windowHeight - 50) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }

    // Initial setup for animations
    document.querySelectorAll('.car-card, .advantage-card, .step, .info-item').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.6s ease-out';
    });

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial check

    // Date Input Validation
    const pickupDate = document.getElementById('pickup-date');
    const returnDate = document.getElementById('return-date');

    if (pickupDate && returnDate) {
        // Set minimum date to today
        const today = new Date().toISOString().split('T')[0];
        pickupDate.min = today;
        returnDate.min = today;

        pickupDate.addEventListener('change', () => {
            returnDate.min = pickupDate.value;
            if (returnDate.value && returnDate.value < pickupDate.value) {
                returnDate.value = pickupDate.value;
            }
        });
    }

    // New variables
    const themeToggle = document.getElementById('themeToggle');
    const backToTop = document.getElementById('backToTop');
    const toggleFilters = document.querySelector('.toggle-filters');
    const advancedFilters = document.querySelector('.advanced-filters');
    const comparisonModal = document.getElementById('comparisonModal');
    const closeComparison = document.querySelector('.close-comparison');
    const comparisonTableBody = document.getElementById('comparisonTableBody');
    const favoriteButtons = document.querySelectorAll('.car-action-btn[title="Ajouter aux favoris"]');
    const compareButtons = document.querySelectorAll('.car-action-btn[title="Comparer"]');

    // Theme Toggle
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        themeToggle.innerHTML = newTheme === 'light' ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
        localStorage.setItem('theme', newTheme);
    });

    // Load saved theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    themeToggle.innerHTML = savedTheme === 'light' ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';

    // Back to Top Button
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Advanced Filters Toggle
    toggleFilters.addEventListener('click', () => {
        advancedFilters.classList.toggle('visible');
        toggleFilters.innerHTML = advancedFilters.classList.contains('visible') 
            ? '<i class="fas fa-sliders-h"></i> Masquer les filtres' 
            : '<i class="fas fa-sliders-h"></i> Filtres avancés';
    });

    // Car Comparison
    let comparisonCars = [];

    compareButtons.forEach(button => {
        button.addEventListener('click', () => {
            const carCard = button.closest('.car-card');
            const carData = {
                name: carCard.querySelector('.car-name').textContent,
                price: carCard.querySelector('.car-price').textContent,
                features: Array.from(carCard.querySelectorAll('.car-features span')).map(span => span.textContent),
                rating: carCard.querySelector('.car-rating').innerHTML
            };

            if (comparisonCars.length < 2) {
                comparisonCars.push(carData);
                button.classList.add('active');
                
                if (comparisonCars.length === 2) {
                    showComparison();
                }
            }
        });
    });

    function showComparison() {
        const tableBody = comparisonTableBody;
        tableBody.innerHTML = '';

        const features = [
            { name: 'Modèle', key: 'name' },
            { name: 'Prix', key: 'price' },
            { name: 'Consommation', key: 'features', index: 0 },
            { name: 'Places', key: 'features', index: 1 },
            { name: 'Coffre', key: 'features', index: 2 },
            { name: 'Note', key: 'rating' }
        ];

        features.forEach(feature => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${feature.name}</td>
                <td>${getFeatureValue(comparisonCars[0], feature)}</td>
                <td>${getFeatureValue(comparisonCars[1], feature)}</td>
            `;
            tableBody.appendChild(row);
        });

        comparisonModal.style.display = 'block';
    }

    function getFeatureValue(car, feature) {
        if (feature.key === 'features') {
            return car[feature.key][feature.index];
        }
        return car[feature.key];
    }

    closeComparison.addEventListener('click', () => {
        comparisonModal.style.display = 'none';
        comparisonCars = [];
        compareButtons.forEach(btn => btn.classList.remove('active'));
    });

    // Favorites
    favoriteButtons.forEach(button => {
        button.addEventListener('click', () => {
            const icon = button.querySelector('i');
            if (icon.classList.contains('far')) {
                icon.classList.replace('far', 'fas');
                icon.style.color = 'var(--primary-red)';
                // Add to favorites logic here
            } else {
                icon.classList.replace('fas', 'far');
                icon.style.color = '';
                // Remove from favorites logic here
            }
        });
    });
});
     