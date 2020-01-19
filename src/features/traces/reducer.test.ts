import { buildFakeTraces, buildFakeTrace } from '@solid-explorer/types'

import { tracesReducer, tracesInitialState, normalizeTraces } from './reducer'
import { tracesReceived } from './actions'

describe('Traces reducer', () => {
  test('ActionType.TRACES_RECEIVED', () => {
    const traces = buildFakeTraces()
    const tracesNormalized = normalizeTraces(traces)
    const tracesReceivedAction = tracesReceived({ data: traces, contractId: 1 })
    const newState = tracesReducer(tracesInitialState, tracesReceivedAction)

    expect(newState.traces).toEqual(tracesNormalized)
  })

  test('ActionType.TRACES_RECEIVED Adding new items', () => {
    const traces = buildFakeTraces()
    const tracesNormalized = normalizeTraces(traces)
    const tracesReceivedAction = tracesReceived({ data: traces, contractId: 1 })
    const newState = tracesReducer(tracesInitialState, tracesReceivedAction)

    expect(newState.traces).toEqual(tracesNormalized)

    // add new items
    const newTrace = buildFakeTrace({ id: 3 })
    const newTracesNormalized = normalizeTraces([newTrace])
    const newTracesReceivedAction = tracesReceived({ data: [newTrace], contractId: 1 })
    const newStateWithNewBlock = tracesReducer(newState, newTracesReceivedAction)

    expect(newStateWithNewBlock.traces.byId[1]).toEqual(tracesNormalized.byId[1])
    expect(newStateWithNewBlock.traces.byId[2]).toEqual(tracesNormalized.byId[2])
    expect(newStateWithNewBlock.traces.byId[3]).toEqual(newTracesNormalized.byId[3])
  })

  test('ActionType.TRACES_RECEIVED Adding new existing items', () => {
    const traces = buildFakeTraces()
    const tracesNormalized = normalizeTraces(traces)
    const tracesReceivedAction = tracesReceived({ data: traces, contractId: 1 })
    const newState = tracesReducer(tracesInitialState, tracesReceivedAction)

    expect(newState.traces).toEqual(tracesNormalized)

    // add new existing item
    const newGas = 1010
    const newContract = buildFakeTrace({ id: 2, gas: newGas })
    const newContractsNormalized = normalizeTraces([newContract])
    const newContractsReceivedAction = tracesReceived({ data: [newContract], contractId: 1 })

    const newStateWithNewBlock = tracesReducer(newState, newContractsReceivedAction)

    expect(newStateWithNewBlock.traces.byId[1]).toEqual(tracesNormalized.byId[1])
    expect(newStateWithNewBlock.traces.byId[2]).toEqual(newContractsNormalized.byId[2])
    expect(newStateWithNewBlock.traces.byId[2].gas).toEqual(newGas)
  })
})
