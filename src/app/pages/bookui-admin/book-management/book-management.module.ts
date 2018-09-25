import { NgModule } from '@angular/core';
import { BookManagementComponent } from './book-management.component';
import {ThemeModule} from '../../../@theme/theme.module';
import {BookManagementRoutingModule} from './book-management-routing.module';
import {BooksModule} from './books/books.module';
import {ChaptersModule} from './chapters/chapters.module';
import {SectionsModule} from './sections/sections.module';
import {SubSectionsModule} from './sub-sections/sub-sections.module';
import {MultimediaModule} from './multimedia/multimedia.module';
import {AddBookComponent} from './modals/add-book/add-book.component';

const components = [
  BookManagementComponent,
  AddBookComponent,
];

@NgModule({
  imports: [
    ThemeModule,
    BookManagementRoutingModule,
    BooksModule,
    ChaptersModule,
    SectionsModule,
    SubSectionsModule,
    MultimediaModule,
  ],
  declarations: [
    ...components,
  ],
  entryComponents: [
    AddBookComponent,
  ],
})
export class BookManagementModule { }
