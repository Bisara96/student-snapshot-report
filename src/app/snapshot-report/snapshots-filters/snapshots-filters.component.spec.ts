import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnapshotsFiltersComponent } from './snapshots-filters.component';

describe('SnapshotsFiltersComponent', () => {
  let component: SnapshotsFiltersComponent;
  let fixture: ComponentFixture<SnapshotsFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SnapshotsFiltersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SnapshotsFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
