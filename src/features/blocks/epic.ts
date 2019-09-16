import { ofType, combineEpics, ActionsObservable } from 'redux-observable'
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';

import { ActionType, GetBlocksAction } from './action-types'
import { blocksReceived } from './actions';
import { BLOCKS_URL } from './constants';
import { Block } from './types';

// TODO: To improve this duplicate
const BASE_URL = 'http://localhost:3030'

interface Response {
    total: number;
    limit: number;
    skip: number;
    data: Block[];
}

const getBlocksEpic = (action$: ActionsObservable<GetBlocksAction>) => action$.pipe(
    ofType(ActionType.GET_BLOCKS),
    switchMap(() => {
        return ajax.getJSON<Response>(`${BASE_URL}/${BLOCKS_URL}`)
            .pipe(
                map(response => blocksReceived(response.data)),
                catchError(error => of({
                    type: ActionType.ERROR_WHEN_GETTING_DATA,
                    payload: error.xhr.response,
                    error: true
                })))
    })
);

export const blocksEpic = combineEpics(
    getBlocksEpic
)