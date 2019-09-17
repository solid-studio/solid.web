import { of } from 'rxjs';

import { CONTRACT_DEFINITIONS_URL } from 'features/contract-definitions/constants'
import { buildFakeContractDefinitions } from 'features/contract-definitions/faker';

import { TRANSACTIONS_URL } from 'features/transactions/constants';
import { buildFakeTransactions } from 'features/transactions/faker';

import { CONNECTION_URL } from 'features/connections/constants';
import { buildFakeConnections } from 'features/connections/faker';

import { CONTRACTS_URL } from 'features/contracts/constants';
import { buildFakeContracts } from 'features/contracts/faker';

import { BLOCKS_URL } from 'features/blocks/constants';
import { buildFakeBlocks } from 'features/blocks/faker';

export const mockAjax = {
    getJSON: (url: string) => {
        console.log("CALLING FAKE API WITH URL:", url)
        switch (url) {
            case CONTRACTS_URL:
                return of({ data: buildFakeContracts() })
            case BLOCKS_URL:
                return of({ data: buildFakeBlocks() })
            case CONNECTION_URL:
                return of({ data: buildFakeConnections() })
            case TRANSACTIONS_URL:
                return of({ data: buildFakeTransactions() })
            case CONTRACT_DEFINITIONS_URL:
                return of({ data: buildFakeContractDefinitions() })
            default:
                return of([])
        }
    }
}