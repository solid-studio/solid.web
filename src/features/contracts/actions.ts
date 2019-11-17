import { ActionCreator } from 'redux'

import { Contract, AbiItem } from '@solid-explorer/types'

import { ActionType, ContractsReceivedAction, GetContractsAction, MaximizeContractViewAction } from './action-types'

export const contractsReceived: ActionCreator<ContractsReceivedAction> = (
  contracts: Contract[]
): ContractsReceivedAction => {
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

export const maximizeContractView: ActionCreator<MaximizeContractViewAction> = (
  contract: Contract
): MaximizeContractViewAction => {
  return {
    type: ActionType.ON_MAXIMIZE_CONTRACT_VIEW,
    payload: { ...contract, type: 'contract' }
  }
}

// executeContractFunction
export const executeContractFunction: ActionCreator<any> = (abi: AbiItem, parameters: []) => {
  // TODO: CREATE An ActionType that a certain EPIC will recognize as a web3 action
  // Define the payload
}

// 1 Contract -> N Functions -> Each function has state...

// how to handle invidiual elements progress?

// export const executeFunctionCallCompleted: ActionCreator<ActionThunk> = () => {
//     return (dispatch): Web3Action => {// TODO: FIX TYPE
//         return {
//             type: Web3ActionType.Web3Action,
//             payload: {

//             }
//         }
//     }
// }

// export const executeFunctionCallInProgress: VoidActionCreator = () => {
//     return (dispatch): Web3Action => { // TODO: FIX TYPE
//         return {
//             type: Web3ActionType.Web3Action,
//             payload: {
//                 result: undefined,
//                 status: Status.InProgress
//             }
//         }
//     }
// }

// export const contractSelected: ActionCreator<Action> = (contract: Contract): ContractSelectedAction => {
//   return {
//     type: ActionType.CONTRACT_SELECTED,
//     payload: contract
//   }
// }
