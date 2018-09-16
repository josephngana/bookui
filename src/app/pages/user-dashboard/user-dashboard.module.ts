import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDashboardComponent } from './user-dashboard.component';
import {ThemeModule} from '../../@theme/theme.module';

const components = [
  UserDashboardComponent,
];

@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
  ],
  declarations: [...components],
})
export class UserDashboardModule { }
