import { Action } from 'redux'

import { Transaction } from './types'

export enum ActionType {
    ERROR_WHEN_GETTING_DATA = 'ERROR_WHEN_GETTING_DATA',
    ERROR_WHEN_EXECUTING_TRANSACTION = 'ERROR_WHEN_EXECUTING_TRANSACTION',
    TRANSACTIONS_RECEIVED = 'TRANSACTIONS_RECEIVED',
}

export interface TransactionsReceivedAction extends Action {
    type: ActionType.TRANSACTIONS_RECEIVED
    payload: Transaction[]
}

export type Actions = TransactionsReceivedAction