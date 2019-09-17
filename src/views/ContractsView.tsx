
import React from 'react'
import { Action, ActionCreator, bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'

import { ContractsTable } from 'features/contracts/components/ContractsTable'
import { buildFakeContracts } from 'features/contracts/faker'
import { buildFakeConnection } from 'features/connections/faker'

import { StyledDiv, StyledH1, CustomIcon } from './components'

import { Layout } from 'antd'
import { Contract, maximizeContractView } from 'features/contracts'

import { emitter } from '../features/common/event-emitter'

// actions
const { Sider, Content } = Layout;

interface OwnProps {

}

interface StateProps {
    contracts: Contract[]
}

interface DispatchProps {
    maximizeContractView: ActionCreator<Action>
}

type AllProps = OwnProps & DispatchProps & StateProps

interface State {
    showContractDrawer: boolean
    drawerWidth: number
    testContractInstance?: Contract
}

export class ContractsView extends React.Component<AllProps, State> {
    static defaultProps = {
        contracts: []
    }

    constructor(props: AllProps) {
        super(props)
        this.state = {
            showContractDrawer: false,
            drawerWidth: 400,
            testContractInstance: undefined
        }
    }

    componentDidMount() {
        // TODO: Get contracts from server
        // this.props.getContracts(this.props.connectionId) The Table shouldn't do anything...
    }

    showContractsDrawer = (record: Contract) => {
        console.log("RECORD", record)
        this.setState({
            showContractDrawer: true,
            testContractInstance: record
        }, () => {
            // collapseRightSideBarMenu
            emitter.emit("COLLAPSE_RIGHT_SIDEBAR_MENU")
        })
    }

    onDoubleClick = (record: Contract) => {
        console.log("DOUBLE CLICK", record)
    }

    maximiseWindow = () => {
        const contractToShow = this.state.testContractInstance //TODO FIX THIS I PUT testContractInstance ... this.props.contracts[0]
        //.find(item => {
        //     const valueToCompare = value !== undefined ? value![0] : '1'
        //     return item._id === valueToCompare
        // })]
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
        console.log("ON MOUSE LEAVE")
        this.setState({
            showContractDrawer: true
        })
    }

    render() {
        const { showContractDrawer, drawerWidth } = this.state
        const connection = buildFakeConnection() // TODO: FIX Views
        return (
            <Layout style={{ height: "100%" }}>
                <Content style={{ height: "100%" }}>
                    <StyledDiv>
                        <StyledH1>Contracts</StyledH1>
                        <ContractsTable onClick={this.showContractsDrawer}
                            onDoubleClick={this.onDoubleClick}
                            connectionId={connection._id}
                            contracts={buildFakeContracts()}
                            onMouseLeave={this.closeDrawer} />
                    </StyledDiv>
                    {/* <button onClick={this.testing}>Grow</button> */}
                </Content>
                <Sider trigger={null} collapsed={!showContractDrawer} collapsible={true} collapsedWidth={0} width={drawerWidth}>
                    <div style={{ float: "right" }}>
                        <CustomIcon src="https://res.cloudinary.com/key-solutions/image/upload/v1568672208/solid/maximize.png" alt="maximise" onClick={this.maximiseWindow} />
                        {/* <img src="https://res.cloudinary.com/key-solutions/image/upload/v1568673196/solid/error.png" alt="close" onClick={this.closeDrawer} /> */}
                    </div>
                </Sider>
            </Layout>
        )
    }
}


// const mapStateToProps = (state: ApplicationState) => {
//     return {

//     }
// }

const mapDispatchToProps = (dispatch: Dispatch) => {
    return bindActionCreators(
        {
            maximizeContractView
        },
        dispatch
    )
}

export default connect(
    null,
    mapDispatchToProps
)(ContractsView)
