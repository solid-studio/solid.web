import { ofType, combineEpics, ActionsObservable, StateObservable } from 'redux-observable'
import { of } from 'rxjs'
import { switchMap, map, catchError } from 'rxjs/operators'
import { AjaxCreationMethod } from 'rxjs/internal/observable/dom/AjaxObservable'

import { Block } from '@solidstudio/types'

import { ApplicationState } from 'features/rootReducer'
import { GenericArrayResponse } from 'features/common/types'

import { ActionType, GetBlocksAction } from './action-types'
import { blocksReceived } from './actions'
import { BLOCKS_URL } from './constants'

type Response = GenericArrayResponse<Block>

export const getBlocksEpic = (
  action$: ActionsObservable<GetBlocksAction>,
  state$: StateObservable<ApplicationState>,
  ajax: AjaxCreationMethod
) =>
  action$.pipe(
    ofType(ActionType.GET_BLOCKS),
    switchMap(() => {
      //       return ajax.getJSON<Response>(`${BLOCKS_URL}?connectionId=${payload}`).pipe(
      return ajax.getJSON<Response>(`${BLOCKS_URL}`).pipe(
        map(response => blocksReceived(response.data)),
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

export const blocksEpic = combineEpics(getBlocksEpic)
