import { Component, OnInit } from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';
import {Multimedia} from '../../../../shared/domain/multimedia';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'ngx-multimedia',
  templateUrl: './multimedia.component.html',
  styleUrls: ['./multimedia.component.scss'],
})
export class MultimediaComponent implements OnInit {

  source: LocalDataSource;
  settings = {
    noDataMessage: 'No multimedia added.',
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
      perPage: 5,
    },
  };

  constructor() { }

  ngOnInit() {
    const mm: Array<Multimedia> = [];
    const multimedia = new Multimedia();
    multimedia.multimediaId = '90980980';
    multimedia.multimediaLink = 'http://google.com';
    multimedia.multimediaName = 'Chapter 1';
    multimedia.multimediaType = 'video';
    mm.push(multimedia);

    this.source = new LocalDataSource(mm);
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  onCreateConfirm(event): void {
    console.log(event);
    const newMultimedia = event.newData;
    const multimedia = new Multimedia();
    multimedia.multimediaId = '089784343';
    multimedia.multimediaType = newMultimedia.multimediaType;
    multimedia.multimediaName = newMultimedia.multimediaName;
    multimedia.multimediaLink = newMultimedia.multimediaLink;
    event.confirm.resolve(multimedia);
  }


}
