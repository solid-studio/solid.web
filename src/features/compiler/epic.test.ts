import { ActionsObservable, StateObservable } from 'redux-observable'
import { Subject, of } from 'rxjs'

import { ApplicationState, initialState } from '../rootReducer'

import {
  LoadCompilerVersionAction,
  LoadCompilerVersionResultAction,
  SetupMessageDispatcherAction
} from './action-types'
import {
  loadCompilerVersion,
  compilerVersionLoaded,
  loadCompilerVersionFailed,
  setupMessageDispatcher
} from './actions'
import { setupMessageDispatcherEpic, loadCompilerVersionEpic, loadCompilerVersionResultEpic } from './epic'

describe('Compiler Epic Tests', () => {
  test('setupMessageDispatcherEpic', done => {
    const action: SetupMessageDispatcherAction = setupMessageDispatcher()

    const actions$ = ActionsObservable.of(action)

    const applicationState$: StateObservable<ApplicationState> = new StateObservable<ApplicationState>(
      new Subject(),
      initialState
    )

    const output$ = setupMessageDispatcherEpic(actions$, applicationState$)

    output$.subscribe(action => {
      // expect(action).toEqual() // TODO
      done()
    })
  })

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

  // I realise I don't need this tests and the epic..
  test.skip('loadCompilerVersionResultEpic when compiler version is loaded', done => {
    const action: LoadCompilerVersionResultAction = compilerVersionLoaded()

    const actions$ = ActionsObservable.of(action)

    const applicationState$: StateObservable<ApplicationState> = new StateObservable<ApplicationState>(
      new Subject(),
      initialState
    )

    const output$ = setupMessageDispatcherEpic(actions$, applicationState$)

    output$.subscribe(action => {
      // expect(action).toEqual() // TODO
      done()
    })
  })

  // TODO: To finish
  test.skip('loadCompilerVersionResultEpic when compiler version fail', done => {
    const action: LoadCompilerVersionResultAction = loadCompilerVersionFailed()

    const actions$ = ActionsObservable.of(action)

    const applicationState$: StateObservable<ApplicationState> = new StateObservable<ApplicationState>(
      new Subject(),
      initialState
    )

    const output$ = setupMessageDispatcherEpic(actions$, applicationState$)

    output$.subscribe(action => {
      // expect(action).toEqual() // TODO
      done()
    })
  })
})
