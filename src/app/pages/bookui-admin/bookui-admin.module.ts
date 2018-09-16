import { NgModule } from '@angular/core';
import { BookuiAdminComponent } from './bookui-admin.component';
import {BookuiAdminRoutingModule} from './bookui-admin-routing.module';
import {ThemeModule} from '../../@theme/theme.module';
import {BookManagementModule} from './book-management/book-management.module';
import {BookModule} from './book-management/book/book.module';

const components = [
  BookuiAdminComponent,
];

@NgModule({
  imports: [
    ThemeModule,
    BookuiAdminRoutingModule,
    BookManagementModule,
  ],
  declarations: [
    ...components,
  ],
})
export class BookuiAdminModule { }
