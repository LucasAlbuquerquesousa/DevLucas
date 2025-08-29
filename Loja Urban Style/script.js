// Dados dos produtos
const produtos = [
    {
        id: 1,
        nome: "Camisa Social Slim",
        categoria: "Masculino",
        preco: "R$ 189,90",
        imagem: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 2,
        nome: "Vestido Midi Elegante",
        categoria: "Feminino",
        preco: "R$ 259,90",
        imagem: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 3,
        nome: "Tênis Urban Classic",
        categoria: "Calçados",
        preco: "R$ 349,90",
        imagem: "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 4,
        nome: "Relógio Minimalista",
        categoria: "Acessórios",
        preco: "R$ 299,90",
        imagem: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 5,
        nome: "Calça Jeans Premium",
        categoria: "Masculino",
        preco: "R$ 219,90",
        imagem: "https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 6,
        nome: "Blusa Cropped Trend",
        categoria: "Feminino",
        preco: "R$ 129,90",
        imagem: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 7,
        nome: "Boné Streetwear",
        categoria: "Acessórios",
        preco: "R$ 89,90",
        imagem: "https://images.unsplash.com/photo-1575428652377-a4d0a2d1a64f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 8,
        nome: "Bota Chelsea Couro",
        categoria: "Calçados",
        preco: "R$ 429,90",
        imagem: "https://images.unsplash.com/photo-1518002171953-a080ee817e1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 9,
        nome: "Jaqueta Bomber",
        categoria: "Masculino",
        preco: "R$ 289,90",
        imagem: "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 10,
        nome: "Saia Plissada",
        categoria: "Feminino",
        preco: "R$ 159,90",
        imagem: "https://images.unsplash.com/photo-1583496661160-fb5886a13d42?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 11,
        nome: "Óculos de Sol Aviador",
        categoria: "Acessórios",
        preco: "R$ 199,90",
        imagem: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 12,
        nome: "Sandália Rasteira",
        categoria: "Calçados",
        preco: "R$ 149,90",
        imagem: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
];

// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const produtosContainer = document.getElementById('produtos-container');
const contactForm = document.getElementById('contact-form');

// Menu mobile toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Fechar menu ao clicar em um link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Carregar produtos
function carregarProdutos() {
    if (!produtosContainer) return;

    produtosContainer.innerHTML = '<div class="loading">Carregando produtos...</div>';

    // Simular delay de carregamento
    setTimeout(() => {
        produtosContainer.innerHTML = '';
        
        produtos.forEach(produto => {
            const produtoCard = document.createElement('div');
            produtoCard.className = 'produto-card fade-in';
            produtoCard.innerHTML = `
                <img src="${produto.imagem}" alt="${produto.nome}" loading="lazy">
                <div class="produto-info">
                    <h4>${produto.nome}</h4>
                    <p class="categoria">${produto.categoria}</p>
                    <p class="preco">${produto.preco}</p>
                </div>
            `;
            
            produtoCard.addEventListener('click', () => {
                mostrarDetalhesProduto(produto);
            });
            
            produtosContainer.appendChild(produtoCard);
        });
        
        // Trigger animation
        setTimeout(() => {
            document.querySelectorAll('.produto-card').forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add('visible');
                }, index * 100);
            });
        }, 100);
    }, 1000);
}

// Mostrar detalhes do produto (modal ou WhatsApp)
function mostrarDetalhesProduto(produto) {
    const mensagem = `Olá! Gostaria de saber mais sobre o produto: ${produto.nome} - ${produto.categoria} por ${produto.preco}`;
    const whatsappUrl = `https://wa.me/5531999996666?text=${encodeURIComponent(mensagem)}`;
    window.open(whatsappUrl, '_blank');
}

// Scroll animations
function animateOnScroll() {
    const elements = document.querySelectorAll('.fade-in');
    const windowHeight = window.innerHeight;

    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        
        if (elementTop < windowHeight - 100) {
            element.classList.add('visible');
        }
    });
}

// Header scroll effect
function headerScrollEffect() {
    const header = document.querySelector('.header');
    const scrollTop = window.pageYOffset;

    if (scrollTop > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
}

// Smooth scroll para links internos
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Formulário de contato
function setupContactForm() {
    if (!contactForm) return;

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const nome = formData.get('nome');
        const email = formData.get('email');
        const assunto = formData.get('assunto');
        const mensagem = formData.get('mensagem');
        
        // Criar mensagem para WhatsApp
        const whatsappMessage = `*Nova mensagem do site Urban Style*\n\n*Nome:* ${nome}\n*Email:* ${email}\n*Assunto:* ${assunto}\n*Mensagem:* ${mensagem}`;
        const whatsappUrl = `https://wa.me/5531999996666?text=${encodeURIComponent(whatsappMessage)}`;
        
        // Abrir WhatsApp
        window.open(whatsappUrl, '_blank');
        
        // Reset form
        contactForm.reset();
        
        // Feedback visual
        const button = contactForm.querySelector('button[type="submit"]');
        const originalText = button.textContent;
        button.textContent = 'Enviado!';
        button.style.background = '#25D366';
        
        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = '';
        }, 3000);
    });
}

// Newsletter
function setupNewsletter() {
    const newsletterForms = document.querySelectorAll('.newsletter-form');
    
    newsletterForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[type="email"]').value;
            const mensagem = `Olá! Gostaria de me inscrever na newsletter da Urban Style.\n\nEmail: ${email}`;
            const whatsappUrl = `https://wa.me/5531999996666?text=${encodeURIComponent(mensagem)}`;
            
            window.open(whatsappUrl, '_blank');
            
            // Reset e feedback
            this.reset();
            const button = this.querySelector('button');
            const originalHtml = button.innerHTML;
            button.innerHTML = '<i class="fas fa-check"></i>';
            
            setTimeout(() => {
                button.innerHTML = originalHtml;
            }, 2000);
        });
    });
}

// Lazy loading para imagens
function setupLazyLoading() {
    if ('IntersectionObserver' in window) {
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

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// Performance - debounce para scroll events
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction() {
        const context = this;
        const args = arguments;
        
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        
        if (callNow) func.apply(context, args);
    };
}

// Event listeners
window.addEventListener('scroll', debounce(() => {
    animateOnScroll();
    headerScrollEffect();
}, 10));

window.addEventListener('resize', debounce(() => {
    // Fechar menu mobile em resize
    if (window.innerWidth > 768) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
}, 250));

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    console.log('Urban Style - Site carregado com sucesso!');
    
    // Setup inicial
    setupSmoothScroll();
    setupContactForm();
    setupNewsletter();
    setupLazyLoading();
    
    // Carregar produtos
    carregarProdutos();
    
    // Adicionar classe fade-in aos elementos
    document.querySelectorAll('.colecao-card, .look-item, .sobre-content, .contato-content').forEach(el => {
        el.classList.add('fade-in');
    });
    
    // Trigger inicial das animações
    setTimeout(animateOnScroll, 100);
    
    // Easter egg - console message
    console.log('%c Urban Style 👕', 'color: #000; font-size: 20px; font-weight: bold;');
    console.log('%c Desenvolvido com ❤️ em Belo Horizonte', 'color: #666; font-size: 12px;');
});

// Service Worker (PWA básico)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('SW registrado com sucesso: ', registration);
            })
            .catch(function(registrationError) {
                console.log('Falha ao registrar SW: ', registrationError);
            });
    });
}

// Função para compartilhar produto (Web Share API)
function compartilharProduto(produto) {
    if (navigator.share) {
        navigator.share({
            title: produto.nome,
            text: `Confira este produto incrível da Urban Style: ${produto.nome}`,
            url: window.location.href
        });
    } else {
        // Fallback para browsers que não suportam Web Share API
        const url = window.location.href;
        const texto = `Confira este produto incrível da Urban Style: ${produto.nome} - ${url}`;
        
        if (navigator.clipboard) {
            navigator.clipboard.writeText(texto);
            alert('Link copiado para a área de transferência!');
        }
    }
}

// Função para adicionar produtos aos favoritos (localStorage)
function toggleFavorito(produtoId) {
    let favoritos = JSON.parse(localStorage.getItem('urbanstyle_favoritos') || '[]');
    
    if (favoritos.includes(produtoId)) {
        favoritos = favoritos.filter(id => id !== produtoId);
    } else {
        favoritos.push(produtoId);
    }
    
    localStorage.setItem('urbanstyle_favoritos', JSON.stringify(favoritos));
    updateFavoritoUI(produtoId, favoritos.includes(produtoId));
}

function updateFavoritoUI(produtoId, isFavorito) {
    const button = document.querySelector(`[data-produto-id="${produtoId}"] .btn-favorito`);
    if (button) {
        button.innerHTML = isFavorito ? '<i class="fas fa-heart"></i>' : '<i class="far fa-heart"></i>';
        button.classList.toggle('active', isFavorito);
    }
}

// Função de busca simples
function buscarProdutos(termo) {
    termo = termo.toLowerCase();
    return produtos.filter(produto => 
        produto.nome.toLowerCase().includes(termo) ||
        produto.categoria.toLowerCase().includes(termo)
    );
}

// Analytics básico (pode ser integrado com Google Analytics)
function trackEvent(category, action, label) {
    // Implementar tracking aqui
    console.log(`Event: ${category} - ${action} - ${label}`);
}

// Função para mostrar notificações
function mostrarNotificacao(mensagem, tipo = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${tipo}`;
    notification.textContent = mensagem;
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${tipo === 'success' ? '#25D366' : tipo === 'error' ? '#e74c3c' : '#333'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 5px;
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}
