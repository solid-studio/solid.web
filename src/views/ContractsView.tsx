
import React from 'react'
import { Action, ActionCreator, bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'
import { Layout } from 'antd'

import { Contract, getContracts, maximizeContractView } from 'features/contracts'
import { ApplicationState } from 'features/rootReducer'
import { ContractsTable } from 'features/contracts/components/ContractsTable'
import { Connection } from 'features/connections'
import { emitter } from 'features/common/event-emitter'

import { StyledDiv, StyledH1, CustomIcon, ContractDetails } from './components'

const { Sider, Content } = Layout;

interface OwnProps {
    // connection: Connection
}

interface StateProps {
    contracts: Contract[]
    currentConnection: Connection | undefined
}

interface DispatchProps {
    maximizeContractView: ActionCreator<Action>
    getContracts: ActionCreator<Action>
}

type AllProps = OwnProps & DispatchProps & StateProps

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
            this.props.getContracts(this.props.currentConnection._id)
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

    closeDrawer = () => {
        console.log("ON MOUSE LEAVE") // UNUSED METHOD, maybe remove
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
                            contracts={contracts}
                            onMouseLeave={this.closeDrawer} />
                    </StyledDiv>
                </Content>
                <Sider trigger={null} collapsed={!showContractDrawer} collapsible={true} collapsedWidth={0} width={drawerWidth}>
                    <div>
                        <CustomIcon src="https://res.cloudinary.com/key-solutions/image/upload/v1568672208/solid/maximize.png" alt="maximise" onClick={this.maximiseWindow} />
                        {/* <img src="https://res.cloudinary.com/key-solutions/image/upload/v1568673196/solid/error.png" alt="close" onClick={this.closeDrawer} /> */}
                        {selectedContractRowItem &&
                            <ContractDetails contract={selectedContractRowItem} />}
                    </div>
                </Sider>
            </Layout>
        )
    }
}


const mapStateToProps = ({ contractState, connectionState }: ApplicationState) => {
    return {
        contracts: contractState.contracts,
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
