// your code goes here
// Initialize money rain animation
const moneyRain = {
    canvas: document.getElementById('money-rain'),
    ctx: null,
    bills: [],
    init() {
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.createBills(20);
        this.animate();
    },
    createBills(count) {
        for (let i = 0; i < count; i++) {
            this.bills.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * -this.canvas.height,
                speed: 1 + Math.random() * 3,
                rotation: Math.random() * 360,
                rotationSpeed: Math.random() * 2 - 1
            });
        }
    },
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.bills.forEach(bill => {
            bill.y += bill.speed;
            bill.rotation += bill.rotationSpeed;
            
            if (bill.y > this.canvas.height) {
                bill.y = -50;
                bill.x = Math.random() * this.canvas.width;
            }
            
            this.drawBill(bill);
        });
        
        requestAnimationFrame(() => this.animate());
    },
    drawBill(bill) {
        this.ctx.save();
        this.ctx.translate(bill.x, bill.y);
        this.ctx.rotate(bill.rotation * Math.PI / 180);
        this.ctx.fillStyle = '#85bb65';
        this.ctx.fillRect(-20, -10, 40, 20);
        this.ctx.restore();
    }
};

// Initialize 3D piggy bank
const piggyBank3D = {
    scene: null,
    camera: null,
    renderer: null,
    piggy: null,
    
    init() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ alpha: true });
        
        const container = document.getElementById('piggy-bank-3d');
        container.appendChild(this.renderer.domElement);
        
        this.loadModel();
        this.animate();
    },
    
    loadModel() {
        const loader = new THREE.GLTFLoader();
        loader.load('models/piggy-bank.glb', (gltf) => {
            this.piggy = gltf.scene;
            this.scene.add(this.piggy);
        });
    },
    
    animate() {
        if (this.piggy) {
            this.piggy.rotation.y += 0.01;
        }
        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(() => this.animate());
    }
};

// Achievement counter animation
function animateCounters() {
    const counters = document.querySelectorAll('.count');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            counter.textContent = Math.floor(current).toLocaleString();
            
            if (current < target) {
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target.toLocaleString();
            }
        };
        
        updateCounter();
    });
}

// Mini-game initialization
const coinCollector = {
    player: document.querySelector('.player'),
    coins: [],
    score: 0,
    
    init() {
        this.bindControls();
        this.spawnCoins();
        this.gameLoop();
    },
    
    bindControls() {
        document.addEventListener('mousemove', (e) => {
            const gameWindow = document.querySelector('.game-window');
            const bounds = gameWindow.getBoundingClientRect();
            const x = e.clientX - bounds.left;
            this.player.style.left = `${Math.max(0, Math.min(x, bounds.width))}px`;
        });
    },
    
    spawnCoins() {
        setInterval(() => {
            const coin = document.createElement('div');
            coin.className = 'coin';
            coin.style.left = `${Math.random() * 100}%`;
            this.coins.push(coin);
            document.querySelector('.coin-collector').appendChild(coin);
        }, 1000);
    },
    
    gameLoop() {
        this.coins.forEach(coin => {
            const top = parseFloat(coin.style.top || 0);
            if (top > 100) {
                coin.remove();
                this.coins = this.coins.filter(c => c !== coin);
            } else {
                coin.style.top = `${top + 1}%`;
                this.checkCollision(coin);
            }
        });
        
        requestAnimationFrame(() => this.gameLoop());
    },
    
    checkCollision(coin) {
        const playerRect = this.player.getBoundingClientRect();
        const coinRect = coin.getBoundingClientRect();
        
        if (playerRect.left < coinRect.right &&
            playerRect.right > coinRect.left &&
            playerRect.top < coinRect.bottom &&
            playerRect.bottom > coinRect.top) {
            coin.remove();
            this.coins = this.coins.filter(c => c !== coin);
            this.score += 10;
            this.updateScore();
            this.createCoinParticles(coinRect);
        }
    },
    
    createCoinParticles(position) {
        for (let i = 0; i < 10; i++) {
            const particle = document.createElement('div');
            particle.className = 'coin-particle';
            particle.style.left = `${position.left}px`;
            particle.style.top = `${position.top}px`;
            document.body.appendChild(particle);
            
            setTimeout(() => particle.remove(), 1000);
        }
    },
    
    updateScore() {
        document.querySelector('.game-score').textContent = this.score;
    }
};

// Initialize all features
document.addEventListener('DOMContentLoaded', () => {
    moneyRain.init();
    piggyBank3D.init();
    animateCounters();
    coinCollector.init();
    
    // Initialize particles
    particlesJS('particles-js', {
        particles: {
            number: { value: 80 },
            color: { value: '#6c5ce7' },
            shape: { type: 'circle' },
            opacity: { value: 0.5 },
            size: { value: 3 },
            move: { enable: true, speed: 6 }
        }
    });
});

// Smooth scroll functionality
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.sticky-header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});
