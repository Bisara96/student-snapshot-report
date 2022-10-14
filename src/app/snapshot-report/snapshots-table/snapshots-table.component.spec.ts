import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnapshotsTableComponent } from './snapshots-table.component';

describe('SnapshotsTableComponent', () => {
  let component: SnapshotsTableComponent;
  let fixture: ComponentFixture<SnapshotsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SnapshotsTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SnapshotsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
