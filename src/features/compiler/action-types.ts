import { Action } from 'redux'

export enum ActionType {
    ERROR_WHEN_GETTING_DATA = 'ERROR_WHEN_GETTING_DATA',
    ERROR_WHEN_EXECUTING_TRANSACTION = 'ERROR_WHEN_EXECUTING_TRANSACTION',
    LOAD_COMPILER = 'LOAD_COMPILER',
}

export interface LoadCompilerWorkerAction extends Action {
    type: ActionType.LOAD_COMPILER
    payload: Worker | undefined
}

export type Actions = LoadCompilerWorkerAction