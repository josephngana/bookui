import {Component, OnInit} from '@angular/core';
import {DataTransferService} from '../../shared/service/data-transfer.service';
import {Book} from '../../pages/bookui-admin/book-management/domain/book';
import {ToasterUtils} from '../../conf/util';
import {Toast, ToasterConfig, ToasterService} from 'angular2-toaster';
import {AppUtil} from '../../conf/app-util';

import 'style-loader!angular2-toaster/toaster.css';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'ngx-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
})
export class BookComponent implements OnInit {

  book: Book;
  toasterConfig: ToasterConfig;
  static toasterService: ToasterService;

  constructor(private dataTransferService: DataTransferService,
              toasterService: ToasterService,
              private activatedRouterService: ActivatedRoute,
              ) {
    BookComponent.toasterService = toasterService;
  }

  ngOnInit() {
    this.toasterConfig = ToasterUtils.TOASTER_CONFIG;
    this.dataTransferService.currentBook.subscribe(book => this.book = book);
    console.log(this.book);
    // this.activatedRouterService.data.subscribe( data => {
    //   switch (data.domain) {
    //     default: console.log(data);
    //   }
    // });
    this.activatedRouterService.params.subscribe( params => {
      console.log(params);
    });
  }

  /**
   * Shows toast on screen
   * @param type: string
   * @param title: string
   * @param info: string
   */
  static showInformation(type: string, title: string, info: string): void {
    // BookComponent.tc = ToasterUtils.TOASTER_CONFIG;
    const toast: Toast = AppUtil.makeToast(type, title, info);
    BookComponent.toasterService.popAsync(toast);
  }

}
