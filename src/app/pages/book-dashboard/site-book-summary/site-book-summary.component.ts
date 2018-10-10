import { Component, OnInit } from '@angular/core';
import {BooksPerSite} from './domain/books-per-site';

@Component({
  selector: 'ngx-site-book-summary',
  templateUrl: './site-book-summary.component.html',
  styleUrls: ['./site-book-summary.component.scss'],
})
export class SiteBookSummaryComponent implements OnInit {

  booksPerSite: BooksPerSite[];

  constructor() { }

  ngOnInit() {
    this.booksPerSite = [];
  }

}
