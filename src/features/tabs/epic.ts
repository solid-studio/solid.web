// any of X and Y -> openOrSetActive
import { ofType, combineEpics, ActionsObservable } from 'redux-observable'
import { of, Observable } from 'rxjs';
import { mapTo, switchMap, map, catchError, filter, tap } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';

import { openTab, setTabActive } from './actions'
import { ActionType, TabAction } from './action-types'
import { TabsManagerState } from './reducer';

export const openTabEpic = (action$: ActionsObservable<TabAction>, state$: TabsManagerState) => action$.pipe(
    ofType(ActionType.OPEN_OR_SET_ACTIVE_TAB),
    filter(({ payload }) => {
        return state$.tabs.findIndex((item: any) => {
            return item.id == payload.id
        }) === -1
    }),
    map(({ payload }) => openTab(payload))
)
// TODO FIX types
export const setActiveTabEpic = (action$: ActionsObservable<TabAction>, state$: TabsManagerState) => action$.pipe(
    ofType(ActionType.OPEN_OR_SET_ACTIVE_TAB),
    filter(({ payload }) => {
        return state$.tabs.findIndex((item: any) => {
            return item.id == payload.id
        }) !== -1
    }),
    map(({ payload }) => setTabActive(payload))
)

export const tabsEpic = combineEpics(
    openTabEpic,
    setActiveTabEpic
)