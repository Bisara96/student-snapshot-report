import { IClass } from './../models/class.model';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { BehaviorSubject } from 'rxjs';
import { Snapshot, SnapshotViewModel } from './../models/snapshot.model';

type FilterModel = { students?: string[], dateRange?: { from?: Date, to?: Date } };

@Injectable({
  providedIn: 'root'
})
export class SnapshotDataService {

  filterChange$: BehaviorSubject<FilterModel> = new BehaviorSubject({});

  constructor() { }

  getAllStudentsOfClasses(classes: IClass[]): string[] {
    return classes.reduce((students: string[], classItem: IClass) => [...students, ...(classItem?.students || [])], []);
  }

  getSnapshotsOfStudents(snapshotData: Snapshot[], filter: FilterModel) {

    // const students = (filter?.students || []).sort(); because student name is alphaneumeric and it messes up the order i.e: Student 12 is < Student 9
    const students = (filter?.students || []).sort((s1, s2) => {
      return s1.localeCompare(s2, undefined, {
        numeric: true,
        sensitivity: 'base'
      });
    });

    return students.reduce((snapViewDataArr: SnapshotViewModel[], student: string) => {

      const studSnapshot: Snapshot = this.getStudentSnapshotData(student, snapshotData) || { student };
      let studSnapshotViewData: SnapshotViewModel[] = [];

      if (studSnapshot.attempts) {
        studSnapshotViewData = this.processStudentAttemps(studSnapshot, filter && filter.dateRange);
      }

      if (!studSnapshotViewData.length) {
        const from = moment(filter.dateRange?.from).format('DD MMMM YYYY');
        const to = moment(filter.dateRange?.to).format('DD MMMM YYYY');

        let message = `No content has been completed by ${student}`;

        if (filter.dateRange?.from) {
          message += ` from ${from}`;
        }

        if (filter.dateRange?.from && filter.dateRange?.to) {
          message += ` to ${to}.`;
        }

        studSnapshotViewData.push({
          student,
          message
        })
      }

      return [...snapViewDataArr, ...studSnapshotViewData];
    }, [])
  }

  getStudentSnapshotData(student: string, snapshots: Snapshot[]): Snapshot | undefined {
    return snapshots.find(snapshot => snapshot.student === student);
  }

  /* getSnapshotViewData(snapshotData: Snapshot[], filter?: FilterModel): SnapshotViewModel[] {
    return snapshotData.reduce((array: SnapshotViewModel[], snapshot: Snapshot) => {

      if (filter && ((filter['class'] && filter['class'].indexOf(snapshot.student) === -1) ||
        (filter['student'] && filter['student'] !== snapshot.student))) {
        return array;
      }

      return [...array, ...this.processStudentAttemps(snapshot, filter && filter['dateRange'])]
    }, [])
  } */

  processStudentAttemps(studSnapData: Snapshot, dateRange?: { from?: Date, to?: Date }): SnapshotViewModel[] {
    const { id, student, content, time, skill, attempts, type } = studSnapData;
    const { weeks, values } = attempts || { weeks: [], values: [] };
    const processedData: SnapshotViewModel[] = [];

    for (let i = 0; i < weeks.length; i++) {

      const date = moment(weeks[i], 'DD-MM-YYYY').toDate();

      if (dateRange && ((dateRange.from && date < dateRange.from) || (dateRange.to && date > dateRange.to))) {
        continue;
      }

      processedData.push({
        dateCompleted: date,
        content,
        type,
        skill,
        result: values[i],
        timeSpent: time,
        student
      });
    }

    return processedData;
  }

  groupSnapshotsByResultLevels(snapshotData: SnapshotViewModel[]) {
    const groupedData: { excellent: number, good: number, ok: number, weak: number, unassigned: number } = { excellent: 0, good: 0, ok: 0, weak: 0, unassigned: 0 };
    for (const snapshot of snapshotData) {
      if (snapshot.result) {
        if (snapshot.result >= 90) {
          groupedData.excellent++;
        } else if (snapshot.result >= 80) {
          groupedData.good++;
        } else if (snapshot.result >= 60) {
          groupedData.ok++;
        } else {
          groupedData.weak++;
        }
      } else {
        groupedData.unassigned++;
      }
    }

    return groupedData;
  }
}
