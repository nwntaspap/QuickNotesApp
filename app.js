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

// Open Dialog Modal
function openNoteDialog() {
  dialogModal.showModal();
}

// Close Dialog Modal, Reset Form
function closeNoteDialog() {
  dialogForm.reset();
  dialogModal.close();
}

// Get form values and create note object
function getFormData() {
  const title = document.getElementById("noteTitle").value;
  const content = document.getElementById("noteContent").value;

  const noteObj = {
    id: Date.now(),
    title: title,
    content: content,
  };

  return noteObj;
}

// Save note to array
function saveNoteToArray(note) {
  notes.push(note);
}

// Create DOM element for a single note
function createNoteElement(note) {
  const noteCard = document.createElement("div");
  noteCard.classList.add("note-card");

  noteCard.innerHTML = `
     <div class="note-title">${note.title}</div>
        <div class="note-content">${note.content}</div>
        <div class="note-actions">
          <button class="edit-btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="20px"
              viewBox="0 -960 960 960"
              width="20px"
              fill="#191b23"
            >
              <path
                d="M184-184v-83.77l497.23-498.77q5.15-5.48 11.07-7.47 5.93-1.99 11.99-1.99 6.06 0 11.62 1.54 5.55 1.54 11.94 7.15l38.69 37.93q5.61 6.38 7.54 12 1.92 5.63 1.92 12.25 0 6.13-2.24 12.06-2.24 5.92-7.22 11.07L267.77-184H184Zm505.15-466.46L744-704.54 704.54-744l-54.08 54.85 38.69 38.69Z"
              />
            </svg>
          </button>
          <button class="delete-btn" onclick="deleteNote(${note.id})">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="20px"
              viewBox="0 -960 960 960"
              width="20px"
              fill="#191b23"
            >
              <path
                d="M291-267.69 267.69-291l189-189-189-189L291-692.31l189 189 189-189L692.31-669l-189 189 189 189L669-267.69l-189-189-189 189Z"
              />
            </svg>
          </button>
       </div>
  `;

  return noteCard;
}

// Render all notes to the DOM
function renderNotes() {
  // Clear existing
  notesContainer.innerHTML = "";

  notes.forEach((note) => {
    const noteElement = createNoteElement(note);
    notesContainer.append(noteElement);
  });
}

// Main form handler
function handleFormSubmit(event) {
  event.preventDefault();

  const newNote = getFormData();
  saveNoteToArray(newNote);
  saveNotes();
  renderNotes();
  closeNoteDialog();
}

// Save to LocalStorage
function saveNotes() {
  localStorage.setItem("Notes", JSON.stringify(notes));
}

// Load from LocalStorage
function loadNotes() {
  const jsonStr = localStorage.getItem("Notes");
  if (jsonStr) {
    notes = JSON.parse(jsonStr);
    renderNotes();
  }
}

// Delete Node with ID
function deleteNote(id) {
  notes = notes.filter((note) => note.id !== id);
  saveNotes();
  renderNotes();
}

themeToggleBtn.addEventListener("click", themeToggle);
dialogForm.addEventListener("submit", handleFormSubmit);

// Load when page starts
document.addEventListener("DOMContentLoaded", loadNotes);
