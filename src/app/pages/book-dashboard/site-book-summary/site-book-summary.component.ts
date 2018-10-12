import { Component, OnInit } from '@angular/core';
import {SiteBook} from './domain/site-book';

@Component({
  selector: 'ngx-site-book-summary',
  templateUrl: './site-book-summary.component.html',
  styleUrls: ['./site-book-summary.component.scss'],
})
export class SiteBookSummaryComponent implements OnInit {

  booksPerSite: SiteBook[];

  constructor() { }

  ngOnInit() {
    this.booksPerSite = [
      new SiteBook('Motsepe Foundation', 20),
      new SiteBook('Glory Foundation', 20),
      new SiteBook('Nicole Foundation', 20),
      new SiteBook('Keanu Foundation', 20),
      new SiteBook('Joseph Foundation', 20),
    ];
  }

}
