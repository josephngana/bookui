import { Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {Section} from '../../domain/section';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AppUtil} from '../../../../../conf/app-util';

@Component({
  selector: 'ngx-add-edit-section',
  templateUrl: './add-edit-section.component.html',
  styleUrls: ['./add-edit-section.component.scss'],
})
export class AddEditSectionComponent implements OnInit {

  @Input() editSection: Section;
  @Input() header: string;

  public addSectionForm: FormGroup;
  public sectionTitle: AbstractControl;
  public sectionDescription: AbstractControl;
  public sectionStory: AbstractControl;
  constructor(private builder: FormBuilder, private activeModal: NgbActiveModal) { }

  ngOnInit() {
    this.addSectionForm = this.builder.group({
      'sectionTitle': ['', Validators.required],
      'sectionDescription': [''],
      'sectionStory': [''],
    });

    this.sectionTitle = this.addSectionForm.controls['sectionTitle'];
    this.sectionDescription = this.addSectionForm.controls['sectionDescription'];
    this.sectionStory = this.addSectionForm.controls['sectionStory'];

    if (this.editSection) {
      this.populateForm();
    }

  }

  closeModal(): void {
    this.activeModal.close();
  }
  addSection(entity, isValid: boolean): void {
    if (isValid) {
      const section = new Section();
      section.id = AppUtil.getId();
      section.title = entity.sectionTitle;
      section.story = entity.sectionStory;
      section.description = entity.sectionDescription;
      // call service to save section...if successful, call close with new section as below
      this.activeModal.close(section);
    }

  }
  private populateForm(): void {
    this.sectionTitle.setValue(this.editSection.title);
    this.sectionDescription.setValue(this.editSection.description);
    this.sectionStory.setValue(this.editSection.story);
  }

  onEditorChange(event): void {
    this.sectionStory.setValue(event);
  }

}
