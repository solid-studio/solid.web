import { ofType, combineEpics, ActionsObservable, StateObservable } from 'redux-observable'
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { AjaxCreationMethod } from 'rxjs/internal/observable/dom/AjaxObservable';

import { TransactionReceipt } from '@solidstudio/solid.types'

import { ApplicationState } from 'features/rootReducer';
import { GenericArrayResponse } from 'features/common/types';

import { ActionType, GetTransactionsAction } from './action-types'
import { transactionsReceived } from './actions';
import { TRANSACTIONS_URL } from './constants';

type Response = GenericArrayResponse<TransactionReceipt>

export const getTransactionsEpic = (action$: ActionsObservable<GetTransactionsAction>, state$: StateObservable<ApplicationState>, ajax: AjaxCreationMethod) => action$.pipe(
    ofType(ActionType.GET_TRANSACTIONS),
    switchMap(() => {
        return ajax.getJSON<Response>(`${TRANSACTIONS_URL}`)
            .pipe(
                map(response => transactionsReceived(response.data)),
                catchError(error => of({
                    type: ActionType.ERROR_WHEN_GETTING_DATA,
                    payload: error.xhr.response,
                    error: true
                })))
    })
);

export const transactionsEpic = combineEpics(
    getTransactionsEpic
)