import { Reducer } from 'redux'
import { normalize, schema } from 'normalizr';

import { TransactionReceipt } from '@solid-explorer/types'

import { Status, NormalizedObject } from '../common/types'

import { ActionType, Actions } from './action-types'

export interface TransactionsState {
  currentTransaction?: TransactionReceipt
  transactions: NormalizedObject<TransactionReceipt>
  getTransactionsStatus: Status
}

export const initialState: TransactionsState = {
  transactions: {
    byId: {},
    allIds: []
  },
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
        transactions: getNewTransactions(action.payload, state),
        currentTransaction: action.payload[0],
        getTransactionsStatus: Status.Completed
      }
      return result
    default:
      return state
  }
}

export const normalizeTransactions = (transactions: TransactionReceipt[]): NormalizedObject<TransactionReceipt> => {
  const transactionSchema = new schema.Entity('transactions');
  const transactionListSchema = new schema.Array(transactionSchema);
  const normalizedData = normalize(transactions, transactionListSchema);

  return {
    byId: normalizedData.entities.transactions,
    allIds: normalizedData.result
  }
}

export const getNewTransactions = (transactions: TransactionReceipt[], state: TransactionsState): NormalizedObject<TransactionReceipt> => {
  const newNormalizedTransactions = normalizeTransactions(transactions)
  const filteredNewIds = newNormalizedTransactions.allIds.filter((id: string) => {
    return state.transactions.allIds.indexOf(id) === -1
  })
  const newTransactions = {
    ...state.transactions,
    byId: {
      ...state.transactions.byId,
      ...newNormalizedTransactions.byId
    },
    allIds: [...state.transactions.allIds, ...filteredNewIds]
  }
  return newTransactions
}