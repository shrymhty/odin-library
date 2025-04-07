const myLibrary = [];

function Book(title, author, pages, read) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.toggleReadStatus = function () {
    this.read = this.read === 'Yes' ? 'No' : 'Yes';
};

function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    return newBook;
}

const cardDiv = document.querySelector('.library');
const addBookBtn = document.querySelector('#add');
const dialog = document.querySelector('dialog');
const closeBtn = document.querySelector('#add-submit-btn');
const titleInput = document.querySelector('#title');
const authorInput = document.querySelector('#author');
const pagesInput = document.querySelector('#pages');
const readInput = document.querySelector('#read');

function bookCard(bookObj) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.setAttribute('data-id', bookObj.id);
    card.style.display = 'flex';
    card.style.justifyContent = 'space-between';
    card.style.alignItems = 'start';
    card.style.border = '1px solid #ccc';
    card.style.borderRadius = '10px';
    card.style.padding = '15px';
    card.style.margin = '10px 0';
    card.style.backgroundColor = '#f9f9f9';

    const leftDiv = document.createElement('div');
    leftDiv.style.flex = '1';

    const titleEl = document.createElement('h3');
    titleEl.style.textDecoration = 'underline';
    titleEl.textContent = bookObj.title;

    const authorEl = document.createElement('p');
    authorEl.innerHTML = `<b>Author:</b> ${bookObj.author}`;

    const pagesEl = document.createElement('p');
    pagesEl.innerHTML = `<b>Number of Pages:</b> ${bookObj.pages}`;

    const readPara = document.createElement('p');
    readPara.innerHTML = `<b>Yet to Read?</b> ${bookObj.read}`;

    const toggleBtn = document.createElement('button');
    toggleBtn.textContent = 'Read Status';
    toggleBtn.style.backgroundColor = 'lightblue';
    toggleBtn.style.border = 'none';
    toggleBtn.style.padding = '10px';
    toggleBtn.style.cursor = 'pointer';
    toggleBtn.style.borderRadius = '5px';
    toggleBtn.style.marginTop = '10px';

    toggleBtn.addEventListener('click', () => {
        bookObj.toggleReadStatus();
        readPara.innerHTML = `<b>Yet to Read?</b> ${bookObj.read}`;
    });

    leftDiv.append(titleEl, authorEl, pagesEl, readPara, toggleBtn);

    const rightDiv = document.createElement('div');

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'X';
    deleteBtn.classList.add('delete-book-btn');
    deleteBtn.style.backgroundColor = 'lightcoral';
    deleteBtn.style.color = 'white';
    deleteBtn.style.border = 'none';
    deleteBtn.style.padding = '10px';
    deleteBtn.style.cursor = 'pointer';
    deleteBtn.style.borderRadius = '5px';
    deleteBtn.style.fontSize = '0.8em';
    deleteBtn.style.fontWeight = 'bold';

    deleteBtn.addEventListener('click', () => {
        card.remove();
        const index = myLibrary.findIndex(book => book.id === bookObj.id);
        if (index !== -1) {
            myLibrary.splice(index, 1);
        }
        console.log('Book deleted:', bookObj.title);
    });

    rightDiv.appendChild(deleteBtn);
    card.append(leftDiv, rightDiv);
    cardDiv.appendChild(card);
}

addBookBtn.addEventListener('click', () => {
    dialog.showModal();
    titleInput.value = '';
    authorInput.value = '';
    pagesInput.value = '';
    readInput.value = 'Yes';
});

closeBtn.addEventListener('click', (event) => {
    event.preventDefault();
    const title = titleInput.value;
    const author = authorInput.value;
    const numPages = pagesInput.value;
    const read = readInput.value === 'on' ? 'Yes' : 'No';  // Or handle based on your form type

    const bookObj = addBookToLibrary(title, author, numPages, read);
    bookCard(bookObj);
    dialog.close();
});

console.log(myLibrary);
