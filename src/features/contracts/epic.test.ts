// import "jsdom-worker" // TODO Maybe my workers should extend from worker, then I will nneed this
import { ActionsObservable, StateObservable } from 'redux-observable'
import { Subject, of } from 'rxjs';
import { AjaxCreationMethod } from 'rxjs/internal/observable/dom/AjaxObservable';

import { buildFakeContracts, buildFakeContract } from '@solidstudio/solid.types';

import { ApplicationState, initialState } from '../rootReducer'

import { openOrSetTabActive } from 'features/tabs';

import { GetContractsAction, MaximizeContractViewAction } from './action-types';
import { getContracts, maximizeContractView, contractsReceived } from './actions';
import { getContractsEpic, onMaximizeContractEpic } from './epic';

describe('Contracts Epic Tests', () => {
    const mockAjax: jest.Mocked<AjaxCreationMethod> = {
        get: jest.fn(),
        post: jest.fn(),
        put: jest.fn(),
        patch: jest.fn(),
        delete: jest.fn(),
        getJSON: jest.fn()
    } as any // TODO FIX

    test('getContractsEpic', (done) => {
        const contracts = buildFakeContracts()

        const getContractsAction: GetContractsAction = getContracts()

        const actions$ = ActionsObservable.of(getContractsAction)

        const applicationState$: StateObservable<ApplicationState> = new StateObservable<ApplicationState>(new Subject(), initialState);

        mockAjax.getJSON.mockImplementation((url: string, headers?: Object | undefined) => {
            return of({ data: contracts })
        })

        const output$ = getContractsEpic(actions$, applicationState$, mockAjax)

        output$.subscribe((action) => {
            expect(action).toEqual(contractsReceived(contracts))
            done()
        })
    })

    test('onMaximizeContractEpic', (done) => {
        const contract = buildFakeContract()

        const maximizeContractAction: MaximizeContractViewAction = maximizeContractView(contract)

        const actions$ = ActionsObservable.of(maximizeContractAction)

        const output$ = onMaximizeContractEpic(actions$)

        output$.subscribe((action) => {
            expect(action).toEqual(openOrSetTabActive({
                type: maximizeContractAction.payload.type,
                data: maximizeContractAction.payload,
                title: maximizeContractAction.payload.name,
                id: maximizeContractAction.payload.id
            }))
            done()
        })
    })
})