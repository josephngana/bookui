import { Component, OnInit } from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';
import {Chapter} from '../domain/chapter';
import {AppUtil} from '../../../../conf/app-util';
import {DatePipe} from '@angular/common';
import {AddEditChapterComponent} from '../modals/add-edit-chapter/add-edit-chapter.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngx-chapters',
  templateUrl: './chapters.component.html',
  styleUrls: ['./chapters.component.scss'],
  providers: [NgbModal],
})
export class ChaptersComponent implements OnInit {

  source: LocalDataSource;
  chapters: Array<Chapter>;

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

  constructor(private modalService: NgbModal) { }

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
      const chapterId = chapter.id;
      const filteredChapters = this.chapters.filter(c => c.id !== chapterId);
      this.chapters = filteredChapters;
      this.source.load(this.chapters);
    }
  }

  onCreate(event): void {
    const modalHeader = 'Book Management - Add New Chapter';
    const editChapter: Chapter = null;
    console.info('Adding new chapter...');
    this.processAddEditChapter(modalHeader, editChapter);
  }

  private processAddEditChapter(header: string, chapter: Chapter): void {
    const activeModal = this.modalService.open(AddEditChapterComponent, { size: 'lg', container: 'nb-layout' });

    activeModal.componentInstance.header = header;
    activeModal.componentInstance.editChapter = chapter;

    activeModal.result.then(result => {
      if (result) {
        if (chapter) {
          const chapterId = chapter.id;
          const filteredChapters = this.chapters.filter( b => b.id !== chapterId);
          this.chapters = filteredChapters;
        }
        this.chapters.push(result);
        this.source.load(this.chapters);
      }
    }).catch(error => {
      console.error(error);
    });
  }

  onEdit(event): void {
    const chapter = event.data;
    const heading = 'Book Management - Edit Chapter';
    console.info('Editing chapter...');
    this.processAddEditChapter(heading, chapter);
  }
}
