import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditSubSectionComponent } from './add-edit-sub-section.component';

describe('AddEditSubSectionComponent', () => {
  let component: AddEditSubSectionComponent;
  let fixture: ComponentFixture<AddEditSubSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditSubSectionComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditSubSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
