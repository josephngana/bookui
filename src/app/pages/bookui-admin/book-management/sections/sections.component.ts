import { Component, OnInit } from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';
import {DatePipe} from '@angular/common';
import {Section} from '../domain/section';
import {AddEditSectionComponent} from '../modals/add-edit-section/add-edit-section.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'ngx-sections',
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.scss'],
  providers: [NgbModal],
})
export class SectionsComponent implements OnInit {

  sections: Array<Section>;
  source: LocalDataSource;
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
      perPage: 5,
    },
  };

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
    this.sections = [];
    this.source = new LocalDataSource(this.sections);
  }

  onDelete(event): void {
    const section = event.data;
    if (window.confirm('Are you sure you want to delete?')) {
      const sectionId = section.id;
      const filteredSections = this.sections.filter( b => b.id !== sectionId);
      this.sections = filteredSections;
      this.source.load(this.sections);
    }
  }

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
    const activeModal = this.modalService.open(AddEditSectionComponent, { size: 'lg', container: 'nb-layout' });

    activeModal.componentInstance.header = modalHeader;
    activeModal.componentInstance.editSection = section;

    activeModal.result.then(result => {
      if (result) {
        console.log(result);
        if (section) {
          const sectionId = section.id;
          const filteredSections = this.sections.filter( b => b.id !== sectionId);
          this.sections = filteredSections;
        }
        this.sections.push(result);
        this.source.load(this.sections);
      }
    }).catch(error => {
      console.error(error);
    });
  }

}
