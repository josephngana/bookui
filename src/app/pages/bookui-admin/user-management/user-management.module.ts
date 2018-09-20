import { NgModule } from '@angular/core';
import { UserManagementComponent } from './user-management.component';
import {ThemeModule} from '../../../@theme/theme.module';
import {UserManagementRoutingModule} from './user-management-routing.module';
import {UsersModule} from './users/users.module';

const components = [
  UserManagementComponent,
];

@NgModule({
  imports: [
    ThemeModule,
    UserManagementRoutingModule,
    UsersModule,
  ],
  declarations: [...components],
})
export class UserManagementModule { }
