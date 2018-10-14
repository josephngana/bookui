import {Component, OnInit} from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';
import {DatePipe} from '@angular/common';
import {Section} from '../domain/section';
import {AddEditSectionComponent} from '../modals/add-edit-section/add-edit-section.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ToasterUtils} from '../../../../conf/util';
import {Toast, ToasterConfig, ToasterService} from 'angular2-toaster';
import {AppUtil} from '../../../../conf/app-util';
import {BookService} from '../service/book.service';
import {ChapterService} from '../service/chapter.service';
import {Book} from '../domain/book';
import {Chapter} from '../domain/chapter';
import {SiteService} from '../../site-management/service/site.service';
import {SectionService} from '../service/section.service';

import 'style-loader!angular2-toaster/toaster.css';


@Component({
  selector: 'ngx-sections',
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.scss'],
  providers: [NgbModal, BookService, ChapterService, SiteService, SectionService],
})
export class SectionsComponent implements OnInit {

  loading: boolean;
  motsepeSiteId: string;
  selectedBook: Book;
  selectedChapter: Chapter;
  books: Book[];
  chapters: Chapter[];
  sections: Array<Section>;
  source: LocalDataSource;
  toasterConfig: ToasterConfig;

  settings = {
    mode: 'external',
    noDataMessage: 'No sections.',
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true,
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
      sectionTitle: {
        title: 'Title',
        type: 'string',
      },
      sectionDescription: {
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

  constructor(private modalService: NgbModal,
              private toasterService: ToasterService,
              private bookService: BookService,
              private chapterService: ChapterService,
              private siteService: SiteService,
              private sectionService: SectionService,
  ) {
  }

  ngOnInit() {
    this.getMotsepeSiteId();
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
        this.showInformation(ToasterUtils.TOAST_TYPE.error, 'Sections', 'Error fetching site: ' + error.message);
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
          this.showInformation(ToasterUtils.TOAST_TYPE.warning, 'Sections', 'No books retrieve.');
        }
      },
      error => {
        this.loading = false;
        this.showInformation(ToasterUtils.TOAST_TYPE.error, 'Sections', 'Error fetching books: ' + error.message);
        console.error('Error fetching books: ' + error.message);
      },
      () => {
        this.loading = false;
      });
  }

  onBookChange(event): void {
    const bookId = event.srcElement.value;
    if (bookId !== '') {
      this.getBook(bookId);
    } else {
      this.selectedBook = null;
      this.selectedChapter = null;
    }
  }

  private getBook(bookId: string): void {
    const book = this.books.filter(b => b.bookId === bookId)[0];
    if (book) {
      this.selectedBook = book;
      this.getChapters(bookId);
    } else {
      this.showInformation(ToasterUtils.TOAST_TYPE.warning, 'Sections', 'Could not fetch book details!');
    }
  }

  private getChapters(bookId: string): void {
    this.loading = true;
    this.chapterService.getChapters(bookId).subscribe((chapters: Chapter[]) => {
        this.chapters = [];
        if (chapters) {
          this.chapters = chapters;
        } else {
          this.showInformation(ToasterUtils.TOAST_TYPE.warning, 'Sections', 'No chapters retrieved ');
        }
      }, error => {
        this.loading = false;
        this.showInformation(ToasterUtils.TOAST_TYPE.warning, 'Sections', 'Error fetching chapters ' + error.message);
      },
      () => {
        this.loading = false;
      });
  }

  onChapterChange(event): void {
    const chapterId = event.srcElement.value;
    if (chapterId !== '') {
      this.getChapter(chapterId);
    } else {
      this.selectedChapter = null;
    }
  }

  private getChapter(chapterId: string): void {
    const chapter = this.chapters.filter(c => c.chapterId === chapterId)[0];
    if (chapter) {
      this.selectedChapter = chapter;
      this.getSectionsInChapter(chapterId);
    } else {
      this.showInformation(ToasterUtils.TOAST_TYPE.warning, 'Sections', 'Could not fetch book details!');
    }
  }

  private getSectionsInChapter(chapterId: string): void {
    this.loading = true;
    this.sectionService.getSectionsInChapter(chapterId).subscribe(sections => {
        this.sections = [];
        if (sections) {
          this.sections = sections;
        } else {
          this.showInformation(ToasterUtils.TOAST_TYPE.warning, 'Sections', 'Could not fetch sections!');
        }
        this.source = new LocalDataSource(this.sections);
      },
      error => {
        this.loading = false;
        this.showInformation(ToasterUtils.TOAST_TYPE.error, 'Sections', 'Error fetching sections: ' + error.message);
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
      const sectionToDelete = event.data;
      let filteredSections = this.sections;
      this.loading = true;
      this.sectionService.deleteSection(sectionToDelete).subscribe(isDeleted => {
          if (isDeleted) {
            filteredSections = this.sections.filter(section => section.sectionId !== sectionToDelete.sectionId);
            this.showInformation(ToasterUtils.TOAST_TYPE.success, 'Sections', 'Section deleted!');
          } else {
            this.showInformation(ToasterUtils.TOAST_TYPE.warning, 'Sections', 'Section NOT deleted!');
          }
        },
        error => {
          this.loading = false;
          this.showInformation(ToasterUtils.TOAST_TYPE.error, 'Sections', 'Error deleting section: ' + error.message);
        },
        () => {
          this.sections = filteredSections;
          this.source.load(this.sections);
          this.loading = false;
        });
    }
  }

  /**
   * Handles the create action of new section
   * @param event: object
   */
  onCreate(event): void {
    const modalHeader = 'Book Management - Add New Section';
    const editSection: Section = null;
    console.info('Adding new section...');
    this.processAddEditSection(modalHeader, editSection);
  }

  onEdit(event): void {
    const modalHeader = 'Book Management - Edit Section';
    const editSection = event.data;
    console.info('Editing section...');
    this.processAddEditSection(modalHeader, editSection);
  }

  processAddEditSection(modalHeader: string, section: Section) {
    const activeModal = this.modalService.open(AddEditSectionComponent, {size: 'lg', container: 'nb-layout'});

    activeModal.componentInstance.header = modalHeader;
    activeModal.componentInstance.editSection = section;

    activeModal.result.then(s => {
      if (s) {
        if (section) {
          // call method to process edit
          this.updateSection(s);
        } else {
          // call method to process add
          this.addNewSection(s);
        }
      }
    }).catch(error => {
      console.error(error);
    });
  }

  private addNewSection(section: Section): void {
    section.sectionId = AppUtil.getId();
    section.chapterId = this.selectedChapter.chapterId;
    this.loading = true;
    this.sectionService.addSection(section).subscribe(addedSection => {
        if (addedSection) {
          this.sections.push(addedSection);
          this.showInformation(ToasterUtils.TOAST_TYPE.success, 'Sections', 'Section added!');
        } else {
          this.showInformation(ToasterUtils.TOAST_TYPE.warning, 'Sections', 'Section NOT added!');
        }
      },
      error => {
        this.loading = false;
        this.showInformation(ToasterUtils.TOAST_TYPE.error, 'Sections', 'Error adding section: ' + error.message);
      },
      () => {
        this.loading = false;
        this.source.load(this.sections);
      });
  }

  private updateSection(section: Section): void {
    let filteredSections = this.sections;
    this.loading = true;
    this.sectionService.updateSection(section).subscribe(updatedSection => {
        if (updatedSection) {
          filteredSections = this.sections.filter(s => s.sectionId !== section.sectionId);
          filteredSections.push(updatedSection);
          this.showInformation(ToasterUtils.TOAST_TYPE.success, 'Sections', 'Section updated!');
        } else {
          this.showInformation(ToasterUtils.TOAST_TYPE.warning, 'Sections', 'Section NOT updated!');
        }
      },
      error => {
        this.loading = false;
        this.showInformation(ToasterUtils.TOAST_TYPE.error, 'Sections', 'Error updating section: ' + error.message);
      },
      () => {
        this.loading = false;
        this.source.load(this.sections);
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

}
