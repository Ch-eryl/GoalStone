// Login/Signup Button Actions
document.getElementById("loginBtn").addEventListener("click", () => {
    alert("Login feature coming soon! 🚀");
});

document.getElementById("signupBtn").addEventListener("click", () => {
    alert("Signup feature coming soon! 🎉");
});

// Example: Change button color on hover
const buttons = document.querySelectorAll("button");
buttons.forEach(button => {
    button.addEventListener("mouseover", () => {
        button.style.opacity = "0.8";
    });
    button.addEventListener("mouseout", () => {
        button.style.opacity = "1";
    });
});
