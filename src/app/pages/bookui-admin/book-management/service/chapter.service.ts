import { Injectable } from '@angular/core';
import {SERVICE_BASE_URL} from '../../../../conf/util';
import {HttpClient} from '@angular/common/http';
import {ErrorHandlerService, HandleError} from '../../../../shared/service/error-handler.service';
import {Chapter} from '../domain/chapter';
import {Observable} from 'rxjs';
import {AppUtil} from '../../../../conf/app-util';
import {catchError, timeout} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ChapterService {

  chapterUrl = SERVICE_BASE_URL + 'chapter/';
  private handleError: HandleError;
  constructor(private http: HttpClient,
              httpErrorHandler: ErrorHandlerService) {
    this.handleError = httpErrorHandler.createHandleError('ChapterService');
  }

  /**
   * Add Chapter
   */
  addChapter(chapter: Chapter): Observable<Chapter> {
    const url = this.chapterUrl + 'create';
    // const body = JSON.stingify(chapter);
    return this.http.post<Chapter>(url, chapter, AppUtil.getHttpHeaders())
      .pipe(
        // catchError(this.handleError('addChapter, chapter')),
      );
  }
  /**
   * Get Chapter
   */
  getChapters(): Observable<Chapter[]> {
    const url = this.chapterUrl + 'getall';
    return this.http.get<Chapter[]>(url).pipe(
      timeout(10000),
      // catchError(this.handleError('getChapters', [])),
    );
  }

  /**
   * delete chapter
   */
  deleteChapter(chapter: Chapter): Observable<Chapter> {
    const url = this.chapterUrl + 'delete';
    return this.http.post<Chapter>(url, chapter, AppUtil.getHttpHeaders()).pipe(
      // catchError(this.handleError('deleteChapter', chapter)),
    );
  }

  /**
   * update chapter
   */
  updateChapter(chapter: Chapter): Observable<Chapter> {
    const url = this.chapterUrl + 'update';
    return this.http.post<Chapter>(url, chapter, AppUtil.getHttpHeaders()).pipe(
      timeout(10000),
      // catchError(this.handleError('updateChapter', chapter)),
    );
  }
}

