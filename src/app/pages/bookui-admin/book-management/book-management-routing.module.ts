import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BookManagementComponent} from './book-management.component';
import {BookComponent} from './book/book.component';
import {ChapterComponent} from './chapter/chapter.component';
import {SectionComponent} from './section/section.component';
import {SubSectionComponent} from './sub-section/sub-section.component';

const routes: Routes = [{
  path: '',
  component: BookManagementComponent,
  children: [{
    path: 'book',
    component: BookComponent,
  }, {
    path: 'chapter',
    component: ChapterComponent,
  }, {
    path: 'section',
    component: SectionComponent,
  }, {
    path: 'subsection',
    component: SubSectionComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookManagementRoutingModule { }
