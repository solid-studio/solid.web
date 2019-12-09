import React from 'react'
import { Modal, Button } from 'antd'
import { buildFakeTransaction } from '@solid-explorer/types'

interface Props {
    transactionHash: string
    visible: boolean
    onClose: () => void
}

export class DebuggerModal extends React.Component<Props> {

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
            width={"96%"} />)
    }
}