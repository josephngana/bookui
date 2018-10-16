import { NgModule } from '@angular/core';
import { FrontsComponent } from './fronts.component';
import {FrontsRoutingModule} from './fronts-routing.module';
import {ThemeModule} from '../@theme/theme.module';
import {MiscellaneousModule} from '../pages/miscellaneous/miscellaneous.module';
import {BookModule} from './book/book.module';
import {ToasterModule} from 'angular2-toaster';

const FRONTS_COMPONENTS = [
  FrontsComponent,
];

@NgModule({
  imports: [
    FrontsRoutingModule,
    ThemeModule,
    MiscellaneousModule,
    BookModule,
    ToasterModule.forRoot(),
  ],
  declarations: [...FRONTS_COMPONENTS],
})
export class FrontsModule { }
