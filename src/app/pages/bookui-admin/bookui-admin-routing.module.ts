import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BookuiAdminComponent} from './bookui-admin.component';

const routes: Routes = [{
  path: '',
  component: BookuiAdminComponent,
  children: [{
    path: 'book-management',
    loadChildren: './book-management/book-management.module#BookManagementModule',
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookuiAdminRoutingModule { }
