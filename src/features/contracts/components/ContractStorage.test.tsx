import { buildFakeTrace, StructLog } from '@solid-explorer/types'

import { Storage } from '../types'

import { getComputedStorage, getStorageItemsWithName } from './ContractStorage'

describe('ContractStorage', () => {

    describe('getComputedStorage', () => {
        test('storage is calculated from 1 trace', () => {
            const trace1 = buildFakeTrace({
                structLogs: traceLogs1()
            })

            const result = getComputedStorage([trace1])

            const expectedStorage: Storage[] = [{
                slot: '0000000000000000000000000000000000000000000000000000000000000000',
                value: '00000000000000000000000000000000000000000000000000000000000003e8'
            }]

            expect(result).toEqual(expectedStorage)
        })

        test('storage is calculated from 2 traces', () => {
            const trace1 = buildFakeTrace({
                structLogs: traceLogs1()
            })

            const trace2 = buildFakeTrace({
                structLogs: traceLogs2()
            })

            const result = getComputedStorage([trace1, trace2])

            const expectedStorage: Storage[] = [{
                slot: '0000000000000000000000000000000000000000000000000000000000000000',
                value: '00000000000000000000000000000000000000000000000000000000000003e8'
            },
            {
                slot: '0000000000000000000000000000000000000000000000000000000000000001',
                value: '0000000000000000000000000000000000000000000000000000000000000001'
            }]

            expect(result).toEqual(expectedStorage)
        })

        test('storage is calculated from 3 traces', () => {
            const trace1 = buildFakeTrace({
                structLogs: traceLogs1()
            })

            const trace2 = buildFakeTrace({
                structLogs: traceLogs2()
            })

            const trace3 = buildFakeTrace({
                structLogs: traceLogs3()
            })

            const result = getComputedStorage([trace1, trace2, trace3])

            const expectedStorage: Storage[] = [{
                slot: '0000000000000000000000000000000000000000000000000000000000000000',
                value: '00000000000000000000000000000000000000000000000000000000000003e8'
            },
            {
                slot: '0000000000000000000000000000000000000000000000000000000000000001',
                value: '0000000000000000000000000000000000000000000000000000000000000001'
            },
            {
                slot: '0000000000000000000000000000000000000000000000000000000000000002',
                value: '0000000000000000000000000000000000000000000000000000000000000002'
            }
            ]

            expect(result).toEqual(expectedStorage)
        })

        test('storage is calculated with multiple traces with slot collisions', () => {
            const trace1 = buildFakeTrace({
                structLogs: traceLogs1()
            })

            const trace2WithCollision = buildFakeTrace({
                structLogs: traceWithCollisionWithTrace1()
            })

            const result = getComputedStorage([trace1, trace2WithCollision])

            const expectedStorage: Storage[] = [{
                slot: '0000000000000000000000000000000000000000000000000000000000000000',
                value: '0000000000000000000000000000000000000000000000000000000000000001'
            }]

            expect(result).toEqual(expectedStorage)
        })
    })

    describe('getStorageItemsWithName', () => {

        test('names are calculated correctly', () => {
            const astAsString = '{"absolutePath":"SimpleStorageAdvanced.sol","exportedSymbols":{"SimpleStorageAdvanced":[38]},"id":39,"nodeType":"SourceUnit","nodes":[{"id":1,"literals":["solidity","^","0.5",".3"],"nodeType":"PragmaDirective","src":"0:23:0"},{"baseContracts":[],"contractDependencies":[],"contractKind":"contract","documentation":null,"fullyImplemented":true,"id":38,"linearizedBaseContracts":[38],"name":"SimpleStorageAdvanced","nodeType":"ContractDefinition","nodes":[{"constant":false,"id":3,"name":"value","nodeType":"VariableDeclaration","scope":38,"src":"63:20:0","stateVariable":true,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"},"typeName":{"id":2,"name":"uint256","nodeType":"ElementaryTypeName","src":"63:7:0","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}},"value":null,"visibility":"public"},{"constant":false,"id":5,"name":"numberOfTokens","nodeType":"VariableDeclaration","scope":38,"src":"89:29:0","stateVariable":true,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"},"typeName":{"id":4,"name":"uint256","nodeType":"ElementaryTypeName","src":"89:7:0","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}},"value":null,"visibility":"public"},{"body":{"id":16,"nodeType":"Block","src":"146:58:0","statements":[{"expression":{"argumentTypes":null,"id":10,"isConstant":false,"isLValue":false,"isPure":false,"lValueRequested":false,"leftHandSide":{"argumentTypes":null,"id":8,"name":"value","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":3,"src":"155:5:0","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}},"nodeType":"Assignment","operator":"=","rightHandSide":{"argumentTypes":null,"hexValue":"31303030","id":9,"isConstant":false,"isLValue":false,"isPure":true,"kind":"number","lValueRequested":false,"nodeType":"Literal","src":"163:4:0","subdenomination":null,"typeDescriptions":{"typeIdentifier":"t_rational_1000_by_1","typeString":"int_const 1000"},"value":"1000"},"src":"155:12:0","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}},"id":11,"nodeType":"ExpressionStatement","src":"155:12:0"},{"expression":{"argumentTypes":null,"id":14,"isConstant":false,"isLValue":false,"isPure":false,"lValueRequested":false,"leftHandSide":{"argumentTypes":null,"id":12,"name":"numberOfTokens","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":5,"src":"176:14:0","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}},"nodeType":"Assignment","operator":"=","rightHandSide":{"argumentTypes":null,"hexValue":"32303030","id":13,"isConstant":false,"isLValue":false,"isPure":true,"kind":"number","lValueRequested":false,"nodeType":"Literal","src":"193:4:0","subdenomination":null,"typeDescriptions":{"typeIdentifier":"t_rational_2000_by_1","typeString":"int_const 2000"},"value":"2000"},"src":"176:21:0","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}},"id":15,"nodeType":"ExpressionStatement","src":"176:21:0"}]},"documentation":null,"id":17,"implemented":true,"kind":"constructor","modifiers":[],"name":"","nodeType":"FunctionDefinition","parameters":{"id":6,"nodeType":"ParameterList","parameters":[],"src":"136:2:0"},"returnParameters":{"id":7,"nodeType":"ParameterList","parameters":[],"src":"146:0:0"},"scope":38,"src":"125:79:0","stateMutability":"nonpayable","superFunction":null,"visibility":"public"},{"body":{"id":26,"nodeType":"Block","src":"253:33:0","statements":[{"expression":{"argumentTypes":null,"id":24,"isConstant":false,"isLValue":false,"isPure":false,"lValueRequested":false,"leftHandSide":{"argumentTypes":null,"id":22,"name":"value","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":3,"src":"263:5:0","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}},"nodeType":"Assignment","operator":"=","rightHandSide":{"argumentTypes":null,"id":23,"name":"newValue","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":19,"src":"271:8:0","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}},"src":"263:16:0","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}},"id":25,"nodeType":"ExpressionStatement","src":"263:16:0"}]},"documentation":null,"id":27,"implemented":true,"kind":"function","modifiers":[],"name":"setValue","nodeType":"FunctionDefinition","parameters":{"id":20,"nodeType":"ParameterList","parameters":[{"constant":false,"id":19,"name":"newValue","nodeType":"VariableDeclaration","scope":27,"src":"228:16:0","stateVariable":false,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"},"typeName":{"id":18,"name":"uint256","nodeType":"ElementaryTypeName","src":"228:7:0","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}},"value":null,"visibility":"internal"}],"src":"227:18:0"},"returnParameters":{"id":21,"nodeType":"ParameterList","parameters":[],"src":"253:0:0"},"scope":38,"src":"210:76:0","stateMutability":"nonpayable","superFunction":null,"visibility":"public"},{"body":{"id":36,"nodeType":"Block","src":"344:42:0","statements":[{"expression":{"argumentTypes":null,"id":34,"isConstant":false,"isLValue":false,"isPure":false,"lValueRequested":false,"leftHandSide":{"argumentTypes":null,"id":32,"name":"numberOfTokens","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":5,"src":"354:14:0","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}},"nodeType":"Assignment","operator":"=","rightHandSide":{"argumentTypes":null,"id":33,"name":"newValue","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":29,"src":"371:8:0","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}},"src":"354:25:0","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}},"id":35,"nodeType":"ExpressionStatement","src":"354:25:0"}]},"documentation":null,"id":37,"implemented":true,"kind":"function","modifiers":[],"name":"setNumberOfTokens","nodeType":"FunctionDefinition","parameters":{"id":30,"nodeType":"ParameterList","parameters":[{"constant":false,"id":29,"name":"newValue","nodeType":"VariableDeclaration","scope":37,"src":"319:16:0","stateVariable":false,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"},"typeName":{"id":28,"name":"uint256","nodeType":"ElementaryTypeName","src":"319:7:0","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}},"value":null,"visibility":"internal"}],"src":"318:18:0"},"returnParameters":{"id":31,"nodeType":"ParameterList","parameters":[],"src":"344:0:0"},"scope":38,"src":"292:94:0","stateMutability":"nonpayable","superFunction":null,"visibility":"public"}],"scope":39,"src":"25:363:0"}],"src":"0:388:0"}'

            const sampleStorage: Storage[] = [{
                slot: '0000000000000000000000000000000000000000000000000000000000000000',
                value: '0000000000000000000000000000000000000000000000000000000000000001'
            },
            {
                slot: '0000000000000000000000000000000000000000000000000000000000000001',
                value: '0000000000000000000000000000000000000000000000000000000000000002'
            }]

            const expectedStorage: Storage[] = [{
                slot: '0000000000000000000000000000000000000000000000000000000000000000',
                value: '0000000000000000000000000000000000000000000000000000000000000001',
                name: 'value'
            },
            {
                slot: '0000000000000000000000000000000000000000000000000000000000000001',
                value: '0000000000000000000000000000000000000000000000000000000000000002',
                name: 'numberOfTokens'
            }]

            const result = getStorageItemsWithName(sampleStorage, astAsString)

            expect(result).toEqual(expectedStorage)
        })
    })
})

const traceLogs1 = (): StructLog[] => {
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

const traceLogs2 = (): StructLog[] => {
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
                '0000000000000000000000000000000000000000000000000000000000000001': '0000000000000000000000000000000000000000000000000000000000000001'
            }
        }
    ];
};

const traceLogs3 = (): StructLog[] => {
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
                '0000000000000000000000000000000000000000000000000000000000000002': '0000000000000000000000000000000000000000000000000000000000000002'
            }
        }
    ];
};

const traceWithCollisionWithTrace1 = (): StructLog[] => {
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
                '0000000000000000000000000000000000000000000000000000000000000000': '0000000000000000000000000000000000000000000000000000000000000001'
            }
        }
    ];
};