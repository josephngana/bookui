import {Component, OnInit} from '@angular/core';
import {Role} from '../domain/role';
import {AppUtil} from '../../../../conf/app-util';
import {BodyOutputType, Toast, ToasterConfig, ToasterService} from 'angular2-toaster';
import {LocalDataSource} from 'ng2-smart-table';
import {ToasterUtils} from '../../../../conf/util';
import {RoleService} from '../service/role.service';

import 'style-loader!angular2-toaster/toaster.css';

@Component({
  selector: 'ngx-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss'],
  providers: [RoleService],
})
export class RolesComponent implements OnInit {

  loading: boolean;
  source: LocalDataSource;
  roles: Array<Role>;
  toasterConfig: ToasterConfig;

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
      confirmSave: true,
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
      description: {
        title: 'Role Description',
        type: 'string',
      },
    },
  };

  constructor(private toasterService: ToasterService, private roleService: RoleService) {
  }

  ngOnInit() {
    this.getRoles();
  }

  private getRoles(): void {
    this.loading = true;
    this.roleService.getRoles().subscribe((roles: Role[]) => {
        this.roles = [];
        if (roles) {
          this.roles = roles;
          this.source = new LocalDataSource(this.roles);
        } else {
          this.showInformation(ToasterUtils.TOAST_TYPE.warning, 'Role', 'No roles retrieved.');
        }
      },
      error => {
        this.loading = false;
        this.showInformation(ToasterUtils.TOAST_TYPE.error, 'Role', 'Error fetching roles: ' + error.message);
        console.error('Error fetching roles:' + error.message);
      },
      () => {
        this.loading = false;
      });
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      this.loading = true;
      this.roleService.deleteRole(event.data).subscribe(role => {
          if (role) {
            event.confirm.resolve();
            this.showInformation(ToasterUtils.TOAST_TYPE.success, 'Role', 'Role deleted!');
          } else {
            event.confirm.reject();
            this.showInformation(ToasterUtils.TOAST_TYPE.warning, 'Role', 'Role NOT deleted!');
          }
        },
        error => {
          this.loading = false;
          this.showInformation(ToasterUtils.TOAST_TYPE.error, 'Role', 'An error occurred: ' + error.message);
        },
        () => {
          this.loading = false;
        });
    } else {
      event.confirm.reject();
    }
  }

  /**
   * handle the create action
   * @param event
   */
  onCreateConfirm(event): void {
    let message = 'Role added';
    const newRole = event.newData;
    if (newRole.roleName === '') {
      event.confirm.reject();
      message = 'Role name is required';
      this.showInformation(ToasterUtils.TOAST_TYPE.info, 'Role', message);
    } else {
      this.loading = true;
      const role = new Role();
      role.id = AppUtil.getId();
      role.description = newRole.description;
      role.roleName = newRole.roleName;
      this.roleService.addRole(role).subscribe(savedRole => {
          if (savedRole) {
            event.confirm.resolve(savedRole);
            this.showInformation(ToasterUtils.TOAST_TYPE.success, 'Role', message);
          } else {
            message = 'Role NOT saved!';
            this.showInformation(ToasterUtils.TOAST_TYPE.warning, 'Role', message);
          }
        },
        error => {
          this.loading = false;
          console.error('Error saving role: ', error.message);
        },
        () => {
          this.loading = false;
        });
    }
  }

  /**
   * handle editing a role
   * @param event
   */
  onEditConfirm(event): void {
    let message = 'Role updated';
    const editedRole = event.newData;
    if (editedRole.roleName === '') {
      event.confirm.reject();
      message = 'Role name is required';
      this.showInformation(ToasterUtils.TOAST_TYPE.info, 'Role', message);
    } else {
      this.loading = true;
      this.roleService.updateRole(editedRole).subscribe(role => {
          if (role) {
            event.confirm.resolve(role);
            this.showInformation(ToasterUtils.TOAST_TYPE.success, 'Role', message);
          } else {
            event.confirm.reject();
            message = 'Role NOT updated!';
            this.showInformation(ToasterUtils.TOAST_TYPE.warning, 'Role', message);
          }
        },
        error => {
          this.loading = false;
          message = 'An error occurred: ' + error.message;
          this.showInformation(ToasterUtils.TOAST_TYPE.error, 'Role', message);
        },
        () => {
          this.loading = false;
        });
    }
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
