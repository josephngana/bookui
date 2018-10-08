import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Chapter} from '../../domain/chapter';
import {AppUtil} from '../../../../../conf/app-util';

@Component({
  selector: 'ngx-add-edit-chapter',
  templateUrl: './add-edit-chapter.component.html',
  styleUrls: ['./add-edit-chapter.component.scss'],
})
export class AddEditChapterComponent implements OnInit {
  @Input() editChapter: Chapter;
  @Input() header: string;
  public addChapterForm: FormGroup;
  public chapterTitle: AbstractControl;
  public chapterDescription: AbstractControl;
  public chapterStory: AbstractControl;
  constructor(private builder: FormBuilder, private activeModal: NgbActiveModal) {
  }
  ngOnInit() {
    this.addChapterForm = this.builder.group({
      'chapterTitle': ['', Validators.required],
      'chapterDescription': [''],
      'chapterStory': [''],
    });
    this.chapterTitle = this.addChapterForm.controls['chapterTitle'];
    this.chapterDescription = this.addChapterForm.controls['chapterDescription'];
    this.chapterStory = this.addChapterForm.controls['chapterStory'];
    if (this.editChapter) {
      this.populateForm();
    }
  }
  closeModal(): void {
    this.activeModal.close();
  }
  addChapter(entity, isValid: boolean): void {
    if (isValid) {
      const chapter = new Chapter();
      chapter.id = AppUtil.getId();
      chapter.title = entity.chapterTitle;
      chapter.description = entity.chapterDescription;
      chapter.story = entity.chapterStory;
      // call service to save book...if successful, call close with new book as below
      this.activeModal.close(chapter);
    }
  }
  private populateForm(): void {
    this.chapterTitle.setValue(this.editChapter.title);
    this.chapterDescription.setValue(this.editChapter.description);
    this.chapterStory.setValue(this.editChapter.story);
  }
  onEditorChange(event): void {
    this.chapterStory.setValue(event);
  }
}
