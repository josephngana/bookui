import { Component, OnInit } from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';
import {DatePipe} from '@angular/common';
import {Section} from '../domain/section';
import {AddEditSectionComponent} from '../modals/add-edit-section/add-edit-section.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ToasterUtils} from '../../../../conf/util';
import {BodyOutputType, Toast, ToasterConfig, ToasterService} from 'angular2-toaster';



@Component({
  selector: 'ngx-sections',
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.scss'],
  providers: [NgbModal],
})
export class SectionsComponent implements OnInit {
  loading: boolean;
  sections: Array<Section>;
  source: LocalDataSource;
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
      perPage: 10,
    },
  };

  constructor(private modalService: NgbModal, toasterService: ToasterService) {
    this.toasterService = toasterService;
  }

  ngOnInit() {
    this.sections = [];
    this.source = new LocalDataSource(this.sections);
  }
  /**
   * Handles the delete action
   * @param event: object
   */
  onDelete(event): void {
    const section = event.data;
    if (window.confirm('Are you sure you want to delete?')) {
      this.loading = true;
      setTimeout(() => {
      const sectionId = section.id;
      const filteredSections = this.sections.filter( b => b.sectionId !== sectionId);
      this.sections = filteredSections;
      this.source.load(this.sections);
        this.loading = false;
        this.showInformation(ToasterUtils.TOAST_TYPE.success, 'Section', 'Section Deleted');
      }, 2000);
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
    const activeModal = this.modalService.open(AddEditSectionComponent, { size: 'lg', container: 'nb-layout' });

    activeModal.componentInstance.header = modalHeader;
    activeModal.componentInstance.editSection = section;

    let message = 'Section added!';

    if (!section) {

    } else {
      message = 'Section updated!';
    }

    activeModal.result.then(result => {
      if (result) {
        console.log(result);
        this.loading = true;
        setTimeout(() => {
        if (section) {
          const sectionId = section.sectionId;
          const filteredSections = this.sections.filter( b => b.sectionId !== sectionId);
          this.sections = filteredSections;
        }
        this.sections.push(result);
        this.source.load(this.sections);
          this.loading = false;
          this.showInformation(ToasterUtils.TOAST_TYPE.success, 'Sections', message);
        }, 2000);
      }
    }).catch(error => {
      console.error(error);
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
