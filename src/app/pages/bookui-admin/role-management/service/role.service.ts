import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Role} from '../domain/role';
import {Observable} from 'rxjs';
import {SERVICE_BASE_URL} from '../../../../conf/util';
import {AppUtil} from '../../../../conf/app-util';
import {catchError, map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RoleService {

  constructor(private http: HttpClient) { }

  public addRole(role: Role): Observable<Role> {
    const url = SERVICE_BASE_URL + 'roles/create';
    const body = JSON.stringify(role);
    return this.http.post<Role>(url, role, AppUtil.getHttpHeaders())
      .pipe();
  }

  getRoles(): Observable<Role[]> {
    const url = SERVICE_BASE_URL + 'roles/getall';
    console.log("calling: ", url);
    return this.http.get<Role[]>(url).pipe(
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof  ErrorEvent) {

    } else {
      console.error(`Error Code: ${error.status}, Error: ${error.error}`);
    }
  }
}
