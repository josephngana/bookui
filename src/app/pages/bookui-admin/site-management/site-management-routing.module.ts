import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SiteManagementComponent} from './site-management.component';
import {SitesComponent} from './sites/sites.component';

const routes: Routes = [{
  path: '',
  component: SiteManagementComponent,
  children: [{
    path: 'sites',
    component: SitesComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SiteManagementRoutingModule { }
