import {Component, OnInit} from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';
import {Chapter} from '../domain/chapter';
import {DatePipe} from '@angular/common';
import {AddEditChapterComponent} from '../modals/add-edit-chapter/add-edit-chapter.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {BodyOutputType, Toast, ToasterConfig, ToasterService} from 'angular2-toaster';
import {ToasterUtils} from '../../../../conf/util';
import {ChapterService} from '../service/chapter.service';
import {BookService} from '../service/book.service';
import {SiteService} from '../../site-management/service/site.service';
import {Book} from '../domain/book';
import {AppUtil} from '../../../../conf/app-util';

@Component({
  selector: 'ngx-chapters',
  templateUrl: './chapters.component.html',
  styleUrls: ['./chapters.component.scss'],
  providers: [NgbModal, BookService],
})
export class ChaptersComponent implements OnInit {

  loading: boolean;
  source: LocalDataSource;
  motsepeSiteId: string;
  book: Book;
  bookId: string;
  books: Array<Book>;
  chapters: Array<Chapter>;

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

  settings = {
    mode: 'external',
    noDataMessage: 'No chapters',
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
      chapterTitle: {
        title: 'Title',
        type: 'string',
      },
      chapterDescription: {
        title: 'Description',
        type: 'string',
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
    pager: {
      perPage: 10,
    },
  };

  constructor(private modalService: NgbModal, toasterService: ToasterService,
              private chapterService: ChapterService,
              private bookService: BookService,
              private siteService: SiteService) {
    this.toasterService = toasterService;
  }

  ngOnInit() {
    this.getMotsepeSiteId();

    this.chapters = [];
    this.source = new LocalDataSource(this.chapters);
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

  private getBooks(): void {
    this.loading = true;
    this.bookService.getBooks(this.motsepeSiteId).subscribe((books: Book[]) => {
        if (books) {
          this.books = books;
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

  onChange(event): void {
    const bookId = event.srcElement.value;
    if (bookId !== '') {
      this.getBook(bookId);
    } else {
      this.book = null;
    }
  }

  private getBook(bookId: string): void {
    const book = this.books.filter( b => b.bookId === bookId)[0];
    if (book) {
      this.bookId = bookId;
      this.book = book;
      this.getChapters(bookId);
    }
  }

  private getChapters(bookId: string): void {
    this.loading = true;
    this.chapterService.getChapters(bookId).subscribe((chapters: Chapter[]) => {
        if (chapters) {
          this.chapters = chapters;
          this.source = new LocalDataSource(this.chapters);
          // this.loading = false;
        } else {
          this.showInformation(ToasterUtils.TOAST_TYPE.warning, 'Chapter', 'No chapters retrieved ');
        }
      }, error => {
        this.loading = false;
        this.showInformation(ToasterUtils.TOAST_TYPE.warning, 'Chapter', 'Error fetching chapters ' + error.message);
        console.error('Error fetching chapters:');
      },
      () => {
        this.loading = false;
      });
  }

  onDelete(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      const chapterToDelete = event.data;
      let filteredChapters = this.chapters;
      this.loading = true;
      this.chapterService.deleteChapter(chapterToDelete).subscribe(isSuccess => {
          if (isSuccess) {
            filteredChapters = this.chapters.filter(b => b.chapterId !== chapterToDelete.chapterId);
            this.showInformation(ToasterUtils.TOAST_TYPE.success, 'Chapter', 'Chapter deleted!');
          } else {
            this.showInformation(ToasterUtils.TOAST_TYPE.warning, 'Chapter', 'Chapter NOT deleted!');
          }
        },
        error => {
          this.loading = false;
          this.showInformation(ToasterUtils.TOAST_TYPE.warning, 'Chapter', 'Error deleting chapter: ' + error.message);
        },
        () => {
          this.chapters = filteredChapters;
          this.source.load(this.chapters);
          this.loading = false;
        });
    }
  }

  onCreate(event): void {
    const modalHeader = 'Book Management - Add New Chapter';
    const editChapter: Chapter = null;
    console.info('Adding new chapter...');
    this.processAddEditChapter(modalHeader, editChapter);
  }

  onEdit(event): void {
    const chapter = event.data;
    const heading = 'Book Management - Edit Chapter';
    console.info('Editing chapter...');
    this.processAddEditChapter(heading, chapter);
  }

  private processAddEditChapter(header: string, chapter: Chapter): void {
    const activeModal = this.modalService.open(AddEditChapterComponent, {size: 'lg', container: 'nb-layout'});

    activeModal.componentInstance.header = header;
    activeModal.componentInstance.editChapter = chapter;

    activeModal.result.then((c: Chapter) => {
      if (c) {
        if (chapter) {
          // call method to process edit
          this.updatingChapter(c);
        } else {
          // call method to process add
          this.addNewChapter(c);
        }
      }
    }).catch(error => {
      console.error(error);
    });
  }
  // updating chapter
  private updatingChapter(chapter: Chapter): void {
    let filteredChapters = this.chapters;
    this.loading = true;
    this.chapterService.updateChapter(chapter).subscribe(editchapter => {
      if (editchapter) {
        filteredChapters = this.chapters.filter(c => c.chapterId !== chapter.chapterId);
        filteredChapters.push(editchapter);
        this.showInformation(ToasterUtils.TOAST_TYPE.success, 'Chapter', 'Chapter updated!');
      } else {
        this.showInformation(ToasterUtils.TOAST_TYPE.warning, 'Chapter', 'Chapter NOT updated!');
      }
    }, error => {
        this.loading = false;
        this.showInformation(ToasterUtils.TOAST_TYPE.warning, 'Chapter', 'Error adding chapter: ' + error.message);
        console.error();
      },
      () => {
        this.loading = false;
        this.source.load(this.chapters);
      });
  }
  // adds new chapter
  private addNewChapter(chapter: Chapter): void {
    chapter.chapterId = AppUtil.getId();
    chapter.bookId = this.bookId;
    this.loading = true;
    this.chapterService.addChapter(chapter).subscribe(savedChapter => {
        if (savedChapter) {
          this.chapters.push(chapter);
          this.showInformation(ToasterUtils.TOAST_TYPE.success, 'Chapter', 'chapter added!');
        } else {
          this.showInformation(ToasterUtils.TOAST_TYPE.warning, 'Chapter', 'chapter NOT added!');
        }
      },
      error => {
        this.loading = false;
        this.showInformation(ToasterUtils.TOAST_TYPE.warning, 'Chapter', 'Error adding chapter: ' + error.message);
        console.error();
      },
      () => {
        this.loading = false;
        this.source.load(this.chapters);
      });
  }

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
