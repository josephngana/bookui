import { NgModule } from '@angular/core';
import { MultimediaManagementComponent } from './multimedia-management.component';
import {ThemeModule} from '../../../@theme/theme.module';
import {MultimediaManagementRoutingModule} from './multimedia-management-routing.module';
import {MultimediaModule} from './multimedia/multimedia.module';

const components = [
  MultimediaManagementComponent,
];

@NgModule({
  imports: [
    ThemeModule,
    MultimediaManagementRoutingModule,
    MultimediaModule,
  ],
  declarations: [...components],
})
export class MultimediaManagementModule { }
