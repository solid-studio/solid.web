import { ofType, combineEpics, ActionsObservable } from 'redux-observable'
import { of } from 'rxjs';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';

import { ActionType, GetContractDefinitionsAction, ContractDefinitionSelectedAction } from './action-types'
import { contractDefinitionsReceived } from './actions';
import { CONTRACT_DEFINITIONS_URL } from './constants';
import { ContractDefinition } from './types';
import { openOrSetTabActive } from 'features/tabs/actions';

// TODO: To improve this duplicate
const BASE_URL = 'http://localhost:3030'

interface Response {
    total: number;
    limit: number;
    skip: number;
    data: ContractDefinition[];
}

const getContractDefinitionsEpic = (action$: ActionsObservable<GetContractDefinitionsAction>) => action$.pipe(
    ofType(ActionType.GET_CONTRACT_DEFINITIONS),
    switchMap(() => {
        return ajax.getJSON<Response>(`${BASE_URL}/${CONTRACT_DEFINITIONS_URL}`)
            .pipe(
                map(response => contractDefinitionsReceived(response.data)),
                catchError(error => of({
                    type: ActionType.ERROR_WHEN_GETTING_DATA,
                    payload: error.xhr.response,
                    error: true
                })))
    })
);

const onContractDefinitionSelected = (action$: ActionsObservable<ContractDefinitionSelectedAction>) => action$.pipe(
    ofType<ContractDefinitionSelectedAction>(ActionType.CONTRACT_DEFINITION_SELECTED),
    tap(({ payload }) => console.log("PAYLOAD", payload)),
    map(({ payload }) => {
        return openOrSetTabActive({
            type: payload.type,
            data: payload,
            title: payload.name,
            id: payload._id
        })
    })
)

export const contractDefinitionsEpic = combineEpics(
    getContractDefinitionsEpic,
    onContractDefinitionSelected
)