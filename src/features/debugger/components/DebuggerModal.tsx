import React from 'react'
import { Modal, Button } from 'antd'
import { buildFakeTransaction } from '@solid-explorer/types'

// interface Props {

// }

export class DebuggerModal extends React.Component {

    handleClose() {
        console.log("Handle close clicked")
    }

    render() {
        const sampleTransaction = buildFakeTransaction()
        return (<Modal
            visible={false}
            title={`Transaction hash: ${sampleTransaction.hash}`}
            centered={true}
            footer={[
                <Button type="danger" key="cancel" onClick={this.handleClose}>
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