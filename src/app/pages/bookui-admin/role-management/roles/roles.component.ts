import {Component, OnInit} from '@angular/core';
import {Role} from '../domain/role';
import {AppUtil} from '../../../../conf/app-util';
import {BodyOutputType, Toast, ToasterConfig, ToasterService} from 'angular2-toaster';
import {LocalDataSource} from 'ng2-smart-table';
import {ToasterUtils} from '../../../../conf/util';
import {RoleService} from '../service/role.service';

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
      roleDescription: {
        title: 'Role Description',
        type: 'string',
      },
    },
  };

  constructor(toasterService: ToasterService, private roleService: RoleService) {
    this.toasterService = toasterService;
  }

  ngOnInit() {
    this.roles = [];
    this.getRoles();
    this.source = new LocalDataSource(this.roles);
  }

  private getRoles(): void {
    this.loading = true;
    this.roleService.getRoles().subscribe( (roles: Role[]) => {
      if (roles) {
        console.log(roles);
        roles.forEach(r => this.roles.push(r));
        this.source.refresh();
        this.loading = false;
      }
    });
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
    let message = 'Role added';
    let toastType = ToasterUtils.TOAST_TYPE.success;
    const newRole = event.newData;
    if (newRole.roleName === '') {
      event.confirm.reject();
      message = 'Role name is required';
      toastType = ToasterUtils.TOAST_TYPE.info;
      this.showInformation(toastType, 'Role', message);
    } else {
      this.loading = true;
      const role = new Role();
      role.id = AppUtil.getId();
      role.roleDescription = newRole.roleDescription;
      role.roleName = newRole.roleName;
      this.roleService.addRole(role).subscribe(savedRole => {
        if (savedRole) {
          event.confirm.resolve(savedRole);
          this.loading = false;
          this.showInformation(toastType, 'Role', message);
        }
      });
    }
  }

  /**
   * handle editing a role
   * @param event
   */
  onEditConfirm(event): void {
    let message = 'Role updated';
    let toastType = ToasterUtils.TOAST_TYPE.success;
    const editedRole = event.newData;
    if (editedRole.roleName === '') {
      event.confirm.reject();
      message = 'Role name is required';
      toastType = ToasterUtils.TOAST_TYPE.info;
      this.showInformation(toastType, 'Role', message);
    } else {
      this.loading = true;
      setTimeout(() => {
        /**
         * call service to edit role.
         * if successful, call the resolve else call the reject
         */
        event.confirm.resolve(editedRole);
        this.loading = false;
        this.showInformation(toastType, 'Role', message);
      }, 2000);
    }
  }

  /**
   * Shows toast on screen
   * @param type: string
   * @param title: string
   * @param info: string
   */
  private showInformation(type: string, title: string, info: string): void {
    type = (type === null || type === '') ? ToasterUtils.TOAST_TYPE.default : type;
    const toast: Toast = {
      type: type,
      title: title,
      body: info,
      timeout: ToasterUtils.TIMEOUT,
      showCloseButton: ToasterUtils.SHOW_CLOSE_BUTTON,
      bodyOutputType: BodyOutputType.TrustedHtml,
    };
    this.toasterService.popAsync(toast);
  }

}
