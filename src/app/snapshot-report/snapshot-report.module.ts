import { MaterialsModule } from './../materials/materials.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SnapshotsTableComponent } from './snapshots-table/snapshots-table.component';
import { SnapshotReportComponent } from './snapshot-report.component';
import { SnapshotsFiltersComponent } from './snapshots-filters/snapshots-filters.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ResultHighlighterDirective } from './snapshots-table/result-highlighter.directive';



@NgModule({
  declarations: [
    SnapshotReportComponent,
    SnapshotsTableComponent,
    SnapshotsFiltersComponent,
    ResultHighlighterDirective
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialsModule,
    HttpClientModule
  ]
})
export class SnapshotReportModule { }
