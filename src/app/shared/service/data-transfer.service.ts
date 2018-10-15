/*
 * Copyright (c) 2018.
 * Author: caniksea.
 * Last Modified: 2018/10/15 10:45 AM
 */

import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Book} from '../../pages/bookui-admin/book-management/domain/book';

@Injectable({
  providedIn: 'root',
})
export class DataTransferService {

  private book = new BehaviorSubject(null);
  currentBook = this.book.asObservable();

  constructor() { }

  setBookId(book: Book) {
    this.book.next(book);
  }
}
