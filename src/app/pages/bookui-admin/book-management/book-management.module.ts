import { NgModule } from '@angular/core';
import { BookManagementComponent } from './book-management.component';
import {ThemeModule} from '../../../@theme/theme.module';
import {BookManagementRoutingModule} from './book-management-routing.module';
import {BooksModule} from './books/books.module';
import {ChaptersModule} from './chapters/chapters.module';
import {SectionsModule} from './sections/sections.module';
import {SubSectionsModule} from './sub-sections/sub-sections.module';

const components = [
  BookManagementComponent,
];

@NgModule({
  imports: [
    ThemeModule,
    BookManagementRoutingModule,
    BooksModule,
    ChaptersModule,
    SectionsModule,
    SubSectionsModule,
  ],
  declarations: [
    ...components,
  ],
})
export class BookManagementModule { }
