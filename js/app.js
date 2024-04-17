console.log("This is app.js");

function Book(name, author, type) {
    this.name = name;
    this.author = author;
    this.type = type;
}

function Display() {

}

Display.prototype.add = function (book) {
    console.log('Adding to UI');
    tableBody = document.getElementById('tableBody');
    let uiString = `<tr>
    <td>${book.name}</td>
    <td>${book.author}</td>
    <td>${book.type}</td>
    </tr>`;
    tableBody.innerHTML += uiString;
}
Display.prototype.clear = function () {
    let libraryForm = document.getElementById('libraryForm');
    libraryForm.reset();
}
Display.prototype.validate = function (book) {
    if (book.name.length < 2 || book.author.length < 2) {
        return false;
    }
    else {
        return true;
    }
}
Display.prototype.show = function (type, displayMessage) {
    let message = document.getElementById('message');
    message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                                <strong>Message:</strong> ${displayMessage}
                                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                         </div>`;
    setTimeout(() => {
        message.innerHTML = '';
    }, 2000);
}

let libraryForm = document.getElementById('libraryForm');
libraryForm.addEventListener('submit', libraryFormSubmit);

function libraryFormSubmit(e) {
    console.log("You have submitted the form");
    let name = document.getElementById('bookname').value;
    let author = document.getElementById('author').value;
    let type = document.getElementById('type').value;
    let book = new Book(name, author, type);
    console.log(book);
    let display = new Display();
    if (display.validate(book)) {
        display.add(book);
        localStorage.setItem("books", JSON.stringify(book));
        // let books = localStorage.getItem('books');
        // books.push(book.value);
        // let books = localStorage.getItem('books');
        // if (books == null) {
        //     booksObj = [];
        // }
        // else {
        //     booksObj = JSON.parse(book);
        // }   
        display.clear();
        display.show('Success', 'Your book is added successfully!');
    }
    else {
        display.show('danger', 'Sorry, you can not add this book');
    }
    e.preventDefault();
}