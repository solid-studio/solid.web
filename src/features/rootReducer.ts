import { combineReducers } from 'redux'

import {
  ContractState,
  appReducer as contractReducer,
  initialState as contractsInitialState
} from './contracts/reducer'
import {
  ConnectionState,
  appReducer as connectionReducer,
  initialState as connectionsInitialState
} from './connections/reducer'
import { CompilerState, appReducer as compilerReducer, initialState as compilerInitialState } from './compiler/reducer'
import {
  ContractDefinitionState,
  appReducer as contractDefinitionReducer,
  initialState as contractDefinitionsInitialState
} from './contract-definitions/reducer'
import { TabsManagerState, appReducer as tabsReducer, initialState as tabsManagerInitialState } from './tabs/reducer'
import { BlocksState, appReducer as blocksReducer, initialState as blocksInitialState } from './blocks/reducer'
import {
  TransactionsState,
  appReducer as transactionsReducer,
  initialState as transactionsInitialState
} from './transactions/reducer'

import { TracesState, appReducer as tracesReducer, initialState as tracesInitialState } from './traces/reducer'
import { FileItemsState, appReducer as fileItemsReducer, initialState as fileItemsInitialState } from './file-items/reducer'

export interface ApplicationState {
  contractState: ContractState
  connectionState: ConnectionState
  compilerState: CompilerState
  contractDefinitionState: ContractDefinitionState
  tabsManagerState: TabsManagerState
  blocksState: BlocksState
  transactionsState: TransactionsState,
  tracesState: TracesState,
  fileItemsState: FileItemsState
}

export const initialState: ApplicationState = {
  contractState: contractsInitialState,
  connectionState: connectionsInitialState,
  compilerState: compilerInitialState,
  contractDefinitionState: contractDefinitionsInitialState,
  tabsManagerState: tabsManagerInitialState,
  blocksState: blocksInitialState,
  transactionsState: transactionsInitialState,
  tracesState: tracesInitialState,
  fileItemsState: fileItemsInitialState
}

const rootReducer = combineReducers<ApplicationState>({
  contractState: contractReducer,
  connectionState: connectionReducer,
  compilerState: compilerReducer,
  contractDefinitionState: contractDefinitionReducer,
  tabsManagerState: tabsReducer,
  blocksState: blocksReducer,
  transactionsState: transactionsReducer,
  tracesState: tracesReducer,
  fileItemsState: fileItemsReducer
})

export default rootReducer
