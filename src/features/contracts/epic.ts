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
import { GenericArrayResponse } from 'features/common/types';

type Response = GenericArrayResponse<Contract>

export const getContractsEpic = (action$: ActionsObservable<GetContractsAction>, state$: StateObservable<ApplicationState>, ajax: AjaxCreationMethod) => action$.pipe(
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

export const onMaximizeContractEpic = (action$: ActionsObservable<MaximizeContractViewAction>) => action$.pipe(
    ofType<MaximizeContractViewAction>(ActionType.ON_MAXIMIZE_CONTRACT_VIEW),
    map(({ payload }: MaximizeContractViewAction) => {
        return openOrSetTabActive({
            type: payload.type,
            data: payload,
            title: payload.name,
            id: payload.id
        })
    })
)

export const contractsEpic = combineEpics(
    getContractsEpic,
    onMaximizeContractEpic
)