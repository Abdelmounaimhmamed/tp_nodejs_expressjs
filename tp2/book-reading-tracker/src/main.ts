import { Book, BookFormat } from './Book';

const form = document.getElementById('bookForm') as HTMLFormElement;
const bookList = document.getElementById('bookList') as HTMLElement;

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = (document.getElementById('title') as HTMLInputElement).value;
    const author = (document.getElementById('author') as HTMLInputElement).value;
    const pages = parseInt((document.getElementById('pages') as HTMLInputElement).value);
    const suggestedBy = (document.getElementById('suggestedBy') as HTMLInputElement).value;

    const newBook = new Book(title, author, pages, BookFormat.Print, suggestedBy);

    addBookToList(newBook);
    form.reset();
});

function addBookToList(book: Book): void {
    const bookItem = document.createElement('div');
    bookItem.className = 'p-4 mb-4 bg-white rounded shadow';
    bookItem.textContent = `${book.title} by ${book.author} - ${book.pages} pages`;
    bookList.appendChild(bookItem);
}
