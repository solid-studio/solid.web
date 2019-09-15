import { ofType, combineEpics, ActionsObservable } from 'redux-observable'
import { of } from 'rxjs';
import { mapTo, switchMap, map, catchError } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';

import { ActionType, GetConnectionsAction, CreateConnectionAction } from './action-types'
import { connectionsReceived, connectionCreated } from './actions';
import { CONNECTION_URL } from './constants';
import { Connection } from './types';

const BASE_URL = 'http://localhost:3030'

interface Response {
    total: number;
    limit: number;
    skip: number;
    data: Connection[];
}

const createConnectionEpic = (action$: ActionsObservable<CreateConnectionAction>) => action$.pipe(
    ofType(ActionType.CREATE_CONNECTION),
    switchMap(({ payload }) => {
        return ajax.post(`${BASE_URL}/${CONNECTION_URL}`, payload)
            .pipe(
                map((data) => connectionCreated(data.response)),
                catchError(error => of({
                    type: ActionType.ERROR_WHEN_GETTING_DATA,
                    payload: error.xhr.response,
                    error: true
                }))
            )
    })
)

const onConnectionCompletedEpic = (action$: ActionsObservable<CreateConnectionAction>) => action$.pipe(
    ofType(ActionType.CONNECTION_CREATED),
    mapTo({
        type: ActionType.OPEN_CONNECTION_MODAL,
        payload: false
    })
)

const getConnectionsEpic = (action$: ActionsObservable<GetConnectionsAction>) => action$.pipe(
    ofType(ActionType.GET_CONNECTIONS),
    switchMap(() => {
        return ajax.getJSON<Response>(`${BASE_URL}/${CONNECTION_URL}`)
            .pipe(
                map(response => connectionsReceived(response.data)),
                catchError(error => of({
                    type: ActionType.ERROR_WHEN_GETTING_DATA,
                    payload: error.xhr.response,
                    error: true
                })))
    })
);

export const connectionsEpic = combineEpics(
    getConnectionsEpic,
    createConnectionEpic,
    onConnectionCompletedEpic
)