import { ofType, combineEpics, ActionsObservable, StateObservable } from 'redux-observable'
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { AjaxCreationMethod } from 'rxjs/internal/observable/dom/AjaxObservable';

import { Contract } from '@solidstudio/solid.types'

import { ActionType, GetContractsAction, MaximizeContractViewAction } from './action-types'
import { contractsReceived } from './actions';
import { CONTRACTS_URL } from './constants';
import { openOrSetTabActive } from 'features/tabs';
import { ApplicationState } from 'features/rootReducer';

interface Response {
    total: number;
    limit: number;
    skip: number;
    data: Contract[];
}

const getContractsEpic = (action$: ActionsObservable<GetContractsAction>, state$: StateObservable<ApplicationState>, ajax: AjaxCreationMethod) => action$.pipe(
    ofType(ActionType.GET_CONTRACTS),
    switchMap(({ payload }) => {
        return ajax.getJSON<Response>(`${CONTRACTS_URL}`) // ?connectionId=${payload} TODO: removed for demo, but I should lazy load
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