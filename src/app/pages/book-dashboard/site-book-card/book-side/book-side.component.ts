import { Component, OnInit } from '@angular/core';
import {DatePipe} from '@angular/common';
import {LocalDataSource} from 'ng2-smart-table';

@Component({
  selector: 'ngx-book-side',
  templateUrl: './book-side.component.html',
  styleUrls: ['./book-side.component.scss'],
})
export class BookSideComponent implements OnInit {

  source: LocalDataSource;

  // settings for smart table
  settings = {
    actions: {
      add: false,
      edit: false,
      delete: false,
    },
    columns: {
      title: {
        title: 'Title',
        type: 'string',
      },
      author: {
        title: 'Author',
        type: 'string',
      },
      publisher: {
        title: 'Publisher',
        type: 'string',
      },
      datePublished: {
        title: 'Date Published',
        type: 'string',
        valuePrepareFunction: (date) => {
          return new DatePipe('en-EN').transform(date, 'yyyy-MM-dd');
        },
        // width: '10%',
      },
    },
  };

  constructor() { }

  ngOnInit() {
    this.source = new LocalDataSource();
  }
}
