import {BookBase} from './book-base';
import {SubSection} from './sub-section';

export class Section extends BookBase {
  subSections: Array<SubSection> = [];
}
