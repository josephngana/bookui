import { Component, OnInit } from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';
import {Toast, ToasterConfig, ToasterService} from 'angular2-toaster';
import {ToasterUtils} from '../../../../conf/util';
import {DatePipe} from '@angular/common';
import {Multimedia} from '../../../../shared/domain/multimedia';
import {AppUtil} from '../../../../conf/app-util';

import 'style-loader!angular2-toaster/toaster.css';

@Component({
  selector: 'ngx-multimedia',
  templateUrl: './multimedia.component.html',
  styleUrls: ['./multimedia.component.scss'],
})
export class MultimediaComponent implements OnInit {

  loading: boolean;
  source: LocalDataSource;
  toasterConfig: ToasterConfig;

  // settings for smart table
  settings = {
    noDataMessage: 'No multimedia found.',
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
      confirmSave: true,
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      multimediaName: {
        title: 'Name',
        type: 'string',
      },
      multimediaType: {
        title: 'Type',
        type: 'string',
      },
      multimediaLink: {
        title: 'Link',
        type: 'string',
      },
      dateCreated: {
        title: 'Date Created',
        type: 'string',
        addable: false,
        editable: false,
        valuePrepareFunction: (date) => {
          return new DatePipe('en-EN').transform(date, 'dd MMM yyyy HH:mm:ss');
        },
      },
    },
    pager: {
      perPage: 10,
    },
  };

  constructor(private toasterService: ToasterService) {
  }

  ngOnInit() {
    this.loading = false;
    const mm: Array<Multimedia> = [];
    const multimedia = new Multimedia();
    multimedia.multimediaId = AppUtil.getId();
    multimedia.multimediaLink = 'http://google.com';
    multimedia.multimediaName = 'Chapter 1';
    multimedia.multimediaType = 'video';
    mm.push(multimedia);

    this.source = new LocalDataSource(mm);
  }

  /**
   * Handles delete of multimedia
   * @param event: object
   */
  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  /**
   * Handles creation of new multimedia
   * @param event: object
   */
  onCreateConfirm(event): void {
    this.loading = true;
    setTimeout(() => {
      const newMultimedia = event.newData;
      const multimedia = new Multimedia();
      multimedia.multimediaId = AppUtil.getId();
      multimedia.multimediaType = newMultimedia.multimediaType;
      multimedia.multimediaName = newMultimedia.multimediaName;
      multimedia.multimediaLink = newMultimedia.multimediaLink;
      event.confirm.resolve(multimedia);
      this.loading = false;
      this.showInformation(ToasterUtils.TOAST_TYPE.success, 'Multimedia', 'Multimedia Added');
    }, 3000);
  }

  /**
   * Handles editing a multimedia
   * @param event: object
   */
  onEditConfirm(event): void {
    this.loading = true;
    setTimeout(() => {
      const editedMultimedia = event.newData;
      // call service to edit/update multimedia here...
      event.confirm.resolve(editedMultimedia);
      this.loading = false;
      this.showInformation(ToasterUtils.TOAST_TYPE.success, 'Multimedia', 'Multimedia updated');
    }, 3000);
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
