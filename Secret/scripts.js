// Aguarda o DOM carregar completamente
document.addEventListener('DOMContentLoaded', function() {
    
    // Elementos principais
    const entradaContainer = document.getElementById('entrada');
    const sitePrincipal = document.getElementById('site-principal');
    const entrarBtn = document.getElementById('entrar-btn');
    const modal = document.getElementById('modal');
    const modalImg = document.getElementById('modal-img');
    const caption = document.getElementById('caption');
    const closeModal = document.getElementsByClassName('close')[0];
    
    // Botão de entrada para o site
    entrarBtn.addEventListener('click', function() {
        // Adiciona efeito de clique no botão
        entrarBtn.style.transform = 'scale(0.95)';
        
        setTimeout(() => {
            // Fade out da tela de entrada
            entradaContainer.style.opacity = '0';
            entradaContainer.style.transition = 'opacity 1s ease-out';
            
            setTimeout(() => {
                // Remove a tela de entrada e mostra o site
                entradaContainer.style.display = 'none';
                sitePrincipal.classList.remove('hidden');
                sitePrincipal.classList.add('show');
                
                // Inicia animações de entrada
                iniciarAnimacoesDeEntrada();
            }, 1000);
        }, 200);
    });
    
    // Animações de entrada do site principal
    function iniciarAnimacoesDeEntrada() {
        // Anima elementos da timeline com delay escalonado
        const timelineItems = document.querySelectorAll('.timeline-item');
        timelineItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(50px)';
            
            setTimeout(() => {
                item.style.transition = 'all 0.6s ease-out';
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, index * 200);
        });
        
        // Anima itens da galeria
        const galleryItems = document.querySelectorAll('.gallery-item');
        galleryItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.8)';
            
            setTimeout(() => {
                item.style.transition = 'all 0.5s ease-out';
                item.style.opacity = '1';
                item.style.transform = 'scale(1)';
            }, 500 + (index * 100));
        });
    }
    
    // Galeria de fotos - Modal
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const imgSrc = this.getAttribute('data-img');
            const overlayText = this.querySelector('.overlay span').textContent;
            
            modal.style.display = 'block';
            modalImg.src = imgSrc;
            caption.textContent = overlayText;
            
            // Adiciona efeito de zoom suave
            modalImg.style.transform = 'scale(0.8)';
            setTimeout(() => {
                modalImg.style.transition = 'transform 0.3s ease-out';
                modalImg.style.transform = 'scale(1)';
            }, 100);
        });
    });
    
    // Fechar modal
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    // Fechar modal clicando fora da imagem
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Navegação por teclado no modal
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
        }
    });
    
    // Scroll suave para seções
    function smoothScroll(target, duration = 1000) {
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;
        
        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }
        
        function ease(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }
        
        requestAnimationFrame(animation);
    }
    
    // Adiciona efeito de paralaxe suave no hero
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const heroContent = document.querySelector('.hero-content');
        
        if (hero && scrolled < window.innerHeight) {
            heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
    
    // Observador de interseção para animações durante o scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observa elementos para animação
    const elementsToAnimate = document.querySelectorAll('.timeline-item, .gallery-item, .section-title');
    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });
    
    // Efeito de digitação para o texto final
    function typeWriter(element, text, speed = 50) {
        element.innerHTML = '';
        let i = 0;
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }
    
    // Inicia efeito de digitação quando a seção final fica visível
    const historiaFinal = document.querySelector('.historia-final');
    const finalMessage = document.querySelector('.final-message');
    
    if (finalMessage) {
        const originalText = finalMessage.textContent;
        finalMessage.style.opacity = '0';
        
        const historiaObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        finalMessage.style.opacity = '1';
                        typeWriter(finalMessage, originalText, 80);
                    }, 1000);
                    historiaObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        historiaObserver.observe(historiaFinal);
    }
    
    // Easter Egg - Música de fundo (opcional)
    let musicaAtivada = false;
    
    document.addEventListener('click', function(e) {
        // Se clicar 3 vezes na seção de música, ativa easter egg
        if (e.target.closest('.music-references')) {
            musicaAtivada = !musicaAtivada;
            
            if (musicaAtivada) {
                // Mostra mensagem especial
                const musicSection = document.querySelector('.music-references');
                const message = document.createElement('div');
                message.innerHTML = '🎵 "Te vivo" - Luan Santana tocando no coração 💕';
                message.style.cssText = `
                    position: absolute;
                    top: -40px;
                    left: 50%;
                    transform: translateX(-50%);
                    background: rgba(255,255,255,0.9);
                    color: var(--vermelho);
                    padding: 10px 20px;
                    border-radius: 20px;
                    font-weight: 600;
                    animation: fadeInUp 0.5s ease-out;
                    z-index: 10;
                `;
                
                musicSection.style.position = 'relative';
                musicSection.appendChild(message);
                
                setTimeout(() => {
                    message.style.opacity = '0';
                    setTimeout(() => message.remove(), 500);
                }, 3000);
            }
        }
    });
    
    // Adiciona efeitos especiais nos corações flutuantes
    function createFloatingHeart() {
        const heart = document.createElement('div');
        heart.innerHTML = '💕';
        heart.style.cssText = `
            position: fixed;
            font-size: 20px;
            pointer-events: none;
            z-index: 9999;
            animation: heartFly 4s linear infinite;
            left: ${Math.random() * 100}vw;
            opacity: 0;
        `;
        
        document.body.appendChild(heart);
        
        setTimeout(() => {
            heart.style.opacity = '0.7';
        }, 100);
        
        setTimeout(() => {
            heart.remove();
        }, 4000);
    }
    
    // Cria corações flutuantes periodicamente quando estiver no site principal
    setInterval(() => {
        if (!entradaContainer.style.display || entradaContainer.style.display !== 'none') return;
        
        if (Math.random() < 0.3) { // 30% de chance
            createFloatingHeart();
        }
    }, 3000);
    
    // Adiciona CSS para animação dos corações voadores
    const style = document.createElement('style');
    style.textContent = `
        @keyframes heartFly {
            0% {
                transform: translateY(100vh) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 0.7;
            }
            90% {
                opacity: 0.7;
            }
            100% {
                transform: translateY(-100px) rotate(360deg);
                opacity: 0;
            }
        }
        
        .animate-in {
            animation: slideInUp 0.8s ease-out forwards;
        }
        
        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
    
    // Preload de imagens para melhor performance
    function preloadImages() {
        const images = [
            'assets/Lucas-Maria-Praia.jfif',
            'assets/foto-ilha.jfif',
            'assets/se-olhando.jfif',
            'assets/beijo-bochecha.jfif',
            'assets/foto-espelho.jfif',
            'assets/ambos-aliança.jfif',
            'assets/Maria-Flamengo-Lucas-Corinthians.jfif',
            'assets/foto-perfeita-piscina.jfif'
        ];
        
        images.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    }
    
    preloadImages();
    
    console.log('💕 Site carregado com amor para Lucas & Maria Fernanda 💕');
});
