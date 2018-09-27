import { Component, OnInit } from '@angular/core';
import {Book} from '../domain/book';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AddEditBookComponent} from '../modals/add-edit-book/add-edit-book.component';
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
    const modalHeader = 'Book Management - Add New Book';
    const editBook: Book = null;
    console.info('Adding new book...');
    this.processAddEditBook(modalHeader, editBook);
  }

  onEdit(event): void {
    const modalHeader = 'Book Management - Edit Book';
    const editBook = event.data;
    console.info('Editing book...');
    this.processAddEditBook(modalHeader, editBook);
  }

  processAddEditBook(modalHeader: string, book: Book) {
    const activeModal = this.modalService.open(AddEditBookComponent, { size: 'lg', container: 'nb-layout' });

    activeModal.componentInstance.header = modalHeader;
    activeModal.componentInstance.editBook = book;

    activeModal.result.then(result => {
      if (result) {
        console.log(result);
        if (book) {
          const bookId = book.id;
          const filteredBooks = this.books.filter( b => b.id !== bookId);
          this.books = filteredBooks;
        }
        this.books.push(result);
        this.source.load(this.books);
      }
    }).catch(error => {
      console.error(error);
    });
  }

}
