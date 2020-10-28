import { TestBed } from '@angular/core/testing';

import { GetProposalsService } from './get-proposals.service';

describe('GetProposalsService', () => {
  let service: GetProposalsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetProposalsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
