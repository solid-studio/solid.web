import { buildFakeTransactionReceipts, TransactionReceipt } from '@solidstudio/types'

import { appReducer, initialState } from './reducer'
import { loadCompilerVersion } from './actions'
import { Status } from '../common/types'

// TODO: to complete
describe('Compiler reducer', () => {
  test('ActionType.VALIDATE_SOURCE_CODE', () => {
    expect(true).toBeTruthy()
  })

  test('ActionType.LOAD_COMPILER_VERSION_RESULT', () => {
    expect(true).toBeTruthy()
  })
})
