import {Component, OnInit} from '@angular/core';
import {Site} from '../domain/site';
import {LocalDataSource} from 'ng2-smart-table';
import {DatePipe} from '@angular/common';
import {AppUtil} from '../../../../conf/app-util';
import {BodyOutputType, Toast, ToasterConfig, ToasterService} from 'angular2-toaster';
import {ToasterUtils} from '../../../../conf/util';
import {SiteService} from '../service/site.service';

@Component({
  selector: 'ngx-sites',
  templateUrl: './sites.component.html',
  styleUrls: ['./sites.component.scss'],
  providers: [SiteService],
})
export class SitesComponent implements OnInit {


  sites: Site[];
  source: LocalDataSource;
  loading: boolean;


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
    noDataMessage: 'No sites',
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
          return new DatePipe('en-En').transform(date, 'yyyy-MM-dd');
        },
      },
    },
  };

  constructor(toasterService: ToasterService, private siteService: SiteService) {
    this.toasterService = toasterService;
  }

  ngOnInit() {
    this.sites = [];
    this.getSites();
    this.source = new LocalDataSource(this.sites);
  }

  private getSites(): void {
    this.loading = true;
    this.siteService.getSites().subscribe(sites => {
        console.log(sites);
        if (this.sites) {
          this.sites = sites;
          this.source = new LocalDataSource(this.sites);
        } else {
          this.showInformation(ToasterUtils.TOAST_TYPE.warning, 'Site', 'Could not retrieve sites!');
        }
      },
      error => {
        this.loading = false;
        this.showInformation(ToasterUtils.TOAST_TYPE.error, 'Site', 'An error occurred: ' + error.message);
      },
      () => {
        this.loading = false;
      });
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      this.loading = true;
      this.siteService.deleteSite(event.data).subscribe(site => {
          if (site) {
            this.showInformation(ToasterUtils.TOAST_TYPE.success, 'Site', 'Site deleted!');
            event.confirm.resolve();
          } else {
            this.showInformation(ToasterUtils.TOAST_TYPE.warning, 'Site', 'Site NOT deleted!');
            event.confirm.reject();
          }
        },
        error => {
          this.loading = false;
          this.showInformation(ToasterUtils.TOAST_TYPE.error, 'Site', 'An error occurred: ' + error.message);
        },
        () => {
          this.loading = false;
        });
    } else {
      event.confirm.reject();
    }

  }

  onCreateConfirm(event): void {
    const newSite = event.newData;
    const siteName = newSite.siteName;
    console.log(newSite, siteName);
    if (siteName === '') {
      this.showInformation(ToasterUtils.TOAST_TYPE.info, 'Site', 'Site name is required!');
    } else {
      const site = new Site();
      site.motsepeSiteId = AppUtil.getId();
      site.siteName = siteName;
      site.siteDescription = newSite.siteDescription;
      this.loading = true;
      this.siteService.saveSite(site).subscribe(s => {
          if (s) {
            this.showInformation(ToasterUtils.TOAST_TYPE.success, 'Site', 'Site added!');
            event.confirm.resolve(s);
          } else {
            this.showInformation(ToasterUtils.TOAST_TYPE.warning, 'Site', 'Site NOT added!');
            event.confirm.reject();
          }
        },
        error => {
          this.loading = false;
          this.showInformation(ToasterUtils.TOAST_TYPE.error, 'Site', 'An error occurred: ' + error.message);
        },
        () => {
          this.loading = false;
        });
    }
  }

  onEditConfirm(event): void {
    const newSite = event.newData;
    this.loading = true;
    this.siteService.updateSite(newSite).subscribe( site => {
      if (site) {
        this.showInformation(ToasterUtils.TOAST_TYPE.success, 'Site', 'Site updated!');
        event.confirm.resolve(site);
      } else {
        this.showInformation(ToasterUtils.TOAST_TYPE.warning, 'Site', 'Site NOT updated!');
        event.confirm.reject();
      }
    },
      error => {
        this.loading = false;
        this.showInformation(ToasterUtils.TOAST_TYPE.error, 'Site', 'An error occurred: ' + error.message);
      },
      () => {
        this.loading = false;
      });
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
