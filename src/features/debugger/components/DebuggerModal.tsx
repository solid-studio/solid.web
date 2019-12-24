import React from 'react'
import { Modal, Button } from 'antd'
import { CFGraph } from '@ethereum-react-components/ui'
import { ControlFlowGraphCreator } from '@ethereum-react-components/cfg';
import { OperationBlock, Operation } from '@ethereum-react-components/types'

interface Props {
    transactionHash: string
    visible: boolean
    onClose: () => void
}

export interface ICFGraphProps {
    blocks: OperationBlock[]
    trace?: Array<{
        depth: number
        error?: any
        gas: string
        gasCost: string
        memory: string[]
        op: string
        pc: number
        stack?: string[]
        storage?: any
    }>
    operationSelected?: (op: Operation) => void
}

interface State {
    cfgProps: ICFGraphProps
}
const bytecode = '6080604052348015600f57600080fd5b5060043610604f576000357c0100000000000000000000000000000000000000000000000000000000900480632096525514605457806355241077146070575b600080fd5b605a609b565b6040518082815260200191505060405180910390f35b609960048036036020811015608457600080fd5b810190808035906020019092919050505060a4565b005b60008054905090565b806000819055505056fea165627a7a723058209c7687721ed665e81d460ae7cfa9f215783aaa55a62ee755d01c2d22268895970029'

const getProps = () => {
    try {
        const flow = bytecode ? new ControlFlowGraphCreator().buildControlFlowGraphFromBytecode(
            bytecode
        ) : ''

        const props: ICFGraphProps = {
            blocks: flow ? flow.contractRuntime.blocks.values() as any as OperationBlock[] : [],
            trace: undefined,
            // operationSelected: (op) => action('Operation selected')(op),
        }
        return props
    } catch (error) {
        console.error('Error parsing bytecode:' + error)
        throw error
    }
}

export class DebuggerModal extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {
            cfgProps: getProps()
        }
    }

    componentDidMount() {
        try {
            const flow = bytecode ? new ControlFlowGraphCreator().buildControlFlowGraphFromBytecode(
                bytecode
            ) : ''
        } catch (error) {
            console.error('Error parsing bytecode:' + error)
        }
    }
    handleClose() {
        console.log("Handle close clicked")
        this.props.onClose()
    }

    render() {
        const { visible, transactionHash } = this.props
        return (<Modal
            onCancel={() => this.props.onClose()}
            visible={visible}
            title={`Transaction hash: ${transactionHash}`}
            centered={true}
            footer={[
                <Button type="danger" key="cancel" onClick={() => this.props.onClose()}>
                    Close
                </Button>
                // <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
                //     Submit
                // </Button>,
            ]}
            destroyOnClose={true}
            okText={"Close"}
            bodyStyle={{ height: "80vh" }}
            width={"96%"}>
            <CFGraph {...this.state.cfgProps} />
        </Modal>)
    }
}
