import { AbiItem } from "web3-utils";

export const SAMPLE_ABI: AbiItem[] = [
    {
        constant: false,
        inputs: [
            {
                name: '_uuid',
                type: 'string'
            },
            {
                name: '_address',
                type: 'address'
            }
        ],
        name: 'registryCar',
        outputs: [
            {
                name: '',
                type: 'bool'
            }
        ],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        constant: true,
        inputs: [
            {
                name: '',
                type: 'bytes32'
            }
        ],
        name: 'cars',
        outputs: [
            {
                name: '',
                type: 'address'
            }
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function'
    },
    {
        constant: true,
        inputs: [],
        name: 'test',
        outputs: [
            {
                name: '',
                type: 'address'
            }
        ],
        payable: false,
        stateMutability: 'pure',
        type: 'function'
    }
]
