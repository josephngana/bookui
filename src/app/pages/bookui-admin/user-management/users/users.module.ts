import { NgModule } from '@angular/core';
import { UsersComponent } from './users.component';
import {ThemeModule} from '../../../../@theme/theme.module';

const components = [
  UsersComponent,
];

@NgModule({
  imports: [
    ThemeModule,
  ],
  declarations: [...components],
  exports: [...components],
})
export class UsersModule { }
