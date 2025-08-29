// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Menu Category Filtering
const categoryButtons = document.querySelectorAll('.category-btn');
const menuCategories = document.querySelectorAll('.menu-category');

categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');

        // Hide all menu categories
        menuCategories.forEach(category => category.classList.remove('active'));
        // Show selected category
        const targetCategory = button.dataset.category;
        document.querySelector(`[data-category="${targetCategory}"]`).classList.add('active');
    });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar Background Change on Scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(44, 24, 16, 0.98)';
    } else {
        navbar.style.background = 'rgba(44, 24, 16, 0.95)';
    }
});

// Form Handling
const reservaForm = document.getElementById('reservaForm');

reservaForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = {
        nome: document.getElementById('nome').value,
        telefone: document.getElementById('telefone').value,
        data: document.getElementById('data').value,
        hora: document.getElementById('hora').value,
        pessoas: document.getElementById('pessoas').value,
        observacoes: document.getElementById('observacoes').value
    };
    
    // Validate required fields
    if (!formData.nome || !formData.telefone || !formData.data || !formData.hora || !formData.pessoas) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
    }
    
    // Format date for display
    const dataFormatada = new Date(formData.data).toLocaleDateString('pt-BR');
    
    // Create WhatsApp message
    const mensagem = `Olá! Gostaria de fazer uma reserva no Sabor & Arte:

📋 *Dados da Reserva*
👤 Nome: ${formData.nome}
📞 Telefone: ${formData.telefone}
📅 Data: ${dataFormatada}
⏰ Horário: ${formData.hora}
👥 Pessoas: ${formData.pessoas}
${formData.observacoes ? `📝 Observações: ${formData.observacoes}` : ''}

Aguardo confirmação. Obrigado!`;
    
    // Encode message for URL
    const mensagemCodificada = encodeURIComponent(mensagem);
    
    // Create WhatsApp URL
    const whatsappURL = `https://wa.me/5551999995555?text=${mensagemCodificada}`;
    
    // Open WhatsApp
    window.open(whatsappURL, '_blank');
    
    // Show success message
    alert('Redirecionando para WhatsApp para confirmar sua reserva!');
    
    // Reset form
    reservaForm.reset();
});

// Gallery Image Modal (simple implementation)
const galleryItems = document.querySelectorAll('.gallery-item');

galleryItems.forEach(item => {
    item.addEventListener('click', function() {
        const img = this.querySelector('img');
        const title = this.querySelector('h3').textContent;
        
        // Create modal
        const modal = document.createElement('div');
        modal.className = 'image-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <img src="${img.src}" alt="${title}">
                <h3>${title}</h3>
            </div>
        `;
        
        // Add modal styles
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            z-index: 2000;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        const modalContent = modal.querySelector('.modal-content');
        modalContent.style.cssText = `
            max-width: 90%;
            max-height: 90%;
            text-align: center;
            position: relative;
        `;
        
        const modalImg = modal.querySelector('img');
        modalImg.style.cssText = `
            max-width: 100%;
            max-height: 80vh;
            object-fit: contain;
            border-radius: 10px;
        `;
        
        const modalTitle = modal.querySelector('h3');
        modalTitle.style.cssText = `
            color: white;
            margin-top: 1rem;
            font-family: 'Playfair Display', serif;
        `;
        
        const closeBtn = modal.querySelector('.close-modal');
        closeBtn.style.cssText = `
            position: absolute;
            top: -40px;
            right: 0;
            color: white;
            font-size: 2rem;
            cursor: pointer;
            font-weight: bold;
        `;
        
        // Add modal to body
        document.body.appendChild(modal);
        
        // Animate in
        setTimeout(() => {
            modal.style.opacity = '1';
        }, 10);
        
        // Close modal functionality
        const closeModal = () => {
            modal.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(modal);
            }, 300);
        };
        
        closeBtn.addEventListener('click', closeModal);
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
        
        // Close on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeModal();
            }
        });
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.menu-item, .chef-content, .gallery-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Set minimum date for reservation (today)
const dataInput = document.getElementById('data');
if (dataInput) {
    const hoje = new Date().toISOString().split('T')[0];
    dataInput.setAttribute('min', hoje);
}

// Set minimum time based on restaurant hours
const horaInput = document.getElementById('hora');
if (horaInput) {
    horaInput.setAttribute('min', '18:00');
    horaInput.setAttribute('max', '22:00');
}

// Form validation for business hours
horaInput.addEventListener('change', function() {
    const selectedTime = this.value;
    const [hours, minutes] = selectedTime.split(':').map(Number);
    const selectedMinutes = hours * 60 + minutes;
    const openTime = 18 * 60; // 18:00
    const closeTime = 22 * 60; // 22:00
    
    if (selectedMinutes < openTime || selectedMinutes > closeTime) {
        alert('Nosso horário de funcionamento é das 18h às 22h. Por favor, selecione um horário dentro deste período.');
        this.value = '';
    }
});

// Phone number formatting
const telefoneInput = document.getElementById('telefone');
if (telefoneInput) {
    telefoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        
        if (value.length >= 11) {
            value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
        } else if (value.length >= 7) {
            value = value.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
        } else if (value.length >= 3) {
            value = value.replace(/(\d{2})(\d{0,5})/, '($1) $2');
        }
        
        e.target.value = value;
    });
}

// Prevent form submission on Enter key (except for submit button)
reservaForm.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && e.target.type !== 'submit') {
        e.preventDefault();
        const formElements = Array.from(this.elements);
        const currentIndex = formElements.indexOf(e.target);
        const nextElement = formElements[currentIndex + 1];
        
        if (nextElement && nextElement.type !== 'submit') {
            nextElement.focus();
        }
    }
});

// Add loading state to form submission
const submitButton = reservaForm.querySelector('button[type="submit"]');
const originalButtonText = submitButton.textContent;

reservaForm.addEventListener('submit', function() {
    submitButton.textContent = 'Processando...';
    submitButton.disabled = true;
    
    setTimeout(() => {
        submitButton.textContent = originalButtonText;
        submitButton.disabled = false;
    }, 2000);
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-bg img');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add active class to navigation based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.pageYOffset + 100;

    sections.forEach(section => {
        const top = section.offsetTop;
        const bottom = top + section.offsetHeight;
        const id = section.getAttribute('id');
        const navLink = document.querySelector(`a[href="#${id}"]`);

        if (scrollPos >= top && scrollPos <= bottom) {
            document.querySelectorAll('.nav-menu a').forEach(link => {
                link.classList.remove('active');
            });
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
});

console.log('Sabor & Arte - Site carregado com sucesso!');
