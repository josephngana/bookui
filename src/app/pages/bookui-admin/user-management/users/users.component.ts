/*
 * Copyright (c) 2018.
 * Author: caniksea.
 * Last Modified: 2018/10/06 7:01 PM
 */

import {Component, OnInit} from '@angular/core';
import {User} from '../domain/user';
import {LocalDataSource} from 'ng2-smart-table';
import {AppUtil} from '../../../../conf/app-util';
import {DatePipe} from '@angular/common';
import {Site} from '../../site-management/domain/site';
import {BodyOutputType, Toast, ToasterConfig, ToasterService} from 'angular2-toaster';
import {ToasterUtils} from '../../../../conf/util';
import {SiteService} from '../../site-management/service/site.service';
import {UserService} from '../service/user.service';

import 'style-loader!angular2-toaster/toaster.css';

@Component({
  selector: 'ngx-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  providers: [SiteService, UserService],
})
export class UsersComponent implements OnInit {

  private readonly domain: string = 'User';
  loading: boolean;
  source: LocalDataSource;
  users: User[];
  sites: Site[];
  toasterConfig: ToasterConfig;

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
  };

  mySettings = {
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
      siteId: {
        title: 'Site Name',
        type: 'html',
        editor: {
          type: 'list',
          config: {
            selectText: 'Select Site',
            list: [],
          },
        },
        valuePrepareFunction: (siteId) => {
          return this.getSiteName(siteId);
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
        // width: '10%',
      },
    },
    pager: {
      perPage: 10,
    },
  };

  constructor(private toasterService: ToasterService,
              private siteService: SiteService,
              private userService: UserService,
  ) {
  }

  ngOnInit() {
    this.getSites();
  }

  /**
   * get sites
   */
  private getSites(): void {
    this.loading = true;
    this.siteService.getSites().subscribe(sites => {
        this.sites = [];
        if (sites) {
          this.sites = sites;
          const siteDropdown = this.populateSiteDropDown();

          this.mySettings.columns.siteId.editor.config.list = siteDropdown;
          this.settings = Object.assign({}, this.mySettings);
        } else {
          this.showInformation(ToasterUtils.TOAST_TYPE.warning, this.domain, 'Could not retrieve sites!');
        }
      },
      error => {
        this.loading = false;
        this.showInformation(ToasterUtils.TOAST_TYPE.error, this.domain, 'An error occurred: ' + error.message);
      },
      () => {
        this.loading = false;
        this.getUsers();
      });
  }

  /**
   * get users
   */
  private getUsers(): void {
    this.loading = true;
    this.userService.getUsers().subscribe(users => {
        this.users = [];
        if (users) {
          this.users = users;
          this.source = new LocalDataSource(this.users);
        } else {
          this.showInformation(ToasterUtils.TOAST_TYPE.warning, this.domain, 'Could not retrieve users!');
        }
      },
      error => {
        this.loading = false;
        this.showInformation(ToasterUtils.TOAST_TYPE.error, this.domain, 'An error occurred: ' + error.message);
      },
      () => {
        this.loading = false;
      });
  }

  /**
   * Populate site dropdown
   */
  private populateSiteDropDown(): object[] {
    const data = [];
    this.sites.forEach(site => {
      data.push({
        value: site.siteId,
        title: site.siteName,
      });
    });
    return data;
  }

  /**
   * Get site name given site id
   * @param id
   */
  private getSiteName(id: string): string {
    let siteName = '';
    const site = this.sites.find(s => s.siteId === id);
    if (site) siteName = site.siteName;
    return siteName;
  }

  /**
   * create a user
   * @param event
   */
  onCreateConfirm(event): void {
    const newUser = event.newData;
    const siteId = newUser.siteId;
    const email = newUser.email;
    const firstName = newUser.firstName;
    const lastName = newUser.lastName;
    if (!this.isEmptyInputs(siteId, firstName, lastName, email)) {
      if (AppUtil.isValidEmail(email)) {
        this.loading = true;
        const user = this.buildUser(newUser);
        this.userService.saveUser(user).subscribe(u => {
            if (u) {
              event.confirm.resolve(u);
              this.showInformation(ToasterUtils.TOAST_TYPE.success, this.domain, 'User added!');
            } else {
              event.confirm.reject();
              this.showInformation(ToasterUtils.TOAST_TYPE.warning, this.domain, 'User NOT added!');
            }
          },
          error => {
            this.loading = false;
            this.showInformation(ToasterUtils.TOAST_TYPE.error, this.domain, 'An error occurred: ' + error.message);
          },
          () => {
            this.loading = false;
          });
      } else {
        this.showInformation(ToasterUtils.TOAST_TYPE.warning, this.domain, 'Invalid email');
      }
    }
  }

  /**
   * factory method for user
   * @param newUser
   */
  private buildUser(newUser: any): User {
    const user = new User();
    user.userId = AppUtil.getId();
    user.firstName = newUser.firstName;
    user.lastName = newUser.lastName;
    user.middleName = newUser.middleName;
    user.email = newUser.email;
    user.siteId = newUser.siteId;
    return user;
  }

  /**
   * confirm edit/update of user
   * @param event
   */
  onEditConfirm(event): void {
    const editedUser = event.newData;
    const siteId = editedUser.siteId;
    const email = editedUser.email;
    const firstName = editedUser.firstName;
    const lastName = editedUser.lastName;
    if (!this.isEmptyInputs(siteId, firstName, lastName, email)) {
      if (AppUtil.isValidEmail(email)) {
        this.loading = true;
        this.userService.updateUser(editedUser).subscribe(user => {
            if (user) {
              event.confirm.resolve(user);
              this.showInformation(ToasterUtils.TOAST_TYPE.success, this.domain, 'User updated!');
            } else {
              event.confirm.reject();
              this.showInformation(ToasterUtils.TOAST_TYPE.warning, this.domain, 'User NOT updated!');
            }
          },
          error => {
            this.loading = false;
            this.showInformation(ToasterUtils.TOAST_TYPE.error, this.domain, 'An error occurred: ' + error.message);
          },
          () => {
            this.loading = false;
          });
      } else {
        this.showInformation(ToasterUtils.TOAST_TYPE.warning, this.domain, 'Invalid email');
      }
    }

  }

  /**
   * confirm delete of user
   * @param event
   */
  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      this.loading = true;
      this.userService.deleteUser(event.data).subscribe(u => {
          if (u) {
            event.confirm.resolve();
            this.showInformation(ToasterUtils.TOAST_TYPE.success, this.domain, 'User deleted!');
          } else {
            event.confirm.reject();
            this.showInformation(ToasterUtils.TOAST_TYPE.warning, this.domain, 'User NOT deleted!');
          }
        },
        error => {
          this.loading = false;
          this.showInformation(ToasterUtils.TOAST_TYPE.error, this.domain, 'An error occurred: ' + error.message);
        },
        () => {
          this.loading = false;
        });
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
    this.toasterConfig = ToasterUtils.TOASTER_CONFIG;
    const toast: Toast = AppUtil.makeToast(type, title, info);
    this.toasterService.popAsync(toast);
  }

  /**
   * Check if params are empty
   * @param siteId
   * @param firstName
   * @param lastName
   * @param email
   */
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
