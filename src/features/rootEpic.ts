import { combineEpics } from 'redux-observable';

import { connectionsEpic } from './connections/epic'

export const rootEpic = combineEpics(
    connectionsEpic
);