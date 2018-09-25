import { Component, OnInit } from '@angular/core';
import {Book} from '../domain/book';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AddBookComponent} from '../modals/add-book/add-book.component';
import {DatePipe} from '@angular/common';
import {LocalDataSource} from 'ng2-smart-table';

@Component({
  selector: 'ngx-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
  providers: [NgbModal],
})
export class BooksComponent implements OnInit {

  source: LocalDataSource;

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
      isbn: {
        title: 'ISBN',
        type: 'string',
      },
      eIsbn: {
        title: 'e-ISBN',
        type: 'string',
      },
      datePublished: {
        title: 'Date Published',
        type: 'string',
        valuePrepareFunction: (date) => {
          return new DatePipe('en-EN').transform(date, 'dd MMM yyyy HH:mm:ss');
        },
      },
      dateCreated: {
        title: 'Date Created',
        type: 'string',
        addable: false,
        editable: false,
        valuePrepareFunction: (date) => {
          return new DatePipe('en-EN').transform(date, 'dd MMM yyyy HH:mm:ss');
        },
      },
    },
  };

  constructor(private modalService: NgbModal) {
  }

  ngOnInit() {
    const books: Array<Book> = [];
    books.push(this.doShow());
    this.source = new LocalDataSource(books);
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }


  doShow(): Book {
    const littleBlackBook = new Book();
    littleBlackBook.id = '1254147';
    littleBlackBook.title = 'Little Black Book';
    littleBlackBook.id = '8547859';
    return littleBlackBook;
  }

  onCreate(event): void {
    console.log(event);
    const activeModal = this.modalService.open(AddBookComponent, { size: 'lg', container: 'nb-layout' });

    activeModal.componentInstance.modalHeader = 'Book Management - Add New Book';
    const newBook = new Book;
    newBook.title = 'New Book';
  }

  onEdit(event): void {
    console.log(event);
  }

}
