
import React from 'react'

import { ContractsTable } from 'features/contracts/components/ContractsTable'
import { buildFakeContracts } from 'features/contracts/faker'
import { buildFakeConnection } from 'features/connections/faker'

import { StyledDiv, StyledH1 } from './components'

interface Props {

}

interface State {

}

export class ContractsView extends React.Component<Props, State> {
    componentDidMount() {
        // TODO: Get contracts from server
        // this.props.getContracts(this.props.connectionId) The Table shouldn't do anything...
    }

    render() {
        const connection = buildFakeConnection() // TODO: FIX Views
        return (
            <StyledDiv>
                <StyledH1>Contracts</StyledH1>
                <ContractsTable connectionId={connection._id} contracts={buildFakeContracts()} />
            </StyledDiv>
        )
    }
}