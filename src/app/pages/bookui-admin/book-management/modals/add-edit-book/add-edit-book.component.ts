import { Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {Book} from '../../domain/book';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'ngx-add-book',
  templateUrl: './add-edit-book.component.html',
  styleUrls: ['./add-edit-book.component.scss'],
})
export class AddEditBookComponent implements OnInit {

  @Input() editBook: Book;
  @Input() header: string;

  public addBookForm: FormGroup;
  public bookTitle: AbstractControl;
  public bookAuthor: AbstractControl;
  public bookPublisher: AbstractControl;
  public bookIsbn: AbstractControl;
  public bookEisbn: AbstractControl;
  public bookDatePublished: AbstractControl;
  public bookDescription: AbstractControl;
  public bookStory: AbstractControl;

  constructor(private builder: FormBuilder, private activeModal: NgbActiveModal) {
  }

  ngOnInit() {
    this.addBookForm = this.builder.group({
      'bookTitle': ['', Validators.required],
      'bookAuthor': ['', Validators.required],
      'bookPublisher': ['', Validators.required],
      'bookIsbn': ['', Validators.required],
      'bookEisbn': ['', Validators.required],
      'bookDatePublished': ['', Validators.required],
      'bookDescription': [''],
      'bookStory': [''],
    });

    this.bookTitle = this.addBookForm.controls['bookTitle'];
    this.bookAuthor = this.addBookForm.controls['bookAuthor'];
    this.bookPublisher = this.addBookForm.controls['bookPublisher'];
    this.bookIsbn = this.addBookForm.controls['bookIsbn'];
    this.bookEisbn = this.addBookForm.controls['bookEisbn'];
    this.bookDatePublished = this.addBookForm.controls['bookEisbn'];
    this.bookDescription = this.addBookForm.controls['bookDescription'];
    this.bookStory = this.addBookForm.controls['bookStory'];

    if (this.editBook) {
      this.populateForm();
    }

  }

  closeModal(): void {
    this.activeModal.close();
  }

  addBook(entity, isValid: boolean): void {
    if (isValid) {
      console.log(entity.bookStory, entity);
      const book = new Book();
      book.story = entity.bookStory;
      book.datePublished = this.formatToDate(entity.bookDatePublished);
      book.eisbn = entity.bookEisbn;
      book.isbn = entity.bookIsbn;
      book.publisher = entity.bookPublisher;
      book.author = entity.bookAuthor;
      book.title = entity.bookTitle;
      book.story = entity.bookStory;
      book.description = entity.bookDescription;
      // call service to save book...if successful, call close with new book as below
      console.log(book.story);
      this.activeModal.close(book);
    }

  }

  private populateForm(): void {
    this.bookAuthor.setValue(this.editBook.author);
    this.bookDatePublished.setValue(this.formatToNgbDateStruct(this.editBook.datePublished));
    this.bookEisbn.setValue(this.editBook.eisbn);
    this.bookIsbn.setValue(this.editBook.isbn);
    this.bookTitle.setValue(this.editBook.title);
    this.bookAuthor.setValue(this.editBook.author);
    this.bookPublisher.setValue(this.editBook.publisher);
    this.bookDescription.setValue(this.editBook.description);
    this.bookStory.setValue(this.editBook.story);
  }

  onEditorChange(event): void {
    this.bookStory.setValue(event);
  }

  setMaxDate(): NgbDateStruct {
    const today = new Date();
    const maxDate: NgbDateStruct = {
      day: today.getDate(),
      month: today.getMonth() + 1,
      year: today.getFullYear(),
    };
    return maxDate;
  }

  onDateSelect(event): void {
    console.log(event);
  }

  private formatToDate(date: NgbDateStruct): Date {
    const dateString = date.year + '-' + date.month + '-' + date.day;
    return new Date(dateString);
  }

  private formatToNgbDateStruct(date: Date): NgbDateStruct {
    const dateStruct: NgbDateStruct = {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
    };
    console.log(dateStruct);
    return dateStruct;
  }

}
