import { Component, OnInit } from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';
import {Chapter} from '../domain/chapter';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AddEditChapterComponent} from '../modals/add-edit-chapter/add-edit-chapter.component';

@Component({
  selector: 'ngx-chapters',
  templateUrl: './chapters.component.html',
  styleUrls: ['./chapters.component.scss'],
  providers: [NgbModal],
})
export class ChaptersComponent implements OnInit {

  source: LocalDataSource;
  books: Array<Chapter>;

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
      chapter: {
        title: 'Chapter',
        type: 'string',
      },
      author: {
        title: 'Author',
        type: 'string',
      },
      date: {
        title: 'Date',
        type: 'date',
      },
    },
  };

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
    this.chapter = [];
    this.source = new LocalDataSource(this.chapter);
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  onCreate(event): void {
    const modalHeader = 'Book Management - Add New Chapter';
    const editChapter: Chapter = null;
    console.info('Adding new chapter...');
    this.processAddEditChapter(modalHeader, editChapter);
  }

  onEdit(event): void {
    const modalHeader = 'Book Management - Edit Chapter';
    const editChapter = event.data;
    console.info('Editing chapter...');
    this.processAddEditChapter(modalHeader, editChapter);
  }

  processAddEditChapter(modalHeader: string, chapter: Chapter) {
    const activeModal = this.modalService.open(AddEditChapterComponent, { size: 'lg', container: 'nb-layout' });

    activeModal.componentInstance.header = modalHeader;
    activeModal.componentInstance.editSection = chapter;

    activeModal.result.then(result => {
      if (result) {
        console.log(result);
        if (chapter) {
          const chapterId = chapter.id;
          const filteredChapter = this.chapter.filter( b => b.id !== chapterId);
          this.chapter = filteredChapter;
        }
        this.chapter.push(result);
        this.source.load(this.chapter);
      }
    }).catch(error => {
      console.error(error);
    });
  }
}
