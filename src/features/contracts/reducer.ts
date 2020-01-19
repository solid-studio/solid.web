import { Reducer } from 'redux'
import { normalize, schema } from 'normalizr'

import { Contract } from '@solid-explorer/types'

import { Status, NormalizedObject } from '../common/types'

import { ActionType, Actions } from './action-types'
import { ActionType as TracesActionType } from '../traces/action-types'

export interface ContractState {
  currentContract?: Contract
  contracts: NormalizedObject<Contract>
  getContractsStatus: Status
}

export const contractsInitialState: ContractState = {
  contracts: {
    byId: {},
    allIds: []
  },
  currentContract: undefined,
  getContractsStatus: Status.NotStarted
}

export const contractsReducer: Reducer<ContractState, Actions> = (
  state: ContractState = contractsInitialState,
  action: Actions
): ContractState => {
  switch (action.type) {
    case ActionType.CONTRACTS_RECEIVED:
      return {
        ...state,
        contracts: getNewContracts(action.payload, state),
        currentContract: action.payload[0]
      }
    case TracesActionType.TRACES_RECEIVED:
      const traces = action.payload.data.map(item => {
        return `${item.id}`
      })
      const contractId = action.payload.contractId
      const newContractsWithTraces = {
        ...state.contracts,
        byId: {
          ...state.contracts.byId,
          [`${contractId}`]: {
            ...state.contracts.byId[`${contractId}`],
            traces
          }
        }
      }
      return { ...state, contracts: newContractsWithTraces }
    default:
      return state
  }
}

export const normalizeContracts = (contracts: Contract[]): NormalizedObject<Contract> => {
  const contractschema = new schema.Entity('contracts')
  const contractListSchema = new schema.Array(contractschema)
  const normalizedData = normalize(contracts, contractListSchema)

  return {
    byId: normalizedData.entities.contracts,
    allIds: normalizedData.result
  }
}

export const getNewContracts = (contracts: Contract[], state: ContractState): NormalizedObject<Contract> => {
  const newNormalizedcontracts = normalizeContracts(contracts)
  const filteredNewIds = newNormalizedcontracts.allIds.filter((id: string) => {
    return state.contracts.allIds.indexOf(id) === -1
  })
  const newcontracts = {
    ...state.contracts,
    byId: {
      ...state.contracts.byId,
      ...newNormalizedcontracts.byId
    },
    allIds: [...state.contracts.allIds, ...filteredNewIds]
  }
  return newcontracts
}
