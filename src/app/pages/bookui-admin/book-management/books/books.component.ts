import { Component, OnInit } from '@angular/core';
import {Book} from '../domain/book';

@Component({
  selector: 'ngx-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
})
export class BooksComponent implements OnInit {

  constructor() {
    this.doShow();
  }

  ngOnInit() {
  }

  doShow() {
    const book = new Book();
    book.id = '90980980989';
    console.log(book.id);
  }

}
