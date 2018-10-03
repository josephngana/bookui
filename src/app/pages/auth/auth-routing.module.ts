/*
 * Copyright (c) 2018.
 * Author: caniksea.
 * Last Modified: 2018/10/02 2:06 PM
 */

import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthComponent} from './auth.component';
import {NbAuthComponent, NbLoginComponent} from '@nebular/auth';

const routes: Routes = [{
  path: '',
  component: NbAuthComponent,
  children: [{
    path: 'login',
    component: NbLoginComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule { }
