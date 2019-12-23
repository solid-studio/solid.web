import { ofType, combineEpics, ActionsObservable, StateObservable } from 'redux-observable'
import { of } from 'rxjs'
import { switchMap, map, catchError } from 'rxjs/operators'
import { AjaxCreationMethod } from 'rxjs/internal/observable/dom/AjaxObservable'

import { TransactionTrace } from '@solid-explorer/types'

import { ActionType, GetTracesAction } from './action-types'
import { tracesReceived } from './actions'
import { TRACES_URL } from './constants'

import { ApplicationState } from 'features/rootReducer'
import { GenericArrayResponse } from 'features/common/types'

type Response = GenericArrayResponse<TransactionTrace>

export const getTracesEpic = (
  action$: ActionsObservable<GetTracesAction>,
  state$: StateObservable<ApplicationState>,
  ajax: AjaxCreationMethod
) =>
  action$.pipe(
    ofType(ActionType.GET_TRACES),
    switchMap(({ payload }) => {
      return ajax
        .getJSON<Response>(
          `${TRACES_URL}?contractAddress=${payload.contractAddress}&connectionId=${payload.connectionId}`
        )
        .pipe(
          map(response =>
            tracesReceived({
              data: response.data,
              contractId: payload.contractId
            })
          ),
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

export const tracesEpic = combineEpics(getTracesEpic)
