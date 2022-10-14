import { AfterViewInit, Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SnapshotViewModel } from './../models/snapshot.model';
import { SnapshotDataService } from './../services/snapshot-data.service';

@Component({
  selector: 'app-snapshots-table',
  templateUrl: './snapshots-table.component.html',
  styleUrls: ['./snapshots-table.component.scss']
})
export class SnapshotsTableComponent implements OnChanges, AfterViewInit {

  displayedColumns: string[] = ['dateCompleted', 'content', 'type', 'skill', 'result'];
  dataSource = new MatTableDataSource<SnapshotViewModel>();

  @Input() tableData: SnapshotViewModel[] = [];

  constructor(private snapshotDataService: SnapshotDataService) {}

  @ViewChild(MatSort) sort!: MatSort;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnChanges(changes: SimpleChanges): void {
    if (this.dataSource) {
      this.initializeDataSource(changes['tableData'].currentValue);
    }
  }

  ngAfterViewInit() {
    this.initializeDataSource(this.tableData);
  }

  initializeDataSource(data: SnapshotViewModel[]) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

}
