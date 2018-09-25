import { NgModule } from '@angular/core';
import { RolesComponent } from './roles.component';
import {ThemeModule} from '../../../../@theme/theme.module';
import {Ng2SmartTableModule} from 'ng2-smart-table';

const components = [
  RolesComponent,
];

@NgModule({
  imports: [
    ThemeModule,
    Ng2SmartTableModule,
  ],
  declarations: [...components],
  exports: [...components],
})
export class RolesModule { }
