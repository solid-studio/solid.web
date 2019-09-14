import { combineEpics } from 'redux-observable';

import { connectionsEpic } from './connections/epic'
import { tabsEpic } from './tabs/epic'
import { contractsEpic } from './contracts/epic'

export const rootEpic = combineEpics(
    connectionsEpic,
    tabsEpic,
    contractsEpic
);