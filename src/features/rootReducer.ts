import { combineReducers } from 'redux'

import { ConnectionState, appReducer as connectionReducer } from "./connections/reducer"
import { ContractState, appReducer as contractReducer } from "./contracts/reducer"
import { CompilerState, appReducer as compilerReducer } from "./compiler/reducer"
import { ContractDefinitionState, appReducer as contractDefinitionReducer } from './contract-definitions/reducer'
import { TabsManagerState, appReducer as tabsReducer } from './tabs/reducer'

export interface ApplicationState {
  contractState: ContractState
  connectionState: ConnectionState,
  compilerState: CompilerState,
  contractDefinitionState: ContractDefinitionState
  tabsManagerState: TabsManagerState
}

const rootReducer = combineReducers<ApplicationState>({
  contractState: contractReducer,
  connectionState: connectionReducer,
  compilerState: compilerReducer,
  contractDefinitionState: contractDefinitionReducer,
  tabsManagerState: tabsReducer
})

export default rootReducer
