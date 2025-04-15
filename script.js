// Interactive Budget Planner
function setupBudgetPlanner() {
    const budgetContainer = document.getElementById('budget-planner');
    if (!budgetContainer) return;
    
    // Initialize draggable categories
    const categories = [
        { id: 'housing', name: 'Housing', allocated: 0, max: 30, color: '#3498db' },
        { id: 'food', name: 'Food', allocated: 0, max: 15, color: '#2ecc71' },
        { id: 'transport', name: 'Transport', allocated: 0, max: 10, color: '#f39c12' },
        { id: 'entertainment', name: 'Entertainment', allocated: 0, max: 10, color: '#9b59b6' },
        { id: 'savings', name: 'Savings', allocated: 0, max: 20, color: '#1abc9c' },
        { id: 'other', name: 'Other', allocated: 0, max: 15, color: '#95a5a6' }
    ];
    
    // Create budget categories
    const categoriesContainer = document.createElement('div');
    categoriesContainer.className = 'budget-categories';
    
    categories.forEach(category => {
        const categoryElement = document.createElement('div');
        categoryElement.className = 'budget-category';
        categoryElement.id = `category-${category.id}`;
        categoryElement.innerHTML = `
            <div class="category-header" style="background: ${category.color}">
                <h3>${category.name}</h3>
                <div class="category-percentage">0%</div>
            </div>
            <div class="category-body">
                <div class="category-progress">
                    <div class="progress-bar" style="width: 0%; background: ${category.color}"></div>
                </div>
                <div class="category-amounts">
                    <span class="allocated">$0</span>
                    <span class="max">of $${category.max * 100}</span>
                </div>
            </div>
        `;
        
        // Make category draggable
        categoryElement.draggable = true;
        categoryElement.dataset.category = category.id;
        
        categoryElement.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', category.id);
            setTimeout(() => {
                categoryElement.classList.add('dragging');
            }, 0);
        });
        
        categoryElement.addEventListener('dragend', () => {
            categoryElement.classList.remove('dragging');
        });
        
        categoriesContainer.appendChild(categoryElement);
    });
    
    // Create income section
    const incomeContainer = document.createElement('div');
    incomeContainer.className = 'budget-income';
    incomeContainer.innerHTML = `
        <h2>Monthly Income: $<span id="income-amount">3000</span></h2>
        <div class="income-slider">
            <input type="range" id="income-slider" min="1000" max="10000" step="100" value="3000">
        </div>
        <div class="remaining-budget">
            <h3>Remaining Budget: $<span id="remaining-amount">3000</span></h3>
            <div class="remaining-bar">
                <div class="progress-bar" style="width: 100%"></div>
            </div>
        </div>
    `;
    
    // Create money elements
    const moneyContainer = document.createElement('div');
    moneyContainer.className = 'budget-money';
    moneyContainer.innerHTML = `
        <div class="money-bag" draggable="true" id="money-bag">
            <img src="money-bag.png" alt="Money">
            <div class="money-value">$100</div>
        </div>
        <div class="money-controls">
            <button class="money-btn" data-amount="10">$10</button>
            <button class="money-btn" data-amount="50">$50</button>
            <button class="money-btn" data-amount="100">$100</button>
            <button class="money-btn" data-amount="500">$500</button>
            <input type="number" id="custom-amount" min="1" placeholder="Custom">
        </div>
    `;
    
    // Set up drop zones
    categoriesContainer.querySelectorAll('.budget-category').forEach(category => {
        category.addEventListener('dragover', (e) => {
            e.preventDefault();
            category.classList.add('drag-over');
        });
        
        category.addEventListener('dragleave', () => {
            category.classList.remove('drag-over');
        });
        
        category.addEventListener('drop', (e) => {
            e.preventDefault();
            category.classList.remove('drag-over');
            
            const categoryId = category.dataset.category;
            const moneyAmount = parseInt(document.querySelector('#money-bag').dataset.amount || '100');
            
            allocateMoney(categoryId, moneyAmount);
        });
    });
    
    // Set up money bag dragging
    const moneyBag = moneyContainer.querySelector('#money-bag');
    moneyBag.addEventListener('dragstart', (e) => {
        const amount = moneyBag.dataset.amount || '100';
        e.dataTransfer.setData('text/plain', amount);
        setTimeout(() => {
            moneyBag.classList.add('dragging');
        }, 0);
    });
    
    moneyBag.addEventListener('dragend', () => {
        moneyBag.classList.remove('dragging');
    });
    
    // Set up money amount buttons
    moneyContainer.querySelectorAll('.money-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const amount = parseInt(btn.dataset.amount);
            updateMoneyBag(amount);
        });
    });
    
    // Set up custom amount input
    moneyContainer.querySelector('#custom-amount').addEventListener('change', (e) => {
        const amount = parseInt(e.target.value);
        if (!isNaN(amount) && amount > 0) {
            updateMoneyBag(amount);
        }
    });
    
    // Set up income slider
    incomeContainer.querySelector('#income-slider').addEventListener('input', (e) => {
        const income = parseInt(e.target.value);
        updateIncome(income);
    });
    
    // Assemble the budget planner
    budgetContainer.innerHTML = '';
    budgetContainer.appendChild(incomeContainer);
    budgetContainer.appendChild(moneyContainer);
    budgetContainer.appendChild(categoriesContainer);
    
    // Initialize values
    updateIncome(3000);
    updateMoneyBag(100);
    
    // Helper functions
    function updateIncome(amount) {
        document.getElementById('income-amount').textContent = amount.toLocaleString();
        updateRemainingBudget();
    }
    
    function updateMoneyBag(amount) {
        moneyBag.dataset.amount = amount;
        moneyBag.querySelector('.money-value').textContent = `$${amount}`;
        document.getElementById('custom-amount').value = amount;
    }
    
    function allocateMoney(categoryId, amount) {
        const category = categories.find(c => c.id === categoryId);
        const income = parseInt(document.getElementById('income-amount').textContent.replace(/,/g, ''));
        const maxAmount = (category.max / 100) * income;
        
        if (category.allocated + amount > maxAmount) {
            showBudgetAlert(`You've exceeded the maximum recommended allocation for ${category.name}!`);
            amount = maxAmount - category.allocated;
            if (amount <= 0) return;
        }
        
        category.allocated += amount;
        updateCategoryDisplay(category);
        updateRemainingBudget();
        
        // Visual feedback
        const categoryElement = document.getElementById(`category-${categoryId}`);
        categoryElement.classList.add('
