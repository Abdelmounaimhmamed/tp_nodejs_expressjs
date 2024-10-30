enum BookStatus {
    Read = "Read",
    Reread = "Re-read",
    DNF = "DNF",
    CurrentlyReading = "Currently reading",
    ReturnedUnread = "Returned Unread",
    WantToRead = "Want to read"
}

enum BookFormat {
    Print = "Print",
    PDF = "PDF",
    Ebook = "Ebook",
    Audiobook = "Audiobook"
}

class Book {
    title: string;
    author: string;
    pages: number;
    pagesRead: number;
    status: BookStatus;
    format: BookFormat;
    suggestedBy: string;
    finished: boolean;

    constructor(
        title: string, 
        author: string, 
        pages: number, 
        format: BookFormat, 
        suggestedBy: string
    ) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.pagesRead = 0;
        this.status = BookStatus.WantToRead;
        this.format = format;
        this.suggestedBy = suggestedBy;
        this.finished = false;
    }

    currentlyAt(pagesRead: number): void {
        this.pagesRead = pagesRead;
        if (this.pagesRead >= this.pages) {
            this.finished = true;
            this.pagesRead = this.pages;
            this.status = BookStatus.Read;
        }
    }

    deleteBook(): void {
        console.log(`${this.title} by ${this.author} has been deleted.`);
    }
}

export { Book, BookStatus, BookFormat };
