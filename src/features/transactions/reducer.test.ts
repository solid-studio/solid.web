import { buildFakeTransactionReceipts, TransactionReceipt, buildFakeTransactionReceipt } from '@solid-explorer/types'

import { appReducer, initialState, normalizeTransactions } from './reducer'
import { transactionsReceived } from './actions'
import { Status } from '../common/types'

describe('Transactions reducer', () => {
  test('ActionType.TRANSACTIONS_RECEIVED', () => {
    const transactions: TransactionReceipt[] = buildFakeTransactionReceipts()
    const transactionsNormalized = normalizeTransactions(transactions)
    const transactionsReceivedAction = transactionsReceived(transactions)
    const newState = appReducer(initialState, transactionsReceivedAction)

    expect(newState.transactions).toEqual(transactionsNormalized)
    expect(newState.currentTransaction).toEqual(transactions[0])
    expect(newState.getTransactionsStatus).toEqual(Status.Completed)
  })

  test('ActionType.TRANSACTIONS_RECEIVED Adding new items', () => {
    const transactions: TransactionReceipt[] = buildFakeTransactionReceipts()
    const transactionsNormalized = normalizeTransactions(transactions)
    const transactionsReceivedAction = transactionsReceived(transactions)
    const newState = appReducer(initialState, transactionsReceivedAction)

    expect(newState.transactions).toEqual(transactionsNormalized)
    expect(newState.currentTransaction).toEqual(transactions[0])
    expect(newState.getTransactionsStatus).toEqual(Status.Completed)

    // add new items
    const newTransaction = buildFakeTransactionReceipt({ id: 3 })
    const newTransactionsNormalized = normalizeTransactions([newTransaction])
    const newTransactionsReceivedAction = transactionsReceived([newTransaction])
    const newStateWithNewBlock = appReducer(newState, newTransactionsReceivedAction)

    expect(newStateWithNewBlock.transactions.byId[1]).toEqual(transactionsNormalized.byId[1])
    expect(newStateWithNewBlock.transactions.byId[2]).toEqual(transactionsNormalized.byId[2])
    expect(newStateWithNewBlock.transactions.byId[3]).toEqual(newTransactionsNormalized.byId[3])
  })

  test('ActionType.TRANSACTIONS_RECEIVED Adding new existing items', () => {
    const transactions: TransactionReceipt[] = buildFakeTransactionReceipts()
    const transactionsNormalized = normalizeTransactions(transactions)
    const transactionsReceivedAction = transactionsReceived(transactions)
    const newState = appReducer(initialState, transactionsReceivedAction)

    expect(newState.transactions).toEqual(transactionsNormalized)
    expect(newState.currentTransaction).toEqual(transactions[0])
    expect(newState.getTransactionsStatus).toEqual(Status.Completed)

    // add new existing items
    const newTransactionHash = '0x0101';
    const newTransaction = buildFakeTransactionReceipt({ id: 2, transactionHash: newTransactionHash })
    const newTransactionsNormalized = normalizeTransactions([newTransaction])
    const newTransactionsReceivedAction = transactionsReceived([newTransaction])
    const newStateWithNewBlock = appReducer(newState, newTransactionsReceivedAction)

    expect(newStateWithNewBlock.transactions.byId[1]).toEqual(transactionsNormalized.byId[1])
    expect(newStateWithNewBlock.transactions.byId[2]).toEqual(newTransactionsNormalized.byId[2])
    expect(newStateWithNewBlock.transactions.byId[2].transactionHash).toEqual(newTransactionHash)
  })
})
