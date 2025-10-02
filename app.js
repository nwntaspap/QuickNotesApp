// DOM Elements
const themeToggleBtn = document.getElementById("themeToggleBtn");
const dialogModal = document.getElementById("noteDialog");
const dialogForm = document.getElementById("noteForm");
const notesContainer = document.getElementById("notesContainer");

let notes = [];

// Toggle Dark/Light Mode
function themeToggle() {
  const body = document.body;
  body.classList.toggle("dark-theme");

  body.classList.contains("dark-theme")
    ? (themeToggleBtn.textContent = "☀️")
    : (themeToggleBtn.textContent = "🌙");
}

themeToggleBtn.addEventListener("click", themeToggle);
