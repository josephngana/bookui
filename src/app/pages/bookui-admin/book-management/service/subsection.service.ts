import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SERVICE_BASE_URL} from '../../../../conf/util';
import {Observable} from 'rxjs';
import {SubSection} from '../domain/sub-section';
import {timeout} from 'rxjs/operators';
import {AppUtil} from '../../../../conf/app-util';

@Injectable({
  providedIn: 'root',
})
export class SubsectionService {

  private subsectionURL = SERVICE_BASE_URL + 'books/site/';

  constructor(private http: HttpClient) { }

  getSubsectionsInSection(sectionId: string): Observable<SubSection[]> {
    const url = this.subsectionURL + 'subsections/getall/' + sectionId;
    return this.http.get<SubSection[]>(url).pipe(
      timeout(10000),
    );
  }

  addSubsection(subsection: SubSection): Observable<SubSection> {
    const url = this.subsectionURL + 'subsection/create';
    return this.http.post<SubSection>(url, subsection, AppUtil.getHttpHeaders()).pipe(
      timeout(10000),
    );
  }

  updateSubsection(subsection: SubSection): Observable<SubSection> {
    const url = this.subsectionURL + 'subsection/update';
    return this.http.post<SubSection>(url, subsection, AppUtil.getHttpHeaders()).pipe(
      timeout(10000),
    );
  }

  deleteSubsection(subsection: SubSection): Observable<boolean> {
    const url = this.subsectionURL + 'subsection/delete';
    return this.http.post<boolean>(url, subsection, AppUtil.getHttpHeaders()).pipe(
      timeout(10000),
    );
  }
}
