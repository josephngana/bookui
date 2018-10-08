import { Component, OnInit } from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';
import {Chapter} from '../domain/chapter';
import {AppUtil} from '../../../../conf/app-util';
import {DatePipe} from '@angular/common';
import {AddEditChapterComponent} from '../modals/add-edit-chapter/add-edit-chapter.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {BodyOutputType, Toast, ToasterConfig, ToasterService} from 'angular2-toaster';
import {ToasterUtils} from '../../../../conf/util';

@Component({
  selector: 'ngx-chapters',
  templateUrl: './chapters.component.html',
  styleUrls: ['./chapters.component.scss'],
  providers: [NgbModal],
})
export class ChaptersComponent implements OnInit {
  loading: boolean;
  source: LocalDataSource;
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
      title: {
        title: 'Title',
        type: 'string',
      },
      description: {
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

  constructor(private modalService: NgbModal, toasterService: ToasterService) {
    this.toasterService = toasterService;
  }

  ngOnInit() {
    this.chapters = [];
    const chapter = new Chapter();
    chapter.id = AppUtil.getId();
    chapter.title = 'Emergency';
    chapter.description = 'This is for emergencies';
    this.chapters.push(chapter);

    this.source = new LocalDataSource(this.chapters);
  }

  onDelete(event): void {
    const chapter = event.data;
    if (window.confirm('Are you sure you want to delete?')) {
      this.loading = true;
      setTimeout(() => {
        const chapterId = chapter.id;
        const filteredChapters = this.chapters.filter(c => c.id !== chapterId);
        this.chapters = filteredChapters;
        this.source.load(this.chapters);
        this.loading = false;
        this.showInformation(ToasterUtils.TOAST_TYPE.success, 'Chapter', 'chapter deleted');
      }, 2000);
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
    const activeModal = this.modalService.open(AddEditChapterComponent, { size: 'lg', container: 'nb-layout' });

    activeModal.componentInstance.header = header;
    activeModal.componentInstance.editChapter = chapter;
    let message = 'chapter added!';
    if (!chapter) {
    } else {
      message = 'chapter updated!';
    }
    activeModal.result.then(result => {
      if (result) {
        this.loading = true;
        setTimeout(() => {
          if (chapter) {
            const chapterId = chapter.id;
            const filteredChapters = this.chapters.filter( b => b.id !== chapterId);
            this.chapters = filteredChapters;
          }
          this.chapters.push(result);
          this.source.load(this.chapters);
        if (chapter) {
          const chapterId = chapter.id;
          const filteredChapters = this.chapters.filter( b => b.id !== chapterId);
          this.chapters = filteredChapters;
        }
        this.chapters.push(result);
        this.source.load(this.chapters);
          this.loading = false;
          this.showInformation(ToasterUtils.TOAST_TYPE.success, 'Chapter', message);
        }, 2000);
      }
    }).catch(error => {
      console.error(error);
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
