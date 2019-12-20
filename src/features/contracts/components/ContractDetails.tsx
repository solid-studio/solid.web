import React from 'react'

import { AbiItem } from 'web3-utils'
import { Icon, Collapse } from 'antd'

import { Contract } from '@solid-explorer/types'

import ContractActionView from './ContractActionView'

import { CollapseStyled } from './ContractDetailsComponents'
import { TableDetailsPanel } from './TableDetailsPanel'
import ContractStorage from './ContractStorage'

const Panel = Collapse.Panel

interface ContractDetailsProps {
    contract: Contract
    readOnly?: boolean
}

export class ContractDetails extends React.Component<ContractDetailsProps>{
    constructor(props: ContractDetailsProps) {
        super(props)
    }
    render() {
        const { contract, readOnly } = this.props
        const { abi, connectionId, ast, address, id } = contract as any
        return (
            <div style={{ color: "white", padding: "1em 1em" }}>
                <TableDetailsPanel contract={contract} />
                {readOnly ? undefined :
                    <CollapseStyled defaultActiveKey={['0']} bordered={false}>
                        <Panel header="Methods" key="1">
                            <ContractActionsViewWrapper abi={abi} />
                        </Panel>
                        <Panel header="Storage" key="2">
                            <ContractStorage
                                // contract={contract}
                                connectionId={connectionId}
                                ast={(contract as any).ast}
                                contractAddress={address}
                                contractId={id as number}
                            />
                        </Panel>
                    </CollapseStyled>}
            </div >
        )
    }

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

export const isValidABI = (abi: AbiItem[]) => {
    try {
        processABIData(abi)
        return true
    } catch (error) {
        return false
    }
}

export const ContractActionsViewWrapper: React.FC<ContractActionsProps> = (props: ContractActionsProps) => {
    const onlyFunctions = isValidABI(props.abi) ? processABIData(props.abi) : []
    return (
        <div>
            {onlyFunctions &&
                onlyFunctions.length > 0 &&
                onlyFunctions.map(item => <ContractActionView key={item.name} abi={item} />)}
        </div>
    )
}

export const CollapsedDetailsPanels: React.FC<ContractDetailsProps> = ({ contract }: ContractDetailsProps) => {
    const { abi, address, connectionId, id } = contract;
    return (
        <CollapseStyled defaultActiveKey={['0']} bordered={false}>
            <Panel header="Methods" key="1">
                <ContractActionsViewWrapper abi={abi} />
            </Panel>
            <Panel header="Storage" key="2">
                <ContractStorage
                    connectionId={connectionId}
                    ast={(contract as any).ast}
                    contractAddress={address}
                    contractId={id as number}
                />
            </Panel>
        </CollapseStyled>
    )
}
