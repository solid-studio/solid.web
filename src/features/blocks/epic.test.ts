// import "jsdom-worker" // TODO Maybe my workers should extend from worker, then I will nneed this
import { ActionsObservable, StateObservable } from 'redux-observable'
import { Subject, of } from 'rxjs';
import { AjaxCreationMethod } from 'rxjs/internal/observable/dom/AjaxObservable';

import { buildFakeBlocks } from '@solidstudio/solid.types';

import { ApplicationState, initialState } from '../rootReducer'

import { GetBlocksAction } from './action-types';
import { blocksReceived, getBlocks } from './actions';
import { getBlocksEpic } from './epic';

describe('Blocks Epic Tests', () => {
    const mockAjax: jest.Mocked<AjaxCreationMethod> = {
        get: jest.fn(),
        post: jest.fn(),
        put: jest.fn(),
        patch: jest.fn(),
        delete: jest.fn(),
        getJSON: jest.fn()
    } as any // TODO FIX

    test('getBlocksEpic', (done) => {
        const blocks = buildFakeBlocks()

        const getBlocksAction: GetBlocksAction = getBlocks()

        const actions$ = ActionsObservable.of(getBlocksAction)

        const applicationState$: StateObservable<ApplicationState> = new StateObservable<ApplicationState>(new Subject(), initialState);

        mockAjax.getJSON.mockImplementation((url: string, headers?: Object | undefined) => {
            return of({ data: blocks })
        })

        const output$ = getBlocksEpic(actions$, applicationState$, mockAjax)

        output$.subscribe((action) => {
            expect(action).toEqual(blocksReceived(blocks))
            done()
        })
    })
})