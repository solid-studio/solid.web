import React from 'react'

import copy from 'copy-to-clipboard'
import { AbiItem } from 'web3-utils'
import { Icon, Collapse } from 'antd'

import { Contract } from '@solidstudio/types'

import ContractActionView from './ContractActionView'

import { TableDetails, CollapseStyled } from './ContractDetailsComponents'

const Panel = Collapse.Panel

interface ContractDetailsProps {
    contract: Contract
}

interface ContractActionsProps {
    abi: AbiItem[]
}

export const processABIData = (abi: AbiItem[]) => {
    const onlyFunctions = abi.filter((item: AbiItem) => {
        console.log('Inside filter', item)
        return item.type === 'function'
    })
    return onlyFunctions
}

export const ContractActionsViewWrapper: React.FC<ContractActionsProps> = (props: ContractActionsProps) => {
    const onlyFunctions = processABIData(props.abi)
    return (
        <div>
            {onlyFunctions &&
                onlyFunctions.length > 0 &&
                onlyFunctions.map(item => <ContractActionView key={item.name} abi={item} />)}
        </div>
    )
}

export const ContractDetails: React.FC<ContractDetailsProps> = (props: ContractDetailsProps) => {
    return (
        <div style={{ color: "white", padding: "1em 1em" }}>
            <TableDetailsPanel {...props} />
            <CollapsedDetailsPanels {...props} />
        </div >
    )
}

export const CollapsedDetailsPanels: React.FC<ContractDetailsProps> = ({ contract }: ContractDetailsProps) => {
    const { abi } = contract;
    return (
        <CollapseStyled defaultActiveKey={['0']} bordered={false}>
            <Panel header="Methods" key="1">
                <ContractActionsViewWrapper abi={abi} />
            </Panel>
            <Panel header="Storage" key="2">
                <p style={{ color: "white" }}>Work in progress</p>
            </Panel>
            <Panel header="Inheritance" key="3">
                <p style={{ color: "white" }}>Work in progress</p>
            </Panel>
            <Panel header="Dependencies" key="4">
                <p style={{ color: "white" }}>Work in progress</p>
            </Panel>
        </CollapseStyled>
    )
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
