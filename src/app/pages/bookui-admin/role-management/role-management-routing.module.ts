import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RoleManagementComponent} from './role-management.component';
import {RolesComponent} from './roles/roles.component';

const routes: Routes = [{
  path: '',
  component: RoleManagementComponent,
  children: [{
    path: 'roles',
    component: RolesComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoleManagementRoutingModule { }
