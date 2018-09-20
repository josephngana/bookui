import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserManagementComponent} from './user-management.component';
import {UsersComponent} from './users/users.component';

const routes: Routes = [{
  path: '',
  component: UserManagementComponent,
  children: [{
    path: 'users',
    component: UsersComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserManagementRoutingModule { }
