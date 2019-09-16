import { combineEpics } from 'redux-observable';

import { connectionsEpic } from './connections/epic'
import { tabsEpic } from './tabs/epic'
import { contractsEpic } from './contracts/epic'
import { contractDefinitionsEpic } from './contract-definitions/epic'
import { transactionsEpic } from './transactions/epic'
import { blocksEpic } from './blocks/epic'

export const rootEpic = combineEpics(
    connectionsEpic,
    tabsEpic,
    contractsEpic,
    contractDefinitionsEpic,
    transactionsEpic,
    blocksEpic
);