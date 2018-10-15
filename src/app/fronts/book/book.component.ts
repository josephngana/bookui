import { Component, OnInit } from '@angular/core';
import {DataTransferService} from '../../shared/service/data-transfer.service';
import {Book} from '../../pages/bookui-admin/book-management/domain/book';

@Component({
  selector: 'ngx-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
})
export class BookComponent implements OnInit {

  book: Book;

  constructor(private dataTransferService: DataTransferService) { }

  ngOnInit() {
    this.dataTransferService.currentBook.subscribe( book => this.book = book );
    console.log(this.book);
  }

}
