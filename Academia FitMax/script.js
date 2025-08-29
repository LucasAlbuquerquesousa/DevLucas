// Variáveis globais
let currentDepoimento = 0;

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar componentes
    initMobileMenu();
    initSmoothScrolling();
    initScrollAnimations();
    initDepoimentosSlider();
    initHeaderScroll();
    
    console.log('FitMax Academia - Site carregado com sucesso!');
});

// Menu Mobile
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Fechar menu ao clicar em um link
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

// Scroll suave para seções
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Função para scroll para seção específica
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Header transparente/sólido baseado no scroll
function initHeaderScroll() {
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(0, 0, 0, 0.95)';
        } else {
            header.style.background = 'rgba(0, 0, 0, 0.95)';
        }
    });
}

// Animações no scroll
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    // Observar elementos para animação
    const animateElements = document.querySelectorAll('.plano-card, .modalidade-card, .instrutor-card, .info-card');
    animateElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
}

// Slider de Depoimentos
function initDepoimentosSlider() {
    const cards = document.querySelectorAll('.depoimento-card');
    const buttons = document.querySelectorAll('.slider-btn');
    
    if (cards.length > 0 && buttons.length > 0) {
        // Auto-play do slider
        setInterval(() => {
            showNextDepoimento();
        }, 5000);
    }
}

function showDepoimento(index) {
    const cards = document.querySelectorAll('.depoimento-card');
    const buttons = document.querySelectorAll('.slider-btn');
    
    // Remover classe active de todos
    cards.forEach(card => card.classList.remove('active'));
    buttons.forEach(btn => btn.classList.remove('active'));
    
    // Adicionar classe active aos elementos corretos
    if (cards[index] && buttons[index]) {
        cards[index].classList.add('active');
        buttons[index].classList.add('active');
        currentDepoimento = index;
    }
}

function showNextDepoimento() {
    const cards = document.querySelectorAll('.depoimento-card');
    currentDepoimento = (currentDepoimento + 1) % cards.length;
    showDepoimento(currentDepoimento);
}

// Modal de Matrícula
function openModal(modalType) {
    const modal = document.getElementById(modalType + 'Modal');
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Adicionar animação
        setTimeout(() => {
            modal.querySelector('.modal-content').style.transform = 'scale(1)';
            modal.querySelector('.modal-content').style.opacity = '1';
        }, 10);
    }
}

function closeModal(modalType) {
    const modal = document.getElementById(modalType + 'Modal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Fechar modal ao clicar fora
window.addEventListener('click', function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Formulário de Contato
function submitForm(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    const button = form.querySelector('button[type="submit"]');
    const originalText = button.textContent;
    
    // Mostrar loading
    button.innerHTML = 'Enviando... <span class="loading"></span>';
    button.disabled = true;
    
    // Simular envio
    setTimeout(() => {
        showNotification('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');
        form.reset();
        
        // Restaurar botão
        button.textContent = originalText;
        button.disabled = false;
    }, 2000);
}

// Formulário de Matrícula
function submitMatricula(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    const button = form.querySelector('button[type="submit"]');
    const originalText = button.textContent;
    
    // Validação básica
    const nome = form.querySelector('input[placeholder="Nome Completo"]').value;
    const email = form.querySelector('input[placeholder="Email"]').value;
    const telefone = form.querySelector('input[placeholder="Telefone"]').value;
    const plano = form.querySelector('select').value;
    
    if (!nome || !email || !telefone || !plano) {
        showNotification('Por favor, preencha todos os campos obrigatórios.', 'error');
        return;
    }
    
    // Mostrar loading
    button.innerHTML = 'Processando... <span class="loading"></span>';
    button.disabled = true;
    
    // Simular processamento
    setTimeout(() => {
        showNotification('Matrícula realizada com sucesso! Em breve enviaremos os detalhes por email.', 'success');
        form.reset();
        closeModal('matricula');
        
        // Restaurar botão
        button.textContent = originalText;
        button.disabled = false;
        
        // Redirecionar para WhatsApp
        setTimeout(() => {
            const message = `Olá! Acabei de me matricular na FitMax Academia. Nome: ${nome}, Plano: ${plano}`;
            const whatsappUrl = `https://wa.me/5511999998888?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank');
        }, 1500);
    }, 3000);
}

// Sistema de Notificações
function showNotification(message, type = 'success') {
    // Remover notificação existente
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Criar nova notificação
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-triangle'}"></i>
            <span>${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;
    
    // Adicionar estilos
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        z-index: 3000;
        padding: 1rem 1.5rem;
        background: ${type === 'success' ? '#28a745' : '#dc3545'};
        color: white;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;
    
    notification.querySelector('.notification-content').style.cssText = `
        display: flex;
        align-items: center;
        gap: 10px;
        font-weight: 500;
    `;
    
    notification.querySelector('.notification-close').style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        margin-left: auto;
        padding: 0 5px;
    `;
    
    document.body.appendChild(notification);
    
    // Animar entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Remover automaticamente
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// Validação de formulários em tempo real
document.addEventListener('input', function(event) {
    if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
        validateField(event.target);
    }
});

function validateField(field) {
    const value = field.value.trim();
    
    // Remove classes de validação anteriores
    field.classList.remove('valid', 'invalid');
    
    // Validação por tipo
    if (field.type === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (value && emailRegex.test(value)) {
            field.classList.add('valid');
        } else if (value) {
            field.classList.add('invalid');
        }
    } else if (field.type === 'tel') {
        const phoneRegex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;
        if (value && phoneRegex.test(value)) {
            field.classList.add('valid');
        } else if (value) {
            field.classList.add('invalid');
        }
    } else if (field.required) {
        if (value) {
            field.classList.add('valid');
        } else {
            field.classList.add('invalid');
        }
    }
}

// Máscara para telefone
document.addEventListener('input', function(event) {
    if (event.target.type === 'tel') {
        let value = event.target.value.replace(/\D/g, '');
        
        if (value.length <= 11) {
            if (value.length <= 2) {
                value = value.replace(/(\d{0,2})/, '($1');
            } else if (value.length <= 7) {
                value = value.replace(/(\d{2})(\d{0,5})/, '($1) $2');
            } else {
                value = value.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
            }
        }
        
        event.target.value = value;
    }
});

// Lazy Loading para imagens
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Performance e otimizações
function initPerformanceOptimizations() {
    // Debounce para resize
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            // Recalcular elementos se necessário
        }, 250);
    });
    
    // Prefetch para links importantes
    const importantLinks = document.querySelectorAll('a[href*="whatsapp"], a[href*="instagram"]');
    importantLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            const prefetchLink = document.createElement('link');
            prefetchLink.rel = 'prefetch';
            prefetchLink.href = this.href;
            document.head.appendChild(prefetchLink);
        }, { once: true });
    });
}

// Adicionar funcionalidades extras quando a página estiver completamente carregada
window.addEventListener('load', function() {
    initLazyLoading();
    initPerformanceOptimizations();
});

// Funções de utilidade
function formatCurrency(value) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value);
}

function formatPhone(phone) {
    return phone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
}

function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Analytics simulado (substitua por Google Analytics real)
function trackEvent(action, category, label) {
    console.log(`Event tracked: ${category} - ${action} - ${label}`);
    // Aqui você adicionaria o código real do Google Analytics
    // gtag('event', action, { 'event_category': category, 'event_label': label });
}

// Adicionar tracking aos botões importantes
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('btn-primary')) {
        trackEvent('click', 'CTA', 'Primary Button');
    } else if (event.target.classList.contains('btn-plano')) {
        trackEvent('click', 'Plan', 'Plan Selection');
    }
});

// Service Worker para cache (opcional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Uncomment to enable service worker
        // navigator.serviceWorker.register('/sw.js');
    });
}

// Adicionar estilos dinâmicos para validação
const style = document.createElement('style');
style.textContent = `
    .valid {
        border-color: #28a745 !important;
        box-shadow: 0 0 0 3px rgba(40, 167, 69, 0.2) !important;
    }
    
    .invalid {
        border-color: #dc3545 !important;
        box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.2) !important;
    }
`;
document.head.appendChild(style);
