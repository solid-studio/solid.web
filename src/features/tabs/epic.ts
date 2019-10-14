import { ofType, combineEpics, ActionsObservable, StateObservable } from 'redux-observable'
import { map, filter } from 'rxjs/operators'

import { openTab, setTabActive } from './actions'
import { ActionType, TabAction } from './action-types'
import { ApplicationState } from 'features/rootReducer'

export const openTabEpic = (action$: ActionsObservable<TabAction>, state$: StateObservable<ApplicationState>) =>
  action$.pipe(
    ofType(ActionType.OPEN_OR_SET_ACTIVE_TAB),
    filter(({ payload }) => {
      return (
        state$.value.tabsManagerState.tabs.findIndex((item: any) => {
          return item.id === payload.id
        }) === -1
      )
    }),
    map(({ payload }) => openTab(payload))
  )

export const setActiveTabEpic = (action$: ActionsObservable<TabAction>, state$: StateObservable<ApplicationState>) =>
  action$.pipe(
    ofType(ActionType.OPEN_OR_SET_ACTIVE_TAB),
    filter(({ payload }) => {
      return (
        state$.value.tabsManagerState.tabs.findIndex((item: any) => {
          return item.id === payload.id
        }) !== -1
      )
    }),
    map(({ payload }) => setTabActive(payload))
  )

export const tabsEpic = combineEpics(openTabEpic, setActiveTabEpic)
