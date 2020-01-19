import { ActionsObservable, StateObservable } from 'redux-observable'
import { Subject, of } from 'rxjs'
import { AjaxCreationMethod } from 'rxjs/internal/observable/dom/AjaxObservable'

import { buildFakeFileItem } from '@solid-explorer/types'

import { ApplicationState, initialState } from '../rootReducer'

import { GetFileItemsAction } from './action-types'
import { getFileItems, fileItemsReceived } from './actions'
import { getFileItemsEpic } from './epic'

describe('FileItems Epic Tests', () => {
  const mockAjax: jest.Mocked<AjaxCreationMethod> = {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    patch: jest.fn(),
    delete: jest.fn(),
    getJSON: jest.fn()
  } as any // TODO FIX

  test('getFileItemsEpic', done => {
    const fileItems = [buildFakeFileItem(), buildFakeFileItem()]

    const getFileItemsAction: GetFileItemsAction = getFileItems()

    const actions$ = ActionsObservable.of(getFileItemsAction)

    const applicationState$: StateObservable<ApplicationState> = new StateObservable<ApplicationState>(
      new Subject(),
      initialState
    )

    mockAjax.getJSON.mockImplementation((url: string, headers?: {} | undefined) => {
      return of({ data: fileItems })
    })

    const output$ = getFileItemsEpic(actions$, applicationState$, mockAjax)

    output$.subscribe(action => {
      expect(action).toEqual(fileItemsReceived(fileItems))
      done()
    })
  })
})
