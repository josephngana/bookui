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
      eisbn: {
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
    this.books = [];
    this.books.push(this.doShow());
    this.source = new LocalDataSource(this.books);
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
    littleBlackBook.author = 'James Brown';
    littleBlackBook.datePublished = new Date('2015-01-01');
    littleBlackBook.eisbn = 'e-isbn-098485';
    littleBlackBook.isbn = 'isbn-987542';
    littleBlackBook.publisher = 'Brown Gordon';
    return littleBlackBook;
  }

  onCreate(event): void {
    const activeModal = this.modalService.open(AddBookComponent, { size: 'lg', container: 'nb-layout' });

    activeModal.componentInstance.modalHeader = 'Book Management - Add New Book';

    activeModal.result.then(result => {
      if (result) {
        console.log(result);
        this.books.push(result);
        this.source.load(this.books);
      }
    }).catch(error => {
      console.error(error);
    });
  }

  onEdit(event): void {
    console.log(event);
  }

}
