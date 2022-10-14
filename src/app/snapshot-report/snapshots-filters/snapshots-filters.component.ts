import { SnapshotReportService } from './../services/snapshot-report.service';
import { SnapshotDataService } from './../services/snapshot-data.service';
import { IClass } from './../models/class.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-snapshots-filters',
  templateUrl: './snapshots-filters.component.html',
  styleUrls: ['./snapshots-filters.component.scss']
})
export class SnapshotsFiltersComponent implements OnInit {

  classes: IClass[] = [];

  filterFormGroup: FormGroup;

  students: string[] = [];

  get classControl(): FormControl {
    return this.filterFormGroup.get('classControl') as FormControl;
  }

  get studentControl(): FormControl {
    return this.filterFormGroup.get('studentControl') as FormControl;
  }

  get dateRangeStartCtrl(): FormControl {
    return this.filterFormGroup.get('dateRangeStartCtrl') as FormControl;
  }

  get dateRangeEndCtrl(): FormControl {
    return this.filterFormGroup.get('dateRangeEndCtrl') as FormControl;
  }

  constructor(private snapshotReportService: SnapshotReportService, private snapshotDataService: SnapshotDataService, private formBuilder: FormBuilder) {
    this.filterFormGroup = this.formBuilder.group({
      classControl: '',
      studentControl: '',
      dateRangeStartCtrl: null,
      dateRangeEndCtrl: null
    }, { validator: this.dateRangeValidator });
  }

  dateRangeValidator = (formGroup: FormGroup) => {
    const { dateRangeStartCtrl, dateRangeEndCtrl } = formGroup.controls;

    if ((dateRangeStartCtrl.touched || dateRangeStartCtrl.dirty) && (dateRangeEndCtrl.touched || dateRangeEndCtrl.dirty)) {
      
      if (dateRangeStartCtrl.value && dateRangeEndCtrl.value && dateRangeStartCtrl.value > dateRangeEndCtrl.value) {
        dateRangeStartCtrl.setErrors({
          invalidDateRange: true
        });
        dateRangeEndCtrl.setErrors({
          invalidDateRange: true
        });
      } else {
        dateRangeStartCtrl.setErrors(null);
        dateRangeEndCtrl.setErrors(null);
      }
      
    }
  }

  ngOnInit(): void {
    this.snapshotReportService.getClasses().subscribe(classes => {
      this.setClasses(classes);
      this.setAllStudents(classes);
    });

    this.classControl.valueChanges.subscribe((classItem: IClass) => {
      if (classItem) {
        this.studentControl.reset();
        this.students = classItem.students;
      } else {
        this.setAllStudents(this.classes);
      }
    });
    this.filterFormGroup.valueChanges.subscribe(_ => {
      if (this.filterFormGroup.valid) {
        this.updateFilters()
      }
    });
  }

  setClasses(classes: IClass[]) {
    this.classes = classes;
  }

  setStudents(students: string[] = []) {
    this.students = students;
  }

  setAllStudents(classes: IClass[]) {
    this.setStudents(classes.reduce((students: string[], classItem: IClass) => [...students, ...(classItem?.students || [])], []));
  }

  updateFilters() {
    this.snapshotDataService.filterChange$.next({
      class: this.classControl.value?.students,
      student: this.studentControl.value,
      dateRange: {
        from: this.dateRangeStartCtrl.value,
        to: this.dateRangeEndCtrl.value
      }
    })
  }

}
