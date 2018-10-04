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
import {AddEditChapterComponent} from './modals/add-edit-chapter/add-edit-chapter.component';
import {AddEditSubsectionComponent} from './modals/add-edit-subsection/add-edit-subsection.component';

const components = [
  BookManagementComponent,
  AddEditBookComponent,
  AddEditSectionComponent,
  AddEditChapterComponent,
  AddEditSubsectionComponent,
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
    AddEditChapterComponent,
    AddEditSubsectionComponent,
  ],
})
export class BookManagementModule { }
