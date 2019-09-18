import { ActionsObservable } from 'redux-observable'

import { openTabEpic, setActiveTabEpic, tabsEpic } from './epic';
import { ActionType } from './action-types';
import { TabsManagerState } from './reducer';
import { buildFakeTab, buildFakeTabs } from './faker'
import { setTabActive, openTab } from './actions';
import { Action } from 'redux';

describe('TabsEpics Tests', () => {
    it('should open tab', (done) => {
        const tab = buildFakeTabs()

        const actions$ = ActionsObservable.of({
            type: ActionType.OPEN_OR_SET_ACTIVE_TAB,
            payload: tab
        })

        const state$: TabsManagerState = {
            tabs: [],
            activeTab: undefined
        }

        const output$ = tabsEpic(actions$, state$)

        output$.subscribe((action) => {
            console.log("ACTION", action)
            expect(action).toEqual(openTab(tab))
            done()
        })
    })

    it('should set tab active', (done) => {
        const tabs = buildFakeTabs()
        const tab1 = tabs[0]
        const tab2 = tabs[1]

        const actions$ = ActionsObservable.of({
            type: ActionType.OPEN_OR_SET_ACTIVE_TAB,
            payload: tab1
        })

        const state$: TabsManagerState = {
            tabs,
            activeTab: tab2
        }

        const output$ = tabsEpic(actions$, state$)

        output$.subscribe((action: Action) => {
            console.log("ACTION", action)
            expect(action).toEqual(setTabActive(tab1))
            done()
        })
    })
})