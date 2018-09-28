import { Component, OnInit } from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';
import {User} from '../domain/user';
import {DatePipe} from '@angular/common';
import {AppUtil} from '../../../../conf/app-util';

@Component({
  selector: 'ngx-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {

  source: LocalDataSource;
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
        filter: {
          type: 'list',
          config: {
            selectText: 'Select...',
            list: [
              { value: 'JohnDoe', title: 'Editor' },
              { value: 'JaneDoe', title: 'Admin' },
              { value: 'DaveDoe', title: 'Moderator' },
            ],
          },
        },
      },
      firstName: {
        title: 'First Name',
        type: 'string',
      },
      lastName: {
        title: 'Last Name',
        type: 'string',
      },
      middleName: {
        title: 'Username',
        type: 'string',
      },
      email: {
        title: 'E-mail',
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
  };

  constructor() { }

  ngOnInit() {
    const ur: Array<User> = [];
    const user = new User();
    user.userId = AppUtil.getId();
    user.firstName = 'John';
    user.lastName = 'Doe';
    user.middleName = 'JohnDoe';
    user.email = 'JohnDoe@gmail.com';
    ur.push(user);

    this.source = new LocalDataSource(ur);
  }

  onCreateConfirm(event): void {
    console.log(event);
    const newUser = event.newData;
    const user = new User();
    user.userId = AppUtil.getId();
    user.firstName = newUser.firstName;
    user.siteId = newUser.siteId;
    user.email = newUser.email;
    user.lastName = newUser.lastName;
    user.middleName = newUser.middleName;
    event.confirm.resolve(user);
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  onEditConfirm(event): void {
    console.log(event);
    const editedUser = event.newData;
    // call service to edit/update user here...
    event.confirm.resolve(editedUser);
  }
}
