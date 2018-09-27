import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {Book} from "../../domain/book";
import {Chapter} from "../../domain/chapter";

@Component({
  selector: 'ngx-add-chapter',
  templateUrl: './add-chapter.component.html',
  styleUrls: ['./add-chapter.component.scss']
})
export class AddChapterComponent implements OnInit {

  private modalHeading: string;

  public addChapterForm: FormGroup;
  public chapters: AbstractControl;
  public author: AbstractControl;

  constructor(private builder: FormBuilder, private activeModal: NgbActiveModal) {
  }

  ngOnInit() {

    this.modalHeading = 'Book Management - Add New Chapter';
    this.addChapterForm = this.builder.group({
      'bookChapter': ['', Validators.required],
      'bookAuthor': ['', Validators.required],
    });

      this.bookChapter = this.addBookForm.controls['bookChapter'];
    this.bookAuthor = this.addBookForm.controls['bookAuthor'];
  }
}
  closeModal(): void {
    this.activeModal.close();
  }

  addChapter(entity, isValid: boolean): void {
    if (isValid) {
      console.log(entity);
      const book = new Book();
      book.chapters = entity.chapterChapter;
      book.author = entity.chapterAuthor;
      // call service to save book...if successful, call close with new book as below
      this.activeModal.close(book);
    }
  }
}


