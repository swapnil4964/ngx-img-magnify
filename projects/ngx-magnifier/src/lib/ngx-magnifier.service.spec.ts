import { TestBed } from '@angular/core/testing';

import { NgxMagnifierService } from './ngx-magnifier.service';

describe('NgxMagnifierService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgxMagnifierService = TestBed.get(NgxMagnifierService);
    expect(service).toBeTruthy();
  });
});
