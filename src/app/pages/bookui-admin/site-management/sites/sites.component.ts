import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-sites',
  templateUrl: './sites.component.html',
  styleUrls: ['./sites.component.scss'],
})
export class SitesComponent implements OnInit {

  settings = {
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
      },
    },
  };

  constructor() { }

  ngOnInit() {
  }

}
