import { buildFakeContracts, buildFakeContract } from '@solid-explorer/types'

import { contractsReducer, contractsInitialState, normalizeContracts } from './reducer'
import { contractsReceived } from './actions'

describe('Contracts reducer', () => {
  test('ActionType.CONTRACTS_RECEIVED', () => {
    const contracts = buildFakeContracts()
    const contractsNormalized = normalizeContracts(contracts)
    const contractsReceivedAction = contractsReceived(contracts)
    const newState = contractsReducer(contractsInitialState, contractsReceivedAction)

    expect(newState.contracts).toEqual(contractsNormalized)
    expect(newState.currentContract).toEqual(contracts[0])
    expect(newState.getContractsStatus).toEqual(contractsInitialState.getContractsStatus)
  })

  test('ActionType.CONTRACTS_RECEIVED Adding new items', () => {
    const contracts = buildFakeContracts()
    const contractsNormalized = normalizeContracts(contracts)
    const contractsReceivedAction = contractsReceived(contracts)
    const newState = contractsReducer(contractsInitialState, contractsReceivedAction)

    expect(newState.contracts).toEqual(contractsNormalized)
    expect(newState.currentContract).toEqual(contracts[0])
    expect(newState.getContractsStatus).toEqual(contractsInitialState.getContractsStatus)

    // add new items
    const newContract = buildFakeContract({ id: 3 })
    const newContractsNormalized = normalizeContracts([newContract])
    const newContractsReceivedAction = contractsReceived([newContract])
    const newStateWithNewBlock = contractsReducer(newState, newContractsReceivedAction)

    expect(newStateWithNewBlock.contracts.byId[1]).toEqual(contractsNormalized.byId[1])
    expect(newStateWithNewBlock.contracts.byId[2]).toEqual(contractsNormalized.byId[2])
    expect(newStateWithNewBlock.contracts.byId[3]).toEqual(newContractsNormalized.byId[3])
  })

  test('ActionType.CONTRACTS_RECEIVED Adding new existing items', () => {
    const contracts = buildFakeContracts()
    const contractsNormalized = normalizeContracts(contracts)
    const contractsReceivedAction = contractsReceived(contracts)
    const newState = contractsReducer(contractsInitialState, contractsReceivedAction)

    expect(newState.contracts).toEqual(contractsNormalized)
    expect(newState.currentContract).toEqual(contracts[0])
    expect(newState.getContractsStatus).toEqual(contractsInitialState.getContractsStatus)

    // add new existing item
    const newContractName = 'new-name-test'
    const newContract = buildFakeContract({ id: 2, name: newContractName })
    const newContractsNormalized = normalizeContracts([newContract])
    const newContractsReceivedAction = contractsReceived([newContract])
    const newStateWithNewBlock = contractsReducer(newState, newContractsReceivedAction)

    expect(newStateWithNewBlock.contracts.byId[1]).toEqual(contractsNormalized.byId[1])
    expect(newStateWithNewBlock.contracts.byId[2]).toEqual(newContractsNormalized.byId[2])
    expect(newStateWithNewBlock.contracts.byId[2].name).toEqual(newContractName)
  })
})
