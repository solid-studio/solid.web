import { ActionsObservable, StateObservable } from 'redux-observable'
import { Subject, of } from 'rxjs';
import { AjaxCreationMethod } from 'rxjs/internal/observable/dom/AjaxObservable';

import { buildFakeContractDefinitions, buildFakeContractDefinition } from '@solidstudio/solid.types';

import { ApplicationState, initialState } from '../rootReducer'
import { openOrSetTabActive } from 'features/tabs/actions';

import { GetContractDefinitionsAction, ContractDefinitionSelectedAction } from './action-types';
import { contractDefinitionsReceived, getContractDefinitions, contractDefinitionSelected } from './actions';
import { getContractDefinitionsEpic, onContractDefinitionSelectedEpic } from './epic';
import { ContractDefinitionItem } from './types';

describe('Contract Definitions Epic Tests', () => {
    const mockAjax: jest.Mocked<AjaxCreationMethod> = {
        get: jest.fn(),
        post: jest.fn(),
        put: jest.fn(),
        patch: jest.fn(),
        delete: jest.fn(),
        getJSON: jest.fn()
    } as any // TODO FIX

    test('getContractDefinitionsEpic', (done) => {
        const contractDefinitions = buildFakeContractDefinitions()

        const getContractDefinitionsAction: GetContractDefinitionsAction = getContractDefinitions()

        const actions$ = ActionsObservable.of(getContractDefinitionsAction)

        const applicationState$: StateObservable<ApplicationState> = new StateObservable<ApplicationState>(new Subject(), initialState);

        mockAjax.getJSON.mockImplementation((url: string, headers?: Object | undefined) => {
            return of({ data: contractDefinitions })
        })

        const output$ = getContractDefinitionsEpic(actions$, applicationState$, mockAjax)

        output$.subscribe((action) => {
            expect(action).toEqual(contractDefinitionsReceived(contractDefinitions))
            done()
        })
    })

    test('onContractDefinitionSelectedEpic', (done) => {
        const contractDefinition = buildFakeContractDefinition()
        const contractDefinitionItem: ContractDefinitionItem = {
            ...contractDefinition,
            type: 'contract-definition'
        }

        const contractDefinitionSelectedAction: ContractDefinitionSelectedAction = contractDefinitionSelected(contractDefinitionItem)

        const actions$ = ActionsObservable.of(contractDefinitionSelectedAction)

        const output$ = onContractDefinitionSelectedEpic(actions$)

        output$.subscribe((action) => {
            expect(action).toEqual(openOrSetTabActive({
                type: contractDefinitionSelectedAction.payload.type,
                data: contractDefinitionSelectedAction.payload,
                title: contractDefinitionSelectedAction.payload.name,
                id: contractDefinitionSelectedAction.payload.id
            }))
            done()
        })
    })
})