import { TestBed } from '@angular/core/testing';

import { SpectateService } from './spectate.service';

describe('SpectateService', () => {
  let service: SpectateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpectateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
