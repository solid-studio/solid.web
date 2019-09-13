import { combineReducers } from 'redux'
// import { appReducer, AppState } from './reducer'
import { ConnectionState, appReducer as connectionReducer } from "./connections/reducer"
import { ContractState, appReducer as contractReducer } from "./contracts/reducer"
import { CompilerState, appReducer as compilerReducer } from "./compiler/reducer"
import { ContractDefinitionState, appReducer as contractDefinitionReducer } from './contract-definitions/reducer'

export interface ApplicationState {
  contractState: ContractState
  connectionState: ConnectionState,
  compilerState: CompilerState,
  contractDefinitionState: ContractDefinitionState
}

const rootReducer = combineReducers<ApplicationState>({
  contractState: contractReducer,
  connectionState: connectionReducer,
  compilerState: compilerReducer,
  contractDefinitionState: contractDefinitionReducer
})

export default rootReducer
