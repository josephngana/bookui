import { Injectable } from '@angular/core';
import {SERVICE_BASE_URL} from '../../../../conf/util';
import {HttpClient} from '@angular/common/http';
import {Site} from '../domain/site';
import {Observable} from 'rxjs';
import {AppUtil} from '../../../../conf/app-util';
import {timeout} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SiteService {

  siteUrl = SERVICE_BASE_URL + 'sites/';

  constructor(private http: HttpClient) { }

  getSites(): Observable<Site[]> {
    const url = this.siteUrl + 'getall';
    return this.http.get<Site[]>(url).pipe();
  }

  saveSite(site: Site): Observable<Site> {
    const url = this.siteUrl + 'create';
    return this.http.post<Site>(url, site, AppUtil.getHttpHeaders()).pipe();
  }

  updateSite(site: Site): Observable<Site> {
    const url = this.siteUrl + 'update';
    return this.http.post<Site>(url, site, AppUtil.getHttpHeaders()).pipe();
  }

  deleteSite(site: Site): Observable<Site> {
    const url = this.siteUrl + 'delete';
    return this.http.post<Site>(url, site, AppUtil.getHttpHeaders()).pipe();
  }
}
