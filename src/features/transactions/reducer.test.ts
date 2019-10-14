import { buildFakeTransactionReceipts, TransactionReceipt } from '@solidstudio/solid.types'

import { appReducer, initialState } from './reducer'
import { transactionsReceived } from './actions'
import { Status } from '../common/types'

describe('Transactions reducer', () => {
  test('ActionType.TRANSACTIONS_RECEIVED', () => {
    const transactions: TransactionReceipt[] = buildFakeTransactionReceipts()
    const transactionsReceivedAction = transactionsReceived(transactions)
    const newState = appReducer(initialState, transactionsReceivedAction)

    expect(newState.transactions).toEqual(transactions)
    expect(newState.currentTransaction).toEqual(transactions[0]) // TODO: Am I sure the current block has to be the first one?, check reducer too..
    expect(newState.getTransactionsStatus).toEqual(Status.Completed)
  })
})
