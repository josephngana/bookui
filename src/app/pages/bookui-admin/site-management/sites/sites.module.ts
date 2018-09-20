import { NgModule } from '@angular/core';
import { SitesComponent } from './sites.component';
import {ThemeModule} from '../../../../@theme/theme.module';

const components = [
  SitesComponent,
];

@NgModule({
  imports: [
    ThemeModule,
  ],
  declarations: [...components],
  exports: [...components],
})
export class SitesModule { }
