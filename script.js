// DOM Elements
const loginBtn = document.getElementById('loginBtn');
const signupBtn = document.getElementById('signupBtn');
const featureCards = document.querySelectorAll('.card');

// Login/Signup Modal
function createAuthModal(type) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-btn">&times;</span>
            <h2>${type === 'login' ? 'Welcome Back!' : 'Join GoalStone!'}</h2>
            <form>
                ${type === 'signup' ? '<input type="text" placeholder="Full Name" required>' : ''}
                <input type="email" placeholder="Email" required>
                <input type="password" placeholder="Password" required>
                <button type="submit">${type === 'login' ? 'Login' : 'Create Account'}</button>
            </form>
            <p class="auth-switch">${type === 'login' ? 'New here? ' : 'Already have an account? '}
                <a href="#">${type === 'login' ? 'Sign up instead' : 'Log in instead'}</a>
            </p>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close modal
    modal.querySelector('.close-btn').addEventListener('click', () => {
        modal.remove();
    });
    
    // Switch between login/signup
    modal.querySelector('.auth-switch a').addEventListener('click', (e) => {
        e.preventDefault();
        modal.remove();
        createAuthModal(type === 'login' ? 'signup' : 'login');
    });
    
    // Form submission
    modal.querySelector('form').addEventListener('submit', (e) => {
        e.preventDefault();
        alert(`${type === 'login' ? 'Login' : 'Signup'} successful! (This is a demo)`);
        modal.remove();
    });
    
    // Close when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });
}

// Add click events to buttons
loginBtn.addEventListener('click', () => createAuthModal('login'));
signupBtn.addEventListener('click', () => createAuthModal('signup'));

// Animate feature cards on scroll
function animateCards() {
    featureCards.forEach((card, index) => {
        const cardPosition = card.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (cardPosition < screenPosition) {
            card.style.transitionDelay = `${index * 0.1}s`;
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }
    });
}

// Initialize card animation states
featureCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.5s ease';
});

// Create floating coins animation
function createCoins() {
    const colors = ['#FFD700', '#C0C0C0', '#CD7F32']; // Gold, Silver, Bronze
    const container = document.querySelector('.hero');
    
    for (let i = 0; i < 15; i++) {
        const coin = document.createElement('div');
        coin.className = 'coin';
        
        // Random properties
        const size = Math.random() * 20 + 10;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const duration = Math.random() * 10 + 10;
        const delay = Math.random() * 5;
        const left = Math.random() * 100;
        
        coin.style.width = `${size}px`;
        coin.style.height = `${size}px`;
        coin.style.background = color;
        coin.style.left = `${left}%`;
        coin.style.animationDuration = `${duration}s`;
        coin.style.animationDelay = `${delay}s`;
        
        container.appendChild(coin);
    }
}

// Add CSS for coins and modal
const style = document.createElement('style');
style.textContent = `
    /* Coin animation */
    .coin {
        position: absolute;
        border-radius: 50%;
        background: #FFD700;
        opacity: 0.7;
        z-index: -1;
        animation: floatCoin linear infinite;
        box-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
    }
    
    @keyframes floatCoin {
        0% {
            transform: translateY(0) rotate(0deg);
            top: -10%;
        }
        100% {
            transform: translateY(100vh) rotate(360deg);
            top: 100%;
        }
    }
    
    /* Modal styles */
    .modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    }
    
    .modal-content {
        background: white;
        padding: 2rem;
        border-radius: 15px;
        width: 90%;
        max-width: 400px;
        position: relative;
        box-shadow: 0 5px 30px rgba(0, 0, 0, 0.2);
    }
    
    .close-btn {
        position: absolute;
        top: 1rem;
        right: 1rem;
        font-size: 1.5rem;
        cursor: pointer;
        color: var(--dark);
    }
    
    .modal h2 {
        margin-bottom: 1.5rem;
        color: var(--primary);
    }
    
    .modal input {
        width: 100%;
        padding: 0.8rem;
        margin-bottom: 1rem;
        border: 1px solid #ddd;
        border-radius: 5px;
        font-size: 1rem;
    }
    
    .modal button {
        width: 100%;
        padding: 1rem;
        background: linear-gradient(to right, var(--primary), var(--secondary));
        color: white;
        border: none;
        border-radius: 5px;
        font-size: 1rem;
        cursor: pointer;
        margin-top: 1rem;
    }
    
    .auth-switch {
        margin-top: 1.5rem;
        text-align: center;
        color: #636e72;
    }
    
    .auth-switch a {
        color: var(--primary);
        text-decoration: none;
        font-weight: 500;
    }
`;
document.head.appendChild(style);

// Initialize animations
window.addEventListener('load', () => {
    createCoins();
    animateCards();
});

window.addEventListener('scroll', animateCards);
