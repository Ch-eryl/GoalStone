// script.js
function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({
    behavior: 'smooth'
  });
}

// Optional: Add form submit alert
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    alert("Thanks for contacting GoalStone! We'll get back to you soon.");
    form.reset();
  });
});

// Add new category types and improved colors
const categories = [
    { id: 'housing', name: 'Housing', allocated: 0, max: 30, color: '#4834d4', icon: '🏠' },
    { id: 'food', name: 'Food & Groceries', allocated: 0, max: 15, color: '#6ab04c', icon: '🍎' },
    { id: 'transport', name: 'Transportation', allocated: 0, max: 10, color: '#eb4d4b', icon: '🚗' },
    { id: 'entertainment', name: 'Entertainment', allocated: 0, max: 10, color: '#be2edd', icon: '🎮' },
    { id: 'savings', name: 'Savings & Investment', allocated: 0, max: 20, color: '#22a6b3', icon: '💰' },
    { id: 'education', name: 'Education', allocated: 0, max: 10, color: '#f9ca24', icon: '📚' },
    { id: 'health', name: 'Health & Fitness', allocated: 0, max: 10, color: '#badc58', icon: '⚕️' },
    { id: 'other', name: 'Other', allocated: 0, max: 15, color: '#95afc0', icon: '📌' }
];

// Enhanced category element creation
categoryElement.innerHTML = `
    <div class="category-header" style="background: ${category.color}">
        <span class="category-icon">${category.icon}</span>
        <h3>${category.name}</h3>
        <div class="category-percentage">0%</div>
    </div>
    <div class="category-body">
        <div class="category-progress">
            <div class="progress-bar" style="width: 0%; background: linear-gradient(45deg, ${category.color}, ${adjustColor(category.color, 20)})"></div>
        </div>
        <div class="category-amounts">
            <span class="allocated">$0</span>
            <span class="max">of $${category.max * 100}</span>
        </div>
        <div class="category-tips"></div>
    </div>
`;

// Add financial tips based on allocation
function showCategoryTips(category) {
    const tips = {
        housing: ['Consider roommates to split rent', 'Check for utility savings programs'],
        food: ['Plan meals ahead', 'Buy in bulk for savings'],
        transport: ['Use public transit when possible', 'Consider carpooling'],
        entertainment: ['Look for free local events', 'Use student discounts'],
        savings: ['Set up automatic transfers', 'Consider high-yield savings accounts'],
        education: ['Apply for scholarships', 'Buy used textbooks'],
        health: ['Use preventive care services', 'Compare insurance plans'],
        other: ['Track miscellaneous expenses', 'Look for areas to reduce spending']
    };
    
    const tipElement = document.querySelector(`#category-${category.id} .category-tips`);
    const randomTip = tips[category.id][Math.floor(Math.random() * tips[category.id].length)];
    tipElement.innerHTML = `<i class="fas fa-lightbulb"></i> Tip: ${randomTip}`;
}

// Enhanced money controls
moneyContainer.innerHTML = `
    <div class="money-bag" draggable="true" id="money-bag">
        <div class="money-glow"></div>
        <img src="images/money-bag.png" alt="Money">
        <div class="money-value">$100</div>
    </div>
    <div class="money-controls">
        <button class="money-btn" data-amount="10">$10</button>
        <button class="money-btn" data-amount="50">$50</button>
        <button class="money-btn" data-amount="100">$100</button>
        <button class="money-btn" data-amount="500">$500</button>
        <button class="money-btn" data-amount="1000">$1000</button>
        <div class="custom-amount-container">
            <input type="number" id="custom-amount" min="1" placeholder="Custom Amount">
            <button id="add-custom-amount">Add</button>
        </div>
    </div>
    <div class="quick-actions">
        <button id="split-equally">Split Equally</button>
        <button id="clear-all">Clear All</button>
        <button id="optimize-budget">Optimize Budget</button>
    </div>
`;

// Add budget insights
function showBudgetInsights() {
    const insights = document.createElement('div');
    insights.className = 'budget-insights';
    insights.innerHTML = `
        <h3>Budget Insights</h3>
        <div class="insights-grid">
            <div class="insight-card">
                <span class="insight-icon">📊</span>
                <h4>Spending Analysis</h4>
                <p>Your biggest expense is ${getTopExpenseCategory()}</p>
            </div>
            <div class="insight-card">
                <span class="insight-icon">💡</span>
                <h4>Savings Potential</h4>
                <p>You could save ${calculateSavingsPotential()}</p>
            </div>
            <div class="insight-card">
                <span class="insight-icon">🎯</span>
                <h4>Budget Health</h4>
                <p>${calculateBudgetHealth()}</p>
            </div>
        </div>
    `;
    budgetContainer.appendChild(insights);
}

// Add budget optimization
function optimizeBudget() {
    const income = parseInt(document.getElementById('income-amount').textContent.replace(/,/g, ''));
    categories.forEach(category => {
        const recommendedAmount = (category.max / 100) * income;
        const currentAmount = category.allocated;
        
        if (currentAmount > recommendedAmount) {
            showBudgetAlert(`Consider reducing ${category.name} spending by $${(currentAmount - recommendedAmount).toFixed(2)}`, 'warning');
        }
    });
}

// Add export functionality
function exportBudget() {
    const budgetData = {
        income: parseInt(document.getElementById('income-amount').textContent.replace(/,/g, '')),
        categories: categories.map(c => ({
            name: c.name,
            allocated: c.allocated,
            percentage: ((c.allocated / income) * 100).toFixed(1)
        }))
    };
    
    const blob = new Blob([JSON.stringify(budgetData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'budget-plan.json';
    a.click();
}
