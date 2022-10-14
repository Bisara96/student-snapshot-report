import { TestBed } from '@angular/core/testing';

import { SnapshotReportService } from './snapshot-report.service';

describe('SnapshotReportService', () => {
  let service: SnapshotReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SnapshotReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
