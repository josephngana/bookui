/*
 * Copyright (c) 2018.
 * Author: caniksea.
 * Last Modified: 2018/10/14 3:09 PM
 */

import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MultimediaManagementComponent} from './multimedia-management.component';
import {MultimediaComponent} from './multimedia/multimedia.component';

const routes: Routes = [{
  path: '',
  component: MultimediaManagementComponent,
  children: [{
    path: 'multimedia',
    component: MultimediaComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MultimediaManagementRoutingModule { }
