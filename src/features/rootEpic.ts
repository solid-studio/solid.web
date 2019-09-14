import { combineEpics } from 'redux-observable';

import { connectionsEpic } from './connections/epic'
import { tabsEpic } from './tabs/epic'

export const rootEpic = combineEpics(
    connectionsEpic,
    tabsEpic
);