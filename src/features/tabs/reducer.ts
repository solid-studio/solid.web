import { Reducer } from 'redux'
import { ActionType, Actions } from './action-types'
import { Tab } from './types'

export interface TabsManagerState {
  tabs: Tab[]
  activeTab?: Tab
  // activeTabType?: 'editor' | 'transactions-table-view' | 'contract-table-view' | 'block-table-view'
  // activeTabData?: any // TODO
}

export const tabsManagerInitialState: TabsManagerState = {
  tabs: [],
  activeTab: undefined
}

export const tabsReducer: Reducer<TabsManagerState, Actions> = (
  state: TabsManagerState = tabsManagerInitialState,
  action: Actions
): TabsManagerState => {
  switch (action.type) {
    case ActionType.SET_TAB_ACTIVE:
      return { ...state, activeTab: action.payload }
    case ActionType.OPEN_TAB:
      const newTabs = [...state.tabs, action.payload]
      return { ...state, tabs: newTabs, activeTab: action.payload }
    case ActionType.OPEN_OR_SET_ACTIVE_TAB_BY_ID:
      const newTabActive = state.tabs.find(item => {
        return item.id === action.payload
      })
      return { ...state, activeTab: newTabActive }
    case ActionType.CLOSE_TAB:
      const tabToBeClosed = state.tabs.find(item => {
        return item.id === action.payload
      }) as Tab
      const isTabToBeClosedActive = tabToBeClosed === state.activeTab
      const indexOfTabToBeClosed = state.tabs.indexOf(tabToBeClosed)
      const newTabsFiltered = state.tabs.filter(item => {
        return item.id !== action.payload
      })
      const areThereMoreTabs = newTabsFiltered.length > 0
      const newActiveTabIfActiveTabIsTheOneIMClosing =
        (areThereMoreTabs && newTabsFiltered[indexOfTabToBeClosed]) || newTabsFiltered[indexOfTabToBeClosed - 1]
      return {
        ...state,
        tabs: newTabsFiltered,
        activeTab: isTabToBeClosedActive ? newActiveTabIfActiveTabIsTheOneIMClosing : state.activeTab
      }
    default:
      return state
  }
}
