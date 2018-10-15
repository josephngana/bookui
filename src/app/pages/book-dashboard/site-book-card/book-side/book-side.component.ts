import {Component, OnInit} from '@angular/core';
import {DatePipe} from '@angular/common';
import {LocalDataSource} from 'ng2-smart-table';
import {BookService} from '../../../bookui-admin/book-management/service/book.service';
import {Toast, ToasterConfig, ToasterService} from 'angular2-toaster';
import {ToasterUtils} from '../../../../conf/util';
import {Book} from '../../../bookui-admin/book-management/domain/book';
import {AppUtil} from '../../../../conf/app-util';
import {DataTransferService} from '../../../../shared/service/data-transfer.service';
import {Router} from '@angular/router';

@Component({
  selector: 'ngx-book-side',
  templateUrl: './book-side.component.html',
  styleUrls: ['./book-side.component.scss'],
  providers: [BookService],
})
export class BookSideComponent implements OnInit {

  source: LocalDataSource;
  books: Book[];
  loading: boolean;
  toasterConfig: ToasterConfig;

  // settings for smart table
  settings = {
    actions: {
      add: false,
      edit: false,
      delete: false,
    },
    columns: {
      bookTitle: {
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
    pager: {
      perPage: 10,
    },
  };

  constructor(private bookService: BookService,
              private toasterService: ToasterService,
              private dataTransferService: DataTransferService,
              private router: Router) {
  }

  ngOnInit() {
    this.getBooks();
  }

  private getBooks(): void {
    this.loading = true;
    this.bookService.getAll().subscribe(books => {
        this.books = [];
        if (books) {
          this.books = books;
          this.source = new LocalDataSource(this.books);
        } else {
          this.showInformation(ToasterUtils.TOAST_TYPE.warning, 'Dashboard', 'Could not retrieve books');
        }
      },
      error => {
        this.loading = false;
        this.showInformation(ToasterUtils.TOAST_TYPE.error, 'Dashboard', 'Error fetching books: ' + error.message);
      },
      () => {
        this.loading = false;
      });
  }

  /**
   * Shows toast on screen
   * @param type: string
   * @param title: string
   * @param info: string
   */
  private showInformation(type: string, title: string, info: string): void {
    this.toasterConfig = ToasterUtils.TOASTER_CONFIG;
    const toast: Toast = AppUtil.makeToast(type, title, info);
    this.toasterService.popAsync(toast);
  }

  private onRowSelect(event): void {
    const book: Book = event.data;
    this.dataTransferService.setBookId(book);
    this.router.navigate(['/bookui-read/book']);
  }
}
