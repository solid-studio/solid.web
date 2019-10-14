import { ActionsObservable, StateObservable } from 'redux-observable'
import { Subject, of } from 'rxjs';
import { AjaxCreationMethod } from 'rxjs/internal/observable/dom/AjaxObservable';

import { buildFakeTransactionReceipts } from '@solidstudio/solid.types';

import { ApplicationState, initialState } from '../rootReducer'

import { GetTransactionsAction } from './action-types';
import { transactionsReceived, getTransactions } from './actions';
import { getTransactionsEpic } from './epic';

describe('Transactions Epic Tests', () => {
    const mockAjax: jest.Mocked<AjaxCreationMethod> = {
        get: jest.fn(),
        post: jest.fn(),
        put: jest.fn(),
        patch: jest.fn(),
        delete: jest.fn(),
        getJSON: jest.fn()
    } as any // TODO FIX

    test('getTransactionsEpic', (done) => {
        const transactions = buildFakeTransactionReceipts()

        const getTransactionsAction: GetTransactionsAction = getTransactions()

        const actions$ = ActionsObservable.of(getTransactionsAction)

        const applicationState$: StateObservable<ApplicationState> = new StateObservable<ApplicationState>(new Subject(), initialState);

        mockAjax.getJSON.mockImplementation((url: string, headers?: Object | undefined) => {
            return of({ data: transactions })
        })

        const output$ = getTransactionsEpic(actions$, applicationState$, mockAjax)

        output$.subscribe((action) => {
            expect(action).toEqual(transactionsReceived(transactions))
            done()
        })
    })
})