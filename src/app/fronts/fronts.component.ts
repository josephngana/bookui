import { Component, OnInit } from '@angular/core';
import {NbMenuItem} from '@nebular/theme';
import {MENU_ITEMS} from './fronts-menu';

@Component({
  selector: 'ngx-fronts',
  templateUrl: './fronts.component.html',
})
export class FrontsComponent implements OnInit {

  menu: NbMenuItem[];

  constructor() { }

  ngOnInit() {
    this.menu = MENU_ITEMS;
  }

}
