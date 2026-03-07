const myLibrary = [];


function Book(title, author, pages, read) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}


Book.prototype.toggleRead = function () {
  this.read = !this.read;
};


function addBookToLibrary(title, author, pages, read) {

  const book = new Book(title, author, pages, read);

  myLibrary.push(book);

}


function displayBooks() {

  const libraryDiv = document.getElementById("library");

  libraryDiv.innerHTML = "";

  myLibrary.forEach(book => {

    const card = document.createElement("div");

    card.classList.add("book-card");

    card.innerHTML = `
      <h3>${book.title}</h3>
      <p>Author: ${book.author}</p>
      <p>Pages: ${book.pages}</p>
      <p>Status: ${book.read ? "Read" : "Not read yet"}</p>

      <button data-id="${book.id}" class="toggle">Toggle Read</button>
      <button data-id="${book.id}" class="remove">Remove</button>
    `;

    libraryDiv.appendChild(card);

  });

}


document.addEventListener("click", function (e) {

  if (e.target.classList.contains("remove")) {

    const id = e.target.dataset.id;

    const index = myLibrary.findIndex(book => book.id === id);

    myLibrary.splice(index, 1);

    displayBooks();
  }

  if (e.target.classList.contains("toggle")) {

    const id = e.target.dataset.id;

    const book = myLibrary.find(book => book.id === id);

    book.toggleRead();

    displayBooks();
  }

});


document.getElementById("bookForm").addEventListener("submit", function (e) {

  e.preventDefault();

  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const read = document.getElementById("read").checked;

  addBookToLibrary(title, author, pages, read);

  displayBooks();

  this.reset();

});



addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, false);
addBookToLibrary("Dune", "Frank Herbert", 604, true);
addBookToLibrary("1984", "George Orwell", 328, true);
addBookToLibrary("The Name of the Wind", "Patrick Rothfuss", 662, false);


displayBooks();