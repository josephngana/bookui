import { Component, Input, OnInit } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {SubSection} from '../../domain/sub-section';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AppUtil} from '../../../../../conf/app-util';

@Component({
  selector: 'ngx-add-edit-subsection',
  templateUrl: './add-edit-subsection.component.html',
  styleUrls: ['./add-edit-subsection.component.scss'],
})
export class AddEditSubsectionComponent implements OnInit {

  @Input() editSubSection: SubSection;
  @Input() header: string;
  public addSubSectionForm: FormGroup;
  public subsectionTitle: AbstractControl;
  public subsectionDescription: AbstractControl;
  public subsectionStory: AbstractControl;
  constructor(private builder: FormBuilder, private activeModal: NgbActiveModal) { }

  /**
   * working on the ngOnInit
   */

  ngOnInit() {
    this.addSubSectionForm = this.builder.group({
     'subsectionTitle': ['', Validators.required],
     'subsectionDescription': [''],
     'subsectionStory': [''],
    });
    this.subsectionTitle = this.addSubSectionForm.controls['subsectionTitle'];
    this.subsectionDescription = this.addSubSectionForm.controls['subsectionDescription'];
    this.subsectionStory = this.addSubSectionForm.controls['subsectionStory'];
    if (this.editSubSection) {
      this.populateForm();
    }
  }
  closeModal(): void {
    this.activeModal.close();
  }
  addSubSection(entity, isValid: boolean): void {
    if (isValid) {
      const subsection = new SubSection();
      subsection.id = AppUtil.getId();
      subsection.title = entity.subsectionTitle;
      subsection.story = entity.subsectionStory;
      subsection.description = entity.subsectionDescription;
      this.activeModal.close(subsection);
    }
  }
  private populateForm(): void {
    this.subsectionTitle.setValue(this.editSubSection.title);
    this.subsectionDescription.setValue(this.editSubSection.description);
    this.subsectionStory.setValue(this.editSubSection.story);
  }
  onEditorChange(event): void {
    this.subsectionStory.setValue(event);
  }

}
