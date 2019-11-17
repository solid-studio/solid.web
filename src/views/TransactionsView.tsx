
import React from 'react'

import { Action, ActionCreator, bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'

import { Connection, TransactionReceipt } from '@solid-explorer/types'

import { getTransactions } from 'features/transactions/actions'
import { TransactionsTable } from 'features/transactions/components/TransactionsTable'
import { ApplicationState } from 'features/rootReducer'

import client from '../utils/feathers'

import { StyledDiv, StyledH1 } from './components'

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
        if (this.props.currentConnection) {
            this.props.getTransactions(this.props.currentConnection.id)
        }

        // TODO IMPROVE
        client.service('transaction-receipts')
            .on('created', (message: string) => {
                if (this.props.currentConnection) {
                    this.props.getTransactions(this.props.currentConnection.id)
                }
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
    const transactionsByConnection = transactionsState.transactions.filter((item) => {
        if (connectionState.currentConnection && connectionState.currentConnection.id) {
            return item.connectionId === connectionState.currentConnection.id
        }
        return item;
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
