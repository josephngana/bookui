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

@Component({
  selector: 'ngx-sub-sections',
  templateUrl: './subsections.component.html',
  styleUrls: ['./subsections.component.scss'],
  providers: [NgbModal],
})
export class SubsectionsComponent implements OnInit {
loading: boolean;
subsections: Array<SubSection>;
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
  };

  constructor(private modalService: NgbModal, toasterService: ToasterService) {
    this.toasterService = toasterService;
  }

  ngOnInit() {
    this.subsections = [];
    this.source = new LocalDataSource(this.subsections);
  }
  onDelete(event): void {
    const subsection = event.data;
    if (window.confirm('Are you sure you want to delete?')) {
      this.loading = true;
      setTimeout(() => {
      const subsectionId = subsection.id;
      const filteredSubSections = this.subsections.filter( b => b.subsectionId !== subsectionId);
      this.subsections = filteredSubSections;
      this.source.load(this.subsections);
        this.loading = false;
        this.showInformation(ToasterUtils.TOAST_TYPE.success, 'Subsection', 'subsection deleted!');
      }, 2000);
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
    const activeModal = this.modalService.open(AddEditSubsectionComponent, { size: 'lg', container: 'nb-layout' });
    activeModal.componentInstance.header = modalheader;
    activeModal.componentInstance.editSubSection = subsection;

    let message = 'subsection added!';
    if (!subsection) {
    } else {
      message = 'subsection updated!';
    }
    activeModal.result.then(result => {
      if (result) {
        this.loading = true;
        setTimeout(() => {
        console.log(result);
        if (subsection) {
          const subsectionId = subsection.subsectionId;
          const filteredSubSections = this.subsections.filter( b => b.subsectionId !== subsectionId);
          this.subsections = filteredSubSections;
        }
        this.subsections.push(result);
        this.source.load(this.subsections);
          this.loading = false;
          this.showInformation(ToasterUtils.TOAST_TYPE.success, 'Subsection', message);
        }, 2000);
      }
    }).catch(error => {
      console.error(error);
    });
  }
  private showInformation(type: string, title: string, info: string): void {
    const toast: Toast = AppUtil.makeToast(type, title, info);
    this.toasterService.popAsync(toast);
  }


}
