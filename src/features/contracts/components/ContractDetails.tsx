import React from 'react'

import { AbiItem } from 'web3-utils'
import { Collapse } from 'antd'

import { Contract, Connection } from '@solid-explorer/types'

import ContractActionView from './ContractActionView'

import { CollapseStyled } from './ContractDetailsComponents'
import { TableDetailsPanel } from './TableDetailsPanel'
import ContractStorage from './ContractStorage'

const Panel = Collapse.Panel

interface ContractDetailsProps {
    contract: Contract
    readOnly?: boolean
    currentConnection?: Connection
}

export class ContractDetails extends React.Component<ContractDetailsProps>{

    render() {
        const { contract, readOnly, currentConnection } = this.props
        const { abi, connectionId, address, id } = contract as any
        return (
            <div style={{ color: "white", padding: "1em 1em" }}>
                <TableDetailsPanel contract={contract} />
                {(readOnly && currentConnection === undefined) ? undefined :
                    <CollapseStyled defaultActiveKey={['0']} bordered={false}>
                        <Panel header="Methods" key="1">
                            <ContractActionsViewWrapper
                                currentConnection={currentConnection as Connection}
                                connectionId={connectionId}
                                contractAddress={address}
                                abi={abi} />
                        </Panel>
                        <Panel header="Storage" key="2">
                            <ContractStorage
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
    contractAddress: string
    connectionId: number
    currentConnection: Connection
}

export const processABIData = (abi: AbiItem[]) => {
    const onlyFunctions = abi.filter((item: AbiItem) => {
        // console.log('Inside filter', item)
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
                onlyFunctions.map(item => <ContractActionView key={item.name}
                    abi={props.abi}
                    abiItem={item}
                    currentConnection={props.currentConnection}
                    contractAddress={props.contractAddress} />)}
        </div>
    )
}