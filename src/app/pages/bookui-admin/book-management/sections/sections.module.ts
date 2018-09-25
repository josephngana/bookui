import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionsComponent } from './sections.component';
import {ThemeModule} from '../../../../@theme/theme.module';

const components = [
  SectionsComponent,
];

@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
  ],
  declarations: [...components],
  exports: [...components],
})
export class SectionsModule { }
