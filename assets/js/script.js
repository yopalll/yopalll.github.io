// ================================
// Ganti Tema (Gelap/Terang)
// ================================
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Muat tema tersimpan dari localStorage
const savedTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', savedTheme);

// Handler klik ganti tema
themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

// ================================
// Efek Scroll Navbar
// ================================
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ================================
// Toggle Menu Mobile
// ================================
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navLinks = document.getElementById('navLinks');

mobileMenuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    
    // Animasi ikon hamburger
    const spans = mobileMenuToggle.querySelectorAll('span');
    spans.forEach((span, index) => {
        if (navLinks.classList.contains('active')) {
            if (index === 0) span.style.transform = 'rotate(45deg) translateY(8px)';
            if (index === 1) span.style.opacity = '0';
            if (index === 2) span.style.transform = 'rotate(-45deg) translateY(-8px)';
        } else {
            span.style.transform = '';
            span.style.opacity = '';
        }
    });
});

// Tutup menu mobile saat link diklik
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const spans = mobileMenuToggle.querySelectorAll('span');
        spans.forEach(span => {
            span.style.transform = '';
            span.style.opacity = '';
        });
    });
});

// ================================
// Scroll Halus untuk Link Navigasi
// ================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 80; // Sesuaikan tinggi navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ================================
// Animasi Scroll (Fade In Up)
// ================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observasi elemen fade-in-up
document.querySelectorAll('.fade-in-up').forEach(element => {
    observer.observe(element);
});

// ================================
// Animasi Progress Bar Skill
// ================================
const skillProgressBars = document.querySelectorAll('.skill-progress');

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBar = entry.target;
            const targetWidth = progressBar.getAttribute('data-progress');
            
            // Animasi progress bar
            setTimeout(() => {
                progressBar.style.width = targetWidth + '%';
            }, 200);
            
            // Hentikan observasi setelah animasi
            skillObserver.unobserve(progressBar);
        }
    });
}, observerOptions);

// Observasi semua progress bar
skillProgressBars.forEach(bar => {
    skillObserver.observe(bar);
});

// ================================
// Klik Logo - Scroll ke Atas
// ================================
document.querySelector('.logo-brand').addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ================================
// Tambah Status Aktif Link Nav saat Scroll
// ================================
const sections = document.querySelectorAll('section[id]');

function highlightNavOnScroll() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLink?.classList.add('active');
        } else {
            navLink?.classList.remove('active');
        }
    });
}

window.addEventListener('scroll', highlightNavOnScroll);

// ================================
// Inisialisasi saat Halaman Dimuat
// ================================
document.addEventListener('DOMContentLoaded', () => {
    // Tambah animasi awal hero section
    setTimeout(() => {
        document.querySelectorAll('.hero .fade-in-up').forEach(element => {
            element.classList.add('visible');
        });
    }, 100);
    
    // Highlight bagian nav saat ini
    highlightNavOnScroll();
});

// ================================
// Cegah FOUC
// ================================
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});
