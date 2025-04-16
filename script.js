// script.js

// Smooth scroll to a specific section
function scrollToSection(id) {
  const section = document.getElementById(id);
  if (section) {
    section.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
}

// Handle form submission with feedback
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");

  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      // Grab input values (optional: could be used for validation/logging)
      const name = form.querySelector('input[type="text"]').value;
      const email = form.querySelector('input[type="email"]').value;
      const message = form.querySelector('textarea').value;

      // Display confirmation
      alert(`Thanks, ${name}! Your message has been sent.`);

      // Clear form
      form.reset();
    });
  }
});
