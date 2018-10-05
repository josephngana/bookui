import { NgModule } from '@angular/core';
import { SitesComponent } from './sites.component';
import {ThemeModule} from '../../../../@theme/theme.module';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {ToasterModule} from 'angular2-toaster';

const components = [
  SitesComponent,
];

@NgModule({
  imports: [
    ThemeModule,
    Ng2SmartTableModule,
    ToasterModule.forRoot(),
  ],
  declarations: [...components],
  exports: [...components],
})
export class SitesModule { }
