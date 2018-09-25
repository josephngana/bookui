import { Component, OnInit } from '@angular/core';
import {Book} from '../domain/book';

@Component({
  selector: 'ngx-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
})
export class BooksComponent implements OnInit {

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
      isbn: {
        title: 'ISBN',
        type: 'string',
      },
      eIsbn: {
        title: 'e-ISBN',
        type: 'string',
      },
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
      date: {
        title: 'Date',
        type: 'date',
      },
    },
  };

  constructor() {
  }

  ngOnInit() {
    this.doShow();
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }


  doShow() {
    const littleBlackBook = new Book();
    const littleWhiteBook = new Book();
    littleBlackBook.id = '1254147';
    littleWhiteBook.id = '8547859';
    console.log(littleBlackBook.id);
    console.log('this book was created at: ', littleBlackBook.dateCreated);
    console.log('this book was created at: ', littleWhiteBook.dateCreated);
    console.log('this book was created at: ', littleWhiteBook.multimedias);
  }

  onCreate(event): void {
    console.log('gsdfgdsfgsdg');
  }

}
