import { TestBed } from '@angular/core/testing';

import { PostProposalService } from './post-proposal.service';

describe('PostProposalService', () => {
  let service: PostProposalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostProposalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
