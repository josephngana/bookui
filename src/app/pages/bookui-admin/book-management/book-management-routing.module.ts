import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BookManagementComponent} from './book-management.component';
import {BooksComponent} from './books/books.component';
import {ChaptersComponent} from './chapters/chapters.component';
import {SectionsComponent} from './sections/sections.component';
import {SubsectionsComponent} from './subsections/subsections.component';
import {MultimediaComponent} from './multimedia/multimedia.component';

const routes: Routes = [{
  path: '',
  component: BookManagementComponent,
  children: [{
    path: 'books',
    component: BooksComponent,
  }, {
    path: 'chapters',
    component: ChaptersComponent,
  }, {
    path: 'sections',
    component: SectionsComponent,
  }, {
    path: 'subsections',
    component: SubsectionsComponent,
  }, {
    path: 'multimedia',
    component: MultimediaComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookManagementRoutingModule { }
