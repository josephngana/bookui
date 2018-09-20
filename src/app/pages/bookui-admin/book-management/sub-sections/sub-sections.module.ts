import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubSectionsComponent } from './sub-sections.component';
import {ThemeModule} from '../../../../@theme/theme.module';

const components = [
  SubSectionsComponent,
];

@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
  ],
  declarations: [...components],
  exports: [...components],
})
export class SubSectionsModule { }
