export enum Status { // TODO, with sagas I think it won't apply
    InProgress = 'InProgress',
    Completed = 'Completed',
    Synchronizing = 'Synchronizing', // this won't apply for connection modal
    Failed = 'Failed',
    NotStarted = 'NotStarted',
    Started = 'Started'
}

export interface GenericResponse<T> {
    total: number;
    limit: number;
    skip: number;
    data: T;
}

export interface GenericArrayResponse<T> {
    total: number;
    limit: number;
    skip: number;
    data: T[];
}
