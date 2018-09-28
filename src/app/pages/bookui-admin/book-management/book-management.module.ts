import { NgModule } from '@angular/core';
import { BookManagementComponent } from './book-management.component';
import {ThemeModule} from '../../../@theme/theme.module';
import {BookManagementRoutingModule} from './book-management-routing.module';
import {BooksModule} from './books/books.module';
import {ChaptersModule} from './chapters/chapters.module';
import {SectionsModule} from './sections/sections.module';
import {SubSectionsModule} from './sub-sections/sub-sections.module';
import {MultimediaModule} from './multimedia/multimedia.module';
import {AddEditBookComponent} from './modals/add-edit-book/add-edit-book.component';
import {AddEditSectionComponent} from './modals/add-edit-section/add-edit-section.component';

const components = [
  BookManagementComponent,
  AddEditBookComponent,
  AddEditSectionComponent,
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
    AddEditBookComponent,
    AddEditSectionComponent,
  ],
})
export class BookManagementModule { }
