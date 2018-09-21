import { Component, OnInit } from '@angular/core';
import {Book} from '../domain/book';

@Component({
  selector: 'ngx-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
})
export class BooksComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
    this.doShow();
  }

  doShow() {
    const littleBlackBook = new Book();
    const littleWhiteBook = new Book();
    littleBlackBook.id = '1254147';
    littleWhiteBook.id = '8547859';
    console.log(littleBlackBook.id);
    console.log('this book was created at: ', littleBlackBook.dateCreated);
    console.log('this book was created at: ', littleWhiteBook.dateCreated);
  }

}
