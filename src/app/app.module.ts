import { MaterialsModule } from './materials/materials.module';
import { SnapshotReportModule } from './snapshot-report/snapshot-report.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialsModule,
    MatTableModule,
    SnapshotReportModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
