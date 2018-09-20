import { NgModule } from '@angular/core';
import { SiteManagementComponent } from './site-management.component';
import {ThemeModule} from '../../../@theme/theme.module';
import {SiteManagementRoutingModule} from './site-management-routing.module';
import {SitesModule} from './sites/sites.module';

const components = [
  SiteManagementComponent,
];

@NgModule({
  imports: [
    ThemeModule,
    SiteManagementRoutingModule,
    SitesModule,
  ],
  declarations: [...components],
})
export class SiteManagementModule { }
