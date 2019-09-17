import React from 'react'

import copy from 'copy-to-clipboard'
import { AbiItem } from 'web3-utils'
import { Icon, Collapse } from 'antd'

import { Contract } from 'features/contracts' // TODO: FIX, contract should in contracts
import { ContractActions } from 'features/contracts/ContractActions' // TODO MOVE IT

import { TableDetails, CollapseStyled } from './index'
import { SAMPLE_ABI } from "../sample-data"

const Panel = Collapse.Panel

interface ContractDetailsProps {
    contract: Contract
}

export const ContractDetails: React.FC<ContractDetailsProps> = (props: ContractDetailsProps) => {
    return (
        <div style={{ color: "white", padding: "1em 1em" }}>
            <TableDetailsPanel {...props} />
            <MethodsPanel {...props} />
        </div >
    )
}

export const MethodsPanel: React.FC<ContractDetailsProps> = ({ contract }: ContractDetailsProps) => {
    const { abi } = contract;
    return (
        <CollapseStyled defaultActiveKey={['0']} bordered={false}>
            <Panel header="Methods" key="2">
                <ContractActions abi={SAMPLE_ABI || abi} />
            </Panel>
        </CollapseStyled>
    )
}
export const TableDetailsPanel: React.FC<ContractDetailsProps> = ({ contract }: ContractDetailsProps) => {
    const { name, address, abi, bytecode } = contract;
    const copyByteCode = (byteCode: string) => {
        console.log('copyByteCode clicked')
        copy(byteCode)
    }

    const copyABI = (abi: AbiItem[]) => {
        console.log('copyABI clicked')
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
