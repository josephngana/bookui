import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChapterComponent } from './chapter.component';
import {ThemeModule} from '../../../../@theme/theme.module';

const components = [
  ChapterComponent,
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
export class ChapterModule { }
