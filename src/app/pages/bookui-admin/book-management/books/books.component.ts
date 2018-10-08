import {Component, OnInit} from '@angular/core';
import {Book} from '../domain/book';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AddEditBookComponent} from '../modals/add-edit-book/add-edit-book.component';
import {DatePipe} from '@angular/common';
import {LocalDataSource} from 'ng2-smart-table';
import {BodyOutputType, Toast, ToasterConfig, ToasterService} from 'angular2-toaster';
import {ToasterUtils} from '../../../../conf/util';
import {SiteService} from '../../site-management/service/site.service';
import {BookService} from '../service/book.service';
import {AppUtil} from '../../../../conf/app-util';

@Component({
  selector: 'ngx-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
  providers: [NgbModal, SiteService, BookService],
})
export class BooksComponent implements OnInit {
  loading: boolean;
  source: LocalDataSource;
  books: Array<Book>;
  motsepeSiteId;
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
              private bookService: BookService,
  ) {
    this.toasterService = toasterService;
  }

  ngOnInit() {
    this.getMotsepeSiteId();
    this.books = [];
    this.source = new LocalDataSource(this.books);
  }

  private getMotsepeSiteId(): void {
    this.loading = true;
    this.siteService.getSites().subscribe(sites => {
        if (sites) {
          this.motsepeSiteId = sites[0].siteId;
        }
      },
      error => {
        this.loading = false;
        this.showInformation(ToasterUtils.TOAST_TYPE.error, 'Book', 'Error fetching site: ' + error.message);
      },
      () => {
        this.loading = false;
        this.getBooks();
      });
  }

  /**
   * Gets Books
   */
  private getBooks(): void {
    this.loading = true;
    this.bookService.getBooks(this.motsepeSiteId).subscribe((books: Book[]) => {
        if (books) {
          this.books = books;
          this.source = new LocalDataSource(this.books);
        } else {
          this.showInformation(ToasterUtils.TOAST_TYPE.warning, 'Book', 'No books retrieve.');
        }
      },
      error => {
        this.loading = false;
        this.showInformation(ToasterUtils.TOAST_TYPE.error, 'Book', 'Error fetching books: ' + error.message);
        console.error('Error fetching books: ' + error.message);
      },
      () => {
        this.loading = false;
      });
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
        const filteredBooks = this.books.filter(b => b.id !== bookId);
        this.books = filteredBooks;
        this.source.load(this.books);
        this.loading = false;
        this.showInformation(ToasterUtils.TOAST_TYPE.success, 'Book', 'Book Deleted');
      }, 2000);
    }
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
    const activeModal = this.modalService.open(AddEditBookComponent, {size: 'lg', container: 'nb-layout'});

    activeModal.componentInstance.header = modalHeader;
    activeModal.componentInstance.editBook = book;

    let message = 'Book added!';

    if (!book) {

    } else {
      message = 'Book updated!';
    }

    activeModal.result.then((b: Book) => {
      if (b) {
        b.id = AppUtil.getId();
        b.siteId = this.motsepeSiteId;
        console.log(b);
        this.loading = true;
        this.bookService.addBook(b).subscribe(savedBook => {
            if (savedBook) {
              // const bookId = book.id;
              // const filteredBooks = this.books.filter(b => b.id !== bookId);
              // this.books = filteredBooks;
              this.books.push(b);
              this.source.load(this.books);
              this.showInformation(ToasterUtils.TOAST_TYPE.success, 'Book', message);
            } else {
              message = 'Book NOT saved!';
              this.showInformation(ToasterUtils.TOAST_TYPE.warning, 'Book', message);
            }
          },
          error => {
            this.loading = false;
            console.error('Error saving book', error.message);
          },
          () => {
            this.loading = false;
          });
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
