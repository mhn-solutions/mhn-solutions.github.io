// ====================================================
// MHN Solutions — Main JavaScript (SEO-Enhanced)
// ====================================================

// Global Variables
const WHATSAPP_NUMBER = "+923356900672";
let currentCurrency = 'USD';
let isNavigating = false;

// 1. WhatsApp Redirection Logic
function openWhatsApp(prefilledMessage) {
    const encodedMessage = encodeURIComponent(prefilledMessage);
    const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER.replace(/[+\s-]/g, '')}?text=${encodedMessage}`;
    window.open(whatsappURL, '_blank');
}

// 2. Contact Form to WhatsApp Submitter
function submitFormToWhatsApp(event) {
    event.preventDefault();

    const name = document.getElementById('contact-name').value;
    const email = document.getElementById('contact-email').value;
    const service = document.getElementById('contact-service').value;
    const message = document.getElementById('contact-message').value;

    const waText = `*New Website Inquiry — MHN Solutions* 🚀\n\n*Name:* ${name}\n*Email:* ${email}\n*Interested In:* ${service}\n\n*Message:* ${message}`;
    openWhatsApp(waText);
}

// 3. Currency Switcher Logic
function toggleCurrency() {
    const btn = document.getElementById('currency-btn');
    const priceElements = document.querySelectorAll('.price-val');
    const currencySymbols = document.querySelectorAll('.currency-symbol');

    if (currentCurrency === 'USD') {
        currentCurrency = 'PKR';
        btn.innerText = 'PKR';
        priceElements.forEach(el => el.innerText = el.getAttribute('data-pkr').replace(/\B(?=(\d{3})+(?!\d))/g, ","));
        currencySymbols.forEach(sym => sym.innerText = 'Rs ');
    } else {
        currentCurrency = 'USD';
        btn.innerText = 'USD';
        priceElements.forEach(el => el.innerText = el.getAttribute('data-usd'));
        currencySymbols.forEach(sym => sym.innerText = '$');
    }
}

// 4. Navigation (SPA Format with Hash-Based Routing for SEO)
function navigateTo(page) {
    if (isNavigating) return;
    isNavigating = true;

    // Update browser hash for SEO crawlability
    if (window.location.hash !== '#' + page) {
        history.pushState(null, '', '#' + page);
    }

    // Update document title dynamically for SEO
    const titles = {
        'home': 'MHN Solutions | Digital Marketing & Web Development Agency in Pakistan & Oman',
        'about': 'About MHN Solutions | Our Mission, Vision & Digital Marketing Expertise',
        'services': 'Services | MHN Solutions Digital Marketing, Web Development & Branding',
        'pricing': 'Pricing Plans | MHN Solutions Affordable Digital Marketing Packages',
        'contact': 'Contact MHN Solutions | Get a Free Digital Marketing Consultation'
    };
    document.title = titles[page] || titles['home'];

    window.scrollTo({ top: 0, behavior: 'smooth' });

    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));

    const targetPage = document.getElementById(`page-${page}`);
    if (targetPage) {
        targetPage.classList.add('active');

        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.dataset.page === page) link.classList.add('active');
        });

        // Close mobile menu if open
        const mobileMenu = document.querySelector('.mobile-menu');
        if (mobileMenu && mobileMenu.classList.contains('open')) {
            toggleMobileMenu();
        }

        // Re-trigger animations
        setTimeout(initScrollAnimations, 100);
    }

    setTimeout(() => { isNavigating = false; }, 200);
}

// 5. Handle browser back/forward with hash
window.addEventListener('hashchange', function() {
    if (isNavigating) return;
    const hash = window.location.hash.replace('#', '') || 'home';
    navigateTo(hash);
});

// 6. Mobile Menu Toggle
function toggleMobileMenu() {
    const menu = document.querySelector('.mobile-menu');
    const overlay = document.querySelector('.mobile-overlay');
    const btn = document.getElementById('mobile-menu-btn');

    menu.classList.toggle('open');
    overlay.classList.toggle('open');

    // Update aria-expanded for accessibility
    if (btn) {
        btn.setAttribute('aria-expanded', menu.classList.contains('open'));
    }
}

// 7. FAQ Toggle
function toggleFAQ(element) {
    const answer = element.querySelector('p');
    const icon = element.querySelector('[data-lucide="chevron-down"]');

    if (answer.style.maxHeight && answer.style.maxHeight !== '0px') {
        answer.style.maxHeight = '0px';
        if (icon) icon.style.transform = 'rotate(0deg)';
    } else {
        answer.style.maxHeight = answer.scrollHeight + 'px';
        if (icon) icon.style.transform = 'rotate(180deg)';
    }
}

// 8. Scroll Animations
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.fade-in').forEach(el => {
        el.classList.remove('visible');
        observer.observe(el);
    });
}

// Initialize everything when the page loads
document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    initScrollAnimations();

    // Handle initial hash on page load (for direct links / bookmarks)
    const initialHash = window.location.hash.replace('#', '') || 'home';
    if (initialHash !== 'home') {
        navigateTo(initialHash);
    }
});
