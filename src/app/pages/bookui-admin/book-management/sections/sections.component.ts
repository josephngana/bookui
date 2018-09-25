import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-sections',
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.scss'],
})
export class SectionsComponent implements OnInit {

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
      section: {
        title: 'Section',
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
  constructor() { }

  ngOnInit() {
  }

}
