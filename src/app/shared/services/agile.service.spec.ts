import { TestBed } from '@angular/core/testing';

import { AgileService } from './agile.service';

describe('AgileService', () => {
  let service: AgileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
