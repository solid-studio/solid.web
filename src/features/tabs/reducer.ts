import { Reducer } from 'redux'
import { ActionType, Actions } from './action-types'
import { Tab } from './types'

export interface TabsManagerState {
  tabs: Tab[]
  activeTab?: Tab
  // activeTabType?: 'editor' | 'transactions-table-view' | 'contract-table-view' | 'block-table-view'
  // activeTabData?: any // TODO
}

export const initialState: TabsManagerState = {
  tabs: [],
  activeTab: undefined
}

export const appReducer: Reducer<TabsManagerState, Actions> = (
  state: TabsManagerState = initialState,
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
      // TODO: encontrar la tab en el arreglo, y removerla..
      return { ...state }
    default:
      return state
  }
}
// const tab = state.tabs.find((element) => {
//     return element.id == action.payload.id
// })
// const tabExists = tab !== undefined
// // si existe, NO pusheo
// // si NO existe, pusheo

// // setActive flags, done...
// // si hay una activa, desactivarla
// //  //// con el otro approach, solo tendria que cambiar el activeTabId
// // si la tab que mando esta en el arreglo, cambiar estado
// // si la tab que mando NO esta en el arreglo, abrirla
// // set active values.. done

// finish reducer
// do ui components
// do epic..
