import {Component, OnInit} from '@angular/core';
import {User} from '../domain/user';
import {LocalDataSource} from 'ng2-smart-table';
import {AppUtil} from '../../../../conf/app-util';
import {DatePipe} from '@angular/common';
import {Site} from '../../site-management/domain/site';
import {BodyOutputType, Toast, ToasterConfig, ToasterService} from 'angular2-toaster';
import {ToasterUtils} from '../../../../conf/util';

@Component({
  selector: 'ngx-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {

  readonly domain: string = 'User';
  loading: boolean;
  source: LocalDataSource;
  users: User[];
  sites: Array<Site>;
  dropdownData: object[];

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
    noDataMessage: 'No users',
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
      siteName: {
        title: 'Site Name',
        type: 'html',
        editor: {
          type: 'list',
          config: {
            selectText: 'Select Site',
            list: [],
          },
        },
      },
      firstName: {
        title: 'First Name',
        type: 'string',
      },
      middleName: {
        title: 'Middle Name',
        type: 'string',
      },
      lastName: {
        title: 'Last Name',
        type: 'string',
      },
      email: {
        title: 'E-mail',
        type: 'string',
      },
      dateCreated: {
        title: 'Date Created',
        type: 'string',
        editable: false,
        addable: false,
        valuePrepareFunction: (date) => {
          return new DatePipe('en-EN').transform(date, 'yyyy-MM-dd');
        },
      },
    },
    pager: {
      perPage: 10,
    },
  };

  constructor(toasterService: ToasterService) {
    this.toasterService = toasterService;
  }

  ngOnInit() {
    this.sites = [];
    let site = this.makeSite('The Little Black Book');
    this.sites.push(site);
    site = this.makeSite('The Yahoos!');
    this.sites.push(site);

    this.dropdownData = [];
    this.sites.forEach(s => {
      this.dropdownData.push({
        value: s.siteId,
        title: s.siteName,
      });
    });

    this.settings.columns.siteName.editor.config.list = this.dropdownData;
    // this.settings = Object.assign({}, this.settings);

    this.users = [];
    this.source = new LocalDataSource(this.users);
  }

  private getSiteName(id: string): string {
    let siteName = '';
    const site = this.sites.find(s => s.siteId === id);
    if (site) siteName = site.siteName;
    return siteName;
  }

  private makeSite(siteName: string): Site {
    const site = new Site();
    site.siteId = AppUtil.getId();
    site.siteName = siteName;
    return site;
  }

  onCreateConfirm(event): void {
    const newUser = event.newData;
    const siteId = newUser.siteName;
    const email = newUser.email;
    const firstName = newUser.firstName;
    const lastName = newUser.lastName;
    if (!this.isEmptyInputs(siteId, firstName, lastName, email)) {
      if (AppUtil.isValidEmail(email)) {
        this.loading = true;
        setTimeout(() => {
          const user = new User();
          user.userId = AppUtil.getId();
          user.firstName = firstName;
          user.lastName = lastName;
          user.middleName = newUser.middleName;
          user.email = email;
          user.siteId = siteId;
          user.siteName = this.getSiteName(siteId);
          event.confirm.resolve(user);
          this.loading = false;
          this.showInformation(ToasterUtils.TOAST_TYPE.success, this.domain, 'User added!');
        }, 2000);
      } else {
        this.showInformation(ToasterUtils.TOAST_TYPE.warning, this.domain, 'Invalid email');
      }
    }
  }

  onEditConfirm(event): void {
    const newUser = event.newData;
    const siteId = newUser.siteName;
    const email = newUser.email;
    const firstName = newUser.firstName;
    const lastName = newUser.lastName;
    if (!this.isEmptyInputs(siteId, firstName, lastName, email)) {
      if (AppUtil.isValidEmail(email)) {
        this.loading = true;
        setTimeout(() => {
          // call service to update user
          newUser.siteId = newUser.siteName;
          newUser.siteName = this.getSiteName(newUser.siteName);
          event.confirm.resolve(newUser);
          this.loading = false;
          this.showInformation(ToasterUtils.TOAST_TYPE.success, this.domain, 'User updated!');
        }, 2000);
      } else {
        this.showInformation(ToasterUtils.TOAST_TYPE.warning, this.domain, 'Invalid email');
      }
    }

  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      // call service to delete user.
      event.confirm.resolve();
    } else {
      event.confirm.reject();
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

  private isEmptyInputs(siteId: string, firstName: string, lastName: string, email: string): boolean {
    if (siteId === '' || email === '' || firstName === '' || lastName === '') {
      if (siteId === '') this.showInformation(ToasterUtils.TOAST_TYPE.info, this.domain,
        'Site Name is required');
      if (email === '') this.showInformation(ToasterUtils.TOAST_TYPE.info, this.domain,
        'Email is required');
      if (firstName === '') this.showInformation(ToasterUtils.TOAST_TYPE.info, this.domain,
        'First Name is required');
      if (lastName === '') this.showInformation(ToasterUtils.TOAST_TYPE.info, this.domain,
        'Last Name is required');
      return true;
    } else return false;
  }
}
