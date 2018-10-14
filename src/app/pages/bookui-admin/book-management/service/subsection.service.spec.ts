import { TestBed } from '@angular/core/testing';

import { SubsectionService } from './subsection.service';

describe('SubsectionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SubsectionService = TestBed.get(SubsectionService);
    expect(service).toBeTruthy();
  });
});
