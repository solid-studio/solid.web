// import "jsdom-worker" // TODO Maybe my workers should extend from worker, then I will nneed this
import { ActionsObservable, StateObservable } from 'redux-observable'
import { Subject, of } from 'rxjs'
import { AjaxCreationMethod } from 'rxjs/internal/observable/dom/AjaxObservable'

import { buildFakeTraces } from '@solid-explorer/types'

import { ApplicationState, initialState } from '../rootReducer'

import { GetTracesAction } from './action-types'
import { getTraces, tracesReceived } from './actions'
import { getTracesEpic } from './epic'

describe('Traces Epic Tests', () => {
  const mockAjax: jest.Mocked<AjaxCreationMethod> = {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    patch: jest.fn(),
    delete: jest.fn(),
    getJSON: jest.fn()
  } as any // TODO FIX

  test('getTracesEpic', done => {
    const traces = buildFakeTraces()

    const getTracesAction: GetTracesAction = getTraces({
      connectionId: 1,
      contractAddress: '00',
      contractId: 1
    })

    const actions$ = ActionsObservable.of(getTracesAction)

    const applicationState$: StateObservable<ApplicationState> = new StateObservable<ApplicationState>(
      new Subject(),
      initialState
    )

    mockAjax.getJSON.mockImplementation((url: string, headers?: {} | undefined) => {
      return of({ data: traces })
    })

    const output$ = getTracesEpic(actions$, applicationState$, mockAjax)

    output$.subscribe(action => {
      expect(action).toEqual(
        tracesReceived({
          data: traces,
          contractId: 1
        })
      )
      done()
    })
  })
})
