import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnapshotVisualizationsComponent } from './snapshot-visualizations.component';

describe('SnapshotVisualizationsComponent', () => {
  let component: SnapshotVisualizationsComponent;
  let fixture: ComponentFixture<SnapshotVisualizationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SnapshotVisualizationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SnapshotVisualizationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
