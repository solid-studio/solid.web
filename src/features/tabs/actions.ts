import { ActionCreator, Action } from 'redux'

import { ActionType, TabAction, SetTabByIdAction } from './action-types'
import { Tab } from './types'

export const openOrSetTabActive: ActionCreator<Action> = (tab: Tab): TabAction => {
  return {
    type: ActionType.OPEN_OR_SET_ACTIVE_TAB,
    payload: tab
  }
}

export const openTab: ActionCreator<Action> = (tab: Tab): TabAction => {
  console.log('OPEN TAB', tab)
  return {
    type: ActionType.OPEN_TAB,
    payload: tab
  }
}

export const setTabActive: ActionCreator<Action> = (tab: Tab): TabAction => {
  console.log('SET TAB ACTIVE', tab)
  return {
    type: ActionType.SET_TAB_ACTIVE,
    payload: tab
  }
}

export const closeTab: ActionCreator<Action> = (tab: Tab): TabAction => {
  return {
    type: ActionType.CLOSE_TAB,
    payload: tab
  }
}

export const setTabActiveById: ActionCreator<Action> = (tabId: string): SetTabByIdAction => {
  return {
    type: ActionType.OPEN_OR_SET_ACTIVE_TAB_BY_ID,
    payload: tabId
  }
}
