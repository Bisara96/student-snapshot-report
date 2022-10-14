import { SnapshotViewModel } from './../../models/snapshot.model';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { SnapshotDataService } from '../../services/snapshot-data.service';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnChanges {

  @Input() snapShotData: SnapshotViewModel[] = [];

  chartData = {
    "name": "",
    "series": [
      {
        "name": "Excelent",
        "value": 10
      },
      {
        "name": "Good",
        "value": 30
      },
      {
        "name": "Ok",
        "value": 40
      },
      {
        "name": "Terrible",
        "value": 20
      }
    ]
  };

  view: [number, number] = [800, 200];

  colorScheme: any = {
    domain: ['grey', '#dd2c00', '#ff6d00', '#ffab00', '#76ff03']
  };

  constructor(private snapshotDataService: SnapshotDataService) { }

  ngOnChanges(changes: SimpleChanges): void {
    const data: any = this.snapshotDataService.groupSnapshotsByResultLevels(changes['snapShotData'].currentValue);
    this.chartData = {...this.chartData, series: [
      {
        name: 'Unassigned',
        value: data.unassigned
      },
      {
        name: 'Weak',
        value: data.weak
      },
      {
        name: 'Ok',
        value: data.ok
      },
      {
        name: 'Good',
        value: data.good
      },
      {
        name: 'Excellent',
        value: data.excellent
      },

    ]}
  }

}
