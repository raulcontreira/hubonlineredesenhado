// Navegação entre seções
document.addEventListener('DOMContentLoaded', function() {
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.content-section');
    
    // Função para mostrar seção
    function showSection(targetSection) {
        // Esconder todas as seções
        sections.forEach(section => {
            section.classList.remove('active');
        });
        
        // Remover classe active de todos os itens de navegação
        navItems.forEach(item => {
            item.classList.remove('active');
        });
        
        // Mostrar seção alvo
        const targetElement = document.getElementById(targetSection);
        if (targetElement) {
            targetElement.classList.add('active');
        }
        
        // Adicionar classe active ao item de navegação correspondente
        const activeNavItem = document.querySelector(`[data-section="${targetSection}"]`);
        if (activeNavItem) {
            activeNavItem.classList.add('active');
        }
    }
    
    // Event listeners para navegação
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSection = this.getAttribute('data-section');
            showSection(targetSection);
            
            // Atualizar URL sem recarregar página
            history.pushState(null, null, `#${targetSection}`);
        });
    });
    
    // Verificar URL inicial
    function checkInitialHash() {
        const hash = window.location.hash.substring(1);
        if (hash && document.getElementById(hash)) {
            showSection(hash);
        } else {
            showSection('sobre'); // Seção padrão
        }
    }
    
    // Executar verificação inicial
    checkInitialHash();
    
    // Listener para mudanças no hash
    window.addEventListener('hashchange', checkInitialHash);
    
    // Animações de hover para cards
    const cards = document.querySelectorAll('.project-card, .info-card, .interests-card, .education-card, .soft-skills-card, .contact-info-card, .professor-card, .availability-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Animação para as tags de interesse
    const interestTags = document.querySelectorAll('.interest-tag');
    
    interestTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(2deg)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });
    
    // Animação para os dots de habilidades
    const skillDots = document.querySelectorAll('.dot.filled');
    
    skillDots.forEach((dot, index) => {
        setTimeout(() => {
            dot.style.animation = 'dotPulse 0.5s ease-in-out';
        }, index * 100);
    });
    
    // Menu mobile (para futuras implementações)
    function toggleMobileMenu() {
        const sidebar = document.querySelector('.sidebar');
        sidebar.classList.toggle('active');
    }
    
    // Smooth scroll para links internos
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
    
    // Efeito de digitação para o título (opcional)
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }
    
    // Observador de interseção para animações
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
    const animatedElements = document.querySelectorAll('.project-card, .info-card, .interests-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// CSS adicional para animações (será injetado via JavaScript)
const additionalCSS = `
    @keyframes dotPulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.2); }
        100% { transform: scale(1); }
    }
    
    .nav-item a {
        position: relative;
        overflow: hidden;
    }
    
    .nav-item a::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
        transition: left 0.5s;
    }
    
    .nav-item a:hover::before {
        left: 100%;
    }
`;

// Injetar CSS adicional
const style = document.createElement('style');
style.textContent = additionalCSS;
document.head.appendChild(style);

