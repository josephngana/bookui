import { NgModule } from '@angular/core';
import { BooksComponent } from './books.component';
import {ThemeModule} from '../../../../@theme/theme.module';

const components = [
  BooksComponent,
];

@NgModule({
  imports: [
    ThemeModule,
  ],
  declarations: [
    ...components,
  ],
  exports: [
    ...components,
  ],
})
export class BooksModule { }
