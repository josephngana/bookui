/*
 * Copyright (c) 2018.
 * Author: caniksea.
 * Last Modified: 2018/09/26 10:51 AM
 */

import {Component, OnInit} from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';
import {DatePipe} from '@angular/common';
import {SubSection} from '../domain/sub-section';
import {AddEditSubsectionComponent} from '../modals/add-edit-subsection/add-edit-subsection.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {BodyOutputType, Toast, ToasterConfig, ToasterService} from 'angular2-toaster';
import {ToasterUtils} from '../../../../conf/util';
import {AppUtil} from '../../../../conf/app-util';
import {Book} from '../domain/book';
import {Chapter} from '../domain/chapter';
import {Section} from '../domain/section';
import {BookService} from '../service/book.service';
import {ChapterService} from '../service/chapter.service';
import {SectionService} from '../service/section.service';
import {SiteService} from '../../site-management/service/site.service';
import {SubsectionService} from '../service/subsection.service';

import 'style-loader!angular2-toaster/toaster.css';

@Component({
  selector: 'ngx-sub-sections',
  templateUrl: './subsections.component.html',
  styleUrls: ['./subsections.component.scss'],
  providers: [NgbModal, BookService, ChapterService, SectionService, SiteService, SubsectionService],
})
export class SubsectionsComponent implements OnInit {

  loading: boolean;
  subsections: Array<SubSection>;
  source: LocalDataSource;
  selectedBook: Book;
  selectedChapter: Chapter;
  selectedSection: Section;
  books: Book[];
  chapters: Chapter[];
  sections: Section[];
  motsepeSiteId: string;
  toasterConfig: ToasterConfig;

  settings = {
    mode: 'external',
    noDataMessage: 'No subsections.',
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
      subsectionTitle: {
        title: 'Title',
        type: 'string',
      },
      subsectionDescription: {
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
              private sectionService: SectionService,
              private siteService: SiteService,
              private subsectionService: SubsectionService,
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
        this.showInformation(ToasterUtils.TOAST_TYPE.error, 'Subsections', 'Error fetching site: ' + error.message);
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
          this.showInformation(ToasterUtils.TOAST_TYPE.warning, 'Subsections', 'No books retrieve.');
        }
      },
      error => {
        this.loading = false;
        this.showInformation(ToasterUtils.TOAST_TYPE.error, 'Subsections', 'Error fetching books: ' + error.message);
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
      this.selectedSection = null;
    }
  }

  private getBook(bookId: string): void {
    const book = this.books.filter(b => b.bookId === bookId)[0];
    if (book) {
      this.selectedBook = book;
      this.getChapters(bookId);
    } else {
      this.showInformation(ToasterUtils.TOAST_TYPE.warning, 'Subsections', 'Could not fetch book details!');
    }
  }

  private getChapters(bookId: string): void {
    this.loading = true;
    this.chapterService.getChapters(bookId).subscribe((chapters: Chapter[]) => {
        this.chapters = [];
        if (chapters) {
          this.chapters = chapters;
        } else {
          this.showInformation(ToasterUtils.TOAST_TYPE.warning, 'Subsections', 'No chapters retrieved ');
        }
      }, error => {
        this.loading = false;
        this.showInformation(ToasterUtils.TOAST_TYPE.warning, 'Subsections', 'Error fetching chapters ' + error.message);
      },
      () => {
        this.loading = false;
      });
  }

  onChapterChange(event): void {
    const chapterId = event.srcElement.value;
    this.selectedSection = null;
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
      this.showInformation(ToasterUtils.TOAST_TYPE.warning, 'Sections', 'Could not find chapter!');
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
      },
      error => {
        this.loading = false;
        this.showInformation(ToasterUtils.TOAST_TYPE.error, 'Sections', 'Error fetching sections: ' + error.message);
      },
      () => {
        this.loading = false;
      });
  }

  private onSectionChange(event): void {
    const sectionId = event.srcElement.value;
    if (sectionId !== '') {
      this.getSection(sectionId);
    } else {
      this.selectedSection = null;
    }
  }

  private getSection(sectionId: string): void {
    const section = this.sections.filter(b => b.sectionId === sectionId)[0];
    if (section) {
      this.selectedSection = section;
      this.getSubsectionsInSection(sectionId);
    } else {
      this.showInformation(ToasterUtils.TOAST_TYPE.warning, 'Subsections', 'Could not find section!');
    }
  }

  private getSubsectionsInSection(sectionId: string): void {
    this.loading = true;
    this.subsectionService.getSubsectionsInSection(sectionId).subscribe(subsections => {
        this.subsections = [];
        if (subsections) {
          this.subsections = subsections;
        } else {
          this.showInformation(ToasterUtils.TOAST_TYPE.success, 'Subsections', 'Could not fetch subsections!');
        }
        this.source = new LocalDataSource(this.subsections);
      },
      error => {
        this.loading = false;
        this.showInformation(ToasterUtils.TOAST_TYPE.error, 'Subsections', 'Error fetching subsections: ' + error.message);
      },
      () => {
        this.loading = false;
      });
  }

  onDelete(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      const subsectionToDelete = event.data;
      let filteredSubsections = this.subsections;
      this.loading = true;
      this.subsectionService.deleteSubsection(subsectionToDelete).subscribe(isDeleted => {
          if (isDeleted) {
            filteredSubsections = this.subsections.filter(subsection => subsection.subsectionId !== subsectionToDelete.subsectionId);
            this.showInformation(ToasterUtils.TOAST_TYPE.success, 'Subsections', 'Subsection deleted!');
          } else {
            this.showInformation(ToasterUtils.TOAST_TYPE.warning, 'Subsections', 'Subsection NOT deleted!');
          }
        },
        error => {
          this.loading = false;
          this.showInformation(ToasterUtils.TOAST_TYPE.error, 'Subsections', 'Error deleting subsection: ' + error.message);
        },
        () => {
          this.subsections = filteredSubsections;
          this.source.load(this.subsections);
          this.loading = false;
        });
    }
  }

  onCreate(event): void {
    const modalHeader = 'Book Management - Add New Subsection';
    const editSubSection: SubSection = null;
    console.info('Adding new subsections...');
    this.processAddEditSubSection(modalHeader, editSubSection);
  }

  onEdit(event): void {
    const modalHeader = 'Book Management - Edit SubSection';
    const editSubSection = event.data;
    console.info('Editing subsections...');
    this.processAddEditSubSection(modalHeader, editSubSection);
  }

  processAddEditSubSection(modalheader: string, subsection: SubSection) {
    const activeModal = this.modalService.open(AddEditSubsectionComponent, {size: 'lg', container: 'nb-layout'});
    activeModal.componentInstance.header = modalheader;
    activeModal.componentInstance.editSubsection = subsection;

    activeModal.result.then(ss => {
      if (ss) {
        if (subsection) {
          // call method to process edit
          this.updateSubsection(ss);
        } else {
          // call method to process add
          this.addNewSubsection(ss);
        }
      }
    }).catch(error => {
      console.error(error);
    });
  }

  private addNewSubsection(subsection: SubSection): void {
    subsection.subsectionId = AppUtil.getId();
    subsection.sectionId = this.selectedSection.sectionId;
    this.loading = true;
    this.subsectionService.addSubsection(subsection).subscribe(addedSubsection => {
        if (addedSubsection) {
          this.subsections.push(addedSubsection);
          this.showInformation(ToasterUtils.TOAST_TYPE.success, 'Subsections', 'Subsection added!');
        } else {
          this.showInformation(ToasterUtils.TOAST_TYPE.warning, 'Subsections', 'Subsection NOT added!');
        }
      },
      error => {
        this.loading = false;
        this.showInformation(ToasterUtils.TOAST_TYPE.error, 'Subsections', 'Error adding subsection: ' + error.message);
      },
      () => {
        this.loading = false;
        this.source.load(this.subsections);
      });
  }

  private updateSubsection(subsection: SubSection): void {
    let filteredSubsections = this.subsections;
    this.loading = true;
    this.subsectionService.updateSubsection(subsection).subscribe(updatedSubsection => {
        if (updatedSubsection) {
          filteredSubsections = this.subsections.filter(s => s.subsectionId !== subsection.subsectionId);
          filteredSubsections.push(updatedSubsection);
          this.showInformation(ToasterUtils.TOAST_TYPE.success, 'Subsections', 'Subsection updated!');
        } else {
          this.showInformation(ToasterUtils.TOAST_TYPE.warning, 'Subsections', 'Subsection NOT updated!');
        }
      },
      error => {
        this.loading = false;
        this.showInformation(ToasterUtils.TOAST_TYPE.error, 'Subsections', 'Error updating subsection: ' + error.message);
      },
      () => {
        this.loading = false;
        this.source.load(this.subsections);
      });
  }

  private showInformation(type: string, title: string, info: string): void {
    this.toasterConfig = ToasterUtils.TOASTER_CONFIG;
    const toast: Toast = AppUtil.makeToast(type, title, info);
    this.toasterService.popAsync(toast);
  }

}
