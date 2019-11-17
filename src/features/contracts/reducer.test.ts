import { buildFakeContracts } from '@solid-explorer/types'

import { appReducer, initialState } from './reducer'
import { contractsReceived } from './actions'

describe('Contracts reducer', () => {
  test('ActionType.CONTRACTS_RECEIVED', () => {
    const contracts = buildFakeContracts()
    const contractsReceivedAction = contractsReceived(contracts)
    const newState = appReducer(initialState, contractsReceivedAction)

    expect(newState.contracts).toEqual(contracts)
    expect(newState.currentContract).toEqual(contracts[0]) // TODO: Am I sure the current block has to be the first one?, check reducer too..
    expect(newState.getContractsStatus).toEqual(initialState.getContractsStatus)
  })
})
