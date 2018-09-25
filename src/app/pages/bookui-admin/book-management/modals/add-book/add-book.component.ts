import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Book} from '../../domain/book';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'ngx-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss'],
})
export class AddBookComponent implements OnInit {

  private modalHeading: string;

  public addBookForm: FormGroup;
  public bookTitle: AbstractControl;
  public bookAuthor: AbstractControl;

  constructor(private builder: FormBuilder, private activeModal: NgbActiveModal) {
  }

  ngOnInit() {
    this.modalHeading = 'Book Management - Add New Book';
    this.addBookForm = this.builder.group({
      'bookTitle': ['', Validators.required],
      'bookAuthor': ['', Validators.required],
    });

    this.bookTitle = this.addBookForm.controls['bookTitle'];
    this.bookAuthor = this.addBookForm.controls['bookAuthor'];
  }

  closeModal(): void {
    this.activeModal.close();
  }

  addBook(entity, isValid: boolean): void {
    if (isValid) {
      console.log(entity);
      const book = new Book();
      book.author = entity.bookAuthor;
      book.title = entity.bookTitle;
      // call service to save book...if successful, call close with new book as below
      this.activeModal.close(book);
    }

  }
}
