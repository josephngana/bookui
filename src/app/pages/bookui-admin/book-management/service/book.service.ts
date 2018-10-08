import { Injectable } from '@angular/core';
import {SERVICE_BASE_URL} from '../../../../conf/util';
import {ErrorHandlerService, HandleError} from '../../../../shared/service/error-handler.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Book} from '../domain/book';
import {timeout} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BookService {

  bookUrl = SERVICE_BASE_URL + 'books/';
  private handleError: HandleError;

  constructor(private http: HttpClient,
              httpErrorHandler: ErrorHandlerService) {
    this.handleError = httpErrorHandler.createHandleError('BookService');
  }

  /**
   * Get Books
   */
  getBooks(): Observable<Book[]> {
    const url = this.bookUrl + 'getall';
    return this.http.get<Book[]>(url).pipe(
      timeout( 10000),
    );
}
}
