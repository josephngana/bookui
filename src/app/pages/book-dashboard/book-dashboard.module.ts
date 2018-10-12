import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookDashboardComponent } from './book-dashboard.component';
import {ThemeModule} from '../../@theme/theme.module';
import {SiteBookCardComponent} from './site-book-card/site-book-card.component';
import {SiteBookSummaryComponent} from './site-book-summary/site-book-summary.component';
import {BookSideComponent} from './site-book-card/book-side/book-side.component';
import {SiteSideComponent} from './site-book-card/site-side/site-side.component';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {ToasterModule} from 'angular2-toaster';

const components = [
  BookDashboardComponent,
  SiteBookCardComponent,
  SiteBookSummaryComponent,
  BookSideComponent,
  SiteSideComponent,
  SiteBookSummaryComponent,
];

@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
    Ng2SmartTableModule,
    ToasterModule.forRoot(),
  ],
  declarations: [...components],
})
export class BookDashboardModule { }
