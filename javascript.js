const myLibrary = [];

function Book(title, author, pages, read) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    return newBook;
}

const cardDiv = document.querySelector('.library')
const addBookBtn = document.querySelector('#add');
const dialog = document.querySelector('dialog');
const closeBtn = document.querySelector('#add-submit-btn');
const titleInput = document.querySelector('#title');
const authorInput = document.querySelector('#author');
const pagesInput = document.querySelector('#pages');
const readInput = document.querySelector('#read');
const deleteBook = document.querySelector('#delete-book-btn')

function bookCard(bookObj) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.setAttribute('data-id', bookObj.id);  

    card.innerHTML = `
        <div>
            <h3>${bookObj.title}</h3>
            <p>Author: ${bookObj.author}</p>
            <p>Number of Pages: ${bookObj.pages}</p>
            <p>Yet to Read? ${bookObj.read}</p>
        </div>
        <div>
            <button class='delete-book-btn'>Delete</button>
        </div>`;

    const deleteBtn = card.querySelector('.delete-book-btn');
    deleteBtn.addEventListener('click', () => {
        card.remove();  

        const index = myLibrary.findIndex(book => book.id === bookObj.id);
        if (index !== -1) {
            myLibrary.splice(index, 1);
        }

        console.log('Book deleted:', bookObj.title);
    });

    cardDiv.appendChild(card);
}


addBookBtn.addEventListener('click', () => {
    dialog.showModal();
    titleInput.value = '';
    authorInput.value = '';
    pagesInput.value = '';
});

closeBtn.addEventListener('click', (event) => {
    event.preventDefault();  // Prevent form submission

    const title = titleInput.value;
    const author = authorInput.value;
    const numPages = pagesInput.value;
    const read = readInput.value;
    const bookObj = addBookToLibrary(title, author, numPages, read);
    bookCard(bookObj);
    dialog.close();
});


console.log(myLibrary);