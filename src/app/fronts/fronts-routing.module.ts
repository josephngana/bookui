/*
 * Copyright (c) 2018.
 * Author: caniksea.
 * Last Modified: 2018/10/15 10:01 AM
 */

import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FrontsComponent} from './fronts.component';
import {NotFoundComponent} from '../pages/miscellaneous/not-found/not-found.component';
import {BookComponent} from './book/book.component';

const routes: Routes = [{
  path: '',
  component: FrontsComponent,
  children: [{
    path: 'book',
    component: BookComponent,
  }, {
    path: '**',
    component: NotFoundComponent,
  }],
},
  {path: '', redirectTo: 'bookui-read', pathMatch: 'full'},
  {path: '**', redirectTo: 'bookui-read'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FrontsRoutingModule {
}
