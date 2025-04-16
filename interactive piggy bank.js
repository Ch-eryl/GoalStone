function createInteractivePiggyBank() {
    const piggyBank = document.getElementById('piggy-bank');
    const amountDisplay = document.getElementById('piggy-amount');
    const addMoneyBtn = document.getElementById('add-money-btn');
    const breakPiggyBtn = document.getElementById('break-piggy-btn');
    
    let savedAmount = 0;
    let goalAmount = 1000; // Default savings goal
    
    // Add sound effects
    const coinSound = new Audio('sounds/coin-drop.mp3');
    const breakSound = new Audio('sounds/piggy-break.mp3');
    
    // Add savings goal setter
    const setGoalBtn = document.createElement('button');
    setGoalBtn.id = 'set-goal-btn';
    setGoalBtn.textContent = 'Set Savings Goal';
    piggyBank.parentElement.appendChild(setGoalBtn);
    
    setGoalBtn.addEventListener('click', () => {
        const newGoal = parseFloat(prompt("Set your savings goal:", goalAmount));
        if (!isNaN(newGoal) && newGoal > 0) {
            goalAmount = newGoal;
            updatePiggyBank();
        }
    });
    
    addMoneyBtn.addEventListener('click', () => {
        const amount = parseFloat(prompt("How much would you like to add to your piggy bank?", "10"));
        if (!isNaN(amount) && amount > 0) {
            savedAmount += amount;
            updatePiggyBank();
            
            // Enhanced coin animation
            const coinsToAdd = Math.min(Math.ceil(amount / 10), 5);
            for (let i = 0; i < coinsToAdd; i++) {
                setTimeout(() => {
                    createCoinAnimation();
                    coinSound.currentTime = 0;
                    coinSound.play();
                }, i * 200);
            }
            
            // Check if goal is reached
            if (savedAmount >= goalAmount) {
                celebrateGoalReached();
            }
        }
    });
    
    function createCoinAnimation() {
        const coin = document.createElement('div');
        coin.className = 'piggy-coin';
        coin.innerHTML = '<i class="fas fa-coins"></i>';
        
        // Random starting position above piggy bank
        coin.style.left = `${40 + Math.random() * 20}%`;
        coin.style.top = '-50px';
        
        piggyBank.appendChild(coin);
        
        // Animate coin dropping
        requestAnimationFrame(() => {
            coin.style.top = '50%';
            coin.style.transform = 'rotate(360deg)';
        });
        
        setTimeout(() => {
            coin.remove();
        }, 1000);
    }
    
    function celebrateGoalReached() {
        const celebration = document.createElement('div');
        celebration.className = 'celebration';
        celebration.textContent = '🎉 Goal Reached! 🎉';
        piggyBank.appendChild(celebration);
        
        // Create confetti effect
        for (let i = 0; i < 50; i++) {
            createConfetti();
        }
        
        setTimeout(() => {
            celebration.remove();
        }, 3000);
    }
    
    function createConfetti() {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = `${Math.random() * 100}%`;
        confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 70%, 50%)`;
        piggyBank.appendChild(confetti);
        
        setTimeout(() => {
            confetti.remove();
        }, 2000);
    }
    
    breakPiggyBtn.addEventListener('click', () => {
        if (savedAmount > 0) {
            breakSound.play();
            alert(`You broke your piggy bank and collected $${savedAmount.toFixed(2)}!`);
            savedAmount = 0;
            updatePiggyBank();
            
            // Enhanced explosion effect
            piggyBank.classList.add('shake');
            for (let i = 0; i < 30; i++) {
                setTimeout(() => {
                    const coin = document.createElement('div');
                    coin.className = 'exploding-coin';
                    coin.innerHTML = '<i class="fas fa-coins"></i>';
                    
                    // Random direction explosion
                    const angle = (Math.random() * Math.PI * 2);
                    const distance = 100 + Math.random() * 100;
                    coin.style.left = `${50 + Math.cos(angle) * distance}%`;
                    coin.style.top = `${50 + Math.sin(angle) * distance}%`;
                    
                    piggyBank.appendChild(coin);
                    
                    setTimeout(() => {
                        coin.remove();
                    }, 2000);
                }, i * 50);
            }
            
            setTimeout(() => {
                piggyBank.classList.remove('shake');
            }, 1000);
        } else {
            alert("Your piggy bank is empty!");
        }
    });
    
    function updatePiggyBank() {
        amountDisplay.textContent = `${savedAmount.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
        })} / ${goalAmount.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
        })}`;
        
        // Progress-based appearance
        const progress = savedAmount / goalAmount;
        if (progress >= 1) {
            piggyBank.style.backgroundColor = '#FFD700'; // gold
            piggyBank.style.boxShadow = '0 0 20px rgba(255, 215, 0, 0.5)';
        } else if (progress >= 0.5) {
            piggyBank.style.backgroundColor = '#C0C0C0'; // silver
            piggyBank.style.boxShadow = '0 0 15px rgba(192, 192, 192, 0.5)';
        } else {
            piggyBank.style.backgroundColor = '#CD7F32'; // bronze
            piggyBank.style.boxShadow = '0 0 10px rgba(205, 127, 50, 0.5)';
        }
        
        // Update progress bar
        const progressBar = document.querySelector('.piggy-progress') || createProgressBar();
        progressBar.style.width = `${Math.min(progress * 100, 100)}%`;
    }
    
    function createProgressBar() {
        const progressContainer = document.createElement('div');
        progressContainer.className = 'piggy-progress-container';
        
        const progressBar = document.createElement('div');
        progressBar.className = 'piggy-progress';
        
        progressContainer.appendChild(progressBar);
        piggyBank.parentElement.appendChild(progressContainer);
        
        return progressBar;
    }
    
    // Initialize
    updatePiggyBank();
}
