// Menu Mobile
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Fechar menu ao clicar em um link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Chat Widget
const chatToggle = document.querySelector('.chat-toggle');
const chatContainer = document.querySelector('.chat-container');
const chatClose = document.querySelector('.chat-close');
const chatNotification = document.querySelector('.chat-notification');

chatToggle.addEventListener('click', () => {
    chatContainer.classList.add('active');
    chatNotification.style.display = 'none';
});

chatClose.addEventListener('click', () => {
    chatContainer.classList.remove('active');
});

// Quick actions no chat
document.querySelectorAll('.quick-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const action = btn.textContent;
        addUserMessage(action);
        
        // Simular resposta baseada na ação
        setTimeout(() => {
            let response = '';
            switch(action) {
                case 'Agendar consulta':
                    response = 'Claro! Para agendar uma consulta, preciso de algumas informações. Qual é a área de interesse e sua disponibilidade?';
                    break;
                case 'Dúvida trabalhista':
                    response = 'Estou aqui para ajudar com questões trabalhistas. Qual é sua dúvida específica? Posso orientá-lo sobre direitos, rescisões, horas extras e muito mais.';
                    break;
                case 'Falar com advogado':
                    response = 'Vou conectá-lo com um de nossos advogados. Enquanto isso, pode me contar um pouco sobre seu caso?';
                    break;
                default:
                    response = 'Como posso ajudá-lo com essa questão?';
            }
            addBotMessage(response);
        }, 1000);
    });
});

// Envio de mensagem no chat
const chatInput = document.querySelector('.chat-input input');
const chatSendBtn = document.querySelector('.chat-input button');
const chatBody = document.querySelector('.chat-body');

function addUserMessage(message) {
    const userMessage = document.createElement('div');
    userMessage.className = 'chat-message user';
    userMessage.innerHTML = `<p>${message}</p>`;
    chatBody.appendChild(userMessage);
    chatBody.scrollTop = chatBody.scrollHeight;
}

function addBotMessage(message) {
    const botMessage = document.createElement('div');
    botMessage.className = 'chat-message bot';
    botMessage.innerHTML = `<p>${message}</p>`;
    chatBody.appendChild(botMessage);
    chatBody.scrollTop = chatBody.scrollHeight;
}

function sendMessage() {
    const message = chatInput.value.trim();
    if (message) {
        addUserMessage(message);
        chatInput.value = '';
        
        // Simular resposta do bot (aqui será integrado com n8n)
        setTimeout(() => {
            const responses = [
                'Entendi sua situação. Vou encaminhar para o especialista mais adequado.',
                'Essa é uma questão importante. Preciso de mais detalhes para orientá-lo melhor.',
                'Baseado no que você descreveu, temos experiência nessa área. Vou agendar uma consulta.',
                'Obrigado pelas informações. Um de nossos advogados entrará em contato em até 2 horas.',
                'Posso ajudá-lo a esclarecer essa dúvida. Que tal agendar uma consulta gratuita?'
            ];
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];
            addBotMessage(randomResponse);
        }, 1500);
    }
}

chatSendBtn.addEventListener('click', sendMessage);

chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Formulário de contato
const contactForm = document.querySelector('.contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Adicionar estado de loading
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Enviando...';
    submitBtn.disabled = true;
    submitBtn.classList.add('loading');
    
    // Simular envio
    setTimeout(() => {
        alert('Solicitação enviada com sucesso! Nossa equipe entrará em contato em breve.');
        contactForm.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        submitBtn.classList.remove('loading');
    }, 2000);
});

// Navegação suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Animação de elementos ao entrar na viewport
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

// Observar elementos para animação
document.querySelectorAll('.service-card, .team-member, .case-card, .value').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(el);
});

// Contador animado para estatísticas
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + (target >= 500 ? '+' : '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + (target >= 500 ? '+' : '');
        }
    }, 20);
}

// Iniciar contadores quando a seção hero for visível
const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            document.querySelectorAll('.stat h3').forEach((stat, index) => {
                const targets = [500, 20, 15];
                animateCounter(stat, targets[index]);
            });
            heroObserver.unobserve(entry.target);
        }
    });
});

heroObserver.observe(document.querySelector('.hero-stats'));

// Efeito parallax sutil no hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Destacar link ativo na navegação
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.pageYOffset >= sectionTop) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Auto-ocultar notificação do chat após alguns segundos
setTimeout(() => {
    if (chatNotification && chatNotification.style.display !== 'none') {
        chatNotification.style.animation = 'pulse 2s infinite';
    }
}, 3000);

// Adicionar estilo para link ativo
const style = document.createElement('style');
style.textContent = `
    .nav-menu a.active {
        color: var(--secondary-color) !important;
    }
    
    .nav-menu a.active::after {
        width: 100% !important;
    }
    
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(style);
