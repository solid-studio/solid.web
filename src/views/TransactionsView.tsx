
import React from 'react'

import { Action, ActionCreator, bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'

import { Connection, Transaction } from '@solidstudio/solid.types'

import { getTransactions } from 'features/transactions'
import { TransactionsTable } from 'features/transactions/components/TransactionsTable'
import { ApplicationState } from 'features/rootReducer'

import { StyledDiv, StyledH1 } from './components'

interface OwnProps {

}

interface StateProps {
    transactions: Transaction[]
    currentConnection: Connection | undefined
}

interface DispatchProps {
    getTransactions: ActionCreator<Action>
}

type AllProps = OwnProps & DispatchProps & StateProps


export class TransactionsView extends React.Component<AllProps> {
    static defaultProps = {
        transactions: []
    }

    componentDidMount() {
        if (this.props.currentConnection) {
            this.props.getTransactions(this.props.currentConnection.id)
        }
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

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TransactionsView)
