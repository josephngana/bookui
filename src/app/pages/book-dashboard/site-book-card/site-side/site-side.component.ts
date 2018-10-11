import { Component, OnInit } from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'ngx-site-side',
  templateUrl: './site-side.component.html',
  styleUrls: ['./site-side.component.scss'],
})
export class SiteSideComponent implements OnInit {

  source: LocalDataSource;

  // settings for smart table
  settings = {
    actions: {
      add: false,
      edit: false,
      delete: false,
    },
    columns: {
      site: {
        title: 'Site',
        type: 'string',
      },
      dateCreated: {
        title: 'Date Created',
        type: 'string',
        valuePrepareFunction: (date) => {
          return new DatePipe('en-EN').transform(date, 'yyyy-MM-dd');
        },
        width: '20%',
      },
    },
  };

  constructor() { }

  ngOnInit() {
    this.source = new LocalDataSource();
  }

}
