import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubSectionComponent } from './sub-section.component';
import {ThemeModule} from '../../../../@theme/theme.module';

const components = [
  SubSectionComponent,
];

@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
  ],
  declarations: [...components],
  exports: [...components],
})
export class SubSectionModule { }
