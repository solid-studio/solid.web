import 'jsdom-worker'
import { ActionsObservable, StateObservable } from 'redux-observable'
import { Action } from 'redux';
import { Subject, of } from 'rxjs';
import { AjaxCreationMethod } from 'rxjs/internal/observable/dom/AjaxObservable';

import { buildFakeBlocks } from '@solidstudio/solid.types';

import { getBlocksEpic } from './epic';
import { ActionType, GetBlocksAction } from './action-types';

import { blocksReceived } from './actions';
import rootReducer, { ApplicationState } from '../rootReducer'

describe('Blocks Tests', () => {
    const mockAjax: jest.Mocked<AjaxCreationMethod> = {
        get: jest.fn(),
        post: jest.fn(),
        put: jest.fn(),
        patch: jest.fn(),
        delete: jest.fn(),
        getJSON: jest.fn()
    } as any // TODO FIX

    it('should open tab', (done) => {
        const blocks = buildFakeBlocks()

        const getBlocksAction: GetBlocksAction = {
            type: ActionType.GET_BLOCKS
        }

        const actions$ = ActionsObservable.of(getBlocksAction)

        const initialState = {

        } as ApplicationState


        const applicationState$: StateObservable<ApplicationState> = new StateObservable(new Subject(), initialState);

        mockAjax.getJSON.mockImplementation((url: string, headers?: Object | undefined) => {
            return of({ data: blocks })
        })

        const output$ = getBlocksEpic(actions$, applicationState$, mockAjax)

        output$.subscribe((action) => {
            console.log("ACTION", action)
            expect(action).toEqual(blocksReceived(blocks))
            done()
        })
    })
})