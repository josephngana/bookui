import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SERVICE_BASE_URL} from '../../../../conf/util';
import {Observable} from 'rxjs';
import {Section} from '../domain/section';
import {timeout} from 'rxjs/operators';
import {AppUtil} from '../../../../conf/app-util';

@Injectable({
  providedIn: 'root',
})
export class SectionService {

  private sectionURL = SERVICE_BASE_URL + 'books/site/';

  constructor(private http: HttpClient) { }

  getSectionsInChapter(chapterId: string): Observable<Section[]> {
    const url = this.sectionURL + 'sections/getall/' + chapterId;
    return this.http.get<Section[]>(url).pipe(
      timeout(10000),
    );
  }

  addSection(section: Section): Observable<Section> {
    const url = this.sectionURL + 'section/create';
    return this.http.post<Section>(url, section, AppUtil.getHttpHeaders()).pipe(
      timeout(10000),
    );
  }

  updateSection(section: Section): Observable<Section> {
    const url = this.sectionURL + 'section/update';
    return this.http.post<Section>(url, section, AppUtil.getHttpHeaders()).pipe(
      timeout(10000),
    );
  }

  deleteSection(section: Section): Observable<boolean> {
    const url = this.sectionURL + 'section/delete';
    return this.http.post<boolean>(url, section, AppUtil.getHttpHeaders()).pipe(
      timeout(10000),
    );
  }
}
