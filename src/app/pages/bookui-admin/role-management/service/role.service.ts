/*
 * Copyright (c) 2018.
 * Author: caniksea.
 * Last Modified: 2018/10/03 3:51 PM
 */

import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Role} from '../domain/role';
import {Observable} from 'rxjs';
import {SERVICE_BASE_URL} from '../../../../conf/util';
import {AppUtil} from '../../../../conf/app-util';
import {catchError, timeout} from 'rxjs/operators';
import {ErrorHandlerService, HandleError} from '../../../../shared/service/error-handler.service';

@Injectable({
  providedIn: 'root',
})
export class RoleService {

  roleUrl = SERVICE_BASE_URL + 'roles/';
  private handleError: HandleError;

  constructor(private http: HttpClient,
              httpErrorHandler: ErrorHandlerService) {
    this.handleError = httpErrorHandler.createHandleError('RoleService');
  }

  /**
   * Add role
   * @param role
   */
  addRole(role: Role): Observable<Role> {
    const url = this.roleUrl + 'create';
    // const body = JSON.stringify(role);
    return this.http.post<Role>(url, role, AppUtil.getHttpHeaders())
      .pipe(
        catchError(this.handleError('addRole', role)),
      );
  }

  /**
   * Get roles
   */
  getRoles(): Observable<Role[]> {
    const url = this.roleUrl + 'getall';
    return this.http.get<Role[]>(url).pipe(
      catchError(this.handleError('getRoles', [])),
      timeout(10000),
    );
  }

  /**
   * delete role
   * @param role
   */
  deleteRole(role: Role): Observable<Role> {
    const url = this.roleUrl + 'delete';
    return this.http.post<Role>(url, role, AppUtil.getHttpHeaders()).pipe(
      catchError(this.handleError('deleteRole', role)),
    );
  }

  /**
   * update a role
   * @param role
   */
  updateRole(role: Role): Observable<Role> {
    const url = this.roleUrl + 'update';
    return this.http.post<Role>(url, role, AppUtil.getHttpHeaders()).pipe(
      catchError(this.handleError('updateRole', role)),
    );
  }
}
