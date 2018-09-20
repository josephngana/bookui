import { NgModule } from '@angular/core';
import { RolesComponent } from './roles.component';
import {ThemeModule} from '../../../../@theme/theme.module';

const components = [
  RolesComponent,
];

@NgModule({
  imports: [
    ThemeModule,
  ],
  declarations: [...components],
  exports: [...components],
})
export class RolesModule { }
