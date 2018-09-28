import { Component, OnInit } from '@angular/core';
import {Role} from '../domain/role';
import {AppUtil} from '../../../../conf/app-util';

@Component({
  selector: 'ngx-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss'],
})
export class RolesComponent implements OnInit {

  settings = {
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
      roleName: {
        title: 'Role Name',
        type: 'string',
      },
      roleDescription: {
        title: 'Role Description',
        type: 'string',
      },
    },
  };

  constructor() { }

  ngOnInit() {
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  /**
   * handle the create action
   * @param event
   */
  onCreateConfirm(event): void {
    const newRole = event.newData;
    const role = new Role();
    role.id = AppUtil.getId();
    role.roleDescription = newRole.roleDescription;
    role.roleName = newRole.roleName;
    /**
     * call service to add role.
     * if successful, call the resolve else call the reject
     */
    event.confirm.resolve(role);
  }

  /**
   * handle editing a role
   * @param event
   */
  onEditConfirm(event): void {
    const editedRole = event.newData;
    // call service to save edited role
    event.confirm.resolve(editedRole);
  }

}
