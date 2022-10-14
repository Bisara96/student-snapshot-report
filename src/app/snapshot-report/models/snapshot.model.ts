export interface Attempts {
    weeks: string[],
    values: number[],
    number?: any
}

export interface Snapshot {
   id?: number,
   content?: string,
   attempts?: Attempts,
   student?: string,
   time?: string,
   skill?: string,
   type?: string 
}

export interface SnapshotViewModel {
    dateCompleted?: Date;
    content?: string;
    type?: string;
    skill?: string;
    result?: number;
    timeSpent?: string;
    student?: string;
    message?: string;
}