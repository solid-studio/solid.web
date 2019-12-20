import { ofType, combineEpics, ActionsObservable, StateObservable } from 'redux-observable'
import { of } from 'rxjs'
import { switchMap, map, catchError } from 'rxjs/operators'
import { AjaxCreationMethod } from 'rxjs/internal/observable/dom/AjaxObservable'

import { FileItem } from '@solid-explorer/types'

import { ActionType, GetFileItemsAction } from './action-types'
import { fileItemsReceived } from './actions'
import { FILE_ITEMS_URL } from './constants'

import { ApplicationState } from 'features/rootReducer'
import { GenericArrayResponse } from 'features/common/types'

type Response = GenericArrayResponse<FileItem>

export const getFileItemsEpic = (action$: ActionsObservable<GetFileItemsAction>, state$: StateObservable<ApplicationState>, ajax: AjaxCreationMethod) =>
    action$.pipe(
        ofType(ActionType.GET_FILE_ITEMS),
        switchMap(() => {
            return ajax.getJSON<Response>(`${FILE_ITEMS_URL}`).pipe(
                map(response => fileItemsReceived(response.data)),
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

export const fileItemsEpic = combineEpics(getFileItemsEpic)
