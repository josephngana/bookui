/*
 * Copyright (c) 2018.
 * Author: caniksea.
 * Last Modified: 2018/10/02 2:07 PM
 */

import { NgModule } from '@angular/core';
import { AuthComponent } from './auth.component';
import {ThemeModule} from '../../@theme/theme.module';
import {AuthRoutingModule} from './auth-routing.module';
import {NbAuthModule, NbPasswordAuthStrategy} from '@nebular/auth';

const components = [
  AuthComponent,
];

@NgModule({
  imports: [
    ThemeModule,
    AuthRoutingModule,

    NbAuthModule.forRoot({
      strategies: [
        NbPasswordAuthStrategy.setup({
          name: 'email',
        }),
      ],
      forms: {},
    }),
  ],
  declarations: [...components],
})
export class AuthModule { }
