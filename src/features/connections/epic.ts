import { ofType, combineEpics, ActionsObservable, StateObservable } from 'redux-observable'
import { mapTo, switchMap, map, catchError } from 'rxjs/operators'
import { AjaxCreationMethod } from 'rxjs/internal/observable/dom/AjaxObservable'
import { of } from 'rxjs'

import { Connection } from '@solidstudio/types'

import { openOrSetTabActive } from 'features/tabs/actions'
import { ApplicationState } from 'features/rootReducer'
import { GenericArrayResponse } from 'features/common/types'

import { ActionType, GetConnectionsAction, CreateConnectionAction, ConnectionItemSelectedAction } from './action-types'
import { connectionsReceived, connectionCreated } from './actions'
import { CONNECTION_URL } from './constants'

type Response = GenericArrayResponse<Connection>

export const createConnectionEpic = (
  action$: ActionsObservable<CreateConnectionAction>,
  state$: StateObservable<ApplicationState>,
  ajax: AjaxCreationMethod
) =>
  action$.pipe(
    ofType(ActionType.CREATE_CONNECTION),
    switchMap(({ payload }) => {
      return ajax.post(`${CONNECTION_URL}`, payload).pipe(
        map(data => connectionCreated(data.response)),
        catchError(error =>
          of({
            type: ActionType.ERROR_WHEN_GETTING_DATA,
            payload: error.xhr.response,
            error: true
          })
        )
      )
    })
  )

export const onCreateConnectionCompletedEpic = (action$: ActionsObservable<CreateConnectionAction>) =>
  action$.pipe(
    ofType(ActionType.CONNECTION_CREATED),
    mapTo({
      type: ActionType.CLOSE_CONNECTION_MODAL,
      payload: undefined
    })
  )

export const getConnectionsEpic = (
  action$: ActionsObservable<GetConnectionsAction>,
  state$: StateObservable<ApplicationState>,
  ajax: AjaxCreationMethod
) =>
  action$.pipe(
    ofType(ActionType.GET_CONNECTIONS),
    switchMap(() => {
      return ajax.getJSON<Response>(`${CONNECTION_URL}`).pipe(
        map(response => connectionsReceived(response.data)),
        catchError(error =>
          of({
            type: ActionType.ERROR_WHEN_GETTING_DATA,
            payload: error.xhr.response,
            error: true
          })
        )
      )
    })
  )

export const onConnectionItemSelectedEpic = (action$: ActionsObservable<ConnectionItemSelectedAction>) =>
  action$.pipe(
    ofType<ConnectionItemSelectedAction>(ActionType.CONNECTION_ITEM_SELECTED),
    map(({ payload }) => {
      return openOrSetTabActive({
        type: payload.type,
        data: payload,
        title: payload.type,
        id: `${payload.type}-${payload.id}`
      })
    })
  )

export const connectionsEpic = combineEpics(
  getConnectionsEpic,
  createConnectionEpic,
  onCreateConnectionCompletedEpic,
  onConnectionItemSelectedEpic
)
