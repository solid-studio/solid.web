
import React from 'react'

import { Action, ActionCreator, bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'

import { Connection, TransactionReceipt } from '@solid-explorer/types'

import { getTransactions } from 'features/transactions/actions'
import { TransactionsTable } from 'features/transactions/components/TransactionsTable'
import { ApplicationState } from 'features/rootReducer'

import client from '../utils/feathers'

import { StyledDiv, StyledH1 } from './components'
import { ConnectionNormalized } from 'features/connections/types'

// interface OwnProps {

// }

interface StateProps {
    transactions: TransactionReceipt[]
    currentConnection: Connection | undefined
}

interface DispatchProps {
    getTransactions: ActionCreator<Action>
}

type AllProps = DispatchProps & StateProps // OwnProps & 


export class TransactionsView extends React.Component<AllProps> {
    static defaultProps = {
        transactions: []
    }

    componentDidMount() {
        console.log("this.props.currentConnection", this.props.currentConnection)
        if (this.props.currentConnection) {
            this.props.getTransactions(this.props.currentConnection.id)
        }

        // TODO IMPROVE
        client.service('transaction-receipts')
            .on('created', (message: string) => {
                setTimeout(() => {
                    if (this.props.currentConnection) {
                        this.props.getTransactions(this.props.currentConnection.id)
                    }
                }, 500);
            });
    }


    render() {
        const { transactions } = this.props
        return (
            <StyledDiv>
                <StyledH1>Transactions</StyledH1>
                <TransactionsTable transactions={transactions} />
            </StyledDiv>
        )
    }
}

const mapStateToProps = ({ transactionsState, connectionState }: ApplicationState) => {
    const currentConnectionId = connectionState.currentConnection ? connectionState.currentConnection.id as number : 0
    const connection = connectionState.connections.byId[currentConnectionId] as ConnectionNormalized || {}
    const allTransactionIdsByConnection = connection.transactions as string[]

    const transactionsByConnection = allTransactionIdsByConnection && allTransactionIdsByConnection.map((id: string) => {
        return transactionsState.transactions.byId[id];
    })

    return {
        transactions: transactionsByConnection,
        currentConnection: connectionState.currentConnection
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return bindActionCreators(
        {
            getTransactions
        },
        dispatch
    )
}

export default connect<StateProps, DispatchProps, {}, ApplicationState>(
    mapStateToProps,
    mapDispatchToProps
)(TransactionsView)
