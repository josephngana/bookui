import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddChapterComponent } from './add-chapter.component';
import {ThemeModule} from "../../../../../@theme/theme.module";

const components = [
  AddChapterComponentComponent,
];

@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
  ],
  declarations: [AddChapterComponent],
  exports: [...components],
})
export class AddChapterModule { }
