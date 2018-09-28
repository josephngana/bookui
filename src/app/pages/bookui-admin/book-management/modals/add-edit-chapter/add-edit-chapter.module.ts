import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEditChapterComponent } from './add-edit-chapter.component';
import {ThemeModule} from '../../../../../@theme/theme.module';

const components = [
  AddEditChapterComponent,
];

@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
  ],
  declarations: [...components],
  exports: [...components],
})
export class AddEditChapterModule { }
