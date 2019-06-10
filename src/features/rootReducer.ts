import { combineReducers } from 'redux'
// import { appReducer, AppState } from './reducer'
import { ConnectionState, appReducer as connectionReducer } from "./connections/reducer"
import { ContractState, appReducer as contractReducer } from "./contracts/reducer"
import { CompilerState, appReducer as compilerReducer } from "./compiler/reducer"
// import reducers from all features
// done
export interface ApplicationState {
  contractState: ContractState
  connectionState: ConnectionState,
  compilerState: CompilerState
}

const rootReducer = combineReducers<ApplicationState>({
  contractState: contractReducer,
  connectionState: connectionReducer,
  compilerState: compilerReducer
})

export default rootReducer
