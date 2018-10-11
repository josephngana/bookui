
export class Book {
  siteId: string;
  bookId: string;
  bookTitle: string;
  bookDescription: string = '';
  story: string = '';
  isbn: string = '';
  eisbn: string = '';
  author: string;
  publisher: string;
  datePublished: Date;
  dateCreated: Date = new Date();
}
