import { combineReducers } from 'redux'

import { ContractState, contractsReducer, contractsInitialState } from './contracts/reducer'
import { ConnectionState, connectionsReducer, connectionsInitialState } from './connections/reducer'
import { ContractDefinitionState, contractDefinitionReducer, contractDefinitionsInitialState } from './contract-definitions/reducer'
import { TabsManagerState, tabsReducer, tabsManagerInitialState } from './tabs/reducer'
import { BlocksState, blocksReducer, blocksInitialState } from './blocks/reducer'
import { TransactionsState, transactionsReducer, transactionsInitialState } from './transactions/reducer'
import { TracesState, tracesReducer, tracesInitialState } from './traces/reducer'
import { FileItemsState, fileItemsReducer, fileItemsInitialState } from './file-items/reducer'

export interface ApplicationState {
  contractState: ContractState
  connectionState: ConnectionState
  contractDefinitionState: ContractDefinitionState
  tabsManagerState: TabsManagerState
  blocksState: BlocksState
  transactionsState: TransactionsState
  tracesState: TracesState
  fileItemsState: FileItemsState
}

export const initialState: ApplicationState = {
  contractState: contractsInitialState,
  connectionState: connectionsInitialState,
  contractDefinitionState: contractDefinitionsInitialState,
  tabsManagerState: tabsManagerInitialState,
  blocksState: blocksInitialState,
  transactionsState: transactionsInitialState,
  tracesState: tracesInitialState,
  fileItemsState: fileItemsInitialState
}

const rootReducer = combineReducers<ApplicationState>({
  contractState: contractsReducer,
  connectionState: connectionsReducer,
  contractDefinitionState: contractDefinitionReducer,
  tabsManagerState: tabsReducer,
  blocksState: blocksReducer,
  transactionsState: transactionsReducer,
  tracesState: tracesReducer,
  fileItemsState: fileItemsReducer
})

export default rootReducer
