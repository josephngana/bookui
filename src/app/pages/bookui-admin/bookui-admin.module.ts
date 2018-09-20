import { NgModule } from '@angular/core';
import { BookuiAdminComponent } from './bookui-admin.component';
import {BookuiAdminRoutingModule} from './bookui-admin-routing.module';
import {ThemeModule} from '../../@theme/theme.module';
import {BookManagementModule} from './book-management/book-management.module';
import {UserManagementModule} from './user-management/user-management.module';
import {RoleManagementModule} from './role-management/role-management.module';

const components = [
  BookuiAdminComponent,
];

@NgModule({
  imports: [
    ThemeModule,
    BookuiAdminRoutingModule,
    BookManagementModule,
    UserManagementModule,
    RoleManagementModule,
  ],
  declarations: [
    ...components,
  ],
})
export class BookuiAdminModule { }
