import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEditSubsectionComponent } from './add-edit-subsection.component';
import {ThemeModule} from '../../../../../@theme/theme.module';

const components = [
  AddEditSubsectionComponent,
];

@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
  ],
  declarations: [AddEditSubsectionComponent],
  exports: [...components],
})
export class AddEditSubsectionModule { }
