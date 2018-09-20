import {BookBase} from './book-base';
import {Chapter} from './chapter';

export class Book extends BookBase {
  isbn: String;
  eisbn: String;
  author: String;
  published: String;
  datePublished: Date;
  chapters: Array<Chapter>;
}
