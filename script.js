const myLibrary = [];

/* =========================
   BOOK CLASS
========================= */

class Book {
  constructor(title, author, pages, read) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  toggleRead() {
    this.read = !this.read;
  }
}

/* =========================
   ADD BOOK
========================= */

function addBookToLibrary(title, author, pages, read) {
  const book = new Book(title, author, pages, read);

  myLibrary.push(book);
}

/* =========================
   DISPLAY BOOKS
========================= */

function displayBooks() {
  const libraryDiv = document.getElementById("library");

  libraryDiv.innerHTML = "";

  myLibrary.forEach((book) => {
    const card = document.createElement("div");

    card.classList.add("book-card");

    card.innerHTML = `
      <h3>${book.title}</h3>

      <p>
        <strong>Author:</strong>
        ${book.author}
      </p>

      <p>
        <strong>Pages:</strong>
        ${book.pages}
      </p>

      <p>
        <strong>Status:</strong>
        ${book.read ? "Read" : "Not read yet"}
      </p>

      <div class="book-buttons">
        <button
          data-id="${book.id}"
          class="toggle"
          type="button"
        >
          Toggle Read
        </button>

        <button
          data-id="${book.id}"
          class="remove"
          type="button"
        >
          Remove
        </button>
      </div>
    `;

    libraryDiv.appendChild(card);
  });
}

/* =========================
   FORM ELEMENTS
========================= */

const bookForm = document.getElementById("bookForm");

const titleInput = document.getElementById("title");

const authorInput = document.getElementById("author");

const pagesInput = document.getElementById("pages");

const readInput = document.getElementById("read");

const titleError = document.getElementById("title-error");

const authorError = document.getElementById("author-error");

const pagesError = document.getElementById("pages-error");

const formMessage = document.getElementById("form-message");

const newBookBtn = document.getElementById("newBookBtn");

/* =========================
   VALIDATION STATE
========================= */

function setValidationState(input, errorElement, message) {
  input.setCustomValidity(message);

  const formGroup = input.closest(".form-group");

  if (message !== "") {
    formGroup.classList.add("invalid");
    formGroup.classList.remove("valid");

    errorElement.textContent = message;

    return false;
  }

  formGroup.classList.remove("invalid");

  if (input.value.trim() !== "") {
    formGroup.classList.add("valid");
  } else {
    formGroup.classList.remove("valid");
  }

  errorElement.textContent = "";

  return true;
}

/* =========================
   TITLE VALIDATION
========================= */

function validateTitle() {
  titleInput.setCustomValidity("");

  const value = titleInput.value.trim();

  let message = "";

  if (value === "") {
    message = "The book title must be filled!";
  } else if (value.length < 2) {
    message = "The book title must contain at least 2 characters.";
  }

  return setValidationState(titleInput, titleError, message);
}

/* =========================
   AUTHOR VALIDATION
========================= */

function validateAuthor() {
  authorInput.setCustomValidity("");

  const value = authorInput.value.trim();

  let message = "";

  if (value === "") {
    message = "The author name must be filled!";
  } else if (value.length < 2) {
    message = "The author name must contain at least 2 characters.";
  }

  return setValidationState(authorInput, authorError, message);
}

/* =========================
   PAGES VALIDATION
========================= */

function validatePages() {
  pagesInput.setCustomValidity("");

  const value = pagesInput.value.trim();

  let message = "";

  if (value === "") {
    message = "The number of pages must be filled!";
  } else if (Number(value) <= 0) {
    message = "The number of pages must be greater than 0.";
  } else if (!Number.isInteger(Number(value))) {
    message = "The number of pages must be a whole number.";
  }

  return setValidationState(pagesInput, pagesError, message);
}

/* =========================
   LIVE VALIDATION
========================= */

titleInput.addEventListener("input", validateTitle);

titleInput.addEventListener("blur", validateTitle);

authorInput.addEventListener("input", validateAuthor);

authorInput.addEventListener("blur", validateAuthor);

pagesInput.addEventListener("input", validatePages);

pagesInput.addEventListener("blur", validatePages);

/* =========================
   RESET VALIDATION
========================= */

function resetValidationStyles() {
  const formGroups = bookForm.querySelectorAll(".form-group");

  formGroups.forEach((formGroup) => {
    formGroup.classList.remove("valid", "invalid");
  });

  const errorMessages = bookForm.querySelectorAll(".error-message");

  errorMessages.forEach((errorMessage) => {
    errorMessage.textContent = "";
  });

  titleInput.setCustomValidity("");
  authorInput.setCustomValidity("");
  pagesInput.setCustomValidity("");
}

/* =========================
   FORM SUBMIT
========================= */

bookForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const titleIsValid = validateTitle();

  const authorIsValid = validateAuthor();

  const pagesAreValid = validatePages();

  const formIsValid = titleIsValid && authorIsValid && pagesAreValid;

  if (!formIsValid) {
    formMessage.textContent = "Please fix the errors before adding the book.";

    formMessage.className = "form-message error";

    const firstInvalidInput = bookForm.querySelector(
      ".form-group.invalid input",
    );

    if (firstInvalidInput) {
      firstInvalidInput.focus();
    }

    return;
  }

  const title = titleInput.value.trim();

  const author = authorInput.value.trim();

  const pages = Number(pagesInput.value);

  const read = readInput.checked;

  addBookToLibrary(title, author, pages, read);

  displayBooks();

  this.reset();

  resetValidationStyles();

  formMessage.textContent = "Book added successfully!";

  formMessage.className = "form-message success";
});

/* =========================
   REMOVE AND TOGGLE BOOKS
========================= */

document.addEventListener("click", function (event) {
  if (event.target.classList.contains("remove")) {
    const id = event.target.dataset.id;

    const index = myLibrary.findIndex((book) => book.id === id);

    if (index !== -1) {
      myLibrary.splice(index, 1);
    }

    displayBooks();
  }

  if (event.target.classList.contains("toggle")) {
    const id = event.target.dataset.id;

    const book = myLibrary.find((book) => book.id === id);

    if (book) {
      book.toggleRead();
    }

    displayBooks();
  }
});

/* =========================
   NEW BOOK BUTTON
========================= */

newBookBtn.addEventListener("click", function () {
  titleInput.focus();

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

/* =========================
   EXAMPLE BOOKS
========================= */

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, false);

addBookToLibrary("Dune", "Frank Herbert", 604, true);

addBookToLibrary("1984", "George Orwell", 328, true);

addBookToLibrary("The Name of the Wind", "Patrick Rothfuss", 662, false);

/* =========================
   INITIAL DISPLAY
========================= */

displayBooks();
