import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEditBookComponent } from './add-edit-book.component';
import {ThemeModule} from '../../../../../@theme/theme.module';

const components = [
  AddEditBookComponent,
];

@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
  ],
  declarations: [...components],
  exports: [...components],
})
export class AddEditBookModule { }
