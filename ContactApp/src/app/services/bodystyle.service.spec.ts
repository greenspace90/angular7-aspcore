import { TestBed } from '@angular/core/testing';

import { BodystyleService } from './bodystyle.service';

describe('BodystyleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BodystyleService = TestBed.get(BodystyleService);
    expect(service).toBeTruthy();
  });
});
