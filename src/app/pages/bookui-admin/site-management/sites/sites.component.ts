import { Component, OnInit } from '@angular/core';
import {Site} from '../domain/site';
import {LocalDataSource} from 'ng2-smart-table';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'ngx-sites',
  templateUrl: './sites.component.html',
  styleUrls: ['./sites.component.scss'],
})
export class SitesComponent implements OnInit {
  sites: Site[];
  source: LocalDataSource;
  settings = {
    noDataMessage: 'No users',
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
      siteName: {
        title: 'Site Name',
        type: 'string',
      },
      siteDescription: {
        title: 'Site Description',
        type: 'string',
      },
      dateCreated: {
        title: 'Date Created',
        type: 'string',
        editable: false,
        addable: false,
        valuePrepareFunction: (date) => {
          return new DatePipe('en-En').transform(date, 'YYYY-MM-DD');
        },
      },
    },
  };

  constructor() {
  }

  ngOnInit() {
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      // call service to delete user.
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }

  }

  onCreateConfirm(event): void {
    const newSite = event.newData;
    const siteId = newSite.siteId;
    const siteName = newSite.siteName;
  }
  onEditConfirm(event): void {
    const newSite = event.newData;
    const siteId = newSite.siteId;
    const siteName = newSite.siteName;
  }
}
