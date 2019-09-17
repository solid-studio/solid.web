import { ActionCreator, Action } from 'redux'

import { Contract } from './types'
import { ActionType, ContractsReceivedAction, GetContractsAction, MaximizeContractViewAction } from './action-types'

export const contractsReceived: ActionCreator<Action> = (contracts: Contract[]): ContractsReceivedAction => {
  return {
    type: ActionType.CONTRACTS_RECEIVED,
    payload: contracts
  }
}

export const getContracts: ActionCreator<Action> = (): GetContractsAction => {
  return {
    type: ActionType.GET_CONTRACTS
  }
}

export const maximizeContractView: ActionCreator<Action> = (contract: Contract): MaximizeContractViewAction => {
  return {
    type: ActionType.ON_MAXIMIZE_CONTRACT_VIEW,
    payload: contract
  }
}

// export const contractSelected: ActionCreator<Action> = (contract: Contract): ContractSelectedAction => {
//   return {
//     type: ActionType.CONTRACT_SELECTED,
//     payload: contract
//   }
// }
