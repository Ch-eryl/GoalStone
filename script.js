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


