import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditSubsectionComponent } from './add-edit-sub-section.component';

describe('AddEditSubSectionComponent', () => {
  let component: AddEditSubsectionComponent;
  let fixture: ComponentFixture<AddEditSubsectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditSubsectionComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditSubsectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
