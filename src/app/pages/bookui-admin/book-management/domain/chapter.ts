import {BookBase} from './book-base';
import {Section} from './section';

export class Chapter extends BookBase {
  sections: Array<Section> = [];
}
