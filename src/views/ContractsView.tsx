
import React from 'react'
import { Action, ActionCreator, bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'
import { Layout } from 'antd'

import { Contract, Connection } from '@solid-explorer/types'

import { getContracts, maximizeContractView } from 'features/contracts/actions'
import { ContractsTable, ContractDetails } from 'features/contracts/components'

import { ApplicationState } from 'features/rootReducer'
import { emitter } from 'features/common/event-emitter'

import client from '../utils/feathers'

import { StyledDiv, StyledH1, CustomIcon } from './components'

const { Sider, Content } = Layout;

// interface OwnProps {

// }

interface StateProps {
    contracts: Contract[]
    currentConnection: Connection | undefined
}

interface DispatchProps {
    maximizeContractView: ActionCreator<Action>
    getContracts: ActionCreator<Action>
}

type AllProps = DispatchProps & StateProps //  OwnProps & 

interface State {
    showContractDrawer: boolean
    drawerWidth: number
    selectedContractRowItem?: Contract
}

export class ContractsView extends React.Component<AllProps, State> {
    static defaultProps = {
        contracts: []
    }

    constructor(props: AllProps) {
        super(props)
        this.state = {
            showContractDrawer: false,
            drawerWidth: 470,
            selectedContractRowItem: undefined
        }
    }

    componentDidMount() {
        if (this.props.currentConnection) {
            this.props.getContracts(this.props.currentConnection.id)

            // TODO IMPROVE
            client.service('contracts')
                .on('created', (message: string) => {
                    if (this.props.currentConnection) {
                        this.props.getContracts(this.props.currentConnection.id)
                    }
                });
        }
    }

    showContractsDrawer = (record: Contract) => {
        this.setState({
            showContractDrawer: true,
            selectedContractRowItem: record
        }, () => {
            emitter.emit("COLLAPSE_RIGHT_SIDEBAR_MENU")
        })
    }

    onDoubleClick = (record: Contract) => {
        console.log("DOUBLE CLICK", record)
    }

    maximiseWindow = () => {
        const contractToShow = this.state.selectedContractRowItem
        this.setState({
            showContractDrawer: false
        }, () => {
            this.props.maximizeContractView({
                ...contractToShow,
                type: 'editor'
            })
        })
    }

    render() {
        const { showContractDrawer, drawerWidth, selectedContractRowItem } = this.state
        const { contracts } = this.props
        return (
            <Layout style={{ height: "100%" }}>
                <Content style={{ height: "100%" }}>
                    <StyledDiv>
                        <StyledH1>Contracts</StyledH1>
                        <ContractsTable onClick={this.showContractsDrawer}
                            onDoubleClick={this.onDoubleClick}
                            contracts={contracts} />
                    </StyledDiv>
                </Content>
                <Sider style={{ background: "#272727" }} trigger={null} collapsed={!showContractDrawer} collapsible={true} collapsedWidth={0} width={drawerWidth}>
                    <div>
                        <CustomIcon src="https://res.cloudinary.com/key-solutions/image/upload/v1568672208/solid/maximize.png" alt="maximise" onClick={this.maximiseWindow} />
                        { /* TODO: add close icon <img src="https://res.cloudinary.com/key-solutions/image/upload/v1568673196/solid/error.png" alt="close" onClick={this.closeDrawer} /> */}
                        {selectedContractRowItem &&
                            <ContractDetails contract={selectedContractRowItem} />}
                    </div>
                </Sider>
            </Layout>
        )
    }
}


const mapStateToProps = ({ contractState, connectionState }: ApplicationState) => {
    // TODO: Create selector
    const contractsByConnection = contractState.contracts.filter((item) => {
        if (connectionState.currentConnection) {
            return item.connectionId === connectionState.currentConnection.id
        }
        return item;
    })

    const uniqueContracts = contractsByConnection.reduce((acc: Contract[], current) => {
        const x = acc.find((item: Contract) => item.address === current.address);
        if (!x) {
            return acc.concat([current]);
        } else {
            return acc;
        }
    }, []);

    return {
        contracts: uniqueContracts,
        currentConnection: connectionState.currentConnection
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return bindActionCreators(
        {
            getContracts,
            maximizeContractView
        },
        dispatch
    )
}

export default connect<StateProps, DispatchProps, {}, ApplicationState>(
    mapStateToProps,
    mapDispatchToProps
)(ContractsView)
