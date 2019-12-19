import { buildFakeTraces } from '@solid-explorer/types'

import { getComputedStorage } from './ContractStorage'

describe('ContractStorage', () => {
    test('getComputedStorage', () => {
        const traces = buildFakeTraces()

        const result = getComputedStorage(traces)
        console.log("Result", result)

        expect(result).toBeTruthy()
    })

    // cases 
    // tengo multiple traces 
    // y ninguna collisiona
    // assert
    // done

    // tengo multiple traces 
    // y 1 collisiona
    // assert
    // done


})

const traceLogs1 = () => {
    return [
        {
            depth: 1,
            gas: 30003,
            gasCost: 3,
            memory: [
                '6080604052348015600f57600080fd5b506004361060325760003560e01c8063',
                '1865c57d146037578063c19d93fb14604f575b600080fd5b603d6055565b6040',
                '8051918252519081900360200190f35b603d605b565b60005490565b60005481',
                '56fea265627a7a723058209fa44d2c74885e60715e4d845d6f360f80cbef23b8',
                '4d3804408903f946b90bbf64736f6c634300050a003200000000000000000000'
            ],
            op: 'PUSH1',
            pc: 32,
            stack: ['0000000000000000000000000000000000000000000000000000000000000096'],
            storage: {
                '0000000000000000000000000000000000000000000000000000000000000000': '00000000000000000000000000000000000000000000000000000000000003e8'
            }
        },
        {
            depth: 1,
            gas: 30000,
            gasCost: 0,
            memory: [
                '6080604052348015600f57600080fd5b506004361060325760003560e01c8063',
                '1865c57d146037578063c19d93fb14604f575b600080fd5b603d6055565b6040',
                '8051918252519081900360200190f35b603d605b565b60005490565b60005481',
                '56fea265627a7a723058209fa44d2c74885e60715e4d845d6f360f80cbef23b8',
                '4d3804408903f946b90bbf64736f6c634300050a003200000000000000000000'
            ],
            op: 'RETURN',
            pc: 34,
            stack: [
                '0000000000000000000000000000000000000000000000000000000000000096',
                '0000000000000000000000000000000000000000000000000000000000000000'
            ],
            storage: {
                '0000000000000000000000000000000000000000000000000000000000000000': '00000000000000000000000000000000000000000000000000000000000003e8'
            }
        }
    ];
};