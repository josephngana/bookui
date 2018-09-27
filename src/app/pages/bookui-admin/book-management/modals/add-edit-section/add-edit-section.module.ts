import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEditSectionComponent } from './add-edit-section.component';
import {ThemeModule} from '../../../../../@theme/theme.module';

const components = [
  AddEditSectionComponent,
];

@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
  ],
  declarations: [...components],
  exports: [...components],
})
export class AddEditSectionModule { }
