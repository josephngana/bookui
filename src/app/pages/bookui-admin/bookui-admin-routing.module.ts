import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BookuiAdminComponent} from './bookui-admin.component';

const routes: Routes = [{
  path: '',
  component: BookuiAdminComponent,
  children: [{
    path: 'book-management',
    loadChildren: './book-management/book-management.module#BookManagementModule',
  }, {
    path: 'user-management',
    loadChildren: './user-management/user-management.module#UserManagementModule',
  }, {
    path: 'role-management',
    loadChildren: './role-management/role-management.module#RoleManagementModule',
  }, {
    path: 'site-management',
    loadChildren: './site-management/site-management.module#SiteManagementModule',
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookuiAdminRoutingModule { }
