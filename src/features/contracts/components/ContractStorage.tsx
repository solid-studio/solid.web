
import React from 'react'
import { bindActionCreators, Dispatch, ActionCreator } from 'redux'
import { connect } from 'react-redux'

import { TransactionTrace, StructLog } from '@solid-explorer/types'

import { GetTracesAction } from 'features/traces/action-types'
import { getTraces } from 'features/traces/actions'

import { ApplicationState } from '../../rootReducer'
import { ContractNormalized, Storage } from '../types'

import client from '../../../utils/feathers'

import { ContractStorageTable } from './ContractStorageTable'

interface OwnProps {
    contractAddress: string
    connectionId: number
    contractId: number
    ast: any // TODO Type AST
}

interface DispatchProps {
    getTraces: ActionCreator<GetTracesAction>
}

interface StateProps {
    traces: TransactionTrace[]
}

type AllProps = StateProps & OwnProps & DispatchProps

export class ContractStorage extends React.Component<AllProps> {
    static defaultProps = {
        traces: []
    }

    constructor(props: AllProps) {
        super(props)
    }

    componentDidMount() {
        const { contractAddress, ast, connectionId, contractId } = this.props
        this.props.getTraces({
            connectionId,
            contractAddress,
            contractId
        })

        // TODO IMPROVE
        client.service('traces')
            .on('created', (message: string) => {
                setTimeout(() => {
                    this.props.getTraces({
                        connectionId,
                        contractAddress,
                        contractId
                    })
                }, 500);
            });
    }

    componentDidUpdate(prevProps: AllProps) {
        const { contractAddress, connectionId, contractId } = this.props
        if (this.props.contractId !== prevProps.contractId) {
            this.props.getTraces({
                connectionId,
                contractAddress,
                contractId
            })
        }
    }

    render() {
        const { traces, ast } = this.props
        const storageItems = getComputedStorage(traces)
        const storageItemsWithName = getStorageItemsWithName(storageItems, ast)
        return (
            <div>
                {traces && traces.length > 0 && <ContractStorageTable storageItems={storageItemsWithName} />}
            </div>
        )
    }
}

type StorageComputerComponent = (traces: TransactionTrace[]) => Storage[]

type StorageItem = { [location: string]: string }

type StorageCalculatorWithName = (items: Storage[], ast: any) => Storage[]

export const getComputedStorage: StorageComputerComponent = (traces: TransactionTrace[]) => {
    let storage: StorageItem = {}

    const onlyStructLogsWithLastElement = traces.map((item: TransactionTrace) => {
        const lastStructLog = item.structLogs[item.structLogs.length - 1]
        return lastStructLog
    })
    const onlyStorageItemsAsArray = onlyStructLogsWithLastElement.map((item: StructLog) => {
        return item.storage
    })

    onlyStorageItemsAsArray.forEach((item: StorageItem) => {
        const keys = Object.keys(item)
        console.log("Keys", keys)
        keys.forEach((key: string) => {
            storage[key] = item[key]
        })
    })

    const finalResult: Storage[] = Object.keys(storage).map((item) => {
        return {
            slot: item,
            value: storage[item]
        }
    })

    return finalResult
}

export const getStorageItemsWithName: StorageCalculatorWithName = (items: Storage[], astAsString: string) => {
    const ast = JSON.parse(astAsString)
    const keys = Object.keys(ast.nodes)
    const keyWithContractDefinitionNode = keys.find((key: string) => {
        return ast.nodes[key].nodeType === 'ContractDefinition'
    })
    if (!keyWithContractDefinitionNode) {
        throw new Error('Invalid contract, contract definition invalid')
    }
    const contractDefinitionNode = ast.nodes[keyWithContractDefinitionNode]
    const astVariables = contractDefinitionNode.nodes.filter((item: any) => { // TODO TYPE
        return item.nodeType === 'VariableDeclaration'
    })
    const result: Storage[] = items.map((item: Storage, index: number) => {
        return {
            ...item,
            name: astVariables[index].name
        }
    })
    return result
}

const mapStateToProps = ({ tracesState, contractState }: ApplicationState, ownProps: OwnProps) => {
    // const currentContractId = contractState.currentContract ? contractState.currentContract.id as number : 0
    const contract = contractState.contracts.byId[ownProps.contractId as number] as ContractNormalized || {}
    console.log("Contract", contract)
    const allTracesIdsByConnection = contract.traces as string[]
    console.log("allTracesIdsByConnection", allTracesIdsByConnection)
    const tracesByContract = allTracesIdsByConnection && allTracesIdsByConnection.map((id: string) => {
        return tracesState.traces.byId[id];
    })
    console.log("tracesByContract", tracesByContract)
    return {
        traces: tracesByContract
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return bindActionCreators(
        {
            getTraces
        },
        dispatch
    )
}

export default connect<StateProps, DispatchProps, OwnProps, ApplicationState>(
    mapStateToProps,
    mapDispatchToProps
)(ContractStorage)
