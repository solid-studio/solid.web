
import React from 'react'
import { Action, ActionCreator, bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'

import { Block, Connection } from '@solid-explorer/types'

import { ApplicationState } from 'features/rootReducer'
import { BlocksTable } from 'features/blocks/components'
import { getBlocks } from 'features/blocks/actions'

import client from '../utils/feathers'

import { StyledDiv, StyledH1 } from './components'
import { ConnectionNormalized } from 'features/connections/types'

// interface OwnProps {

// }

interface StateProps {
    blocks: Block[]
    currentConnection: Connection | undefined
}

interface DispatchProps {
    getBlocks: ActionCreator<Action>
}

type AllProps = DispatchProps & StateProps // OwnProps & 

export class BlocksView extends React.Component<AllProps> {
    static defaultProps = {
        blocks: []
    }

    componentDidMount() {
        if (this.props.currentConnection) {
            this.props.getBlocks(this.props.currentConnection.id)
        }

        // TODO IMPROVE
        client.service('blocks')
            .on('created', (message: string) => {
                setTimeout(() => {
                    if (this.props.currentConnection) {
                        this.props.getBlocks(this.props.currentConnection.id)
                    }
                }, 500);
            });
    }

    render() {
        const { blocks } = this.props
        return (
            <StyledDiv>
                <StyledH1>Blocks</StyledH1>
                <BlocksTable blocks={blocks} />
            </StyledDiv>
        )
    }
}

const mapStateToProps = ({ blocksState, connectionState }: ApplicationState) => {
    const currentConnectionId = connectionState.currentConnection ? connectionState.currentConnection.id as number : 0
    const connection = connectionState.connections.byId[currentConnectionId] as ConnectionNormalized || {}
    const allBlockIdsByConnection = connection.blocks as string[]

    const blocksByConnection = allBlockIdsByConnection && allBlockIdsByConnection.map((id: string) => {
        return blocksState.blocks.byId[id];
    })

    return {
        blocks: blocksByConnection,
        currentConnection: connectionState.currentConnection
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return bindActionCreators(
        {
            getBlocks
        },
        dispatch
    )
}

export default connect<StateProps, DispatchProps, {}, ApplicationState>(
    mapStateToProps,
    mapDispatchToProps
)(BlocksView)
