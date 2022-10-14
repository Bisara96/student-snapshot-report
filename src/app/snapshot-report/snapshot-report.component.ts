import { SnapshotDataService } from './services/snapshot-data.service';
import { SnapshotReportService } from './services/snapshot-report.service';
import { Component, OnInit } from '@angular/core';
import { combineLatestWith, filter, map, tap } from 'rxjs/operators';
import { Snapshot, SnapshotViewModel } from './models/snapshot.model';

@Component({
  selector: 'app-snapshot-report',
  templateUrl: './snapshot-report.component.html',
  styleUrls: ['./snapshot-report.component.scss']
})
export class SnapshotReportComponent implements OnInit {

  snapshotViewData: SnapshotViewModel[] = [];

  constructor(private snapshotReportService: SnapshotReportService, private snapshotDataService: SnapshotDataService) { }

  ngOnInit(): void {
    this.snapshotDataService.filterChange$.pipe(
      combineLatestWith(this.snapshotReportService.getStudentSnapshots()),
      filter(([filterModel, response]) => response && !!response.body),
      map(([filterModel, response]) => [filterModel, JSON.parse(response.body)]),
      // tap(([filterModel, snapshotData]) => console.log(filterModel, snapshotData)),
      map(([filterModel, snapshotData]) => this.snapshotDataService.getSnapshotViewData(snapshotData, filterModel)),
      // tap(snapshotViewData => console.log(snapshotViewData)),
    ).subscribe((snapshotViewData: SnapshotViewModel[]) => {
      this.snapshotViewData = snapshotViewData;
    });
  }

}
