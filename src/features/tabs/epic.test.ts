import { ActionsObservable, StateObservable } from 'redux-observable'
import { Action } from 'redux';
import { Subject } from 'rxjs';
import { AjaxCreationMethod } from 'rxjs/internal/observable/dom/AjaxObservable'

import { ApplicationState } from '../rootReducer'
import rootReducer from '../rootReducer';

import { buildFakeTab, buildFakeTabs } from './faker'
import { ActionType, TabAction } from './action-types';
import { setTabActive, openTab } from './actions';
import { TabsManagerState } from './reducer';
import { tabsEpic } from './epic';

describe('TabsEpics Tests', () => {
    const mockAjax: jest.Mocked<AjaxCreationMethod> = {
        get: jest.fn(),
        post: jest.fn(),
        put: jest.fn(),
        patch: jest.fn(),
        delete: jest.fn(),
        getJSON: jest.fn()
    } as any // TODO FIX

    it('should open tab', (done) => {
        const tab = buildFakeTab()

        const tabAction: TabAction = {
            type: ActionType.OPEN_OR_SET_ACTIVE_TAB,
            payload: tab
        }

        const actions$ = ActionsObservable.of(tabAction)

        const tabsManagerState: TabsManagerState = {
            tabs: [],
            activeTab: undefined
        }

        const initialState = {
            ...rootReducer,
            tabsManagerState: tabsManagerState
        } as ApplicationState


        const applicationState$: StateObservable<ApplicationState> = new StateObservable(new Subject(), initialState);

        const output$ = tabsEpic(actions$, applicationState$, mockAjax)

        output$.subscribe((action) => {
            expect(action).toEqual(openTab(tab))
            done()
        })
    })

    it('should set tab active', (done) => {
        const tabs = buildFakeTabs()
        const tab1 = tabs[0]
        const tab2 = tabs[1]

        const tabAction: TabAction = {
            type: ActionType.OPEN_OR_SET_ACTIVE_TAB,
            payload: tab1
        }

        const actions$ = ActionsObservable.of(tabAction)

        const tabsManagerState: TabsManagerState = {
            tabs,
            activeTab: tab2
        }

        const initialState = {
            ...rootReducer,
            tabsManagerState: tabsManagerState
        } as ApplicationState

        const applicationState$: StateObservable<ApplicationState> = new StateObservable(new Subject(), initialState);

        const output$ = tabsEpic(actions$, applicationState$, mockAjax)

        output$.subscribe((action: Action) => {
            expect(action).toEqual(setTabActive(tab1))
            done()
        })
    })
})