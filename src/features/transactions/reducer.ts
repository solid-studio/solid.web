import { Reducer } from 'redux'

import { Transaction } from '@solidstudio/solid.types'

import { Status } from '../common/types'

import { ActionType, Actions } from './action-types';


export interface TransactionsState {
    currentTransaction?: Transaction
    transactions: Transaction[]
    getTransactionsStatus: Status
}

export const initialState: TransactionsState = {
    transactions: [],
    currentTransaction: undefined,
    getTransactionsStatus: Status.NotStarted
}

export const appReducer: Reducer<TransactionsState, Actions> = (
    state: TransactionsState = initialState,
    action: Actions
): TransactionsState => {
    switch (action.type) {
        case ActionType.TRANSACTIONS_RECEIVED:
            return { ...state, transactions: action.payload, currentTransaction: action.payload[0] }
        default:
            return state
    }
}
