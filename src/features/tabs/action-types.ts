import { Action } from 'redux'

import { Tab } from './types'

export enum ActionType {
  OPEN_OR_SET_ACTIVE_TAB = 'OPEN_OR_SET_ACTIVE_TAB', // This is the interface
  CLOSE_TAB = 'CLOSE_TAB',
  OPEN_TAB = 'OPEN_TAB',
  SET_TAB_ACTIVE = 'SET_TAB_ACTIVE',
  OPEN_OR_SET_ACTIVE_TAB_BY_ID = 'OPEN_OR_SET_ACTIVE_TAB_BY_ID'
}

export interface TabAction extends Action {
  type: ActionType.OPEN_TAB | ActionType.SET_TAB_ACTIVE | ActionType.OPEN_OR_SET_ACTIVE_TAB
  payload: Tab
}

export interface SetTabByIdAction extends Action {
  type: ActionType.OPEN_OR_SET_ACTIVE_TAB_BY_ID
  payload: string
}

export interface CloseTabAction extends Action {
  type: ActionType.CLOSE_TAB
  payload: string
}

export type Actions = TabAction | SetTabByIdAction | CloseTabAction
