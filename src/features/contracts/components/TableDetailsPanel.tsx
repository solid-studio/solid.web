import React from 'react'
import { AbiItem } from 'web3-utils'
import { Icon } from 'antd'
import copy from 'copy-to-clipboard'

import { Contract } from '@solid-explorer/types'

import { TableDetails } from './ContractDetailsComponents'

interface ContractDetailsProps {
    contract: Contract
}

export const TableDetailsPanel: React.FC<ContractDetailsProps> = ({ contract }: ContractDetailsProps) => {
    const { name, address, abi, bytecode } = contract;
    const copyByteCode = (byteCode: string) => {
        copy(byteCode)
    }

    const copyABI = (abi: AbiItem[]) => {
        copy(JSON.stringify(abi))
    }

    return <TableDetails>
        <thead>
            <tr>
                <th>Details</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Name</td>
                <td>{name}</td>
            </tr>
            <tr>
                <td>Address</td>
                <td>{address}</td>
            </tr>
            <tr>
                <td>ABI</td>
                <td>
                    <Icon onClick={() => copyABI(abi)} type="copy" />
                </td>
            </tr>
            <tr>
                <td>Bytecode</td>
                <td>
                    <Icon onClick={() => copyByteCode(bytecode)} type="copy" />
                </td>
            </tr>
            <tr>
                <td>Size </td>
                <td>12 KB</td>
            </tr>
        </tbody>
    </TableDetails>
}
