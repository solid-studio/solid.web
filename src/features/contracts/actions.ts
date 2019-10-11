import { ActionCreator } from 'redux'

import { Contract } from '@solidstudio/solid.types'

import { ActionType, ContractsReceivedAction, GetContractsAction, MaximizeContractViewAction } from './action-types'

export const contractsReceived: ActionCreator<ContractsReceivedAction> = (contracts: Contract[]): ContractsReceivedAction => {
  return {
    type: ActionType.CONTRACTS_RECEIVED,
    payload: contracts
  }
}

export const getContracts: ActionCreator<GetContractsAction> = (connectionId: string): GetContractsAction => {
  return {
    type: ActionType.GET_CONTRACTS,
    payload: connectionId
  }
}

export const maximizeContractView: ActionCreator<MaximizeContractViewAction> = (contract: Contract): MaximizeContractViewAction => {
  return {
    type: ActionType.ON_MAXIMIZE_CONTRACT_VIEW,
    payload: { ...contract, type: 'contract' }
  }
}

// export const contractSelected: ActionCreator<Action> = (contract: Contract): ContractSelectedAction => {
//   return {
//     type: ActionType.CONTRACT_SELECTED,
//     payload: contract
//   }
// }
