import { Component, OnInit } from '@angular/core';
import {Book} from '../domain/book';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AddEditBookComponent} from '../modals/add-edit-book/add-edit-book.component';
import {DatePipe} from '@angular/common';
import {LocalDataSource} from 'ng2-smart-table';
import {BodyOutputType, Toast, ToasterConfig, ToasterService} from 'angular2-toaster';
import {ToasterUtils} from '../../../../conf/util';
import {SiteService} from '../../site-management/service/site.service';

@Component({
  selector: 'ngx-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
  providers: [NgbModal, SiteService],
})
export class BooksComponent implements OnInit {
  loading: boolean;
  source: LocalDataSource;
  books: Array<Book>;
  private toasterService: ToasterService;

  // toaster configuration
  public toasterConfig: ToasterConfig = new ToasterConfig({
    positionClass: ToasterUtils.POSITION_CLASS,
    timeout: ToasterUtils.TIMEOUT,
    newestOnTop: ToasterUtils.NEWEST_ON_TOP,
    tapToDismiss: ToasterUtils.TAP_TO_DISMISS,
    preventDuplicates: ToasterUtils.PREVENT_DUPLICATE,
    animation: ToasterUtils.ANIMATION_TYPE.fade,
    limit: ToasterUtils.LIMIT,
  });
// settings for smart table
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
          return new DatePipe('en-EN').transform(date, 'yyyy-MM-dd');
        },
      },
      dateCreated: {
        title: 'Date Created',
        type: 'string',
        addable: false,
        editable: false,
        valuePrepareFunction: (date) => {
          return new DatePipe('en-EN').transform(date, 'yyyy-MM-dd');
        },
      },
    },
  };

  constructor(private modalService: NgbModal,
              toasterService: ToasterService,
              private siteService: SiteService,
  ) {
    this.toasterService = toasterService;
  }

  ngOnInit() {
    this.books = [];
    this.books.push(this.doShow());
    this.source = new LocalDataSource(this.books);
  }

  /**
   * Handles the delete action
   * @param event: object
   */
  onDelete(event): void {
    const book = event.data;
    if (window.confirm('Are you sure you want to delete?')) {
      this.loading = true;
      setTimeout(() => {
      const bookId = book.id;
      const filteredBooks = this.books.filter( b => b.id !== bookId);
      this.books = filteredBooks;
      this.source.load(this.books);
      this.loading = false;
      this.showInformation(ToasterUtils.TOAST_TYPE.success, 'Book', 'Book Deleted');
    }, 2000);
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
  /**
   * Handles the create action of new book
   * @param event: object
   */
  onCreate(event): void {
    const modalHeader = 'Book Management - Add New Book';
    const editBook: Book = null;
    console.info('Adding new book...');
    this.processAddEditBook(modalHeader, editBook);
  }
  /**
   * Handles the edit action of an existing book
   * @param event: object
   */
  onEdit(event): void {
    const modalHeader = 'Book Management - Edit Book';
    const editBook = event.data;
    console.info('Editing book...');
    this.processAddEditBook(modalHeader, editBook);
  }

  processAddEditBook(modalHeader: string, book: Book): void {
    const activeModal = this.modalService.open(AddEditBookComponent, { size: 'lg', container: 'nb-layout' });

    activeModal.componentInstance.header = modalHeader;
    activeModal.componentInstance.editBook = book;

    let message = 'Book added!';

    if (!book) {

    } else {
      message = 'Book updated!';
    }

    activeModal.result.then(result => {
      if (result) {
        console.log(result);
        this.loading = true;
        setTimeout(() => {
          if (book) {
            const bookId = book.id;
            const filteredBooks = this.books.filter( b => b.id !== bookId);
            this.books = filteredBooks;
          }
          this.books.push(result);
          this.source.load(this.books);
          this.loading = false;
          this.showInformation(ToasterUtils.TOAST_TYPE.success, 'Book', message);
          }, 2000);
      }
    }).catch(error => {
      console.error(error);
    });
  }

  /**
   * Shows toast on screen
   * @param type: string
   * @param title: string
   * @param info: string
   */
  private showInformation(type: string, title: string, info: string): void {
    type = (type === null || type === '') ? ToasterUtils.TOAST_TYPE.default : type;
    const toast: Toast = {
      type: type,
      title: title,
      body: info,
      timeout: ToasterUtils.TIMEOUT,
      showCloseButton: ToasterUtils.SHOW_CLOSE_BUTTON,
      bodyOutputType: BodyOutputType.TrustedHtml,
    };
    this.toasterService.popAsync(toast);
  }

}
