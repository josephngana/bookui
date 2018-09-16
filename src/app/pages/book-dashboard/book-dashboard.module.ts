import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookDashboardComponent } from './book-dashboard.component';
import {ThemeModule} from '../../@theme/theme.module';

const components = [
  BookDashboardComponent,
];

@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
  ],
  declarations: [...components],
})
export class BookDashboardModule { }
