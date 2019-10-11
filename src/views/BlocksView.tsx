
import React from 'react'
import { Action, ActionCreator, bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'

import { Block, Connection } from '@solidstudio/solid.types'

import { ApplicationState } from 'features/rootReducer'
import { BlocksTable } from 'features/blocks/components'
import { getBlocks } from 'features/blocks/actions'

import { StyledDiv, StyledH1 } from './components'

interface OwnProps {

}

interface StateProps {
    blocks: Block[]
    currentConnection: Connection | undefined
}

interface DispatchProps {
    getBlocks: ActionCreator<Action>
}

type AllProps = OwnProps & DispatchProps & StateProps

export class BlocksView extends React.Component<AllProps> {
    static defaultProps = {
        blocks: []
    }

    componentDidMount() {
        if (this.props.currentConnection) {
            this.props.getBlocks(this.props.currentConnection.id)
        }
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
    return {
        blocks: blocksState.blocks,
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
