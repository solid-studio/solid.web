import { Action } from 'redux'

import { Transaction } from '@solidstudio/solid.types'

export enum ActionType {
    ERROR_WHEN_GETTING_DATA = 'ERROR_WHEN_GETTING_DATA', // TODO: MOVE
    // ERROR_WHEN_EXECUTING_TRANSACTION = 'ERROR_WHEN_EXECUTING_TRANSACTION', TODO: MAYBE FUTURE
    TRANSACTIONS_RECEIVED = 'TRANSACTIONS_RECEIVED',
    GET_TRANSACTIONS = 'GET_TRANSACTIONS'
}

export interface TransactionsReceivedAction extends Action {
    type: ActionType.TRANSACTIONS_RECEIVED
    payload: Transaction[]
}

export interface GetTransactionsAction extends Action {
    type: ActionType.GET_TRANSACTIONS
}

export type Actions = TransactionsReceivedAction
    | GetTransactionsAction