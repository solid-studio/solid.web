import { Action } from 'redux'

import { TransactionTrace } from '@solid-explorer/types'

export enum ActionType {
  ERROR_WHEN_GETTING_DATA = 'ERROR_WHEN_GETTING_DATA', // TODO
  TRACES_RECEIVED = 'TRACES_RECEIVED',
  GET_TRACES = 'GET_TRACES'
}

export interface GetTracesAction extends Action {
  type: ActionType.GET_TRACES
  payload: {
    connectionId: number
    contractAddress: string
    contractId: number
  }
}

export interface TracesReceivedAction extends Action {
  type: ActionType.TRACES_RECEIVED
  payload: {
    data: TransactionTrace[]
    contractId: number
  }
}

export type Actions = GetTracesAction | TracesReceivedAction
