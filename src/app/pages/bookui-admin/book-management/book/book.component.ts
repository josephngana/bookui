import { Component, OnInit } from '@angular/core';
import {Book} from '../domain/book';

@Component({
  selector: 'ngx-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
})
export class BookComponent implements OnInit {

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
