import { NgModule } from '@angular/core';
import { BookManagementComponent } from './book-management.component';
import {ThemeModule} from '../../../@theme/theme.module';
import {BookManagementRoutingModule} from './book-management-routing.module';
import {BookModule} from './book/book.module';
import {ChapterModule} from './chapter/chapter.module';
import {SectionModule} from './section/section.module';
import {SubSectionModule} from './sub-section/sub-section.module';

const components = [
  BookManagementComponent,
];

@NgModule({
  imports: [
    ThemeModule,
    BookManagementRoutingModule,
    BookModule,
    ChapterModule,
    SectionModule,
    SubSectionModule,
  ],
  declarations: [
    ...components,
  ],
})
export class BookManagementModule { }
