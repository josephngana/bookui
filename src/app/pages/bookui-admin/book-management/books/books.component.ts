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
    if (window.confirm('Are you sure you want to delete?')) {
      const bookToDelete = event.data;
      let filteredBooks = this.books;
      console.log('before deleting... ', filteredBooks);
      this.loading = true;
      this.bookService.deleteBook(bookToDelete).subscribe(isSuccess => {
          if (isSuccess) {
            filteredBooks = this.books.filter(b => b.id !== bookToDelete.id);
            console.log('after deleting...', filteredBooks);
            this.showInformation(ToasterUtils.TOAST_TYPE.success, 'Book', 'Book deleted!');
          } else {
            this.showInformation(ToasterUtils.TOAST_TYPE.warning, 'Book', 'Book NOT deleted!');
          }
        },
        error => {
          this.loading = false;
          this.showInformation(ToasterUtils.TOAST_TYPE.warning, 'Book', 'Error deleting book: ' + error.message);
        },
        () => {
          this.books = filteredBooks;
          this.source.load(this.books);
          this.loading = false;
        });
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

    activeModal.result.then((b: Book) => {
      if (b) {
        if (book) {
          // call method to process edit
           this.updateExistingBook(b);
        } else {
          // call method to process add
          this.addNewBook(b);
        }
      }
    }).catch(error => {
      console.error(error);
    });
  }

  // edits existing book
  private updateExistingBook(book: Book): void {
    this.loading = true;
    this.bookService.updateBook(book).subscribe( editBook => {
        if (editBook) {
          this.books.push(book);
          this.showInformation(ToasterUtils.TOAST_TYPE.success, 'Book', 'Book updated!');
        } else {
          this.showInformation(ToasterUtils.TOAST_TYPE.warning, 'Book', 'Book NOT updated!');
        }
      },
      error => {
        this.loading = false;
        this.showInformation(ToasterUtils.TOAST_TYPE.error, 'Book', 'Error adding book ' + error.message);
      },
      () => {
        this.loading = false;
        this.source.load(this.books);
      });
  }

  // adds new book
  private addNewBook(book: Book): void {
    book.id = AppUtil.getId();
    book.siteId = this.motsepeSiteId;
    console.log(book);
    this.loading = true;
    this.bookService.addBook(book).subscribe(savedBook => {
        if (savedBook) {
          this.books.push(book);
          this.showInformation(ToasterUtils.TOAST_TYPE.success, 'Book', 'Book added!');
        } else {
          this.showInformation(ToasterUtils.TOAST_TYPE.warning, 'Book', 'Book NOT added!');
        }
      },
      error => {
        this.loading = false;
        this.showInformation(ToasterUtils.TOAST_TYPE.error, 'Book', 'Error adding book: ' + error.message);
        console.error();
      },
      () => {
        this.loading = false;
        this.source.load(this.books);
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
