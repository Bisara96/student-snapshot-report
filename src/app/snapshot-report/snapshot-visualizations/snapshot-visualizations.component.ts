import { SnapshotViewModel } from './../models/snapshot.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-snapshot-visualizations',
  templateUrl: './snapshot-visualizations.component.html',
  styleUrls: ['./snapshot-visualizations.component.scss']
})
export class SnapshotVisualizationsComponent implements OnInit {

  @Input() snapShotData: SnapshotViewModel[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
