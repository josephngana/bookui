import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-sub-sections',
  templateUrl: './sub-sections.component.html',
  styleUrls: ['./sub-sections.component.scss'],
})
export class SubSectionsComponent implements OnInit {

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
      subSection: {
        title: 'Sub-section',
        type: 'string',
      },
      author: {
        title: 'Author',
        type: 'string',
      },
      date: {
        title: 'Date',
        type: 'string',
      },
    },
  };

  constructor() { }

  ngOnInit() {
  }

}
