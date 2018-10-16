import {AppUtil} from '../../../../conf/app-util';

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
  dateCreated: Date;

  constructor() {
    this.bookId = AppUtil.getId();
    this.bookDescription = this.story = this.isbn = this.eisbn = ''
    this.dateCreated = new Date();
  }
}
