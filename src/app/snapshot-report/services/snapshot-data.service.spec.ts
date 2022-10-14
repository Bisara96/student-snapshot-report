import { TestBed } from '@angular/core/testing';

import { SnapshotDataService } from './snapshot-data.service';

describe('SnapshotDataService', () => {
  let service: SnapshotDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SnapshotDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
