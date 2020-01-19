import { ActionCreator, Action } from 'redux'

import { ActionType, CloseTabAction, SetTabByIdAction, TabAction } from './action-types'
import { Tab } from './types'

export const openOrSetTabActive: ActionCreator<Action> = (tab: Tab): TabAction => {
  return {
    type: ActionType.OPEN_OR_SET_ACTIVE_TAB,
    payload: tab
  }
}

export const openTab: ActionCreator<TabAction> = (tab: Tab): TabAction => {
  return {
    type: ActionType.OPEN_TAB,
    payload: tab
  }
}

export const setTabActive: ActionCreator<TabAction> = (tab: Tab): TabAction => {
  return {
    type: ActionType.SET_TAB_ACTIVE,
    payload: tab
  }
}

export const closeTab: ActionCreator<CloseTabAction> = (tabId: string): CloseTabAction => {
  return {
    type: ActionType.CLOSE_TAB,
    payload: tabId
  }
}

export const setTabActiveById: ActionCreator<SetTabByIdAction> = (tabId: string): SetTabByIdAction => {
  return {
    type: ActionType.OPEN_OR_SET_ACTIVE_TAB_BY_ID,
    payload: tabId
  }
}
