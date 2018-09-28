import { Component, OnInit } from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';
import {Book} from '../domain/book';

@Component({
  selector: 'ngx-chapters',
  templateUrl: './chapters.component.html',
  styleUrls: ['./chapters.component.scss'],
})
export class ChaptersComponent implements OnInit {

  source: LocalDataSource;
  books: Array<Book>;

  settings = {
    mode: 'external',
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      chapter: {
        title: 'Chapter',
        type: 'string',
      },
      author: {
        title: 'Author',
        type: 'string',
      },
      date: {
        title: 'Date',
        type: 'date',
      },
    },
  };

  constructor() { }

  ngOnInit() {
  }

}
