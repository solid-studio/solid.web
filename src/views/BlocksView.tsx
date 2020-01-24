
import React from 'react'
import { Action, ActionCreator, bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'
import { Layout } from 'antd'

import { Block, Connection } from '@solid-explorer/types'

import { ApplicationState } from 'features/rootReducer'
import { BlocksTable, BlockDetails } from 'features/blocks/components'
import { getBlocks } from 'features/blocks/actions'
import { emitter } from 'features/common/event-emitter'

import client from '../utils/feathers'

import { StyledDiv, StyledH1, SiderView } from './components'
import { ConnectionNormalized } from 'features/connections/types'

const { Sider, Content } = Layout;

// interface OwnProps {

// }

interface StateProps {
    blocks: Block[]
    currentConnection: Connection | undefined
}

interface DispatchProps {
    getBlocks: ActionCreator<Action>
}

interface State {
    showBlockSider: boolean
    drawerWidth: number
    selectedBlock?: Block
}

type AllProps = DispatchProps & StateProps // OwnProps & 

export class BlocksView extends React.Component<AllProps, State> {
    static defaultProps = {
        blocks: []
    }

    constructor(props: AllProps) {
        super(props)
        this.state = {
            showBlockSider: false,
            drawerWidth: 470,
            selectedBlock: undefined
        }
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

    onDoubleClick = (record: Block) => {
        console.log("DOUBLE CLICK", record)
    }

    handleBlocksDrawer = (record: Block) => {
        this.setState({
            showBlockSider: true,
            selectedBlock: record
        }, () => {
            emitter.emit("COLLAPSE_RIGHT_SIDEBAR_MENU")
        })
    }

    closeSider = () => {
        this.setState({
            showBlockSider: false
        })
    }

    render() {
        const { showBlockSider, drawerWidth, selectedBlock } = this.state
        const { blocks, currentConnection } = this.props
        return (
            <Layout style={{ height: "100%" }}>
                <Content style={{ height: "100%" }}>
                    <StyledDiv>
                        <StyledH1>Blocks</StyledH1>
                        <BlocksTable blocks={blocks}
                            collapsed={showBlockSider}
                            onClick={this.handleBlocksDrawer}
                            onDoubleClick={this.onDoubleClick} />
                    </StyledDiv>
                </Content>
                <SiderView collapsed={!showBlockSider} onClose={this.closeSider}>
                    {selectedBlock && currentConnection &&
                        <BlockDetails currentConnection={currentConnection} block={selectedBlock} />}
                </SiderView>
            </Layout>
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
