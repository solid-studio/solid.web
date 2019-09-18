import { combineReducers } from 'redux'

import { ConnectionState, appReducer as connectionReducer } from "./connections/reducer"
import { ContractState, appReducer as contractReducer } from "./contracts/reducer"
import { CompilerState, appReducer as compilerReducer } from "./compiler/reducer"
import { ContractDefinitionState, appReducer as contractDefinitionReducer } from './contract-definitions/reducer'
import { TabsManagerState, appReducer as tabsReducer } from './tabs/reducer'
import { BlocksState, appReducer as blocksReducer } from './blocks/reducer'
import { TransactionsState, appReducer as transactionsReducer } from './transactions/reducer'

export interface ApplicationState {
  contractState: ContractState
  connectionState: ConnectionState,
  compilerState: CompilerState,
  contractDefinitionState: ContractDefinitionState
  tabsManagerState: TabsManagerState,
  blocksState: BlocksState,
  transactionsState: TransactionsState
}

const rootReducer = combineReducers<ApplicationState>({
  contractState: contractReducer,
  connectionState: connectionReducer,
  compilerState: compilerReducer,
  contractDefinitionState: contractDefinitionReducer,
  tabsManagerState: tabsReducer,
  blocksState: blocksReducer,
  transactionsState: transactionsReducer
})

export default rootReducer
