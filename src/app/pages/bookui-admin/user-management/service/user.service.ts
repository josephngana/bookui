/*
 * Copyright (c) 2018.
 * Author: caniksea.
 * Last Modified: 2018/10/06 6:24 PM
 */

import { Injectable } from '@angular/core';
import {SERVICE_BASE_URL} from '../../../../conf/util';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../domain/user';
import {timeout} from 'rxjs/operators';
import {AppUtil} from '../../../../conf/app-util';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private userUrl = SERVICE_BASE_URL + 'users/';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    const url = this.userUrl + 'getall';
    return this.http.get<User[]>(url).pipe(
      timeout(10000),
    );
  }

  saveUser(user: User): Observable<User> {
    const url = this.userUrl + 'create';
    return this.http.post<User>(url, user, AppUtil.getHttpHeaders()).pipe(
      timeout(10000),
    );
  }

  updateUser(user: User): Observable<User> {
    const url = this.userUrl + 'update';
    return this.http.post<User>(url, user, AppUtil.getHttpHeaders()).pipe(
      timeout(10000),
    );
  }

  deleteUser(user: User): Observable<User> {
    const url = this.userUrl + 'delete';
    return this.http.post<User>(url, user, AppUtil.getHttpHeaders()).pipe(
      timeout(10000),
    );
  }
}
