// ==============================
// Step 1: Book constructor
// ==============================
function Book(title, author, pages, isRead) {
    this.id = crypto.randomUUID();  //unique id for each book
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
}

// ==============================
// Step 2: Array + addBook function
// ==============================
let library = [];

function addBookToLibrary(title, author, pages, isRead) {
    const newBook = new Book(title, author, pages, isRead);
    library.push(newBook);
    displayLibrary(); // refresh the table whenever a new book is added
}

// ==============================
// Step 3 + 5 + 7: Display function with data-id
// ==============================
function displayLibrary () {
    const tbody = document.getElementById("libraryBody");
    tbody.innerHTML = ""; 

    library.forEach(book => {
        const tr = document.createElement("tr");
        tr.setAttribute("data-id", book.id); 

    // Title 
    const tdTitle = document.createElement("td");
    tdTitle.textContent = book.title;
    tr.appendChild(tdTitle);

    // Author 
    const tdAuthor = document.createElement("td");
    tdAuthor.textContent = book.author;
    tr.appendChild(tdAuthor);

    // Pages 
    const tdPages = document.createElement("td");
    tdPages.textContent = book.pages;
    tr.appendChild(tdPages);

    // Read 
    const tdRead = document.createElement("td");
    tdRead.textContent = book.isRead ? "Yes" : "No";
    tr.appendChild(tdRead);

    // Action buttons
    const tdAction = document.createElement("td");

    // Step 4 + 5: Remove button
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.onClick = (e) => {
        const bookRow = e.target.closet("tr"); // find the row
        const bookId = bookRow.getAttribute("data-id"); // get id from data-id
        removeBook(bookId);
    };
    tdAction.appendChild(removeBtn);

    // Step 7: Toggle Read Button
    const toggleBtn = document.createElement("button");
    toggleBtn.textContent = "Toggle Read";
    toggleBtn.onClick = (e) => {
        const bookRow = e.target.closest("tr");
        const bookId = bookRow.getAttribute("data-id");
        toggleReadStatus(bookId);
    };
    tdAction.appendChild(toggleBtn);

    tr.appendChild(tdAction);

    tbody.appendChild(tr);
});
}

// ==============================
// Step 4 + 5: Remove book function
// ==============================
function removeBook(id) {
    library = library.filter(book => book.id !== id);
    displayLibrary();
}

// ==============================
// Step 7: Toggle read status function
// ==============================
function toggleReadStatus(id) {
    const book = library.find(book => book.id === id);
    if (book) {
        book.isRead = !book.isRead; // flip the value
        displayLibrary();
    }
}

// ==============================
// Step 6:Form handler
// ===============================
const bookForm = document.getElementById("bookForm");

bookForm.addEventListener("submit", (e) => {
    e.preventDefault(); 

    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const isRead = document.getElementById("isRead").checked;

    addBookToLibrary(title, author, pages, isRead);

    bookForm.reset();
});

// ==============================
// Sample books
// ==============================
addBookToLibrary("The Hobbit", "J.R.R.Tolkien", 295, true);
addBookToLibrary("1984", "George Orwell", 328, false);
addBookToLibrary("Atomic Habits", "James Clear", 320, true);