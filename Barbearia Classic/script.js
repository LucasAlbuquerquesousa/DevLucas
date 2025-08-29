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

// Schedule Modal Functions
function openScheduleModal() {
    document.getElementById('scheduleModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeScheduleModal() {
    document.getElementById('scheduleModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('scheduleModal');
    if (event.target == modal) {
        closeScheduleModal();
    }
}

// Schedule Form Handler
document.getElementById('scheduleForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    
    // Format the WhatsApp message
    const message = `🏆 *AGENDAMENTO BARBEARIA CLASSIC*
    
👤 *Nome:* ${data.name}
📞 *Telefone:* ${data.phone}
✂️ *Serviço:* ${data.service}
👨‍💼 *Barbeiro:* ${data.barber}
📅 *Data:* ${formatDate(data.date)}
🕐 *Horário:* ${data.time}
${data.observations ? `📝 *Observações:* ${data.observations}` : ''}

Gostaria de confirmar meu agendamento!`;
    
    // Encode message for WhatsApp URL
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/5521999997777?text=${encodedMessage}`;
    
    // Open WhatsApp
    window.open(whatsappURL, '_blank');
    
    // Close modal and show success message
    closeScheduleModal();
    showNotification('Redirecionando para o WhatsApp...', 'success');
    
    // Reset form
    this.reset();
});

// Contact Form Handler
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    
    // Format the WhatsApp message
    const message = `📩 *CONTATO - BARBEARIA CLASSIC*
    
👤 *Nome:* ${data.name}
📧 *E-mail:* ${data.email}
📞 *Telefone:* ${data.phone || 'Não informado'}
💬 *Mensagem:* ${data.message}`;
    
    // Encode message for WhatsApp URL
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/5521999997777?text=${encodedMessage}`;
    
    // Open WhatsApp
    window.open(whatsappURL, '_blank');
    
    // Show success message
    showNotification('Redirecionando para o WhatsApp...', 'success');
    
    // Reset form
    this.reset();
});

// Date Formatter
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    return date.toLocaleDateString('pt-BR', options);
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#25d366' : '#d4af37'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 5px;
        z-index: 10000;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        animation: slideIn 0.3s ease-out;
    `;
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Auto remove after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header Background Change on Scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.style.background = 'rgba(15, 15, 15, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = 'linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 100%)';
        header.style.backdropFilter = 'none';
    }
});

// Intersection Observer for Fade In Animation
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

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const elementsToAnimate = document.querySelectorAll('.service-card, .barber-card, .testimonial-card, .gallery-item');
    elementsToAnimate.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
});

// Set minimum date for scheduling (today)
document.addEventListener('DOMContentLoaded', () => {
    const dateInput = document.querySelector('input[name="date"]');
    if (dateInput) {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        dateInput.min = tomorrow.toISOString().split('T')[0];
        
        // Disable Sundays and Mondays
        dateInput.addEventListener('input', function() {
            const selectedDate = new Date(this.value);
            const dayOfWeek = selectedDate.getDay();
            
            if (dayOfWeek === 0 || dayOfWeek === 1) { // Sunday (0) or Monday (1)
                showNotification('Não funcionamos aos domingos e segundas-feiras. Escolha outro dia.', 'error');
                this.value = '';
            }
        });
    }
});

// Gallery Image Modal
function createImageModal() {
    const modal = document.createElement('div');
    modal.id = 'imageModal';
    modal.style.cssText = `
        display: none;
        position: fixed;
        z-index: 3000;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.9);
        cursor: pointer;
    `;
    
    const img = document.createElement('img');
    img.style.cssText = `
        margin: auto;
        display: block;
        max-width: 90%;
        max-height: 90%;
        object-fit: contain;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    `;
    
    const close = document.createElement('span');
    close.innerHTML = '&times;';
    close.style.cssText = `
        position: absolute;
        top: 15px;
        right: 35px;
        color: #f1f1f1;
        font-size: 40px;
        font-weight: bold;
        cursor: pointer;
    `;
    
    modal.appendChild(img);
    modal.appendChild(close);
    document.body.appendChild(modal);
    
    // Close modal events
    modal.onclick = () => modal.style.display = 'none';
    close.onclick = () => modal.style.display = 'none';
    
    return { modal, img };
}

// Initialize gallery modal
document.addEventListener('DOMContentLoaded', () => {
    const { modal, img } = createImageModal();
    
    document.querySelectorAll('.gallery-item img').forEach(image => {
        image.addEventListener('click', () => {
            modal.style.display = 'block';
            img.src = image.src;
            img.alt = image.alt;
        });
    });
});

// Loading Animation for Forms
function showLoading(button) {
    const originalText = button.textContent;
    button.disabled = true;
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    
    return () => {
        button.disabled = false;
        button.textContent = originalText;
    };
}

// Working Hours Validation
function validateWorkingHours() {
    const timeSelect = document.querySelector('select[name="time"]');
    const dateInput = document.querySelector('input[name="date"]');
    
    if (timeSelect && dateInput) {
        timeSelect.addEventListener('change', function() {
            const selectedDate = new Date(dateInput.value);
            const dayOfWeek = selectedDate.getDay();
            const selectedTime = parseInt(this.value.split(':')[0]);
            
            // Check if it's within working hours (9-19h)
            if (selectedTime < 9 || selectedTime >= 19) {
                showNotification('Horário fora do funcionamento (9h às 19h)', 'error');
                this.value = '';
            }
        });
    }
}

// Initialize working hours validation
document.addEventListener('DOMContentLoaded', validateWorkingHours);

// Service Price Calculator
function calculateServicePrice() {
    const serviceSelect = document.querySelector('select[name="service"]');
    if (serviceSelect) {
        serviceSelect.addEventListener('change', function() {
            const selectedService = this.value;
            let price = '';
            
            switch(selectedService) {
                case 'Corte Masculino': price = 'R$ 35,00'; break;
                case 'Barba Completa': price = 'R$ 25,00'; break;
                case 'Bigode': price = 'R$ 15,00'; break;
                case 'Sobrancelha': price = 'R$ 20,00'; break;
                case 'Tratamentos': price = 'R$ 45,00'; break;
                case 'Pacote Completo': price = 'R$ 65,00'; break;
            }
            
            // Create or update price display
            let priceDisplay = document.querySelector('.price-display');
            if (!priceDisplay) {
                priceDisplay = document.createElement('div');
                priceDisplay.className = 'price-display';
                priceDisplay.style.cssText = `
                    color: #d4af37;
                    font-weight: bold;
                    margin-top: 0.5rem;
                    font-size: 1.2rem;
                `;
                serviceSelect.parentNode.insertBefore(priceDisplay, serviceSelect.nextSibling);
            }
            
            priceDisplay.textContent = price ? `Valor: ${price}` : '';
        });
    }
}

// Initialize service price calculator
document.addEventListener('DOMContentLoaded', calculateServicePrice);

// Keyboard Shortcuts
document.addEventListener('keydown', (e) => {
    // ESC to close modal
    if (e.key === 'Escape') {
        closeScheduleModal();
        const imageModal = document.getElementById('imageModal');
        if (imageModal) imageModal.style.display = 'none';
    }
    
    // Ctrl/Cmd + Enter to open schedule modal
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        openScheduleModal();
    }
});

console.log('🏆 Barbearia Classic - Site carregado com sucesso!');
