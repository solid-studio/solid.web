
import React from 'react'

import { BlocksTable } from 'features/blocks/components/BlocksTable'
import { buildFakeBlocks } from 'features/blocks/faker'

import { StyledDiv, StyledH1 } from './components'
import { buildFakeConnection } from 'features/connections/faker'

interface Props {

}

interface State {

}

export class BlocksView extends React.Component<Props, State> {
    componentDidMount() {
        // TODO: Get blocks from server
        // this.props.getBlocks(this.props.connectionId)
    }
    render() {
        const connection = buildFakeConnection() // TODO: FIX Views
        return (
            <StyledDiv>
                <StyledH1>Blocks</StyledH1>
                <BlocksTable connectionId={connection._id} blocks={buildFakeBlocks()} />
            </StyledDiv>
        )
    }
}