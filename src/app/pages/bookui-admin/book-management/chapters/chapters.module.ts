import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChaptersComponent } from './chapters.component';
import {ThemeModule} from '../../../../@theme/theme.module';

const components = [
  ChaptersComponent,
];

@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
  ],
  declarations: [
    ...components,
  ],
  exports: [
    ...components,
  ],
})
export class ChaptersModule { }
