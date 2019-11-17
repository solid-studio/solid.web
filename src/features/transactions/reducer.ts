import { Reducer } from 'redux'

import { TransactionReceipt } from '@solid-explorer/types'

import { Status } from '../common/types'

import { ActionType, Actions } from './action-types'

export interface TransactionsState {
  currentTransaction?: TransactionReceipt
  transactions: TransactionReceipt[]
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
      const result = {
        ...state,
        transactions: action.payload,
        currentTransaction: action.payload[0],
        getTransactionsStatus: Status.Completed
      }
      return result
    default:
      return state
  }
}
