import { Component, OnInit } from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';
import {DatePipe} from '@angular/common';
import {SubSection} from '../domain/sub-section';
import {AddEditSubsectionComponent} from '../modals/add-edit-subsection/add-edit-subsection.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngx-sub-sections',
  templateUrl: './sub-sections.component.html',
  styleUrls: ['./sub-sections.component.scss'],
  providers: [NgbModal],
})
export class SubSectionsComponent implements OnInit {
subsections: Array<SubSection>;
source: LocalDataSource;
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
      confirmDelete: true,
    },
    columns: {
      subSection: {
        title: 'Sub-section',
        type: 'string',
      },
      author: {
        title: 'Author',
        type: 'string',
      },
      date: {
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

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
    this.subsections = [];
    this.source = new LocalDataSource(this.subsections);
  }
  onDelete(event): void {
    const subsection = event.data;
    if (window.confirm('Are you sure you want to delete?')) {
      const subsectionId = subsection.id;
      const filteredSubSections = this.subsections.filter( b => b.id !== subsectionId);
      this.subsections = filteredSubSections;
      this.source.load(this.subsections);
    }
  }

  onCreate(event): void {
    const modalHeader = 'Book Management - Add New SubSection';
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
    const activeModal = this.modalService.open(AddEditSubsectionComponent, { size: 'lg', container: 'nb-layout' });
    activeModal.componentInstance.header = modalheader;
    activeModal.componentInstance.editSubSection = subsection;
    activeModal.result.then(result => {
      if (result) {
        console.log(result);
        if (subsection) {
          const subsectionId = subsection.id;
          const filteredSubSections = this.subsections.filter( b => b.id !== subsectionId);
          this.subsections = filteredSubSections;
        }
        this.subsections.push(result);
        this.source.load(this.subsections);
      }
    }).catch(error => {
      console.error(error);
    });
  }

}
