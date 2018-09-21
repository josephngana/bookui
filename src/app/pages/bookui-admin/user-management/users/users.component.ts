import { Component, OnInit } from '@angular/core';
import {User} from '../domain/user';

@Component({
  selector: 'ngx-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {

  constructor() {
    this.doShow();
  }

  ngOnInit() {
  }

  doShow() {
    const u: User = new User();
    console.log(u.dateCreated);
  }

}
