import { ofType, combineEpics, ActionsObservable } from 'redux-observable'
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';

import { ActionType, GetTransactionsAction } from './action-types'
import { transactionsReceived } from './actions';
import { TRANSACTIONS_URL } from './constants';
import { Transaction } from './types';

// TODO: To improve this duplicate
const BASE_URL = 'http://localhost:3030'

interface Response {
    total: number;
    limit: number;
    skip: number;
    data: Transaction[];
}

const getTransactionsEpic = (action$: ActionsObservable<GetTransactionsAction>) => action$.pipe(
    ofType(ActionType.GET_TRANSACTIONS),
    switchMap(() => {
        return ajax.getJSON<Response>(`${BASE_URL}/${TRANSACTIONS_URL}`)
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