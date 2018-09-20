import { NgModule } from '@angular/core';
import { RoleManagementComponent } from './role-management.component';
import {ThemeModule} from '../../../@theme/theme.module';
import {RoleManagementRoutingModule} from './role-management-routing.module';
import {RolesModule} from './roles/roles.module';

const components = [
  RoleManagementComponent,
];

@NgModule({
  imports: [
    ThemeModule,
    RoleManagementRoutingModule,
    RolesModule,
  ],
  declarations: [...components],
})
export class RoleManagementModule { }
