import {BookBase} from './book-base';
import {Chapter} from './chapter';
import {Multimedia} from '../../../../shared/domain/multimedia';

export class Book extends BookBase {
  siteId: string;
  isbn: string;
  eisbn: string;
  author: string;
  publisher: string;
  datePublished: Date;
  chapters: Array<Chapter> = [];
}
