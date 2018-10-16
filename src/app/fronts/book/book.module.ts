import { NgModule } from '@angular/core';
import { BookComponent } from './book.component';
import {ThemeModule} from '../../@theme/theme.module';
import {ToasterModule} from 'angular2-toaster';

const components = [
  BookComponent,
];

@NgModule({
  imports: [
    ThemeModule,
    ToasterModule.forRoot(),
  ],
  declarations: [...components],
})
export class BookModule { }
