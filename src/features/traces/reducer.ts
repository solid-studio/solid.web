import { Reducer } from 'redux'
import { normalize, schema } from 'normalizr'

import { TransactionTrace } from '@solid-explorer/types'

import { NormalizedObject } from '../common/types'

import { ActionType, Actions } from './action-types'

export interface TracesState {
  traces: NormalizedObject<TransactionTrace>
}

export const tracesInitialState: TracesState = {
  traces: {
    byId: {},
    allIds: []
  }
}

export const tracesReducer: Reducer<TracesState, Actions> = (
  state: TracesState = tracesInitialState,
  action: Actions
): TracesState => {
  switch (action.type) {
    case ActionType.TRACES_RECEIVED:
      return {
        ...state,
        traces: getNewTraces(action.payload.data, state)
      }
    default:
      return state
  }
}

export const normalizeTraces = (traces: TransactionTrace[]): NormalizedObject<TransactionTrace> => {
  const tracesSchema = new schema.Entity('traces')
  const traceListSchema = new schema.Array(tracesSchema)
  const normalizedData = normalize(traces, traceListSchema)

  return {
    byId: normalizedData.entities.traces,
    allIds: normalizedData.result
  }
}

export const getNewTraces = (traces: TransactionTrace[], state: TracesState): NormalizedObject<TransactionTrace> => {
  const newNormalizedTraces = normalizeTraces(traces)
  const filteredNewIds = newNormalizedTraces.allIds.filter((id: string) => {
    return state.traces.allIds.indexOf(id) === -1
  })
  const newTraces = {
    ...state.traces,
    byId: {
      ...state.traces.byId,
      ...newNormalizedTraces.byId
    },
    allIds: [...state.traces.allIds, ...filteredNewIds]
  }
  return newTraces
}
