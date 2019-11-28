import { ActionsObservable, StateObservable } from 'redux-observable'
import { Subject } from 'rxjs'

import { ApplicationState, initialState } from '../rootReducer'

import { LoadCompilerVersionAction } from './action-types'
import { loadCompilerVersion } from './actions'
import { loadCompilerVersionEpic } from './epic'

describe('Compiler Epic Tests', () => {
  test('loadCompilerVersionEpic', done => {
    const action: LoadCompilerVersionAction = loadCompilerVersion()

    const actions$ = ActionsObservable.of(action)

    const applicationState$: StateObservable<ApplicationState> = new StateObservable<ApplicationState>(
      new Subject(),
      initialState
    )

    const output$ = loadCompilerVersionEpic(actions$, applicationState$)

    output$.subscribe(action => {
      // If I'm not returning nothing, should I spy? Use mocks in the worker...
      // expect(action).toEqual() // TODO
      done()
    })
  })
})
