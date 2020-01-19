import { ActionsObservable, StateObservable } from 'redux-observable'
import { Subject, of } from 'rxjs'
import { AjaxCreationMethod, AjaxResponse } from 'rxjs/internal/observable/dom/AjaxObservable'

import { buildFakeConnections, buildFakeConnection } from '@solid-explorer/types'

import { ApplicationState, initialState } from '../rootReducer'

import { GetConnectionsAction, CreateConnectionAction, ConnectionItemSelectedAction } from './action-types'
import {
  getConnections,
  connectionsReceived,
  connectionCreated,
  closeConnectionModal,
  connectionItemSelected,
  createOrUpdateConnection
} from './actions'
import {
  getConnectionsEpic,
  onCreateConnectionCompletedEpic,
  onConnectionItemSelectedEpic,
  createConnectionEpic
} from './epic'
import { ConnectionItem } from './types'
import { openOrSetTabActive } from 'features/tabs/actions'
import { AjaxRequest } from 'rxjs/ajax'

describe('Connections Epic Tests', () => {
  const mockAjax: jest.Mocked<AjaxCreationMethod> = {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    patch: jest.fn(),
    delete: jest.fn(),
    getJSON: jest.fn()
  } as any // TODO FIX

  // TODO: add error cases (catch flow)
  it('createConnectionEpic', done => {
    const connection = buildFakeConnection()

    const createConnectionAction: CreateConnectionAction = createOrUpdateConnection(connection)

    const actions$ = ActionsObservable.of(createConnectionAction)

    const applicationState$: StateObservable<ApplicationState> = new StateObservable<ApplicationState>(
      new Subject(),
      initialState
    )

    mockAjax.post.mockImplementation((url: string, body?: any, headers?: {}) => {
      return of<AjaxResponse>({
        response: connection,
        status: 200,
        responseText: 'json',
        xhr: new XMLHttpRequest(),
        originalEvent: new Event('post'),
        responseType: 'json',
        request: {} as AjaxRequest
      })
    })

    const output$ = createConnectionEpic(actions$, applicationState$, mockAjax)

    output$.subscribe(action => {
      expect(action).toEqual(connectionCreated(connection))
      done()
    })
  })

  it('onCreateConnectionCompletedEpic', done => {
    const connection = buildFakeConnection()
    const connectionCreatedAction: CreateConnectionAction = connectionCreated(connection)

    const actions$ = ActionsObservable.of(connectionCreatedAction)

    const output$ = onCreateConnectionCompletedEpic(actions$)

    output$.subscribe(action => {
      expect(action).toEqual(closeConnectionModal())
      done()
    })
  })

  // TODO: add error cases (catch flow)
  it('getConnectionsEpic', done => {
    const connections = buildFakeConnections()

    const getConnectionsAction: GetConnectionsAction = getConnections()

    const actions$ = ActionsObservable.of(getConnectionsAction)

    const applicationState$: StateObservable<ApplicationState> = new StateObservable<ApplicationState>(
      new Subject(),
      initialState
    )

    mockAjax.getJSON.mockImplementation((url: string, headers?: {} | undefined) => {
      return of({ data: connections })
    })

    const output$ = getConnectionsEpic(actions$, applicationState$, mockAjax)

    output$.subscribe(action => {
      expect(action).toEqual(connectionsReceived(connections))
      done()
    })
  })

  it('onConnectionItemSelectedEpic', done => {
    const connection = buildFakeConnection()
    const connectionItem: ConnectionItem = {
      ...connection,
      nodeType: 'connection'
    }
    const connectionItemSelectedAction: ConnectionItemSelectedAction = connectionItemSelected(connectionItem)

    const actions$ = ActionsObservable.of(connectionItemSelectedAction)

    const output$ = onConnectionItemSelectedEpic(actions$)

    output$.subscribe(action => {
      expect(action).toEqual(
        openOrSetTabActive({
          type: connectionItemSelectedAction.payload.nodeType,
          data: connectionItemSelectedAction.payload,
          title: connectionItemSelectedAction.payload.nodeType,
          id: `${connectionItemSelectedAction.payload.nodeType}-${connectionItemSelectedAction.payload.id}`
        })
      )
      done()
    })
  })
})
