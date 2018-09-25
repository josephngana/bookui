import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngx-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss'],
})
export class AddBookComponent implements OnInit {

  private modalHeading: string;
  content: string;

  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit() {
    this.content = 'Add some form here...So you are sure.';
    this.modalHeading = 'Book Management - Add New Book';
  }

  closeModal(): void {
    this.activeModal.close();
  }

}
