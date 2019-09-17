import { ofType, combineEpics, ActionsObservable } from 'redux-observable'
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';

import { ActionType, GetContractsAction, MaximizeContractViewAction } from './action-types'
import { contractsReceived } from './actions';
import { CONTRACTS_URL } from './constants';
import { Contract } from './types';
import { openOrSetTabActive } from 'features/tabs';

// TODO: To improve this duplicate
const BASE_URL = 'http://localhost:3030'

interface Response {
    total: number;
    limit: number;
    skip: number;
    data: Contract[];
}

const getContractsEpic = (action$: ActionsObservable<GetContractsAction>) => action$.pipe(
    ofType(ActionType.GET_CONTRACTS),
    switchMap(() => {
        return ajax.getJSON<Response>(`${BASE_URL}/${CONTRACTS_URL}`)
            .pipe(
                map(response => contractsReceived(response.data)),
                catchError(error => of({
                    type: ActionType.ERROR_WHEN_GETTING_DATA,
                    payload: error.xhr.response,
                    error: true
                })))
    })
);

const onMaximizeContract = (action$: ActionsObservable<MaximizeContractViewAction>) => action$.pipe(
    ofType<MaximizeContractViewAction>(ActionType.ON_MAXIMIZE_CONTRACT_VIEW),
    map(({ payload }: any) => { // TODO CONVERT TO ContractItem, which is Contract type with type field
        return openOrSetTabActive({
            type: payload.type,
            data: payload,
            title: payload.name,
            id: payload._id
        })
    })
)

export const contractsEpic = combineEpics(
    getContractsEpic,
    onMaximizeContract
)