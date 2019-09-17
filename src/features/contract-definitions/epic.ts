import { ofType, combineEpics, ActionsObservable, StateObservable } from 'redux-observable'
import { of } from 'rxjs';
import { switchMap, map, catchError, tap } from 'rxjs/operators';

import { ActionType, GetContractDefinitionsAction, ContractDefinitionSelectedAction } from './action-types'
import { contractDefinitionsReceived } from './actions';
import { CONTRACT_DEFINITIONS_URL } from './constants';
import { ContractDefinition } from './types';
import { openOrSetTabActive } from 'features/tabs/actions';
import { AjaxCreationMethod } from 'rxjs/internal/observable/dom/AjaxObservable';
import { ApplicationState } from 'features/rootReducer';

interface Response {
    total: number;
    limit: number;
    skip: number;
    data: ContractDefinition[];
}

const getContractDefinitionsEpic = (action$: ActionsObservable<GetContractDefinitionsAction>, state$: StateObservable<ApplicationState>, ajax: AjaxCreationMethod) => action$.pipe(
    ofType(ActionType.GET_CONTRACT_DEFINITIONS),
    switchMap(() => {
        return ajax.getJSON<Response>(`${CONTRACT_DEFINITIONS_URL}`)
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