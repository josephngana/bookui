import { NgModule } from '@angular/core';
import { BookComponent } from './book.component';
import {ThemeModule} from '../../../../@theme/theme.module';

const components = [
  BookComponent,
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
export class BookModule { }
